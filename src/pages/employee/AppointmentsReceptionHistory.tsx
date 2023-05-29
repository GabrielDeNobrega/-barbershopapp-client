import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { Col, Container, Row, Stack, Table } from 'react-bootstrap'
import Icon from '../../components/commons/Icon'
import Title, { HeaderTypes } from '../../components/commons/Title'
import Pagination from '../../components/commons/nagivation/Pagination'
import { useLoading } from '../../contexts/LoadingContext'
import { Appointment } from '../../models/Appointment'
import { Page } from '../../models/pagination/Page'
import { getAllEmployeeAppointments } from '../../services/employeeService'
import inMilliseconds from '../../utils/Awaiter'
import { convertToToastError } from '../../utils/ToastError'

type Props = {}

const AppointmentsReceptionHistory = (props: Props) => {

    const [appointments, setAppointments] = useState<Array<Appointment>>([]);
    const [pagination, setPagination] = useState({ page: 0, totalPages: 10 });
    const [loading, isLoading] = useLoading();
    const [firstRun, setFirstRun] = useState(false);

    useEffect(() => {
        getEmployeeAppointments();
        setFirstRun(true);
    }, []);

    const getEmployeeAppointments = async () => {
        isLoading(true);
        await getAllEmployeeAppointments(pagination.page, 10)
            .then(async (response: AxiosResponse<Page<Appointment>>) => {
                await inMilliseconds(500);
                setPagination({ page: response.data.number, totalPages: response.data.totalPages })
                setAppointments(response.data.content);

            }, async (axiosError) => {
                await inMilliseconds(500);
                convertToToastError(axiosError.response?.data);

            }).finally(() => {
                isLoading(false);
            })
    }

    const handlePrev = () => {
        setPagination({ ...pagination, page: pagination.page-- })
        getEmployeeAppointments();
    }

    const handleNext = () => {
        setPagination({ ...pagination, page: pagination.page++ })
        getEmployeeAppointments();
    }

    return (

        <Container fluid="sm" >
            <Stack className='justify-content-md-center ' style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '30px' }}>
                {appointments.length > 0 && <Row>
                    <Row className='text-center my-4'>
                        <Title headerType={HeaderTypes.h2}>Appointments Performed</Title>
                    </Row>
                    <Row className='justify-content-md-center overflow-auto horizontal-scroll mb-3'>
                        <Table striped bordered className="border border-2 rounded-2 overflow-auto">
                            <thead>
                                <tr className="border border-2 centered-th bordered-th">
                                    <th>Code</th>
                                    <th>Customer Name</th>
                                    <th>Employee</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments?.map(({ id, customer, employee, start, end, service, active }) => (
                                    <tr key={id} className="centered-td bordered-td">
                                        <td>{id}</td>
                                        <td className="border border-2">{customer.username}</td>
                                        <td>{employee.username}</td>
                                        <td>{service.currentPrice.toFixed(2)}</td>
                                        <td>{active ? "Active" : "Inactive"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            className="text-center d-flex justify-content-center"
                        >
                            <Pagination
                                totalPages={pagination.totalPages}
                                currentPage={pagination.page}
                                handlePrevPage={handlePrev}
                                handleNextPage={handleNext} />
                        </Col>
                    </Row>
                </Row>
                }
                {
                    !loading && firstRun && appointments.length === 0 &&
                    <Row className='text-center'>
                        <Icon size={128} color='dark'>electrical_services</Icon>
                        <div>
                            <p className='h2 text-break '>OOps! You Do not have Any Appointment Performed yet</p>
                        </div>
                    </Row>
                }


            </Stack>
        </Container>
    )
}

export default AppointmentsReceptionHistory
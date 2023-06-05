import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Stack, Table } from 'react-bootstrap';
import Icon from '../../../components/commons/Icon';
import Pagination from '../../../components/commons/nagivation/Pagination';
import Title, { HeaderTypes } from '../../../components/commons/Title';
import { useLoading } from '../../../contexts/LoadingContext';
import { Appointment } from '../../../models/Appointment';
import { Page } from '../../../models/pagination/Page';
import { getAppointmentsHistory } from '../../../services/customerService';
import inMilliseconds from '../../../utils/Awaiter';
import { toFormatedDateString } from '../../../utils/DateConverter';
import { convertToToastError } from '../../../utils/ToastError';

type AppointmentHistoryProps = {}

const CustomerAppointmentHistory = (props: AppointmentHistoryProps) => {

    const [appointments, setAppointments] = useState<Array<Appointment>>([]);
    const [pagination, setPagination] = useState({ page: 0, totalPages: 10 });
    const [loading, isLoading] = useLoading();
    const [firstRun, setFirstRun] = useState(false);

    useEffect(() => {
        getCustomerAppointments();
        setFirstRun(true);
    }, []);

    const getCustomerAppointments = async () => {
        isLoading(true);
        await getAppointmentsHistory(pagination.page, 10)
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
        getCustomerAppointments();
    }

    const handleNext = () => {
        setPagination({ ...pagination, page: pagination.page++ })
        getCustomerAppointments();
    }

    return (
        <Container >
            <Stack className='justify-content-md-center overflow-hidden'
                style={{
                    minHeight: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '30px',
                }}>
                {appointments.length > 0 && <Row>
                    <Row className='text-center my-4'>
                        <Title headerType={HeaderTypes.h2}>My Appointments History</Title>
                    </Row>
                    <Row className='justify-content-md-center mb-3 '>
                        <Col>
                            <Table striped bordered className="border border-2 rounded-2 text-center">
                                <thead>
                                    <tr className="border border-2 centered-th bordered-th">
                                        <th>Code</th>
                                        <th>Employee Name</th>
                                        <th>Scheduled Date</th>
                                        <th>Scheduled Time</th>
                                        <th>Service Name</th>
                                        <th>Service Type</th>
                                        <th>Service Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments?.map(({ id, customer, employee, service, status, createdAt, start, end }) => (
                                        <tr key={id} className="centered-td bordered-td">
                                            <td>{id}</td>
                                            <td>{employee.username}</td>
                                            <td>{toFormatedDateString(createdAt)}</td>
                                            <td>{`${toFormatedDateString(start, "HH:MM")} - ${toFormatedDateString(end, "HH:MM")}`}</td>
                                            <td>{service.name}</td>
                                            <td>{service.kindOfCare}</td>
                                            <td>{service.currentPrice.toFixed(2)}</td>
                                            <td>{status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
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
                            <p className='h2 text-break '>OOps! You do not have any appointment performed yet</p>
                        </div>
                    </Row>
                }


            </Stack>
        </Container >
    )
}

export default CustomerAppointmentHistory
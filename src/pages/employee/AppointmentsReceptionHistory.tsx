import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Stack, Table } from 'react-bootstrap'
import Icon from '../../components/commons/Icon'
import Title, { HeaderTypes } from '../../components/commons/Title'
import Pagination from '../../components/commons/nagivation/Pagination'
import { useLoading } from '../../contexts/LoadingContext'
import { Appointment, AppointmentStatus } from '../../models/Appointment'
import { Page } from '../../models/pagination/Page'
import { getAllEmployeeAppointments } from '../../services/employeeService'
import inMilliseconds from '../../utils/Awaiter'
import { convertToToastError } from '../../utils/ToastError'
import { changeAppointmentStatus } from '../../services/appointmentService'
import { toast } from 'react-toastify'
import { toFormatedDate, toFormatedDateString } from '../../utils/DateConverter'

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

    const changeAppointmentStatusHandler = async (appointmentId: number, appointmentStatus: AppointmentStatus) => {
        isLoading(true);
        changeAppointmentStatus(appointmentId, appointmentStatus)
            .then(async ({ data: appointment }: AxiosResponse<Appointment>) => {
                await inMilliseconds(500);
                updateAppointments(appointment)
                toast.success(`Status of Appointment #${appointment.id} successfully changed to ${appointment.status}`)
            }, async (axiosError) => {
                await inMilliseconds(500);
                convertToToastError(axiosError.response?.data);
            })
            .finally(() => isLoading(false))
    }

    const updateAppointments = (appointment: Appointment) => {
        const appointmentsCopy = [...appointments];
        const index = appointmentsCopy.findIndex(x => x.id === appointment.id)
        appointmentsCopy[index] = appointment;
        setAppointments(appointmentsCopy);
    }

    const handlePrev = () => {
        setPagination({ ...pagination, page: pagination.page-- })
        getEmployeeAppointments();
    }

    const handleNext = () => {
        setPagination({ ...pagination, page: pagination.page++ })
        getEmployeeAppointments();
    }

    const isAppointmentScheduled = (appointmentStatus: AppointmentStatus) => appointmentStatus === AppointmentStatus.SCHEDULED

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
                        <Title headerType={HeaderTypes.h2}>Employee Performed/Ongoing Appointments</Title>
                    </Row>
                    <Row className='justify-content-md-center mb-3 '>
                        <Col>
                            <Table striped bordered className="border border-2 rounded-2 text-center">
                                <thead>
                                    <tr className="border border-2 centered-th bordered-th">
                                        <th>Code</th>
                                        <th>Customer Name</th>
                                        <th>Scheduled Date</th>
                                        <th>Scheduled Time</th>
                                        <th>Service Type</th>
                                        <th>Service Price</th>
                                        <th>Status</th>
                                        <th>Mark As</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments?.map(({ id, customer, employee, service, status, createdAt, start, end }) => (
                                        <tr key={id} className="centered-td bordered-td">
                                            <td>{id}</td>
                                            <td className="border border-2">{customer.username}</td>
                                            <td>{toFormatedDate(new Date(createdAt)) }</td>
                                            <td>{`${toFormatedDateString(start, "HH:MM")} - ${toFormatedDateString(end, "HH:MM")}`}</td>
                                            <td>{service.kindOfCare}</td>
                                            <td>{service.currentPrice.toFixed(2)}</td>
                                            <td>{status}</td>
                                            <td className='d-flex justify-content-center'>
                                                <Stack direction='horizontal' gap={3}>
                                                    <Button className='btn-success'
                                                        disabled={!isAppointmentScheduled(status)}
                                                        onClick={() => changeAppointmentStatusHandler(id, AppointmentStatus.FINISHED)}>Done</Button>
                                                    <Button className='btn-danger'
                                                        disabled={!isAppointmentScheduled(status)}
                                                        onClick={() => changeAppointmentStatusHandler(id, AppointmentStatus.CANCELED)}>Canceled</Button>
                                                </Stack>
                                            </td>

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

export default AppointmentsReceptionHistory
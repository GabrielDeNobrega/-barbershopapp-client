import React, { useState, useEffect } from 'react'
import { Appointment } from '../../../models/Appointment';
import { useLoading } from '../../../contexts/LoadingContext';
import { Page } from '../../../models/pagination/Page';
import { AppointmentReport } from '../../../models/AppointmentReport';
import { AxiosResponse } from 'axios';
import inMilliseconds from '../../../utils/Awaiter';
import { getAppointmentReport } from '../../../services/reportService';
import { convertToToastError } from '../../../utils/ToastError';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row, Stack, Table } from 'react-bootstrap';
import Title, { HeaderTypes } from '../../../components/commons/Title';
import { toFormatedDate, toFormatedDateStringUTC } from '../../../utils/DateConverter';
import Icon from '../../../components/commons/Icon';
import Pagination from '../../../components/commons/nagivation/Pagination';
import { Prev } from 'react-bootstrap/esm/PageItem';
import { FilterReport } from '../../../models/form/FilterReport';

type AppointmentReportPageProps = {}

const getDateWithDifferenceOfDays = (daysDiff: number = 0) => {
    var today = new Date();
    var priorDate = new Date(new Date().setDate(today.getDate() - daysDiff));
    return toFormatedDate(priorDate, "yyyy-mm-dd")
}

const AppointmentReportPage = (props: AppointmentReportPageProps) => {

    const [appointmentReport, setAppointmentReport] = useState<AppointmentReport>();
    const [pagination, setPagination] = useState({ page: 0, totalPages: 10 });
    const [loading, isLoading] = useLoading();
    const [firstRun, setFirstRun] = useState(false);
    const [filter, setFilter] = useState<FilterReport>({
        startDate: getDateWithDifferenceOfDays(30),
        endDate: getDateWithDifferenceOfDays()
    })

    useEffect(() => {
        getCustomerAppointments();
    }, []);

    const getCustomerAppointments = async () => {
        isLoading(true);
        await getAppointmentReport(pagination.page, 10, filter)
            .then(async ({ data }: AxiosResponse<AppointmentReport>) => {
                await inMilliseconds(500);
                setPagination({
                    page: data.appointments.number,
                    totalPages: data.appointments.totalPages
                });
                setAppointmentReport(data);
                if (!firstRun) setFirstRun(true);
            }, async (axiosError) => {
                await inMilliseconds(500);
                convertToToastError(axiosError.response?.data);

            }).finally(() => {
                isLoading(false);
            })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        console.log(value);
        console.log({ ...filter, [name]: value })
        setFilter({ ...filter, [name]: value })
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
            <Stack className=''
                style={{
                    minHeight: '80vh',
                    justifyContent: 'center',
                    paddingBottom: '30px',
                }}>
                <Row className='text-center my-4 '>
                    <p className='h2'>Appointments Report </p>
                </Row>
                <Row className='justify-content-around' >
                    <Row>
                        <FormGroup className="mb-3 d-flex flex-column justify-content-end" as={Col} sm={12} md={5}>
                            <FormLabel className='fw-semibold'>Start Date</FormLabel>
                            <FormControl type="date"
                                className='border border-dark border-2'
                                name="startDate"
                                placeholder="Insert the Date for Appointment"
                                autoComplete="on"
                                onChange={handleChange}
                                value={filter.startDate}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3  d-flex flex-column justify-content-end" as={Col} sm={12} md={5}>
                            <FormLabel className='fw-semibold'>Start Date</FormLabel>
                            <FormControl type="date"
                                className='border border-dark border-2'
                                name="endDate"
                                placeholder="Insert the Date for Appointment"
                                autoComplete="on"
                                onChange={handleChange}
                                value={filter.endDate}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup className="mb-3 d-flex flex-column justify-content-end" as={Col} sm={12} md={2}>
                            <Button className='btn-dark' onClick={getCustomerAppointments}>Search</Button>
                        </FormGroup>
                    </Row>
                    <Row>
                        <Col sm={12} md={4} className='mb-3' >
                            <span className='h3 text-end '>Total:  {appointmentReport?.total}</span>
                        </Col>
                    </Row>
                </Row>
                {
                    appointmentReport?.appointments.content.length !== 0 && firstRun &&
                    <div>
                        < div className='overflow-auto vertical-scroll horizontal-scroll mb-3' >
                            <Table striped bordered className="border border-2 rounded-2 text-center">
                                <thead>
                                    <tr className="border border-2 centered-th bordered-th">
                                        <th>Code</th>
                                        <th>Customer Name</th>
                                        <th>Employee Name</th>
                                        <th>Creation Date</th>
                                        <th>Service Type</th>
                                        <th>Service Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointmentReport?.appointments?.content?.map(({ id, customer, employee, service, status, createdAt }) => (
                                        <tr key={id} className="centered-td bordered-td">
                                            <td>{id}</td>
                                            <td className="border border-2">{customer.username}</td>
                                            <td>{employee.username}</td>
                                            <td>{toFormatedDateStringUTC(createdAt)}</td>
                                            <td>{service.kindOfCare}</td>
                                            <td>{service.currentPrice.toFixed(2)}</td>
                                            <td>{status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
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
                    </div>
                }
                {
                    !loading && firstRun && appointmentReport?.appointments?.content.length === 0 &&
                    <Row className='text-center'>
                        <Icon size={128} color='dark'>query_stats</Icon>
                        <div>
                            <p className='h2 text-break '>No appointment found</p>
                        </div>
                    </Row>
                }
            </Stack>
        </Container >
    )
}

export default AppointmentReportPage
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Stack, Table } from 'react-bootstrap';
import Title, { HeaderTypes } from '../../../components/commons/Title';
import Pagination from '../../../components/commons/nagivation/Pagination';
import { useLoading } from '../../../contexts/LoadingContext';
import { Service } from '../../../models/Service';
import { Page } from '../../../models/pagination/Page';
import { cahngeServiceStatus, getAllServicesPaged } from '../../../services/servicesService';
import inMilliseconds from '../../../utils/Awaiter';
import { toFormatedDate } from '../../../utils/DateConverter';
import { convertToToastError } from '../../../utils/ToastError';

type ServiceListProps = {}

const ServiceList = (props: ServiceListProps) => {

    const [services, setServices] = useState<Array<Service>>([]);
    const [pagination, setPagination] = useState({ page: 0, totalPages: 10 });
    const [loading, isLoading] = useLoading();

    useEffect(() => {
        getServiceList();
    }, [])

    const getServiceList = () => {
        isLoading(true);
        getAllServicesPaged(pagination.page)
            .then(async ({ data }: AxiosResponse<Page<Service>>) => {
                await inMilliseconds(500);
                setPagination({ page: data.number, totalPages: data.totalPages })
                setServices(data.content)
            }, async (axiosError) => {
                await inMilliseconds(500);
                convertToToastError(axiosError.response?.data);
            })
            .finally(() => isLoading(false));
    }

    const handlePrev = () => {
        setPagination({ ...pagination, page: pagination.page-- })
        getServiceList();
    }

    const handleNext = () => {
        setPagination({ ...pagination, page: pagination.page++ })
        getServiceList();
    }

    const onChangeActiveStatusHandler = (serviceId: number) => {
        isLoading(true);
        cahngeServiceStatus(serviceId)
            .then(async ({ data }: AxiosResponse<Service>) => {
                await inMilliseconds(500);
                updateService(data)
            }, async (axiosError) => {
                await inMilliseconds(500);
                convertToToastError(axiosError.response?.data);
            })
            .finally(() => isLoading(false));
    }

    const updateService = (service: Service) => {
        const serviceCopy = [...services];
        const index = serviceCopy.findIndex(x => x.id === service.id)
        serviceCopy[index] = service;
        setServices(serviceCopy);
    }

    return (
        <Container >
            <Stack className='justify-content-md-center'
                style={{
                    minHeight: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingBottom: '30px',
                }}>
                {services.length > 0 && <Row>
                    <Row className='text-center my-4'>
                        <Title headerType={HeaderTypes.h2}>Service List</Title>
                    </Row>
                    <Row className='justify-content-md-center mb-3 '>
                        <Col className='overflow-auto horizontal-scroll'>
                            <Table striped bordered className="border border-2 rounded-2 text-center">
                                <thead>
                                    <tr className="border border-2 centered-th bordered-th">
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Type Of Care</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Creation Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services?.map(({ id, name, currentPrice, kindOfCare, createdAt, active }) => (
                                        <tr key={id} className="centered-td bordered-td">
                                            <td>{id}</td>
                                            <td className="border border-2">{name}</td>
                                            <td>{kindOfCare}</td>
                                            <td>{currentPrice}</td>
                                            <td>{active ? 'Active' : 'Inactive'}</td>
                                            <td>{toFormatedDate(new Date(createdAt))}</td>
                                            <td>
                                                <Stack direction='horizontal' gap={3} className='justify-content-center'>
                                                    <Button className={active ? 'btn-danger' : 'btn-success'}
                                                        onClick={() => onChangeActiveStatusHandler(id)}>{active ? 'Inactivate' : 'Activate'}</Button>
                                                </Stack></td>
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
            </Stack>
        </Container >

    )
}

export default ServiceList
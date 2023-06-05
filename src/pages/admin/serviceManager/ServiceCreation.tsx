import { Formik } from 'formik';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { FormServiceModel } from '../../../models/form/FormServiceModel';
import { Service, kindOfCare } from '../../../models/Service';
import Option from '../../../components/commons/form/Option';
import { useLoading } from '../../../contexts/LoadingContext';
import { createService } from '../../../services/servicesService';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import inMilliseconds from '../../../utils/Awaiter';
import { convertToToastError } from '../../../utils/ToastError';
import { useNavigate } from 'react-router-dom';

type ServiceCreationProps = {

}

const initialValues: FormServiceModel = {
    service: {
        id: 0,
        currentPrice: 0,
        name: '',
        duration: 30,
        kindOfCare: '',
        createdAt: '',
        active: true
    }
}

const ServiceCreation = (props: ServiceCreationProps) => {

    const [loading, isLoading] = useLoading();
    const navigate = useNavigate();
    const onRegisterHandler = ({ service }: FormServiceModel) => {
        isLoading(true);
        createService(service)
            .then(async ({ data: service }: AxiosResponse<Service>) => {
                await inMilliseconds(500);
                toast.success(`Service successfully created`)
                navigate('/admin');
            }, async (axiosError) => {
                await inMilliseconds(500);
                convertToToastError(axiosError.response?.data);
            })
            .finally(() => isLoading(false));
    }

    const serviceSchema = yup.object().shape({
        service: yup.object().shape({
            currentPrice: yup.number().moreThan(0).required().label("Price"),
            name: yup.string().required().label("Service Name"),
            kindOfCare: yup.string().required().label("Kind of Care")
        })
    })

    return (
        <Container fluid="sm" >
            <Row className='justify-content-md-center' style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '30px' }}>
                <Col className='col-xs-1 d-flex flex-column justify-content-md-center align-items-center' >
                    <Formik
                        validationSchema={serviceSchema}
                        onSubmit={onRegisterHandler}
                        initialValues={initialValues}
                    >{({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        isValid,
                        errors,
                        touched
                    }) => (
                        <Form noValidate onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e)
                        }}>
                            <Row className='text-center my-4'>
                                <p className='h2'> Service Creation</p>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="mb-3" controlId="FormAddServiceName" >
                                        <FormLabel className='fw-semibold'>Service Name</FormLabel>
                                        <FormControl
                                            type="text"
                                            name="service.name"
                                            value={values.service.name}
                                            onChange={handleChange}
                                            placeholder="Insert the service name"
                                            className='border border-dark border-2'
                                            onBlur={handleBlur}
                                            isInvalid={(touched?.service?.name && errors?.service?.name) as boolean}
                                            isValid={touched?.service?.name && !errors?.service?.name}
                                            autoComplete="on" />
                                        <FormControl.Feedback type="invalid">{errors?.service?.name}</FormControl.Feedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="mb-3" controlId="formAddServicePrice" >
                                        <FormLabel className='fw-semibold'>Price</FormLabel>
                                        <FormControl
                                            type="number"
                                            name="service.currentPrice"
                                            value={values.service.currentPrice}
                                            onChange={handleChange}
                                            className='border border-dark border-2'
                                            onBlur={handleBlur}
                                            isInvalid={(touched?.service?.currentPrice && errors?.service?.currentPrice) as boolean}
                                            isValid={touched?.service?.currentPrice && !errors?.service?.currentPrice}
                                            autoComplete="on" />
                                        <FormControl.Feedback type="invalid">{errors?.service?.currentPrice}</FormControl.Feedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup className='mb-3' as={Col} md={12} >
                                    <FormLabel className='fw-semibold'>kind Of Care</FormLabel>
                                    <FormSelect
                                        className='border border-dark border-2'
                                        name="service.kindOfCare"
                                        autoComplete="on"
                                        value={values.service.kindOfCare}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={(touched?.service?.kindOfCare && errors?.service?.kindOfCare) as boolean}
                                        isValid={touched?.service?.kindOfCare && !errors?.service?.kindOfCare}>
                                        <option value="" defaultChecked>Select a kind Of Care</option>
                                        {
                                            Object
                                                .entries(kindOfCare)
                                                .map(([key, value]) =>
                                                    (<Option value={value} key={key} defaultChecked>{value}</Option>))
                                        }
                                    </FormSelect>
                                    <FormControl.Feedback type="invalid">
                                        {errors?.service?.kindOfCare}
                                    </FormControl.Feedback>
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup className='mt-2'>
                                    <Button variant="success" className='btn-dark center w-100' type='submit' disabled={!isValid}>
                                        Register
                                    </Button>
                                </FormGroup>
                            </Row>
                        </Form>
                    )}
                    </Formik>
                </Col>
            </Row >
        </Container >
    )
}

export default ServiceCreation
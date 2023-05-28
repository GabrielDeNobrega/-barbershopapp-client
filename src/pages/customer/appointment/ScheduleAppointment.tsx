import { AxiosResponse } from 'axios';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Title, { HeaderTypes } from '../../../components/commons/Title';
import Option from '../../../components/commons/form/Option';
import { useLoading } from '../../../contexts/LoadingContext';
import { AppointmentTime } from '../../../models/AppointmentTime';
import { Employee } from '../../../models/Employee';
import { Service } from '../../../models/Service';
import { FormAppointmentModel } from '../../../models/form/FormAppointmentModel';
import { createAppointment, getAvailableAppointmentTimes } from '../../../services/appointmentService';
import { getAllEmployee } from '../../../services/employeeService';
import { getAllServices, getServiceById } from '../../../services/servicesService';
import inMilliseconds from '../../../utils/Awaiter';
import { toFormatedDate } from '../../../utils/DateConverter';
import { convertToToastError } from '../../../utils/ToastError';
import { useNavigate } from 'react-router-dom';

type ScheduleAppointmentProps = {

}

const messagesValidation = {
  service: {
    required: 'Service must be selected'
  },
  emnployee: {
    required: 'Employee must be selected'
  }
}
const initialValues: FormAppointmentModel = {
  appointment: {
    start: '',
    end: '',
    service: {
      id: 0
    },
    employee: {
      id: 0
    }
  },
  date: '',
  time: ''
}

const initialService: Service = {
  currentPrice: 0,
  duration: 0,
  id: 0,
  kindOfCare: '',
  name: ''
}

const ScheduleAppointment = (props: ScheduleAppointmentProps) => {
  const [employees, setEmployees] = useState<Array<Employee>>([])
  const [services, setServices] = useState<Array<Service>>([])
  const [appointmentTime, setAppointmentTime] = useState<Array<AppointmentTime>>([])
  const [service, setService] = useState<Service>(initialService)
  const [loading, isLoading] = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployee()
      .then((response: AxiosResponse<Array<Employee>>) => {
        setEmployees(response.data)
      }, (err) => { toast.error(err) })

    getAllServices()
      .then((response: AxiosResponse<Array<Service>>) => {
        setServices(response.data)
      }, (err) => { toast.error(err) })

  }, []);

  const getAvailableTimes = (employeeId: any, date: string) => {
    getAvailableAppointmentTimes(employeeId, date)
      .then((response: AxiosResponse<Array<AppointmentTime>>) => {
        setAppointmentTime(response.data)
      }, (err) => { toast.error(err) })
  }

  const onScheduleHandler = (appointment: FormAppointmentModel) => {
    isLoading(true);
    createAppointment(appointment)
      .then(async () => {
        await inMilliseconds(500);
        toast.success(`successfully scheduled appointment for  
        ${toFormatedDate(new Date(appointment.appointment.start), "mmmm d 'at' h:MM TT")}`);
        navigate("/customer")
      }, async (axiosError) => {
        await inMilliseconds(500);
        convertToToastError(axiosError.response?.data);
      })
      .finally(() => isLoading(false))
  }

  const scheduleAppointmentSchema = yup.object().shape({
    appointment: yup.object().shape({
      start: yup.date().required(),
      end: yup.date().required(),
      service: yup.object().shape({
        id: yup.number()
          .not([0], messagesValidation.service.required)
          .required(messagesValidation.service.required)
      }),
      employee: yup.object().shape({
        id: yup.number()
          .not([0], messagesValidation.emnployee.required)
          .required(messagesValidation.emnployee.required)
      })
    }),
    date: yup.date().required(),
    time: yup.string().trim().required()
  });

  return (
    <>
      <Container fluid="sm" >
        <Row className='justify-content-md-center' style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '30px' }}>
          <Col className='col-xs-1 d-flex flex-column justify-content-md-center align-items-center' >
            <Formik
              validationSchema={scheduleAppointmentSchema}
              onSubmit={onScheduleHandler}
              initialValues={initialValues}
              enableReinitialize
            >{({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              isValid,
              errors,
              touched,
              setFieldValue
            }) => (
              <Form noValidate onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}>
                <Row className='text-center my-4'>
                  <Title headerType={HeaderTypes.h2}> Schedule Appointment</Title>
                </Row>
                <Row>
                  <FormGroup className='mb-3' as={Col} md={6} >
                    <FormLabel className='fw-semibold'>Service Type</FormLabel>
                    <FormSelect
                      className='border border-dark border-2'
                      name="appointment.service.id"
                      value={values.appointment.service.id}
                      onChange={async (e) => {
                        handleChange(e);

                        if (!e.target.value) {
                          setService(initialService);
                          return;
                        }

                        await getServiceById(e.target.value)
                          .then((response: AxiosResponse<Service>) => {
                            setService(response.data)
                          }, (err) => toast.error(err))
                      }}
                      onBlur={handleBlur}
                      isInvalid={(touched?.appointment?.service?.id && errors?.appointment?.service?.id) as boolean}
                      isValid={touched?.appointment?.service?.id && !errors?.appointment?.service?.id}
                      autoComplete="on"
                    >
                      <option value={0} defaultChecked>Select a Service Type</option>
                      {services.map(({ id, kindOfCare, name }) => (<Option key={id} value={id}>{name} - {kindOfCare}</Option>))}
                    </FormSelect>
                    <FormControl.Feedback type="invalid">
                      {errors?.appointment?.service?.id}
                    </FormControl.Feedback>
                  </FormGroup>

                  <FormGroup className='mb-3' as={Col} md={6} >
                    <FormLabel className='fw-semibold'>Barber</FormLabel>
                    <FormSelect
                      className='border border-dark border-2'
                      name="appointment.employee.id"
                      value={values.appointment.employee.id}
                      onChange={async e => {
                        handleChange(e);
                        setFieldValue('time', '');
                        if (values.date) getAvailableTimes(e.target.value, values.date);
                      }}
                      onBlur={handleBlur}
                      isInvalid={(touched?.appointment?.employee?.id && errors?.appointment?.employee?.id) as boolean}
                      isValid={touched?.appointment?.employee?.id && !errors?.appointment?.employee?.id}
                      autoComplete="on"
                    >
                      <option value={0} defaultChecked>Select a Barber</option>
                      {employees.map(({ id, email, username }) => (<Option key={id} value={id}>{username}</Option>))}
                    </FormSelect>
                    <FormControl.Feedback type="invalid">
                      {errors?.appointment?.employee?.id}
                    </FormControl.Feedback>
                  </FormGroup>
                </Row>

                <Row>
                  <FormGroup className="mb-3" as={Col} md={6}>
                    <FormLabel className='fw-semibold'>Date</FormLabel>
                    <FormControl type="date"
                      className='border border-dark border-2'
                      name="date"
                      placeholder="Insert the Date for Appointment"
                      autoComplete="on"
                      min={toFormatedDate(new Date(), "yyyy-mm-dd")}
                      value={values.date}
                      onChange={async e => {
                        handleChange(e);
                        setFieldValue('time', '');
                        getAvailableTimes(values.appointment.employee.id, e.target.value);
                      }}
                      onBlur={handleBlur}
                      isInvalid={(touched?.date && errors?.date) as boolean}
                      isValid={touched?.date && !errors?.date}
                      disabled={values.appointment.employee.id === 0 || values.appointment.service.id === 0} />
                    <FormControl.Feedback type="invalid">
                      {errors?.date}
                    </FormControl.Feedback>
                  </FormGroup>
                  <FormGroup className='mb-3' as={Col} md={6} >
                    <FormLabel className='fw-semibold'>Time</FormLabel>
                    <FormSelect
                      className='border border-dark border-2'
                      name="time"
                      autoComplete="on"
                      value={values.time}
                      onChange={e => {
                        handleChange(e)
                        if (e.target.value) {
                          let dates = e.target.value.split(';');
                          setFieldValue('appointment.start', toFormatedDate(new Date(dates[0]), "yyyy-mm-dd'T'HH:MM:sso"))
                          setFieldValue('appointment.end', toFormatedDate(new Date(dates[1]), "yyyy-mm-dd'T'HH:MM:sso"))
                        }
                      }}
                      onBlur={handleBlur}
                      isInvalid={(touched?.time && errors?.time) as boolean}
                      isValid={touched?.time && !errors?.date}
                      disabled={appointmentTime.length === 0 || values.appointment.employee.id === 0 || values.appointment.service.id === 0
                      }
                    >
                      <option value="" defaultChecked>Select a Time</option>
                      {
                        appointmentTime.map(({ start, end }, index) =>
                        (<Option key={index} value={`${start};${end}`}>
                          {toFormatedDate(new Date(start), "HH:MM")} - {toFormatedDate(new Date(end), "HH:MM")}
                        </Option>))}
                    </FormSelect>
                    <FormControl.Feedback type="invalid">
                      {errors?.date}
                    </FormControl.Feedback>
                  </FormGroup>
                </Row>
                {/* </Col> */}
                <Col sm={12} md={12} className='d-flex flex-column justify-content-center align-items-center card border border-2 border-dark mb-3'>
                  <p className='text-center m-0 h3'>Appointment Price</p>
                  <div className='d-flex '>
                    <h6 className='d-flex flex-column justify-content-center align-content-center me-2 btn-danger h1'>
                      R${service.currentPrice}
                    </h6>
                  </div>
                </Col>

                <Row>
                  <FormGroup className='mt-2 text-center'>
                    <Button variant="success" className='btn-dark center' type='submit' disabled={!isValid}>
                      Schedule Appointment
                    </Button>
                  </FormGroup>
                </Row>
              </Form>
            )}
            </Formik>
          </Col>
        </Row>
      </Container >
    </>
  )
}

export default ScheduleAppointment
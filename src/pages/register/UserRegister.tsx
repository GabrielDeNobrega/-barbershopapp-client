import { AxiosResponse } from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from "yup";
import Title, { HeaderTypes } from '../../components/commons/Title';
import { useLoading } from '../../contexts/LoadingContext';
import { User } from '../../models/User';
import { Role } from '../../models/UserCredentials';
import { FormUserModel } from '../../models/form/FormUserModel';
import inMilliseconds from '../../utils/Awaiter';
import { capitalize } from '../../utils/Capitalizer';
import { convertToToastError } from '../../utils/ToastError';
import isValidCPF from '../../utils/validators/CPFValidator';
import { useState } from 'react';
import TermsAndService from './TermsAndService';
import { toFormatedDate } from '../../utils/DateConverter';

export interface UserRegisterProps {
    userType?: Role,
    serviceCall: (user: User) => Promise<AxiosResponse<User, any>>,
    whenCreatedRedirectTo?: string
}

const UserRegister: React.FC<UserRegisterProps> = ({
    serviceCall,
    userType = Role.Customer,
    whenCreatedRedirectTo = undefined }: UserRegisterProps) => {

    const [loading, isLoading] = useLoading();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const onRegisterHandler = ({ user }: FormUserModel) => {
        isLoading(true);
        serviceCall(user)
            .then(async () => {
                await inMilliseconds(500);
                toast.success(`${capitalize(userType)} successfully registered`);
                if (whenCreatedRedirectTo)
                    navigate(whenCreatedRedirectTo);
            }, async (axiosError) => {
                await inMilliseconds(500);
                convertToToastError(axiosError.response?.data);
            })
            .finally(() => isLoading(false))
    }

    const initialValues: FormUserModel = {
        user: {
            id: '',
            username: '',
            email: '',
            birth: new Date().toISOString(),
            password: '',
            phoneNumber: '',
            role: userType,
            cpf: '',
            active: true,
        },
        confirmPassword: '',
        confirmTermsOfService: false
    }

    const addRequireForPassword = (yup: any) => yup.string().min(8).label("password").required();

    const registerSchema = yup.object().shape({
        user: yup.object().shape({
            username: yup.string().required(),
            email: yup.string().email().required(),
            password: addRequireForPassword(yup),
            phoneNumber: yup.string().required(),
            birth: yup.date().required(),
            cpf: yup.string().test('CPF-test', 'Invalid CPF', (cpf) => isValidCPF(cpf)).required(),
        }),
        confirmPassword: addRequireForPassword(yup)
            .test("equalTest", "passwords must match", function (value: string, context: yup.TestContext) {
                return context?.parent?.user?.password === value
            }),
        confirmTermsOfService: yup.boolean().oneOf([true], "You must accept the terms and service").required()
    });

    return (
        <Container fluid="sm" >
            <TermsAndService onHide={() => { setShowModal(false) }} show={showModal} />
            <Row className='justify-content-md-center' style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '30px' }}>
                <Col className='col-xs-1 d-flex flex-column justify-content-md-center align-items-center' >
                    <Formik
                        validationSchema={registerSchema}
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
                                <Title headerType={HeaderTypes.h2}> Register {capitalize(userType)}</Title>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <FormGroup className="mb-3" controlId="registerFormUsername" >
                                        <FormLabel>Username</FormLabel>
                                        <FormControl
                                            type="text"
                                            name="user.username"
                                            value={values.user.username}
                                            onChange={handleChange}
                                            placeholder="Insert your name"
                                            className='border border-dark border-2'
                                            onBlur={handleBlur}
                                            isInvalid={(touched?.user?.username && errors?.user?.username) as boolean}
                                            isValid={touched?.user?.username && !errors?.user?.username}
                                            autoComplete="on"
                                            aria-label="Username"
                                            aria-required="true"
                                        />
                                        <FormControl.Feedback type="invalid">{errors?.user?.username}</FormControl.Feedback>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="mb-3 " controlId="registerFormEmail" >
                                        <FormLabel>Email</FormLabel>
                                        <FormControl type="email"
                                            name="user.email"
                                            value={values.user.email}
                                            placeholder="Insert your email"
                                            className='border border-dark border-2'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={(touched?.user?.email && errors?.user?.email) as boolean}
                                            isValid={touched?.user?.email && !errors?.user?.email}
                                            autoComplete="on"
                                            aria-label="Email"
                                            aria-required="true"
                                        />
                                        <FormControl.Feedback type="invalid">{errors?.user?.email}</FormControl.Feedback>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={3}>
                                    <FormGroup className="mb-3" controlId="registerFormBirthDate" >
                                        <FormLabel>Birth Date</FormLabel>
                                        <FormControl type="date"
                                            name="user.birth"
                                            value={values?.user?.birth?.substring(0, 10)}
                                            placeholder="Insert your Birth Date"
                                            className='border border-dark border-2'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={(touched?.user?.birth && errors?.user?.birth) as boolean}
                                            isValid={touched?.user?.birth && !errors?.user?.birth}
                                            autoComplete="on"
                                            aria-label="Birthdate"
                                            aria-required="true"
                                            max={toFormatedDate(new Date(), "yyyy-mm-dd")}
                                            />
                                        <FormControl.Feedback type="invalid">{errors?.user?.birth}</FormControl.Feedback>
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup className="mb-3" controlId="registerFormCPF">
                                        <FormLabel>CPF</FormLabel>
                                        <FormControl type="text"
                                            name="user.cpf"
                                            value={values.user.cpf}
                                            placeholder="Insert your CPF"
                                            className='border border-dark border-2'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={(touched?.user?.cpf && errors?.user?.cpf) as boolean}
                                            isValid={touched?.user?.cpf && !errors?.user?.cpf}
                                            autoComplete="on"
                                            aria-label="CPF"
                                            aria-required="true"
                                        />
                                        <FormControl.Feedback>CPF Looks good</FormControl.Feedback>
                                        <FormControl.Feedback type="invalid">{errors?.user?.cpf}</FormControl.Feedback>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup className="mb-3" controlId="registerFormPhoneNumber" >
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl type="text"
                                            name="user.phoneNumber"
                                            value={values.user.phoneNumber}
                                            placeholder="Insert your phone number"
                                            className='border border-dark border-2'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={(touched?.user?.phoneNumber && errors?.user?.phoneNumber) as boolean}
                                            isValid={touched?.user?.phoneNumber && !errors?.user?.phoneNumber}
                                            aria-label="Phone Number"
                                            aria-required="true" />
                                        <FormControl.Feedback type="invalid">{errors?.user?.phoneNumber}</FormControl.Feedback>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <FormGroup className="mb-3" controlId="registerFormPassword">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl type="password"
                                        placeholder="Insert your password"
                                        className='border border-dark border-2'
                                        name='user.password'
                                        value={values.user.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={(touched?.user?.password && errors?.user?.password) as boolean}
                                        isValid={touched?.user?.password && !errors?.user?.password}
                                        autoComplete="on"
                                        aria-label="Password"
                                        aria-required="true"/>
                                    <FormControl.Feedback>password Looks good</FormControl.Feedback>
                                    <FormControl.Feedback type="invalid">{errors?.user?.password}</FormControl.Feedback>
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="registerFormConfirmPassword">
                                    <FormLabel>Confirm Your Password</FormLabel>
                                    <FormControl type="password" placeholder="Confirm your password"
                                        className='border border-dark border-2'
                                        name='confirmPassword'
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={(touched.confirmPassword && errors.confirmPassword) as boolean}
                                        isValid={touched.confirmPassword && !errors.confirmPassword}
                                        autoComplete="on"
                                        aria-label="Confirm Password"
                                        aria-required="true"
                                        />
                                    <FormControl.Feedback>passwords match</FormControl.Feedback>
                                    <FormControl.Feedback type="invalid">{errors.confirmPassword}</FormControl.Feedback>
                                </FormGroup>

                            </Row>

                            <Row>
                                <FormGroup className="mb-3">
                                    <FormCheck
                                        className='color-dark'
                                        type="checkbox"
                                        name='confirmTermsOfService'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        checked={values.confirmTermsOfService}
                                        label={(<p>I agree to the <a href="#termsAndService"
                                            onClick={() => setShowModal(true)}>terms and service</a> </p>)}
                                        feedback={errors?.confirmTermsOfService}
                                        feedbackType="invalid"
                                        isInvalid={(touched.confirmTermsOfService && errors.confirmTermsOfService) as boolean}
                                        autoComplete="on">
                                    </FormCheck>
                                </FormGroup>
                                <FormGroup className='mt-2'>
                                    <Button variant="success" className='btn-dark center w-100' type='submit' disabled={!isValid}>
                                        Register {capitalize(userType)}
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

export default UserRegister
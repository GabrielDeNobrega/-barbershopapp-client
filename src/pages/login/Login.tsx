import { AxiosResponse } from 'axios';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { Button, Card, Container, Form, FormLabel, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useAuth } from '../../contexts/AuthContext';
import { useLoading } from '../../contexts/LoadingContext';
import { AuthCredentials } from '../../models/AuthCredentials';
import { LoginModel } from '../../models/LoginModel';
import { Role, UserCredentials } from '../../models/UserCredentials';
import authService from '../../services/security/authService';
import inMilliseconds from '../../utils/Awaiter';
import { convertToToastError } from '../../utils/ToastError';
import Title, { HeaderTypes } from '../../components/commons/Title';
import { capitalize } from '../../utils/Capitalizer';

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
});

const getRedirectPath = (role: Role) => {
    const redirectPaths = {
        [Role.Customer]: "/customer",
        [Role.Employee]: "/employee",
        [Role.Admin]: "/admin",
    }
    return redirectPaths[role];
}

const Login = () => {
    const [user, setUser] = useAuth();
    const [loading, isLoading] = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = user || authService.getAuthenticatedUser();
        if (authUser) {
            toast.success(`redirecting to ${authUser.role.toLowerCase()}s page`)
            navigateToPageBasedOnUserType(authUser);
        }
    }, [])

    const onLoginHandler = async (login: LoginModel) => {
        isLoading(true);
        authService.authenticate(login)
            .then(async ({ data: authCredentials }: AxiosResponse<AuthCredentials>) => {
                await inMilliseconds(500);
                authService.setToken(authCredentials.token);
                authService.setAuthenticatedUser(authCredentials.user)
                setUser({ ...authCredentials.user });
                navigateToPageBasedOnUserType(authCredentials.user);
            }, async (axiosError) => {
                await inMilliseconds(500);
                convertToToastError(axiosError.response?.data)
            }
            ).finally(() => isLoading(false))
    }

    const navigateToPageBasedOnUserType = (user: UserCredentials | undefined) => {
        if (user?.role) navigate(getRedirectPath(user.role));
    }

    return (
        <Container className='center d-flex justify-content-center align-items-center ' style={{ height: '80vh' }}>
            <Card className='p-4 b-2 border border-2 border-dark' style={{ minHeight: '350px' }}>

                <Formik
                    validationSchema={loginSchema}
                    onSubmit={(e) => onLoginHandler(e)}
                    initialValues={{
                        email: '',
                        password: ''
                    }}>
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        isValid,
                        errors,
                        isSubmitting
                    }) => (

                        <Form noValidate className='d-flex flex-column align-content-end align-content-center' onSubmit={(e) => { handleSubmit(e) }} >
                            <Row className='text-center my-4'>
                                <Title headerType={HeaderTypes.h2}>BarberShop App</Title>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    name="email"
                                    value={values.email}
                                    placeholder="Insert your email"
                                    className='border border-dark border-2'
                                    onChange={handleChange}
                                    isInvalid={!(!errors.email)}
                                    autoComplete="on"
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    placeholder="Insert your password"
                                    className='border border-dark border-2'
                                    onChange={handleChange}
                                    isInvalid={!(!errors.password)}
                                    autoComplete="on"
                                />
                                <Form.Control.Feedback className="invalid-feedback" type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <FormLabel>
                                Don’t have an account? create one <Link to={'/register/customer'} >here</Link>
                            </FormLabel>
                            <Button variant="dark" type="submit" disabled={!isValid || isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>

            </Card>
        </Container>
    )
}

export default Login
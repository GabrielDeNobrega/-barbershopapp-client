import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Role } from '../../models/UserCredentials'
import authService from '../../services/security/authService'
import CustomLink from './CustomLink'
import ShowIfUserHasRole from './ShowIfUserHasRole'

const Header = () => {
    const [user, setUser] = useAuth()

    const onLogoutHandler = () => {
        authService.removeToken();
        authService.removeAuthenticatedUser();
        setUser(undefined);
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand><Link to="/customer" className="navbar-brand" >BarberShop</Link> </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Offcanvas
                        placement="start">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title >
                                BarberShop
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <ShowIfUserHasRole role={Role.Admin}>
                                    <CustomLink to={'/admin'}>Admin Area</CustomLink>
                                    <CustomLink to={'/admin/register/employee'}>Create Employee</CustomLink>
                                    <CustomLink to={'/admin/register/administrator'}>Create Admin</CustomLink>
                                </ShowIfUserHasRole>
                                <ShowIfUserHasRole role={Role.Customer}>
                                    <CustomLink to={'/customer'}>Customer Area</CustomLink>
                                    <CustomLink to={'/customer/appointment/history'}>My Appointments</CustomLink>
                                    <CustomLink to={'/customer/appointment/schedule '}>Schedule a Appointment</CustomLink>
                                </ShowIfUserHasRole>
                                <ShowIfUserHasRole role={Role.Employee}>
                                    <CustomLink to={'/employee'}>Employee Area</CustomLink>
                                    <CustomLink to={'/employee/reception/history'}>Reception History</CustomLink>
                                </ShowIfUserHasRole>
                                {!user && <CustomLink to={'/register/customer'}>Register</CustomLink>}
                                <CustomLink to={'/login'} onClick={onLogoutHandler} >{user && 'Logout' || 'Login'}</CustomLink>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}

export default Header

const TestLink: React.FC<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = (props) => {
    return (
        <a {...props}>CustomLink</a>
    )
}
import { Navbar, Container, Nav, Offcanvas, } from 'react-bootstrap'

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand>BarberShop</Navbar.Brand>
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
                            <Nav.Link >Login/Logout</Nav.Link>
                            <Nav.Link >Client Area</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Header
import { Navbar, Container, Nav } from 'react-bootstrap';
import HeaderUserInfo from './HeaderUserInfo'

const Header = () => {
    return (
        <Navbar variant="dark" bg="dark" sticky="top">
            <Container>
                <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav className="me-auto">
                    <Nav.Link href="/Link">About</Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <HeaderUserInfo/>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;
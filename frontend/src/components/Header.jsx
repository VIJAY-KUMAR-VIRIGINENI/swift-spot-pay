import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser, FaSwift } from "react-icons/fa";
import { Navbar, Nav, Card } from 'react-bootstrap';

function Header() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card bg="primary" text="white" style={{ width: '30rem', height: '30rem' }} className="text-center">
                <Card.Body>
                    <Card.Title style={{ fontSize: '2.5rem' }}>
                        <FaSwift /> <Link to='/' className="navbar-brand text-white">Swift Spot Pay</Link>
                    </Card.Title>
                    <Nav className="flex-column">
                        <Nav.Link>
                            <Link to='/login' className="nav-link text-white" style={{ fontSize: '2rem' }}><FaSignInAlt/> Login</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to='/register' className="nav-link text-white" style={{ fontSize: '2rem' }}><FaUser/> Register</Link>
                        </Nav.Link>
                    </Nav>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Header;
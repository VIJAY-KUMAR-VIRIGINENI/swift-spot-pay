import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { FaSignOutAlt, FaUser, FaHome, FaParking, FaMoneyBillWave } from 'react-icons/fa';
import '../styles/menubar.css';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useState } from 'react';

function MenuBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeLink, setActiveLink] = useState("/home");

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <>
      <Navbar bg="primary" variant="dark" className="my-navbar" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/home">Swift Spot Pay</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" onClick={() => setActiveLink("/home")} className={`nav-link-hover ${activeLink === "/home" ? "active-link" : ""}`}><FaHome /> Home</Nav.Link>
            <Nav.Link as={Link} to="/zones" onClick={() => setActiveLink("/zones")} className={`nav-link-hover ${activeLink === "/zones" ? "active-link" : ""}`}><FaParking /> Parking Zones</Nav.Link>
            <Nav.Link as={Link} to="/payment" onClick={() => setActiveLink("/payment")} className={`nav-link-hover ${activeLink === "/payment" ? "active-link" : ""}`}><FaMoneyBillWave /> Payments</Nav.Link>
          </Nav>
          <Nav>
            {user && (
              <Nav>
                <Nav.Item className="mr-3">
                  <Navbar.Text>
                    <FaUser /> {user.name}
                  </Navbar.Text>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="secondary" onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </Button>
                </Nav.Item>
              </Nav>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MenuBar;
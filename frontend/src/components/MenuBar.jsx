import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { FaSignOutAlt,FaUser } from 'react-icons/fa';

import {Link,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {logout,reset} from '../features/auth/authSlice';



function MenuBar() {
  const navigate=useNavigate();
  const dispatch=useDispatch(); 
  const {user}=useSelector((state)=>state.auth);

  const onLogout=()=>{
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  } 

 

  
  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">Swift Spot Pay</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/home">Parking Zones</Nav.Link>
          <Nav.Link as={Link} to="/payment">Payments</Nav.Link>
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
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { FaUser } from "react-icons/fa";
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register,reset } from "../features/auth/authSlice";
import "../App.css";
import {useNavigate} from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { user, isLoading,isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if(isSuccess||user){
      //redirect to login
      navigate('/Home');
      dispatch(reset)
    }
    
},[isError,isSuccess,user,message,dispatch,navigate])





  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const userData={
        name,
        email,
        password
        
      }
      dispatch(register(userData));
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card bg="primary" text="white" style={{ width: "30rem" }}>
        <Card.Body>
          <h1 className="text-center mb-4">
            <FaUser /> Register 
          </h1>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="mb-3"
                type="email"
                placeholder="Enter email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Enter password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Confirm password"
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Button variant="warning" type="submit" block>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;

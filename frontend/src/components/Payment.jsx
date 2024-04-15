import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { FaUser, FaCreditCard, FaCalendarAlt, FaLock } from 'react-icons/fa';
import MenuBar from './MenuBar'; // Import the MenuBar component

function Payment() {
  return (
    <>
      <MenuBar /> {/* Render the MenuBar component */}
      <Container style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
        <Form className="p-5" style={{ border: '2px solid #007bff', backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
          <Form.Group className="mb-3" controlId="formBasicCardName">
            <Form.Label><FaUser /> Card Holder's Name</Form.Label>
            <Form.Control type="text" placeholder="Card Holder's Name" className="shadow-none" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCardNumber">
            <Form.Label><FaCreditCard /> Card Number</Form.Label>
            <Form.Control type="text" placeholder="Card Number" className="shadow-none" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicExpiryDate">
            <Form.Label><FaCalendarAlt /> Expiry Date</Form.Label>
            <Form.Control type="text" placeholder="MM/YY" className="shadow-none" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCVV">
            <Form.Label><FaLock /> CVV</Form.Label>
            <Form.Control type="text" placeholder="CVV" className="shadow-none" />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default Payment;
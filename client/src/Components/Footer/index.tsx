import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './index.css';

const Footer = () => {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col md={6}>
              <h5>Contact Us</h5>
              <p>Email: contact@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </Col>
            <Col md={6}>
              <h5>Links</h5>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    );
}

export default Footer;
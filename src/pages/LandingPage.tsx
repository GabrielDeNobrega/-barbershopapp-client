
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import whoWeAreImage from '../resources/images/image-who-we-are.jpg'
import ourServices from '../resources/images/our-services.jpg'

type LandingPageProps = {}

const LandingPage = (props: LandingPageProps) => {
  return (
    <Container fluid>
      <Row className='p-5 bg-dark d-flex justify-content-center align-content-center' style={{height: 400}}>
        <p className='h1 text-light fw-light text-center' style={{width: 'fit-content'}}>Welcome To BarberShop</p>
      </Row>
      <Row className='p-5' style={{
        paddingTop: '40px'
      }}>
        <Col md={12} xxl={6} className='d-flex justify-content-center align-items-center'>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <p className='h2 fw-light'>
             Where <strong>style</strong> meets <strong>sophistication</strong>! Our premier barbershop offers a truly exceptional grooming experience that combines classic techniques with contemporary trends. Step into our world and indulge in the artistry of our skilled barbers, dedicated to delivering unparalleled service and remarkable results.
            </p>
            <Row className='d-flex justify-content-md-start w-100 py-5'>
              <Button className='btn-dark fit-content fs-5' style={{ width: 'fit-content' }}>
                <Link className='text-decoration-none' to={'/register/customer'} style={{
                  color: 'currentcolor'
                }}>
                  Create an account now!
                </Link>
              </Button>
            </Row>
          </div>
        </Col>
        <Col md={12} xxl={6} className='d-flex justify-content-center align-items-center'>
          <Image src={whoWeAreImage} fluid style={{ minWidth: '400px', maxWidth: '700px' }}>
          </Image>
        </Col>
      </Row>

      <Row className='p-5 bg-dark'>
        <Col md={12} xxl={6} className='text-light d-flex justify-content-center align-items-center order-1 order-xxl-0 py-4'>
          <Image src={ourServices} fluid style={{ minWidth: '400px', maxWidth: '700px' }}>
          </Image>
        </Col>
        <Col md={12} xxl={6} className='text-light d-flex justify-content-center align-items-center order-0 order-xxl-1'>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <p className='h2 fw-light'>
              <strong>Whether</strong> you're looking for a <strong>classic</strong> gentlemen's haircut, a <strong>trendy</strong> fade, a precise <strong>beard trim</strong>, or a <strong>relaxing hot towel</strong> shave, our talented barbers will work their magic to deliver the look you desire.
            </p>
          </div>
        </Col>
      </Row>

      <Row className='p-5'>
        <Col md={12} xxl={4} className='d-flex justify-content-center align-items-center py-4'>
          <p className='h2 fw-light text-center pb-2'>Where you can <strong>find us?</strong></p>
        </Col>
        <Col md={12} xxl={8} className='d-flex justify-content-center align-items-center'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.37795243724898!2d-46.68278246985969!3d-23.674268599903332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce501b823d2a2b%3A0xea7fdffa5f4cb490!2sRua%20Professor%20Guilherme%20Belfort%20Sabino%2C%20380%20-%20Campininha%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004678-001!5e0!3m2!1sen!2sbr!4v1685743870075!5m2!1sen!2sbr"
            style={{ minWidth: 400, width: '100%' }}
            height="450"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </Col>
      </Row>

      <Row>


      </Row>
    </Container>
  )
}

export default LandingPage

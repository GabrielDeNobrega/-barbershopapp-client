import React from 'react'
import { Button, Modal } from 'react-bootstrap';

type TermsAndServiceProps = {
    onHide: () => void;
    show: boolean;
}

const TermsAndService = ({ show, onHide }: TermsAndServiceProps) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Terms and Services
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>1. Appointment Booking:</h5 >
                <p>
                    <strong>1.1.</strong> To book an appointment, you must provide accurate and up-to-date information, including your name,
                    contact details, preferred date, and time. <br />
                    <strong>1.2.</strong> All appointments are subject to availability and confirmation from BarberShop.<br />
                    <strong>1.3.</strong> In case of any changes or cancellations, please notify BarberShop at least 24 hours in advance to avoid
                    any penalties.
                </p>

                <h5>2. Services Offered:</h5>
                <p>
                    <strong>2.1.</strong> BarberShop provides a range of grooming services for men, including haircuts, shaves, beard trims, and
                    styling.<br />
                    <strong>2.2.</strong> Our skilled barbers are trained to provide professional and high-quality services tailored to your
                    preferences.<br />
                    <strong>2.3.</strong> Additional services, such as hair coloring or facials, may be available upon request. Please inquire
                    with your barber for further information.
                </p>

                <h5>3. Payment:</h5>
                <p>
                    <strong>3.1.</strong> BarberShop accepts cash, credit/debit cards, and digital payment methods. Payment is due at the time of
                    service.<br />
                    <strong>3.2.</strong> Prices for services are clearly displayed in our shop and may vary depending on the complexity of the
                    requested service.<br />
                    <strong>3.3.</strong> All prices are subject to applicable taxes and fees.
                </p>

                <h5>4. Customer Satisfaction:</h5>
                <p>
                    <strong>4.1.</strong> BarberShop strives to ensure customer satisfaction. If you are dissatisfied with any aspect of our
                    service, please inform us immediately so we can address your concerns.<br />
                    <strong>4.2.</strong> We appreciate constructive feedback and will make every effort to resolve any issues promptly.
                </p>

                <h5>5. Hygiene and Safety:</h5>
                <p>
                    <strong>5.1.</strong> BarberShop maintains strict hygiene and safety standards to ensure a clean and comfortable environment
                    for our customers.<br />
                    <strong>5.2.</strong> All tools and equipment used during services are sanitized and sterilized according to industry
                    regulations.<br />
                    <strong>5.3.</strong> If you have any specific concerns regarding allergies or sensitivities, please inform your barber
                    beforehand.
                </p>

                <h5>6. Privacy and Data Protection:</h5>
                <p>
                    <strong>6.1.</strong> BarberShop respects your privacy and is committed to protecting your personal information. We handle
                    your data in accordance with applicable data protection laws.<br />
                    <strong>6.2.</strong> Your personal information provided during the appointment booking process will be used solely for the
                    purpose of providing our services and will not be shared with third parties without your consent.
                </p>

                <p>By booking an appointment with BarberShop, you agree to abide by the above Terms and Services. If you have any
                    questions or require further clarification, please do not hesitate to reach out to our team. Thank you for
                    choosing BarberShop, and we look forward to serving you!</p>

            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-dark' onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TermsAndService
import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';

type PageButtonProps = {
    navigateTo: string,
    iconName: string,
    card: {
        title: string,
        text: string
    },
    buttonText: string
}

const PageButton: React.FC<PageButtonProps> = ({ iconName, navigateTo, card: { text, title }, buttonText }: PageButtonProps) => {
    const navigation = useNavigate();
    return (
        <Col className="my-4" style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '18rem', display: 'flex', justifyContent: 'center', borderWidth: '3px' }} className="h-100">
                <div className='card-img-top center d-flex justify-content-center pt-4'>
                    <Icon size={128}>{iconName}</Icon>
                </div>
                <div className=''></div>
                <Card.Body style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "end"
                }}>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text> {text}</Card.Text>
                    <Button className='btn-dark' onClick={() => navigation(navigateTo)}>{buttonText}</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default PageButton
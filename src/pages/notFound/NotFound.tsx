import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import Icon from '../../components/commons/Icon';
import Title, { HeaderTypes } from '../../components/commons/Title';

interface NotFoundProps {
  message: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message }: NotFoundProps) => {
  return (
    <Container fluid="sm" >
      <Stack style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Icon size={72} color='dark'>insert_page_break</Icon>
        <Title headerType={HeaderTypes.h3} ><span>{message}</span></Title>
      </Stack>
    </Container>
  )
}

export default NotFound
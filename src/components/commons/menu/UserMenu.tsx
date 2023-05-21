import React from 'react';
import { Container, Row, Stack } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import PageButton from './PageButton';
import { MenuItems } from './MenuItems';

export const UserMenu: React.FC = () => {
    const [loggedUser] = useAuth();
    return (
        <Container>
            <Stack className='' style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Row>
                    {MenuItems.filter(x => x.allowedRoles.some(x => x === loggedUser?.role))
                        .map((btn, index) =>
                            <PageButton {...btn} key={index} />)}
                </Row>
            </Stack>
        </Container >
    )
}

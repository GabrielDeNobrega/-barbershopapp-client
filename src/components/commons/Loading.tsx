import React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useLoading } from '../../contexts/LoadingContext';

const Loading: React.FC = () => {
    const [loading, isLoading] = useLoading();
    return (
        <>
            {
                loading &&
                <Row style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex:1056
                }}>
                    <Spinner animation="border" style={{width:'4rem', height: '4rem', borderWidth: 6}} className="text-dark"/>
                </Row>
            }
        </>
    )
}

export default Loading
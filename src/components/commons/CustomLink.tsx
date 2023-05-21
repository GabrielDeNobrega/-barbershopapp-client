import React, { ReactNode } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, type NavLinkProps } from 'react-router-dom';


interface CustomProps {
    children: ReactNode;
    onClick?: () => void;
}
const CustomLink: React.FC<CustomProps & NavLinkProps & React.RefAttributes<HTMLAnchorElement>> = ({ to, children, onClick }) => {
    return (
        <div>
            <Nav.Link active={false} href={`#${to}`} as={NavLink} end to={to} onClick={onClick}>
                {children}
            </Nav.Link>
        </div>
    )
}

export default CustomLink




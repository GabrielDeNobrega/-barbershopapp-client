import React, { HTMLAttributes, ReactNode } from 'react'

interface IconProps {
    children: ReactNode,
    size: number,
    color?: string
}

const Icon: React.FC<IconProps> = ({ children, size, color = 'wafety-orange' }) => {
    return (
        <span className={`material-icons md-${size} color-${color}`}
            style={{ cursor: 'pointer' }}>
            {children}
        </span>
    )
}

export default Icon
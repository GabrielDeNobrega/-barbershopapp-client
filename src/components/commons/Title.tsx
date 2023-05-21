import React, { ReactNode } from 'react'

export enum HeaderTypes {
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    h5 = "h5",
    h6 = "h6",
}

interface TitleProps {
    headerType: HeaderTypes,
    children: ReactNode
}

const Title: React.FC<TitleProps> = ({ headerType, children }) => {
    return <p className={`${headerType}`}>{children}</p>
}

export default Title
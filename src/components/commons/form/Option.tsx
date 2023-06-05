import React, { ReactNode } from 'react'

type OptionProps = {
    value: any
    children: ReactNode
} & React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>

const Option: React.FC<OptionProps> = ({  value, children, ...rest }: OptionProps) => {
    return (
        <option value={value} {...rest}>{children}</option>
    )
}

export default Option
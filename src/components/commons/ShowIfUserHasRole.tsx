import React, { ReactNode } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Role, userIs } from '../../models/UserCredentials'

interface ShowIfUserHasRoleProps {
    role: Role,
    children: ReactNode
}

const ShowIfUserHasRole: React.FC<ShowIfUserHasRoleProps> = ({ role, children }: ShowIfUserHasRoleProps) => {
    const [user] = useAuth()
    return (
        <>
            {userIs(user, role) && children}
        </>
    )
}

export default ShowIfUserHasRole
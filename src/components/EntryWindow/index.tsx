import React from 'react'
import LoginPage from './LoginPage'
import EntryWindowContainer from './EntryWindowContainer'
import RegistrationPage from './RegistrationPage'
import store from '../../store/store'

const EntryWindow: React.FC = () => {
    return (
        <EntryWindowContainer>
            {store.loginOrRegistration ? <RegistrationPage /> : <LoginPage />}
        </EntryWindowContainer>
    )
}

export default EntryWindow

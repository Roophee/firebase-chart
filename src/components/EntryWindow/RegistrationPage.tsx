import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import AuthWithGoogle from './AuthWithGoogle'
import LoginTypesSeparator from './LoginTypeSeparator'
import EmailPasswordRegistrationForm from './EmailPasswordRegistrationForm'

const useStyles = makeStyles({
    link: {
        marginBottom: '30px',
        fontFamily: 'default',
        fontSize: '.7rem',
        marginRight: '5%',
        float: 'right',
    },
    header: {
        marginBottom: '30px',
        textAlign: 'center',
        fontFamily: 'default',
        '& span': {
            letterSpacing: 'normal',
        },
        '& h4': {
            margin: '10px 0',
            fontWeight: 600,
        },
    },
})

const RegistrationPage: React.FC = () => {
    const classes = useStyles()
    return (
        <>
            <div className={classes.header}>
                <Typography variant="h4">Harvest ID</Typography>
                <span>
                    Sing Up to a <strong>Harvest</strong> or{' '}
                    <strong>Forecast</strong> account
                </span>
            </div>
            <AuthWithGoogle login={false} />
            <LoginTypesSeparator />
            <EmailPasswordRegistrationForm />
        </>
    )
}

export default RegistrationPage

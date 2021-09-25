import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { observer } from 'mobx-react-lite'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import { Alert } from '@mui/material'
import store from '../../store/store'
import { updateUsersActivity } from '../../service/db/updateUsersActivity'

const useStyles = makeStyles({
    TicketForm: {
        margin: 'auto',
        width: '90%',
        fontSize: '1.5rem',
    },
    InputItem: {
        marginBottom: '30px',
    },
    InputElement: {
        width: '100%',
        fontFamily: 'default',
        '& input': {
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px',
        },
    },
    FormSubmit: {
        width: '100%',
        marginBottom: '10px',
        fontFamily: 'default',
        padding: '5px',
        textTransform: 'none',
        backgroundColor: '#09af3b',
        color: '#FAFAFA',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: '#089C35FF',
        },
    },
})

const EmailPasswordLoginForm: React.FC = observer(() => {
    const classes = useStyles()
    const [errorOnServer, setErrorOnServer] = useState<boolean | string>(false)
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .min(5)
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                const auth = store.getCurrentAuth()
                if (auth)
                    signInWithEmailAndPassword(
                        auth,
                        values.email,
                        values.password
                    )
                        .then(() => {
                            updateUsersActivity()
                        })
                        .catch((error) => {
                            setErrorOnServer(error.message)
                            setTimeout(() => {
                                return setErrorOnServer(false)
                            }, 10000)
                        })
                setTimeout(() => {
                    setSubmitting(false)
                }, 400)
            }}
        >
            {(formProps) => (
                <Form className={classes.TicketForm}>
                    {errorOnServer ? (
                        <Alert severity="warning">{errorOnServer}</Alert>
                    ) : null}
                    <Box className={classes.InputElement}>
                        <Field
                            placeholder="Work Email"
                            name="email"
                            type="email"
                            className={classes.InputElement}
                        />
                        {formProps.errors.email && formProps.touched.email ? (
                            <Alert severity="warning">
                                {formProps.errors.email}
                            </Alert>
                        ) : null}
                    </Box>
                    <Box className={classes.InputElement}>
                        <Field
                            placeholder="Password"
                            name="password"
                            type="password"
                            className={classes.InputElement}
                        />
                        {formProps.errors.password &&
                        formProps.touched.password ? (
                            <Alert severity="warning">
                                {formProps.errors.password}
                            </Alert>
                        ) : null}
                    </Box>
                    <Button type="submit" className={classes.FormSubmit}>
                        Sing In
                    </Button>
                </Form>
            )}
        </Formik>
    )
})

export default EmailPasswordLoginForm

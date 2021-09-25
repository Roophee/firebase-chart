import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { observer } from 'mobx-react-lite'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Alert } from '@mui/material'
import { makeStyles } from '@material-ui/styles'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, getDownloadURL } from 'firebase/storage'
import store from '../../store/store'
import { createUser } from '../../service/db/createUser'
import { uploadPhoto } from '../../service/db/uploadPhoto'

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

const EmailPasswordRegistrationForm: React.FC = observer(() => {
    const classes = useStyles()
    const [myFile, setMyFile] = useState<File | null>(null)
    const [errorOnServer, setErrorOnServer] = useState<boolean | string>(false)
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                passwordAgain: '',
                file: typeof File,
            }}
            validationSchema={Yup.object({
                name: Yup.string().min(2).max(20),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .min(5)
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                passwordAgain: Yup.string().when('password', {
                    is: (val: string) => val && val.length > 0,
                    then: Yup.string().oneOf(
                        [Yup.ref('password')],
                        'Both password need to be the same'
                    ),
                }),
            })}
            onSubmit={(values, { setSubmitting }) => {
                const auth = store.getCurrentAuth()
                if (auth)
                    createUserWithEmailAndPassword(
                        auth,
                        values.email,
                        values.password
                    )
                        .then(() => {
                            if (myFile) {
                                return uploadPhoto(myFile)
                            }
                            return undefined
                        })
                        .then((uploadRes) => {
                            const imageRef = uploadRes?.ref
                            const storage = store.getMyStorage
                            if (storage) {
                                const fullRef = ref(storage, imageRef?.fullPath)
                                return getDownloadURL(fullRef)
                            }
                            return ''
                        })
                        .then((url) => {
                            createUser({
                                nameFromForm: values.name,
                                photoURLFromForm: url ? url : '',
                                lastActivity: Date.now(),
                            })
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
                            placeholder="Name"
                            name="name"
                            type="text"
                            className={classes.InputElement}
                        />
                        {formProps.errors.name && formProps.touched.name ? (
                            <Alert severity="warning">
                                {formProps.errors.name}
                            </Alert>
                        ) : null}
                    </Box>
                    <Box>
                        <input
                            type="file"
                            name="file"
                            onChange={(event) => {
                                if (event.target.files?.length) {
                                    const photo = event.target.files[0]
                                    setMyFile(photo)
                                }
                            }}
                        />
                    </Box>
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
                    <Box className={classes.InputElement}>
                        <Field
                            placeholder="Confirm Password"
                            name="passwordAgain"
                            type="password"
                            className={classes.InputElement}
                        />
                        {formProps.errors.passwordAgain &&
                        formProps.touched.passwordAgain ? (
                            <Alert severity="warning">
                                {formProps.errors.passwordAgain}
                            </Alert>
                        ) : null}
                    </Box>

                    <Button type="submit" className={classes.FormSubmit}>
                        Sing Up
                    </Button>
                </Form>
            )}
        </Formik>
    )
})

export default EmailPasswordRegistrationForm

import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { observer } from 'mobx-react-lite'
import { createUser } from '../../service/db/createUser'
import store from '../../store/store'
import { updateUsersActivity } from '../../service/db/updateUsersActivity'

interface IAuthWithGoogle {
    login: boolean
}

const useStyles = makeStyles({
    root: {
        width: '90%',
        margin: 'auto',
    },
    singInButton: {
        position: 'relative',
        width: '100%',
        marginBottom: '30px',
        fontFamily: 'default',
        padding: '5px',
        textTransform: 'none',
        color: '#757575',
        '&:before': {
            position: 'absolute',
            zIndex: -1,
            top: '7px',
            left: '7px',
            width: '20px',
            height: '20px',
            content:
                'url("https://api.iconify.design/logos/google-icon.svg?width=20&height=20")',
        },
    },
})

const AuthWithGoogle: React.FC<IAuthWithGoogle> = observer((props) => {
    const { login } = props
    const auth = store.getCurrentAuth()

    const onClickHandler = () => {
        if (auth) {
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth, provider)
                .then(() => createUser())
                .then(() => updateUsersActivity())
        }
    }
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Button
                onClick={onClickHandler}
                variant="outlined"
                className={classes.singInButton}
            >
                Sign{login ? ' In ' : ' Up '} with Google
            </Button>
        </Box>
    )
})

export default AuthWithGoogle

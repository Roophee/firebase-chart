import React from 'react'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useAuthState } from 'react-firebase-hooks/auth'
import { makeStyles } from '@material-ui/styles'
import store from '../../store/store'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'

const useStyles = makeStyles({
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    myButton: {
        margin: '10px 0',
        backgroundColor: '#09B83E',
        '&:hover': {
            backgroundColor: '#099336',
        },
    },
})

const Header: React.FC = observer(() => {
    const { loginOrRegistration, auth } = store
    const classes = useStyles()
    const [user] = useAuthState(auth)
    const { name } = store.getUsersInfo
    const history = useHistory()
    const handleClick = () => {
        store.setLoginOrRegistration()
        history.push(loginOrRegistration ? LOGIN_ROUTE : REGISTRATION_ROUTE)
    }

    const singOutHandler = () => {
        if (auth) {
            auth.signOut().then(() => store.userLogOut())
        }
    }

    return (
        <header className={classes.header}>
            {!user && (
                <Button className={classes.myButton} onClick={handleClick}>
                    {loginOrRegistration ? 'Sing In' : 'Sing Up'}
                </Button>
            )}
            {user && (
                <Button className={classes.myButton} onClick={singOutHandler}>
                    Sing Out
                </Button>
            )}
            <Button>{name}</Button>
        </header>
    )
})

export default Header

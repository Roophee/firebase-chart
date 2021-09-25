import React, { ReactChild, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getStorage, FirebaseStorage } from 'firebase/storage'
import store from '../../store/store'
import { getUsersInfoFromDB } from '../../service/db/getUsersInfoFromDB'

const useStyles = makeStyles({
    box_root: {
        width: '100%',
        height: '100%',
    },
    containerXYZ: {
        width: '90%',
        margin: 'auto',
        height: '100%',
    },
})

const AppContainer: React.FC = observer(({ children }) => {
    const classes = useStyles()
    const [user, loading] = useAuthState(store.getCurrentAuth())

    useEffect(() => {
        store.setCurrentUser(user)
        store.setStorage(
            getStorage(store.getCurrentAuth()?.app) as FirebaseStorage
        )
        getUsersInfoFromDB().then((response) => store.setUsersInfo(response))
    }, [user?.uid, user])

    store.setLoading(loading)

    return (
        <Box className={classes.box_root}>
            <Box className={classes.containerXYZ}>{children as ReactChild}</Box>
        </Box>
    )
})
export default AppContainer

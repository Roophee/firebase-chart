import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { makeStyles } from '@material-ui/styles'
import { observer } from 'mobx-react-lite'
import { collection, onSnapshot, query } from 'firebase/firestore'
import store from '../../store/store'
import UserListItem from './userListItem'
import { IUser } from '../../types/types'

const useStyles = makeStyles({
    usersList: {
        width: '100%',
        height: '80%',
        padding: ' 0 5px',
        overflow: 'overlay',
    },
})

const UsersList: React.FC = observer(() => {
    const currentUser = store.getCurrentUser()
    const [loadAllUsers, setLoadAllUsers] = useState(false)
    const [localUsers, setLocalUsers] = useState<IUser[]>([])
    const classes = useStyles()
    const db = store.getDB

    useEffect(() => {
        if (db) {
            setLoadAllUsers(true)
            const q = query(collection(db, 'users'))
            onSnapshot(q, (querySnapshot) => {
                const appUsers: IUser[] = []
                querySnapshot.forEach((item) => {
                    if (currentUser && currentUser.uid !== item.data().id)
                        appUsers.push(item.data() as IUser)
                })
                setLocalUsers([
                    ...appUsers.sort(
                        (a, b) =>
                            Number(b.lastActivity) - Number(a.lastActivity)
                    ),
                ])
                setLoadAllUsers(false)
            })
        }
    }, [db, currentUser])

    if (loadAllUsers) return <>loading...</>

    return (
        <Box className={classes.usersList}>
            <Scrollbars className={classes.usersList}>
                {localUsers.map((user) => (
                    <UserListItem key={user.name} user={user} />
                ))}
            </Scrollbars>
        </Box>
    )
})

export default UsersList

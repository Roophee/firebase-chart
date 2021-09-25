import React from 'react'
import { observer } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import store from '../../store/store'
import { getDialogPath } from '../../service/db/getDialogPath'
import { IUser } from '../../types/types'

interface IUserListItemComponent {
    user: IUser
}

const useStyles = makeStyles(() => ({
    userListItem: {
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        height: '70px',
        marginBottom: '5px',
        paddingLeft: '5px',
        backgroundColor: '#263238',
        borderRadius: '10px',
        color: '#fff',
    },
    imageBox: {
        width: '50px',
        height: '50px',
        minWidth: '50px',
        borderRadius: '50%',
        overflow: 'hidden',
        marginRight: '20px',
        '& img': {
            width: '50px',
            height: '50px',
        },
    },
}))

const UserListItem: React.FC<IUserListItemComponent> = observer((props) => {
    const { name, photoUrl } = props.user
    const classes = useStyles()

    const onClickHandler = () => {
        const unsubscribe = store.getUnsubscribeDialog
        if (unsubscribe) unsubscribe()
        store.setCurrentOpponent(props.user)
        getDialogPath()
    }

    return (
        <Box className={classes.userListItem} onClick={onClickHandler}>
            <Box className={classes.imageBox}>
                <img
                    src={
                        photoUrl
                            ? photoUrl
                            : `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=${name
                                  .split(' ')
                                  .join('+')}`
                    }
                    alt="user_photo"
                />
            </Box>
            <Box>{name}</Box>
        </Box>
    )
})

export default UserListItem

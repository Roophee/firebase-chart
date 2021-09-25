import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import { observer } from 'mobx-react-lite'
import { IMessage } from '../../types/types'
import store from '../../store/store'
import { makeTimeString } from '../../service/time/timeStringMaker'

interface IMessageItem {
    message: IMessage
}

const useStyles = makeStyles(() => ({
    messageContainer: {
        display: 'flex',
        maxWidth: '80%',
    },
    messageItem: {
        display: 'flex',
        flexDirection: 'column',
        width: 'max-content',
        marginBottom: '5px',
        padding: '10px',
        // backgroundColor: '#263238',
        borderRadius: '10px',
        color: '#fff',
    },
    name: {
        fontWeight: 600,
    },
    message: {
        color: '#EEEEEE',
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

const MessageItem: React.FC<IMessageItem> = observer((props) => {
    const { message } = props
    const opponent = store.getCurrentOpponent
    const classes = useStyles()

    return (
        <Box
            className={classes.messageContainer}
            alignSelf={
                message.author === store.getUsersInfo.name
                    ? 'flex-end'
                    : message.author === 'root'
                    ? 'center'
                    : ''
            }
        >
            {message.author === opponent?.name && (
                <Box className={classes.imageBox}>
                    <img
                        src={
                            opponent?.photoUrl
                                ? opponent.photoUrl
                                : `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=${opponent?.name
                                      .split(' ')
                                      .join('+')}`
                        }
                        alt="user_photo"
                    />
                </Box>
            )}
            <Box
                bgcolor={
                    message.author === store.getUsersInfo.name
                        ? '#263238'
                        : '#37474F'
                }
                className={classes.messageItem}
            >
                <Box className={classes.name}>
                    {message.author === 'root' ? '' : message.author}
                </Box>
                <Box className={classes.message}>{message.message}</Box>
                <Box alignSelf="flex-end" color="#BDBDBD">
                    {makeTimeString(message.time)}
                </Box>
            </Box>
        </Box>
    )
})

export default MessageItem

import React from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import store from '../../store/store'
import { addMessage } from '../../service/db/addMessage'

const useStyles = makeStyles({
    messageForm: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
        '& textarea': {
            width: '100%',
            height: '100px',
            margin: '0 0 5px 0',
            padding: '5px',
            borderRadius: '10px',
            resize: 'none',
            fontFamily: 'default',
        },
        '& button': {
            width: '150px',
            height: '40px',
            alignSelf: 'flex-end',
            borderRadius: '10px',
            backgroundColor: '#09B83E',
            '&:hover': {
                backgroundColor: '#099336',
            },
        },
    },
    sendMessage: {
        // justifySelf:'flex-end'
    },
    messagesPanel: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
})

const MessageForm: React.FC = observer(() => {
    const classes = useStyles()
    const sendMessage = (inputString: string): void => {
        if (inputString) {
            const message = {
                author: toJS(store.getUsersInfo).name,
                message: inputString,
                time: Date.now(),
            }
            addMessage(message)
        }
    }
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const textarea = form.elements[0] as HTMLTextAreaElement
        if (textarea) {
            sendMessage(textarea.value.trim())
            textarea.value = ''
        }
    }

    const onEnterHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'Enter') {
            e.preventDefault()
            const textarea = e.target as HTMLTextAreaElement
            sendMessage(textarea.value.trim())
            textarea.value = ''
        }
    }
    return (
        <Box className={classes.sendMessage}>
            <form className={classes.messageForm} onSubmit={onSubmitHandler}>
                <textarea
                    onKeyDown={onEnterHandler}
                    disabled={!store.dialog.length}
                    name="text"
                    id="text"
                    maxLength={500}
                    placeholder=" Message..."
                />
                <button type="submit" disabled={!store.dialog.length}>
                    Send
                </button>
            </form>
        </Box>
    )
})

export default MessageForm

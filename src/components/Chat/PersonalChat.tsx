import React, { useEffect, useRef } from 'react'
import Box from '@material-ui/core/Box'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { makeStyles } from '@material-ui/styles'
import { observer } from 'mobx-react-lite'
import MessageItem from './MessageItem'
import store from '../../store/store'
import { getDialog } from '../../service/db/getDialog'
import MessageForm from './MessageForm'
import { IMessage } from '../../types/types'

const useStyles = makeStyles({
    personalChat: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '10px',
        // overflow: 'overlay',
    },
    messageForm: {
        display: 'flex',
        flexDirection: 'column',
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
        overflow: 'overlay',
        flexGrow: 1,
        paddingRight: '20px',
    },
})

const PersonalChat: React.FC = observer(() => {
    const dialog = store.getDialog
    const dialogPath = store.getDialogPath
    const classes = useStyles()
    const ref = useRef<Scrollbars>(null)
    const scrollDown = () => {
        if (ref.current) {
            ref.current.scrollToBottom()
        }
    }

    useEffect(() => {
        const db = store.getDB
        const path = store.getDialogPath
        if (db && path) {
            getDialog(db, path)
        }
    }, [dialogPath])

    useEffect(() => {
        if (ref.current) {
            scrollDown()
        }
    }, [dialog])

    return (
        /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions
         */

        <Box className={classes.personalChat}>
            <Scrollbars
                ref={ref}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
            >
                <div className={classes.messagesPanel}>
                    {dialog.length > 0 ? (
                        dialog.map((item) => (
                            <MessageItem
                                key={item.time}
                                message={item as IMessage}
                            />
                        ))
                    ) : (
                        <div style={{ alignSelf: 'center' }}>
                            Choose the dialog with someone
                        </div>
                    )}
                </div>
            </Scrollbars>
            <Box className={classes.sendMessage}>
                <MessageForm />
            </Box>
        </Box>
    )
})

export default PersonalChat

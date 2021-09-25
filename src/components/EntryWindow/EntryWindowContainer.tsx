import React, { ReactChildren } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    centeredBox: {
        width: '450px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        backgroundColor: '#fff',
        borderRadius: '5px',
        // marginRight: '-50%',
        padding: '10px 0',
        transform: 'translate(-50%, -50%)',
    },
})

const EntryWindowContainer: React.FC = ({ children }) => {
    const classes = useStyles()
    return (
        <Box className={classes.centeredBox}>{children as ReactChildren}</Box>
    )
}

export default EntryWindowContainer

import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    separatorContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '30px',
    },
    separatorline: {
        height: '1px',
        flexGrow: 1,
        borderTop: '1px solid #9E9E9E',
    },
    separatorText: {
        padding: '0 5px',
        color: '#757575',
        fontWeight: 600,
    },
})

const LoginTypesSeparator: React.FC = () => {
    const classes = useStyles()
    return (
        <div className={classes.separatorContainer}>
            <div className={classes.separatorline} />
            <div className={classes.separatorText}>
                <span>or</span>
            </div>
            <div className={classes.separatorline} />
        </div>
    )
}

export default LoginTypesSeparator

import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import UsersList from './UsersList'
import PersonalChat from './PersonalChat'

const useStyles = makeStyles({
    bbox: {
        height: '94%',
    },
    outerGrid: {
        height: '100%',
    },
    innerGrid: {
        height: '100%',
        overflow: 'layout',
    },
})

const Index: React.FC = () => {
    const classes = useStyles()
    return (
        <Box className={classes.bbox}>
            <Grid container className={classes.outerGrid}>
                <Grid className={classes.innerGrid} item xs={3}>
                    <UsersList />
                </Grid>
                <Grid item xs={9} className={classes.innerGrid}>
                    <PersonalChat />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Index

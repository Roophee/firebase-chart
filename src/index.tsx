import React from 'react'
import ReactDOM from 'react-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import store from './store/store'
import App from './components/App'

const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    width: '100%',
                    height: '100%',
                },
                body: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#455A64',
                },
                '#root': {
                    height: '100%',
                },
            },
        },
    },
})

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_AUTH_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
}

initializeApp(firebaseConfig)
store.setCurrentAuth(getAuth())
store.setDB(getFirestore())

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

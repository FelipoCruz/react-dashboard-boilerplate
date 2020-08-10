import React, { useState, useEffect } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import './styles.css'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import Dashboard from '../Dashboard'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import firebase from '../firebase'
import Settings from '../Common/Settings'

const theme = createMuiTheme()

export default function App() {

    const [fbInitialized, setFbInitialized] = useState(false)

    useEffect(() => {
        firebase.isInitialized().then(val => {
            setFbInitialized(val)
        })
    })

    return fbInitialized !== false ? (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <div className="App">
            <Switch>
                <Route path='/' exact component={LogIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/settings' component={Settings} />
            </Switch>
            </div>
        </Router>
      </MuiThemeProvider>
  ) : <div id="loader"><CircularProgress /></div>
}

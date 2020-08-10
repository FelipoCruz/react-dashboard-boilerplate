import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Chart from './Chart'
import Balance from './Balance'
import Orders from './Orders'
import Footer from '../Common/Footer'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import clsx from 'clsx'
import Navbar from '../Common/Navbar'
import firebase from '../firebase'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  greet: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    paddingTop: '2em',
  },
}));

function Dashboard() {
  const classes = useStyles();
  let history = useHistory();

  const [userName, setUserName] = useState('')
  const [currency, setCurrency] = useState('')
  useEffect(() => {
      firebase.getCurrentUsername().then(setUserName)
      firebase.getCurrency().then(setCurrency)
  }, [userName, currency])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if(!firebase.getAuthStatus()) {
    alert('Please Login First')
    history.push('/')
    return null
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Navbar title='Dashboard' />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <div className={classes.greet}>
        <Typography component="h1" variant="h5">
          Hello { userName }
        </Typography>
        </div>

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart currency={currency} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Balance currency={currency} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders currency={currency} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard
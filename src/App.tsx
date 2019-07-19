import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login, Logout, IsLoggedIn } from "./login";
import {Databases } from "./db/databases";
import {Streams } from "./Streams";
import { Stream } from "./stream";
import { List as StreamList } from "./stream/list";
import { Message } from "./stream/message/message";
import { AppendStream } from "./stream/append";
import Breadcrumbs from './Breadcrumbs';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Made with <span style={{color:"red"}}>❤</span> in Holland
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
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
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar} >
          <Breadcrumbs />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          </Typography>
          <Button color="inherit" component="a" href="https://streamsdb.io/chat/">
            chat
          </Button>
          <Button color="inherit" component="a" href="https://streamsdb.io/docs/">
            docs
          </Button>
          {IsLoggedIn() ?
            <Button color="inherit" className={classes.menuButton} component={RouterLink} to="/logout">
              logout
            </Button>:
            <Button color="inherit" className={classes.menuButton} component={RouterLink} to="/login">
              login
            </Button>
          }
        </Toolbar>
        
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
    <Switch>
      <Route exact path="/login" render={( {match}: any) => <Login />} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/" render={( {match}: any) => <Databases />} />
      <Route exact path="/:database/" render={( {match}: any) => (<Streams database={match.params.database} /> )} />
      <Route exact path="/:database/streams" render={( {match}: any) => (<Streams database={match.params.database} /> )} />
      <Route exact path="/:database/new" render={( {match}: any) => (<AppendStream database={match.params.database} stream="" /> )} />
      <Route exact path="/:database/streams/:stream/new" render={( {match}: any) => (<AppendStream database={match.params.database} stream={match.params.stream}/> )} />
      <Route exact path="/feedback/:database/streams/:stream/:from?" render={( {match}: any) => {
        return (<StreamList database={match.params.database} stream={match.params.stream} from={(!match.params.from || match.params.from === "last") ? -10 : match.params.from } limit={10} /> )}
      } />
      <Route exact path="/:database/streams/:stream/:from?" render={( {match}: any) => {
        return (<Stream database={match.params.database} stream={match.params.stream} from={(!match.params.from || match.params.from === "last") ? -10 : match.params.from } limit={10} /> )}
      } />
      <Route exact path="/:database/streams/:stream/:from/message/" render={( {match}: any) => {
        return (<Message database={match.params.database} stream={match.params.stream} from={(!match.params.from || match.params.from === "last") ? -1 : match.params.from }  /> )}
      } />
    </Switch>
        </Container>
        <MadeWithLove />
      </main>
    </div>
  );
}




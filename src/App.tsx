import React from "react";
import { BreadcrumbsRoute} from "react-router-breadcrumbs-hoc";

import { RouteConfig } from "react-router-config";
import { Route, Switch  } from "react-router-dom";
import { Loading } from './Loading';
import { Login, Logout, IsLoggedIn } from "./login";
import {Databases } from "./db/databases";
import {Streams } from "./Streams";
import { Stream } from "./stream";
import { List as StreamList } from "./stream/list";
import { Message } from "./stream/message/message";
import { AppendStream } from "./stream/append";
import breadcrumbCreator from './Breadcrumbs';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
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
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ContactSupport from '@material-ui/icons/ContactSupport';
import Chat from '@material-ui/icons/Chat';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingProvider from "./State";

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
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch'
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
  },
}));

const routes: (RouteConfig & BreadcrumbsRoute)[]  = [
{
    path: "/login",
    component: ({location}: any) => {
      const values = new URLSearchParams(location.search);
      const redirectUrl = values.get("redirectUrl");
      return <Login redirectUrl={redirectUrl} />
    },
    breadcrumb: "login"
  },
  {
    path: "/logout",
    component: () => <Logout returnUrl={undefined} />,
    breadcrumb: "logout"
  },
  {
    path: "/",
    component: Databases,
    breadcrumb: "databases"
  },
  {
    path: "/database/",
    component: ({match}: any) => (<Streams database={match.params.database} />),
    breadcrumb: "database"
  },
  {
    path: "/:database/new", 
    compontent: ({match}: any) => (<AppendStream database={match.params.database} stream="" />),
    breadcrumb: "new"
  },
  {
    path: "/:database",
    component: ({match}: any) => (<Streams database={match.params.database} />),
    breadcrumb: ({match}: any) => match.params.database
  },
  {
    path: "/:database/:stream/new",
    component: ( {match}: any) => (<AppendStream database={match.params.database} stream={match.params.stream}/>),
    breadcrumb: ({match}: any) => "new event"
  },
  {
    path: "/:database/:stream",
    component: ( {match}: any) => {
        return (<StreamList database={match.params.database} stream={match.params.stream} from={-10} limit={10} /> )} ,
    breadcrumb: ({match}: any) => match.params.stream
  },
  {
    path: "/:database/:stream/:from?",
    component: ( {match}: any) => {
        return (<StreamList database={match.params.database} stream={match.params.stream} from={match.params.from} limit={10} /> )} ,
    breadcrumb: ({match}: any) => match.params.from
  },
  {
    path: "/:database/:stream/:from/message/",
    component: ( {match}: any) => {
        return (<Message database={match.params.database} stream={match.params.stream} from={(!match.params.from || match.params.from === "last") ? -1 : match.params.from }  /> )},
    breadcrumb: () => "message"
  }
]

const Breadcrumbs = breadcrumbCreator(routes, ["/login", "/logout"]);

export default function Dashboard() {
  const classes = useStyles();

  return (
    <LoadingProvider>
    <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton component={RouterLink} to={"/"} edge="end">
            <svg viewBox="0 0 426 482" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M-1-1h428v484H-1z"/>
              <g>
                <g stroke="#fff" stroke-linejoin="undefined" stroke-linecap="undefined" stroke-width="35" fill="#000">
                  <path d="M207.694 6.224l210.138 121.799"/>
                  <path fill-opacity="null" stroke-opacity="null" d="M413.956 120.248v239.915M11.335 122.401l405.636 233.391M208.555 473.348l209.277-119.709M216.306 473.348L7.46 353.355M10.474 119.386v240.737M6.168 125.66L215.876 6.136M212.431 382.808l125.307-72.661M6.168 270.091l213.583 112.747M216.737 95.977L89.707 171.06M208.555 96.351L411.373 206.37"/>
                </g>
              </g>
            </svg>
           </IconButton>


          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          </Typography>
          <IconButton color="inherit" component="a" href="https://streamsdb.io/docs/">
            <ContactSupport />
          </IconButton>
          <IconButton color="inherit" component="a" href="https://streamsdb.io/chat/">
            <Chat />
          </IconButton>
          {IsLoggedIn() ?
            <IconButton color="inherit" component={RouterLink} to="/logout">
              <ExitToApp />
            </IconButton>:
            <Button color="inherit" component={RouterLink} to="/login">
              login
            </Button>
          }
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Breadcrumbs />
    <Switch>
      {routes.filter(i => i.component).map(r => <Route exact path={r.path} component={r.component} />)}
    </Switch>
        </Container>
        <MadeWithLove />
      </main>
    </div>
    </LoadingProvider>
  );
}




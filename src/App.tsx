import React from "react";
import LogoIcon from './LogoIcon';
import { BreadcrumbsRoute} from "react-router-breadcrumbs-hoc";
import { RouteConfig } from "react-router-config";
import { Route, Switch, Redirect } from "react-router-dom";
import { Loading } from './Loading';
import { Login, Logout, IsLoggedIn } from "./login";
import {Databases } from "./db/databases";
import {Streams } from "./Streams";
import { List as StreamList } from "./stream/list";
import { Message } from "./stream/message/message";
import { AppendStream } from "./stream/append";
import breadcrumbCreator from './Breadcrumbs';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ContactSupport from '@material-ui/icons/ContactSupport';
import Chat from '@material-ui/icons/Chat';
import ExitToApp from '@material-ui/icons/ExitToApp';
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
        return (<Redirect to={`/${match.params.database}/${match.params.stream}/last`} />)
    },
    breadcrumb: ({match}: any) => match.params.stream
  },
  {
    path: "/:database/:stream/last",
    component: ( {match}: any) => {
        return (<StreamList database={match.params.database} stream={match.params.stream} from={-1} limit={10} /> )} ,
    breadcrumb: ({match}: any) => "last"
  },
  {
    path: "/:database/:stream/:from",
    component: ( {match}: any) => {
        return (<StreamList database={match.params.database} stream={match.params.stream} from={match.params.from} limit={10} /> )} ,
    breadcrumb: ({match}: any) => match.params.from
  },
  {
    path: "/:database/:stream/last/message/",
    component: ( {match}: any) => {
        return (<Message database={match.params.database} stream={match.params.stream} from={-1}  /> )},
    breadcrumb: () => "message"
  },
  {
    path: "/:database/:stream/:from/message/",
    component: ( {match}: any) => {
        return (<Message database={match.params.database} stream={match.params.stream} from={match.params.from}  /> )},
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
            <LogoIcon />
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
        <Loading />
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Breadcrumbs />
    <Switch>
      {routes.filter(i => i.component).map(r => <Route key={r.path} exact path={r.path} component={r.component} />)}
    </Switch>
        </Container>
        <MadeWithLove />
      </main>
    </div>
    </LoadingProvider>
  );
}




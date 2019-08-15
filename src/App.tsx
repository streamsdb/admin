import React from "react";
import LogoIcon from './LogoIcon';
import { BreadcrumbsRoute} from "react-router-breadcrumbs-hoc";
import { RouteConfig } from "react-router-config";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login, Logout} from "./login";
import {Databases } from "./db/databases";
import {Streams } from "./Streams";
import { List as StreamList } from "./stream/list";
import { Message } from "./stream/message/message";
import { AppendStream } from "./stream/message/new";
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
import { useAuthContext } from "./login/state";

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
    exact: true,
    path: "/:database/new", 
    component: ({match}: any) => (<AppendStream database={decodeURIComponent(match.params.database)} stream="" />),
    breadcrumb: "new"
  },
  {
    exact: true,
    path: "/login",
    component: ({location}: any) => {
      const values = new URLSearchParams(location.search);
      const redirectUrl = values.get("redirectUrl");
      return <Login redirectUrl={redirectUrl} />
    },
    breadcrumb: "login"
  },
  {
    exact: true,
    path: "/logout",
    component: () => <Logout returnUrl={undefined} />,
    breadcrumb: "logout"
  },
  {
    exact: true,
    path: "/",
    component: Databases,
    breadcrumb: "databases"
  },
  {
    exact: true,
    path: "/:database/:stream/new",
    component: ( {match}: any) => (<AppendStream database={decodeURIComponent(match.params.database)} stream={decodeURIComponent(match.params.stream)}/>),
    breadcrumb: ({match}: any) => "new event"
  },
  {
    exact: true,
    path: "/:database",
    component: ({match}: any) => (<Streams database={decodeURIComponent(match.params.database)} />),
    breadcrumb: ({match}: any) => decodeURIComponent(match.params.database)
  },
  {
    exact: true,
    path: "/:database/:stream/last",
    component: ( {match}: any) => {
        return (<Redirect to={`/${encodeURIComponent(match.params.database)}/${encodeURIComponent(match.params.stream)}`} />)
    },
    breadcrumb: ({match}: any) => "last",
  },
  {
    exact: true,
    path: "/:database/:stream",
    component: ( {match}: any) => {
        return (<StreamList database={decodeURIComponent(match.params.database)} stream={decodeURIComponent(match.params.stream)} from={-1} limit={10} /> )} ,
    breadcrumb: ({match}: any) => decodeURIComponent(match.params.stream)
  },
  {
    exact: true,
    path: "/:database/:stream/:from",
    component: ( {match}: any) => {
        return (<StreamList database={decodeURIComponent(match.params.database)} stream={decodeURIComponent(match.params.stream)} from={match.params.from} limit={10} /> )} ,
    breadcrumb: ({match}: any) => decodeURIComponent(match.params.from)
  },
  {
    exact: true,
    path: "/:database/:stream/last/message/",
    component: ( {match}: any) => {
        return (<Message database={decodeURIComponent(match.params.database)} stream={decodeURIComponent(match.params.stream)} from={-1}  /> )},
    breadcrumb: () => "message"
  },
  {
    exact: true,
    path: "/:database/:stream/:from/message/",
    component: ( {match}: any) => {
        return (<Message database={decodeURIComponent(match.params.database)} stream={decodeURIComponent(match.params.stream)} from={match.params.from}  /> )},
    breadcrumb: () => "message"
  }
]

const Breadcrumbs = breadcrumbCreator(routes, ["/login", "/logout"]);

export default function Dashboard() {
  const classes = useStyles();
  const { isAuthenticated } = useAuthContext();

  return (
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
          {isAuthenticated ?
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
      {routes.filter(i => i.component).map(r => <Route exact={r.exact} path={r.path} component={r.component} />)}
    </Switch>
        </Container>
        <MadeWithLove />
      </main>
    </div>
  );
}

import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {Streams } from "./Streams";
import { Stream } from "./stream";
import { AppendStream } from "./stream/append";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Breadcrumbs from './Breadcrumbs';

function BasicExample() {
  return <>
      <Breadcrumbs />
    <div className="container">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/db/:database/streams" render={( {match}: any) => (<Streams database={match.params.database} /> )} />
      <Route exact path="/db/:database/streams/:stream/new" render={( {match}: any) => (<AppendStream database={match.params.database} stream={match.params.stream}/> )} />
      <Route exact path="/db/:database/streams/:stream/:from?" render={( {match}: any) => {
        return (<Stream database={match.params.database} stream={match.params.stream} from={match.params.from === "last" ? -10 : match.params.from } limit={10} open={2} /> )}
      } />
    </Switch>
    </div>
    </>
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

export default BasicExample;

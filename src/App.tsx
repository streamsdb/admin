import React from "react";
import { Route, Switch } from "react-router-dom";
import {Databases } from "./db/databases";
import {Streams } from "./Streams";
import { Stream } from "./stream";
import { Message } from "./stream/message";
import { AppendStream } from "./stream/append";
import Breadcrumbs from './Breadcrumbs';

function BasicExample() {
  return <>
      <Breadcrumbs />
    <div className="container">
    <Switch>
      <Route exact path="/" render={( {match}: any) => <Databases />} />
      <Route exact path="/:database/" render={( {match}: any) => (<Streams database={match.params.database} /> )} />
      <Route exact path="/:database/streams" render={( {match}: any) => (<Streams database={match.params.database} /> )} />
      <Route exact path="/:database/new" render={( {match}: any) => (<AppendStream database={match.params.database} stream="" /> )} />
      <Route exact path="/:database/streams/:stream/new" render={( {match}: any) => (<AppendStream database={match.params.database} stream={match.params.stream}/> )} />
      <Route exact path="/:database/streams/:stream/:from?" render={( {match}: any) => {
        return (<Stream database={match.params.database} stream={match.params.stream} from={(!match.params.from || match.params.from === "last") ? -10 : match.params.from } limit={10} open={2} /> )}
      } />
      <Route exact path="/:database/streams/:stream/:from/message/" render={( {match}: any) => {
        return (<Message database={match.params.database} stream={match.params.stream} from={(!match.params.from || match.params.from === "last") ? -1 : match.params.from }  /> )}
      } />

    </Switch>
    </div>
    </>
}

export default BasicExample;

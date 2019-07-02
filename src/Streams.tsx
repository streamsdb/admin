import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { Query, QueryResult } from 'react-apollo';
import { ListGroup, ListGroupItem, Alert, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { Spinner } from 'reactstrap';
import { StreamsQueryComponent } from './data/types'

type Props = {
  database: string;
}

const query = gql`
query StreamsQuery($database: String!){
  database(name: $database) {
    id,
    name,
    streams {
      total
      names
    }
  },
}`;

const NoStreams: FunctionComponent<Props> = ({ database }) => <Alert color="info">
  No streams in database, create a new stream by creating an new event for it.
</Alert>

export const Streams: FunctionComponent<Props> = ({ database }) => <aside>
  <h2>Streams</h2>
  <StreamsQueryComponent variables={{database}}>
    {({ data, error, loading }) => {
      if(loading) {
        return <div>
          <Spinner color="primary" />
        </div>;
      } 
      if(error) {
        return <div>
          <Alert color="primary">
            failed to query streams: {error}
          </Alert>
        </div>
      }
      
      var names: string[] = [];
      if(data && data.database && data.database.streams && data.database.streams.names) {
        names = data.database.streams.names
      }
      
      if(names.length === 0) {
        return <NoStreams database={database} />
      }

      return <ListGroup>
        {names.map((name) => (<ListGroupItem tag={Link} to={`/${database}/streams/${name}`}>{name}</ListGroupItem>))}
      </ListGroup>
    }}
  </StreamsQueryComponent>
  <Button tag={Link} to={`/${database}/new`}>New Event</Button>
</aside>

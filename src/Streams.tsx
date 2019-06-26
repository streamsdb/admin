import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { Query, QueryResult } from 'react-apollo';
import { StreamsQuery } from './types/StreamsQuery';
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { Spinner } from 'reactstrap';

type Props = {
  database: string;
}

const query = gql`
query StreamsQuery{
  database(name: "default") {
    id,
    name,
    streams {
      total
      names
    }
  },
}`;

export const Streams: FunctionComponent<Props> = ({ database}) => <aside>
  <h2>{ database }</h2>
  <Query query={query} variables={{}}>
    {({ data, error, loading }: QueryResult<StreamsQuery>) => {
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

      return <ListGroup>
        {names.map((name) => (<ListGroupItem tag={Link} to={`/db/${database}/streams/${name}`}>{name}</ListGroupItem>))}
      </ListGroup>
    }}
  </Query>
</aside>

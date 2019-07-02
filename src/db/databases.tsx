import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { Query, QueryResult } from 'react-apollo';
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { Spinner } from 'reactstrap';
import { DatabasesComponent } from '../data/types';

type Props = {
}

const query = gql`
query Databases{
  databases {
    names
  },
}`;

export const Databases: FunctionComponent<Props> = ({ }) => <aside>
  <h1>Databases</h1>
  <DatabasesComponent>
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
      if(data && data.databases && data.databases.names) {
        names = data.databases.names
      }

      return <ListGroup>
        {names.map((name) => (<ListGroupItem  key={name} tag={Link} to={`/${name}/streams`}>{name}</ListGroupItem>))}
      </ListGroup>
    }}
  </DatabasesComponent>
</aside>


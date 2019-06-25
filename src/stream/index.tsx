import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { Query, QueryResult } from 'react-apollo';
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { StreamQuery} from './types/StreamQuery';
import { Table } from 'reactstrap';

type Props = {
  database: string;
  stream: string;
}

const query = gql`
query StreamQuery{
   readStream(db: "default", name:"chat-123", from: 1, limit: 10) {
   	stream
    from
    hasNext
    head
    messages {
      position
      type
      timestamp
      value
    }
  }
}`;

export const Stream: FunctionComponent<Props> = ({database, stream}) =>
  <>
    <Query query={query} variables={{}}>
      {({ data, error, loading }: QueryResult<StreamQuery>) => {
        if(loading) {
          return <div>
            <Spinner color="primary" />
          </div>;
        } 
        if(error) {
          return <div>
            <Alert color="primary">
              failed to query stream {stream}: {error}
            </Alert>
          </div>
        }

        if(!data || !data.readStream || !data.readStream.messages) {
          return <Alert color="primary">
            not found
          </Alert>
        }

        var rows = data.readStream.messages.map((m) =>
            <tr>
            <th scope="row">{m.position}</th>
            <td>{m.type}</td>
            <td>{m.value}</td>
            <td>{m.timestamp}</td>
            </tr>
        );

        return <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
      }}
    </Query>
  </>

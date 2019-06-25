import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { Query, QueryResult } from 'react-apollo';
import { Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { Spinner, ButtonGroup, Button} from 'reactstrap';
import { StreamQuery} from './types/StreamQuery';
import { Table } from 'reactstrap';
import TimeAgo from 'react-timeago';
import prettyBytes from 'pretty-bytes';

type Props = {
  database: string;
  stream: string;
  from?: number;
  limit?: number;
}

const query = gql`
query StreamQuery($database: String!, $stream: String!, $from: Int = 1, $limit: Int = 10){
   readStream(db: $database, name:$stream, from: $from, limit: $limit) {
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

export const Stream: FunctionComponent<Props> = ({database, stream, from, limit}) =>
  <>
    <Query query={query} variables={{database, stream, from, limit}}>
      {({ data, error, loading }: QueryResult<StreamQuery>) => {
        if(loading) {
          return <div>
            <Spinner color="primary" />
          </div>;
        } 
        if(error) {
          return <div>
            <Alert color="primary">
              failed to query stream {stream}: {error.message}
            </Alert>
          </div>
        }

        if(!data || !data.readStream || !data.readStream.messages) {
          return <Alert color="primary">
            not found
          </Alert>
        }

        var head = data.readStream.head;
        var rows = data.readStream.messages.reverse().map((m) =>
            <tr>
            <th scope="row">{m.position}</th>
            <td>{m.value}</td>
            <td>{m.type}</td>
            <td>{prettyBytes(m.value.length)}</td>
            <td><TimeAgo date={m.timestamp} /></td>
            </tr>
        );

        return <div>
          <ButtonGroup>
            <Button tag={Link} to={`/db/${database}/streams/${stream}/0`}>first</Button>
            <Button tag={Link} to={`/db/${database}/streams/${stream}/${head}`}>last</Button>
          </ButtonGroup>
          <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>type</th>
            <th>size</th>
            <th>timestamp</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
          </div>
      }}
    </Query>
  </>

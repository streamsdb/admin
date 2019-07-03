import React, { FunctionComponent } from 'react';
import { Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { Button, Spinner, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Container, Row, Col, Table } from 'reactstrap';
import TimeAgo from 'react-timeago';
import prettyBytes from 'pretty-bytes';
import { Query, QueryResult } from 'react-apollo';
import gql from "graphql-tag";
import { ReadStreamComponent } from '../data/types';
import { FaFile } from 'react-icons/fa';

const query = gql`
query ReadStream($database: String!, $stream: String!, $from: Int!, $limit: Int!)
{
  readStream(db:$database, name:$stream, from:$from, limit: $limit) {
    stream
    from
    next
    hasNext
    head
    messages {
      position
      timestamp
      type
      value
    }
  }
}
`;

type Props = {
  database: string;
  stream: string;
  from?: number;
  limit: number;
  open?: number;
}

export const Stream: FunctionComponent<Props> = ({database, stream, from, limit, open}) => {
  if (!from) {
    from = 1
  }

  return <>
    <ReadStreamComponent variables={{database, stream, from, limit}}>
      {({ data, error, loading }) => {
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

        var { head, from, next, messages } = data.readStream;
        var last = head-limit+1;
        var rows = messages.sort((a,b) => a.position > b.position ? -1: 1).map((m) => {
          return (<tr>
            <th scope="row">{m.position}</th>
            <td><Link to={`/${database}/streams/${stream}/message/${m.position}`}>{stream}/{m.position}</Link></td>
            <td>{m.type}</td>
            <td>{prettyBytes(m.value.length)}</td>
            <td><TimeAgo date={m.timestamp} /></td>
          </tr>)
        });

        return <Container>
          <Row>
            <Col>
              <Pagination>
              <PaginationItem disabled={from >= last}>
                  <PaginationLink first tag={Link} to={`/${database}/streams/${stream}/${last}`} />
                </PaginationItem>

               <PaginationItem disabled={from >= last}>
                  <PaginationLink previous tag={Link} to={`/${database}/streams/${stream}/${Math.min(next, last)}`}/>
                </PaginationItem>
                         <PaginationItem disabled={from <= 0}>
                  <PaginationLink next tag={Link} to={`/${database}/streams/${stream}/${Math.max(from-limit, 0)}`} />
                </PaginationItem>
 
                <PaginationItem disabled={from <= 0}>
                  <PaginationLink last tag={Link} to={`/${database}/streams/${stream}/0`} />
                </PaginationItem>
 
              </Pagination>
            </Col>
            <Col><Button tag={Link} to={`/${database}/streams/${stream}/new`} className="float-right">New event</Button></Col>
          </Row>
          <Row>
            <Col>
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
            </Col>
          </Row>
        </Container>
      }}
    </ReadStreamComponent>
  </>
}

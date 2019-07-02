import React, { FunctionComponent } from 'react';
import { Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { Button, Spinner, Pagination, PaginationItem, PaginationLink, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import TimeAgo from 'react-timeago';
import prettyBytes from 'pretty-bytes';
import { Query, QueryResult } from 'react-apollo';
import gql from "graphql-tag";
import { ReadMessageComponent } from '../data/types';
import brace from 'brace';
import AceEditor from 'react-ace';

const query = gql`
query ReadMessage($database: String!, $stream: String!, $from: Int!)
{
  readStream(db:$database, name:$stream, from:$from, limit: 1) {
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
}

export const Message: FunctionComponent<Props> = ({database, stream, from}) => {
  if (!from) {
    from = 1
  }

  return <ReadMessageComponent variables={{database, stream, from}}>
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
        var message = messages[0];
        var last = head;

        return <Form readOnly={true}>
        <FormGroup>
          <Label for="streamname">stream name</Label>
          <Input placeholder="order-123" value={stream} />
        </FormGroup>
        <FormGroup>
          <Label for="eventtype">event type</Label>
          <Input placeholder="order.created" value={message.type} />
        </FormGroup>
        <FormGroup>
          <Label for="value">event value</Label>
          <AceEditor
            readOnly={true}
            className="form-control"
            mode="json"
            theme="tomorrow"
            value={message.value}
            name="value"
            editorProps={{$blockScrolling: true}}
            width="100%"
          />   
        </FormGroup>
      </Form>
    }}
    </ReadMessageComponent>
}

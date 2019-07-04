import React, { FunctionComponent } from 'react';
import { Alert } from 'reactstrap';
import { Spinner, Form, FormGroup, Label, Input } from 'reactstrap';
import gql from "graphql-tag";
import { ReadMessageComponent } from '../data/types';
import brace from 'brace';
import AceEditor from 'react-ace';

const query = gql`
query ReadMessage($database: String!, $stream: String!, $from: Int!)
{
  readStream(db:$database, name:$stream, from:$from, limit: 1) {
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

        var { messages } = data.readStream;
        var message = messages[0];

        var value;
        try {
          value = JSON.stringify(JSON.parse(message.value), null, 4);
        } catch (e) {
          value = message.value;
        }

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
            value={value}
            name="value"
            editorProps={{$blockScrolling: true}}
            width="100%"
        fontSize={16}
          />   
        </FormGroup>
      </Form>
    }}
    </ReadMessageComponent>
}

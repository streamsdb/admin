import React, { useState , FunctionComponent } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/tomorrow'

type Props = {
  database: string;
  stream: string;
}

const mutation = gql`
  mutation AppendStream($db: String!, $stream: String!, $eventtype: String!, $payload: Bytes!) {
    appendStream(db: $db, stream: $stream, messages: [{
      type: $eventtype,
      value: $payload,
    }]) {
      from
    }
  }
`;

export const AppendStream: FunctionComponent<Props> = ({database, stream}) => {
  const [streamName, setStreamName] = useState(stream);
  const [eventtype, setEventtype] = useState("");
  const [value, setValue] = useState("{ }");
  const [meta, setMeta] = useState("{ }");

  return <Mutation mutation={mutation}>
    {(mutate: any) => (
      <Form onSubmit={e => {
        e.preventDefault();
        mutate({variables : {db: database, stream: streamName, eventtype: eventtype, payload: value}})
      }}>
        <FormGroup>
          <Label for="streamname">stream name</Label>
          <Input placeholder="" value={streamName} onChange={e => setStreamName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="eventtype">event type</Label>
          <Input placeholder="eventtype" value={eventtype} onChange={e => setEventtype(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="value">value</Label>
          <AceEditor
            className="form-control"
            mode="json"
            theme="tomorrow"
            onChange={newValue => setValue(newValue)}
            value={value}
            name="value"
            editorProps={{$blockScrolling: true}}
    width="100%"
          />   
        </FormGroup>
        <FormGroup>
          <Label for="meta">metadata</Label>
          <AceEditor
            className="form-control"
            mode="json"
            theme="tomorrow"
            onChange={newValue => setMeta(newValue)}
            value={meta}
            name="value"
            editorProps={{$blockScrolling: true}}
      height="200px"
    width="100%"
          />   
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    )}
    </Mutation>
}

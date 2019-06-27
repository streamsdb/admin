import React, { useState , FunctionComponent } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/tomorrow'

type Props = {
  database: string;
  stream: string;
}

export const AppendStream: FunctionComponent<Props> = ({database, stream}) => {
  const [streamName, setStreamName] = useState(stream);
  const [value, setValue] = useState("{ }");
  const [meta, setMeta] = useState("{ }");

  return <Form>
    <FormGroup>
      <Label for="streamname">stream name</Label>
      <Input placeholder="" value={streamName} onChange={e => setStreamName(e.target.value)} />
    </FormGroup>
    <FormGroup>
      <Label for="eventtype">event type</Label>
      <Input placeholder="eventtype" />
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
width="100%"
      />   
    </FormGroup>
  </Form>
}

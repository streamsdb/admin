import React, { useState , FunctionComponent } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect  } from 'react-router';
import gql from "graphql-tag";
import brace from 'brace';
import AceEditor from 'react-ace';
import { SpinnerButton} from '../ActionButton';
import { AppendSingleComponent } from '../data/types'

import 'brace/mode/json';
import 'brace/theme/tomorrow'

type Props = {
  database: string;
  stream: string;
}

const mutation = gql`
  mutation AppendSingle($db: String!, $stream: String!, $eventtype: String!, $payload: Bytes!) {
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
  const [value, setValue] = useState("");

  return <AppendSingleComponent>
    {(mutate, { loading, error, data }) => {
      if(data && data.appendStream && data.appendStream.from) {
        return <Redirect to={`/${database}/streams/${streamName}/last`} />
      }

      return (
      <Form onSubmit={e => {
        e.preventDefault();
        mutate({variables : {db: database, stream: streamName, eventtype: eventtype, payload: value}})
      }}>
        <FormGroup>
          <Label for="streamname">stream name</Label>
          <Input placeholder="order-123" value={streamName} onChange={e => setStreamName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="eventtype">event type</Label>
          <Input placeholder="order.created" value={eventtype} onChange={e => setEventtype(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="value">event value</Label>
          <AceEditor
            className="form-control"
            mode="json"
            theme="tomorrow"
            onChange={newValue => setValue(newValue)}
            value={value}
            name="value"
            placeholder={JSON.stringify({
    orderId: "order-123",
    userId: "user-123",
    products: [
        "product-123",
    ],
    shipmentType: "priority",
    amount: 42
}, null, 2)}
            editorProps={{$blockScrolling: true}}
            width="100%"
          />   
        </FormGroup>
        <SpinnerButton spinning={loading}>Submit</SpinnerButton>
      </Form>
    )}}
    </AppendSingleComponent>
}

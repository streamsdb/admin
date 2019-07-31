import React, { useState , FunctionComponent } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect  } from 'react-router';
import gql from "graphql-tag";
import AceEditor from 'react-ace';
import { SpinnerButton} from '../ActionButton';
import { AppendSingleComponent } from '../data/types'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import 'brace';
import 'brace/mode/json';
import 'brace/theme/tomorrow'

type Props = {
  database: string;
  stream: string;
}

gql`
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
        return <Redirect to={`/${database}/${streamName}/last`} />
      }

      return (
          <Card>
          <CardHeader title="New message" />
          <CardContent>
      <Form onSubmit={e => {
        e.preventDefault();
        mutate({variables : {db: database, stream: streamName, eventtype: eventtype, payload: value}})
      }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
          <TextField label="stream name" placeholder="order-123" value={streamName} onChange={e => setStreamName(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
          <TextField label="message type" placeholder="order.created" value={eventtype} onChange={e => setEventtype(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
        <FormGroup>
          <InputLabel htmlFor="value">event value</InputLabel>
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
              </Grid>
              <Grid item xs={12}>
        <SpinnerButton spinning={loading}>Submit</SpinnerButton>
        </Grid>
        </Grid>
      </Form>
        </CardContent>
        </Card>
    )}}
    </AppendSingleComponent>
}

import React, { useState , FunctionComponent } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect  } from 'react-router';
import gql from "graphql-tag";
import AceEditor from 'react-ace';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MessageComponent, {StreamMessage} from './components/message';
import { SpinnerButton} from '../../ActionButton';
import { AppendSingleComponent } from '../../data/types'

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
  const [message, setMessage] = useState<StreamMessage>({stream, type: "", value: "", header: ""});

  return <AppendSingleComponent>
    {(mutate, { loading, error, data }) => {
      if(data && data.appendStream && data.appendStream.from) {
        return <Redirect to={`/${database}/${message.stream}/last}`} />
      }

      return (
        <Card>
          <CardHeader title="New message" />
          <CardContent>
            <Form onSubmit={e => {
              e.preventDefault();
              mutate({variables : {db: database, stream: message.stream, eventtype: message.type, payload: message.value}})
            }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <MessageComponent loading={false} readOnly={false} message={message} onChange={(message) => setMessage(message)} />
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

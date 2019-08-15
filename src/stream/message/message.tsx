import React, { FunctionComponent } from 'react';
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from "react-router-dom";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { Alert } from 'reactstrap';
import gql from "graphql-tag";
import { ReadMessageForwardComponent } from '../../data/types';
import 'brace';
import AceEditor from 'react-ace';
import TextField, {TextFieldProps } from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import DeleteButton from './components/delete';
import MessageComponent  from './components/message';

gql`
query ReadMessageForward($database: String!, $stream: String!, $from: Int!)
{
  readStreamForward(db:$database, name:$stream, from:$from, limit: 1) {
    head
    next
    hasNext
    messages {
      position
      timestamp
      type
      value
    }
  }
}
`;

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      paddingLeft: '5px',
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  }),
);

function RedditTextField(props: TextFieldProps) {
  const classes = useStylesReddit();

  return (
    <TextField
      InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  );
}

type Props = {
  database: string;
  stream: string;
  from?: number;
}

type PagingProps = {database: string, stream:string, from: number, limit: number, last: number}

const Paging: FunctionComponent<PagingProps> = ({database, stream, from, limit, last}) => {
  return <div>
    <Tooltip title="Newest">
      <IconButton component={RouterLink} to={`/${database}/${stream}/last/message`} aria-label="Newest">
        <FirstPageIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Newer">
    <IconButton component={RouterLink} to={`/${database}/${stream}/${Math.min(from+limit, last)}/message`} aria-label="Previous Page">
      <KeyboardArrowLeft />
    </IconButton>
    </Tooltip>
    <Tooltip title="Older">
    <IconButton component={RouterLink} to={`/${database}/${stream}/${Math.max(from-limit, 1)}/message`} aria-label="Previous Page">
      <KeyboardArrowRight />
    </IconButton>
    </Tooltip>
    <Tooltip title="Oldest">
    <IconButton component={RouterLink} to={`/${database}/${stream}/1/message`} aria-label="Previous Page">
      <LastPageIcon />
    </IconButton>
    </Tooltip>
  </div>
}

export const Message: FunctionComponent<Props> = ({database, stream, from}) => {
  const classes = useStylesReddit();

  if (!from) {
    from = 1
  }

  return <ReadMessageForwardComponent variables={{database, stream, from}}>
      {({ data, error, loading }) => {
        if(loading) {
          return <CircularProgress />;
        } 
        if(error) {
          return <div>
            <Alert color="primary">
              failed to query stream {stream}: {error.message}
           </Alert>
          </div>
        }

        if(!data || !data.readStreamForward || !data.readStreamForward || !data.readStreamForward.messages) {
          return <Alert color="primary">
            not found
          </Alert>
        }

        var { head, messages} = data.readStreamForward;
        var message = messages[0];
        from = message.position;

        var value;
        try {
          value = JSON.stringify(JSON.parse(message.value), null, 4);
        } catch (e) {
          value = message.value;
        }

        return (<Container>
          <Toolbar variant="dense" disableGutters={true}>
            <Paging database={database} stream={stream} from={from} last={head} limit={1} />
            <div style={{flex: 1}}></div>
            <DeleteButton database={database} stream={stream} position={from} />
          </Toolbar>
          <Card>
          <CardHeader title="Message details"
            subheader={`${stream} at ${message.position}`}
          />
          <CardContent>
          <form>
            <MessageComponent message={{stream: stream, type:message.type, value: message.value}} readOnly={true} />
          </form></CardContent></Card></Container>)
    }}
    </ReadMessageForwardComponent>
}

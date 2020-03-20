import React, { FunctionComponent } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from "react-router-dom";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Alert } from 'reactstrap';
import gql from "graphql-tag";
import { ReadMessageForwardComponent } from '../../data/types';
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
      header
    }
  }
}
`;

type Props = {
  database: string;
  stream: string;
  from?: number;
}

type PagingProps = {database: string, stream:string, from: number, limit: number, last: number}

const Paging: FunctionComponent<PagingProps> = ({database, stream, from, limit, last}) => {
  return <div>
    <Tooltip title="Newest">
      <IconButton component={RouterLink} to={`/${encodeURIComponent(database)}/${encodeURIComponent(stream)}/last/message`} aria-label="Newest">
        <FirstPageIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Newer">
    <IconButton component={RouterLink} to={`/${encodeURIComponent(database)}/${encodeURIComponent(stream)}/${Math.min(from+limit, last)}/message`} aria-label="Previous Page">
      <KeyboardArrowLeft />
    </IconButton>
    </Tooltip>
    <Tooltip title="Older">
    <IconButton component={RouterLink} to={`/${encodeURIComponent(database)}/${encodeURIComponent(stream)}/${Math.max(from-limit, 1)}/message`} aria-label="Previous Page">
      <KeyboardArrowRight />
    </IconButton>
    </Tooltip>
    <Tooltip title="Oldest">
    <IconButton component={RouterLink} to={`/${encodeURIComponent(database)}/${encodeURIComponent(stream)}/1/message`} aria-label="Previous Page">
      <LastPageIcon />
    </IconButton>
    </Tooltip>
  </div>
}

export const Message: FunctionComponent<Props> = ({database, stream, from}) => {
  if (!from) {
    from = 1
  }

  return <ReadMessageForwardComponent variables={{database, stream, from}}>
      {({ data, error, loading }) => {
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
            <MessageComponent loading={loading} message={{stream: stream, type:message.type, header: message.header, value: message.value}} readOnly={true} />
          </form></CardContent></Card></Container>)
    }}
    </ReadMessageForwardComponent>
}

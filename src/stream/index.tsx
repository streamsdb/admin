import React, { useState, FunctionComponent } from 'react';
import { Link } from "react-router-dom";
import TimeAgo from 'react-timeago';
import prettyBytes from 'pretty-bytes';
import gql from "graphql-tag";
import { ReadStreamComponent } from '../data/types';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

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

function LinkForEventMessage(props:any) {
  var {database, message, stream } = props;

  if(message.type !== "sdb.pointer") {
    return (<Link to={`/${database}/streams/${stream}/${message.position}/message`}>{stream}/{message.position}</Link>)
  }

  var pointer = JSON.parse(message.value);
  return (<Link to={`/${database}/streams/${pointer.s}/${pointer.p}/message`}>{pointer.s}/{pointer.p}</Link>)
}


export const Stream: FunctionComponent<Props> = ({database, stream, from, limit, open}) => {
  const [hoverIndex, setHoverIndex] = useState(1);
  if (!from) {
    from = 1
  }

  return <>
    <ReadStreamComponent variables={{database, stream, from, limit}}>
      {({ data, error, loading }) => {
        if(loading){
          return <CircularProgress />
        }

        if(error) {
          return <Paper>
            <Typography variant="h5" component="h3">
              Error
            </Typography>
            <Typography component="p">
              {error}
            </Typography>
          </Paper>
        }

        if(!data || !data.readStream || !data.readStream.messages) {
          return <p>no data found</p>
        }

        var { head, from, next, hasNext, messages } = data.readStream;
        var last = head-limit;
        var rows = messages.sort((a,b) => a.position > b.position ? -1: 1).map((m) => {
          return (<TableRow key={m.position}>
            <TableCell component="th" scope="row">{m.position}</TableCell>
            <TableCell>
              <LinkForEventMessage database={database} message={m} stream={stream} />
            </TableCell>
            <TableCell>{m.type}</TableCell>
            <TableCell>{prettyBytes(m.value.length)}</TableCell>
            <TableCell><TimeAgo date={m.timestamp} /></TableCell>
          </TableRow>)
        });

        return <Grid container>
          <Grid item xs={12}>
            <ButtonGroup>
              <Button component={Link} to={`/${database}/streams/${stream}/last`}>last</Button>
              <Button component={Link} disabled={!hasNext} to={`/${database}/streams/${stream}/${Math.min(next, last)}`}>{"<"}</Button>
              <Button component={Link} disabled={from===1} to={`/${database}/streams/${stream}/${Math.max(from-limit, 0)}`}>{">"}</Button>
              <Button component={Link} disabled={from===1} to={`/${database}/streams/${stream}/1`}>{"first"}</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
          <Table>
                    <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>type</TableCell>
                    <TableCell>size</TableCell>
                    <TableCell>timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows}
                </TableBody>
              </Table>
          </Grid>
          </Grid>
      }}
    </ReadStreamComponent>
  </>
}

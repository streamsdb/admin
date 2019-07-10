import React, { useState, FunctionComponent } from 'react';
import { Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link'
import TimeAgo from 'react-timeago';
import prettyBytes from 'pretty-bytes';
import gql from "graphql-tag";
import { ReadStreamComponent } from '../data/types';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
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
import Toolbar from '@material-ui/core/Toolbar';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Tooltip from '@material-ui/core/Tooltip';

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
  from: number;
  limit: number;
}

function LinkForEventMessage(props:any) {
  var {database, message, stream } = props;

  if(message.type !== "sdb.pointer") {
    return (<Link component={RouterLink} to={`/${database}/streams/${stream}/${message.position}/message`}>{stream}/{message.position}</Link>)
  }

  var pointer = JSON.parse(message.value);
  return (<Link component={RouterLink} to={`/${database}/streams/${pointer.s}/${pointer.p}/message`}>{pointer.s}/{pointer.p}</Link>)
}

export const Stream: FunctionComponent<Props> = ({database, stream, from, limit}) => {

  return <ReadStreamComponent variables={{database, stream, from, limit}}>

      {({ data, error, loading }) => {
        let rows: any[] = [];
        let head = 0;
        let next = from+1;
        let hasNext = false;
        let last = 1;

        if (data && data.readStream && data.readStream.messages) {
          head = data.readStream.head!;
          from = data.readStream.from!;
          next = data.readStream.next!;
          hasNext = data.readStream.hasNext!;
          last = head-limit;

          last = head-limit;
          rows = data.readStream.messages.sort((a,b) => a.position > b.position ? -1: 1).map((m) => (
            <TableRow key={m.position}>
              <TableCell component="th" scope="row">{m.position}</TableCell>
              <TableCell>
                <LinkForEventMessage database={database} message={m} stream={stream} />
              </TableCell>
              <TableCell>{m.type}</TableCell>
              <TableCell>{prettyBytes(m.value.length)}</TableCell>
              <TableCell><TimeAgo date={m.timestamp} /></TableCell>
            </TableRow>)); 
        }

        return <>
          <Grid container alignItems="flex-start" justify="flex-end" direction="row">
            <Tooltip title="Newest">
              <IconButton component={RouterLink} to={`/${database}/streams/${stream}/last`} aria-label="Newest">
                <FirstPageIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Newer">
            <IconButton component={RouterLink} to={`/${database}/streams/${stream}/${Math.max(from+limit, last)}`} aria-label="Previous Page">
              <KeyboardArrowLeft />
            </IconButton>
            </Tooltip>
            <Tooltip title="Older">
            <IconButton component={RouterLink} to={`/${database}/streams/${stream}/${Math.max(from-limit, 1)}`} aria-label="Previous Page">
              <KeyboardArrowRight />
            </IconButton>
            </Tooltip>
            <Tooltip title="Oldest">
            <IconButton component={RouterLink} to={`/${database}/streams/${stream}/1`} aria-label="Previous Page">
              <LastPageIcon />
            </IconButton>
            </Tooltip>
            <div style={{ flex: 1 }}></div>
            <Button color="primary" variant="contained" >New event</Button>
          </Grid>
          <Paper>
          {error && <Paper>
            <Typography variant="h5" component="h3">
              Error
            </Typography>
            <Typography component="p">
              {error}
            </Typography>
          </Paper>}

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
          </Paper>
          </>
      }}
    </ReadStreamComponent>
}

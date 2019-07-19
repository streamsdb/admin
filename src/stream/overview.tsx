
import React, { FunctionComponent } from 'react';
import MaterialTable from 'material-table';
import TimeAgo from 'react-timeago';
import prettyBytes from 'pretty-bytes';
import { Link as RouterLink } from "react-router-dom";
import { Message } from '../data/types';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow  from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
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
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Checkbox from '@material-ui/core/Checkbox';
import { ReadStreamQuery, ReadStreamQueryVariables, ReadStreamDocument } from '../data/types'
import { Query } from "react-apollo";
import { Map } from 'immutable';
import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props  {
  database: string;
  stream: string;
  from: number;
  limit: number;
}

function LinkForEventMessage(database: string, stream: string, m: Message) {
  if(m.type !== "sdb.pointer") {
    return (<Link component={RouterLink} to={`/${database}/streams/${stream}/${m.position}/message`}>{stream}/{m.position}</Link>)
  }

  var pointer = JSON.parse(m.value);
  return (<Link component={RouterLink} to={`/${database}/streams/${pointer.s}/${pointer.p}/message`}>{pointer.s}/{pointer.p}</Link>)
}

export const Overview: FunctionComponent<Props> = ({database, stream, from, limit}) => {

  return <Query<ReadStreamQuery, ReadStreamQueryVariables> query={ReadStreamDocument} variables={{database, stream, from, limit}}>
      {({ data, error, loading }) => {
        if(loading) { return <CircularProgress />} 
        if(error) { return <pre>{JSON.stringify(error)}</pre> }
        if(!data || !data.readStream) { return <p>no data</p> }
       
        return <MaterialTable
          title={"messages"}
          columns={[
            { title: 'Position', field: 'position' },
            { title: 'Name', render: m => LinkForEventMessage(database, stream, m) },
            { title: 'Type', field: 'type' },
            { title: 'Size', render: m => prettyBytes(m.value.length)},
            { title: 'Timestamp', render: m => <TimeAgo date={m.timestamp} />},
          ]}
          data={data.readStream.messages as any[]}
          options={{
            selection: true,
            pageSize: limit,
            pageSizeOptions: [limit],
            search: false,
          }}
        />
      }}
  </Query>
}

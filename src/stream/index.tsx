import React, { useState, FunctionComponent } from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import { Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link'
import TimeAgo from 'react-timeago';
import prettyBytes from 'pretty-bytes';
import gql from "graphql-tag";
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

type PagingProps = {database: string, stream:string, from: number, limit: number, last: number}

const Paging: FunctionComponent<PagingProps> = ({database, stream, from, limit, last}) => {
  return <Grid container alignItems="flex-start" justify="flex-end" direction="row">
    <Tooltip title="Newest">
      <IconButton component={RouterLink} to={`/${database}/streams/${stream}/last`} aria-label="Newest">
        <FirstPageIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Newer">
    <IconButton component={RouterLink} to={`/${database}/streams/${stream}/${Math.min(from+limit, last)}`} aria-label="Previous Page">
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
}

function LinkForEventMessage(props:any) {
  var {database, message, stream } = props;

  if(message.type !== "sdb.pointer") {
    return (<Link component={RouterLink} to={`/${database}/streams/${stream}/${message.position}/message`}>{stream}/{message.position}</Link>)
  }

  var pointer = JSON.parse(message.value);
  return (<Link component={RouterLink} to={`/${database}/streams/${pointer.s}/${pointer.p}/message`}>{pointer.s}/{pointer.p}</Link>)
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight: {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.error.main,
    },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  }),
);

interface TableToolbarProps {
  numSelected: number;
}

const TableToolbar = (props: TableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  if(numSelected <= 0) return null;

  return <Toolbar className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </Toolbar>;
};

export interface ISelectedItemsState {
  [position: number]: boolean;
}

interface ListDataProps {
  data: ReadStreamQuery;
  database: string;
  stream: string;
}

const ListData: FunctionComponent<ListDataProps> = ({data, database, stream}) => {
  const classes = useToolbarStyles();
  const [selectedItems, setSelectedItems] = useState<Map<number, boolean>>(Map())
  let rows: any[] = [];
  let from = 0;
  let next = 1;
  let last = 1;
  let head = 0;
  let limit = 10;

  const changeItem = (position: number, checked: boolean) => {
    setSelectedItems(selectedItems.set(position, checked));
  }

  console.log("render", selectedItems)
  let selectionCount = Array.from(selectedItems.values()).reduce((a,c)=> c ? a+1 : a, 0)

  if (data && data.readStream && data.readStream.messages) {
    head = data.readStream.head!;
    from = data.readStream.from!;
    next = data.readStream.next!;
    last = head-limit;
    last = head-limit;
    console.log("!rendered")
    rows = data.readStream.messages.sort((a,b) => a.position > b.position ? -1: 1).map((m) => (
      <TableRow key={m.position}> 
        <TableCell padding="checkbox">
          <Checkbox
            checked={selectedItems.get(m.position)}
            onChange={(e, checked) => changeItem(m.position, checked)}
          />
        </TableCell>
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
        <Paging database={database} stream={stream} from={from} last={last} limit={10} />
        <Card>
          <TableToolbar numSelected={selectionCount} />
           <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={false}
                  inputProps={{ 'aria-label': 'Select all desserts' }}
                />
              </TableCell>
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
        </Card>
    </>
}
    const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  }),
    );
export const Stream: FunctionComponent<Props> = ({database, stream, from, limit}) => {
  const classes = useStyles();

  return <Query<ReadStreamQuery, ReadStreamQueryVariables> query={ReadStreamDocument} variables={{database, stream, from, limit}}>

      {({ data, error, loading }) => {
        return <div className={classes.root}>
          {error && <Paper>
            <Typography variant="h5" component="h3">
              Error
            </Typography>
            <Typography component="p">
              {error}
            </Typography>
          </Paper>}
          {(data !== undefined) && <ListData data={data} database={database} stream={stream} />}
          </div>
      }}
    </Query>
}

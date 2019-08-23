import React, { FunctionComponent } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AceEditor from 'react-ace';
import Divider from '@material-ui/core/Divider';
import TimeAgo from 'react-timeago';
import prettyBytes from 'pretty-bytes';
import { Link as RouterLink} from "react-router-dom";
import { Message } from '../data/types';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Tooltip from '@material-ui/core/Tooltip';
import { ReadStreamBackwardComponent, ReadStreamForwardComponent, Slice } from '../data/types'
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Skeleton from 'react-loading-skeleton';

interface Props  {
  database: string;
  stream: string;
  from: number;
  limit: number;
  reverse: boolean;
}

function LinkForEventMessage(database: string, stream: string, m: Message) {
  if(m.type !== "sdb.pointer") {
    return (<Link component={RouterLink} to={`/${database}/${encodeURIComponent(stream)}/${m.position}/message`}>{stream}/{m.position}</Link>)
  }

  var pointer = JSON.parse(m.value);
  return (<Link component={RouterLink} to={`/${database}/${encodeURIComponent(pointer.s)}/${pointer.p}/message`}>{pointer.s}/{pointer.p}</Link>)
}

type PagingProps = {database: string, stream:string, from: number, limit: number, last: number, reverse: boolean}

const Paging: FunctionComponent<PagingProps> = ({database, stream, from, limit, last}) => {
  const baseUrl = `/${encodeURIComponent(database)}/${encodeURIComponent(stream)}`
  
  return <Grid container alignItems="flex-start" justify="flex-end" direction="row">
    <Tooltip title="Newest">
      <IconButton component={RouterLink} to={`${baseUrl}/last/`} aria-label="Newest">
        <FirstPageIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Newer">
    <IconButton component={RouterLink} to={`${baseUrl}/${last+1}/forward/${limit}`} aria-label="Previous Page">
      <KeyboardArrowLeft />
    </IconButton>
    </Tooltip>
    <Tooltip title="Older">
    <IconButton component={RouterLink} to={`${baseUrl}/${Math.max(from-1, limit)}/backward/${limit}`} aria-label="Previous Page">
      <KeyboardArrowRight />
    </IconButton>
    </Tooltip>
    <Tooltip title="Oldest">
    <IconButton component={RouterLink} to={`${baseUrl}/1/forward/${limit}`} aria-label="Previous Page">
      <LastPageIcon />
    </IconButton>
    </Tooltip>
    <div style={{ flex: 1 }}></div>
    <Button component={RouterLink} to={`${baseUrl}/new`} color="primary" variant="contained">New event</Button>
  </Grid>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    editor: {
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
  }),
);

interface Selection{
  database: string;
  stream: string;
  from: number;
  limit: number;
  reverse: boolean;
}

interface SelectionAndData extends Selection {
  slice: Slice;
}

const SliceView: FunctionComponent<SelectionAndData> = ({database, stream, from, limit, slice}) => {
  const classes = useStyles();
  let firstPosition = slice.from;
  let lastPosition = slice.from;

  if(slice.messages.length > 0) {
    firstPosition = slice.reverse ? slice.messages[slice.messages.length-1].position : slice.messages[0].position;
    lastPosition = slice.reverse ? slice.messages[0].position : slice.messages[slice.messages.length-1].position;
  }

  return <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="caption" color="textSecondary" gutterBottom>
          from {slice.from} to {slice.reverse ? "older" : "newer"} messages
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paging database={database} stream={stream} from={firstPosition} limit={limit} last={lastPosition} reverse={slice.reverse} />
      </Grid>
    {slice.messages.sort((a,b) => a.position > b.position ? -1: 1).map(m => {
      var value;
      try {
        value = JSON.stringify(JSON.parse(m.value), null, 4);
      } catch (e) {
        value = m.value;
      }

      return <Grid key={m.position} item xs={12}>
          <ExpansionPanel TransitionProps={{
            timeout: 0
          }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={0}>
            <Grid className={classes.root} item xs={2}>
              {m.position}
            </Grid>
            <Grid className={classes.root} item xs>
              {LinkForEventMessage(database, stream, m)}
            </Grid>
            <Grid className={classes.root} item xs>
              {m.type}
            </Grid>
            <Grid className={classes.root} item xs>
              {prettyBytes(m.value.length)}
            </Grid>
            <Grid className={classes.root} item xs>
              <TimeAgo date={m.timestamp} />
            </Grid>
          </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
      <Divider />
      <AceEditor
            readOnly={true}
            className={classes.editor}
            mode="json"
            theme="tomorrow"
            value={value}
            name="value"
            editorProps={{$blockScrolling: true}}
            width="100%"
            wrapEnabled={true}
            fontSize={16}
            maxLines={Infinity}
          />   
        </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>})}
  </Grid>
}

interface NoDataProps {
  database: string;
  stream: string;
}

const Loading: FunctionComponent<NoDataProps> = ({database, stream }) => {
  const classes = useStyles();
  return <Grid key="nodata" container spacing={1}>
            <Grid item xs={12}>
              <Paging database={database} stream={stream} from={1} limit={10} last={1} reverse={true} />
            </Grid>

            {Array.from(Array(10).keys()).map((_, i)=> (
            <Grid key={`no-item-${i}`} item xs={12}>
              <ExpansionPanel>
                <ExpansionPanelSummary style={{minHeight: '60px' }}>
                  <Grid className={classes.root} item xs={12}>
                    <Skeleton />
                  </Grid>
                </ExpansionPanelSummary>
              </ExpansionPanel>
            </Grid>))}
        </Grid>
}

export const List: FunctionComponent<Props> = ({database, stream, from, limit, reverse}) => {
  if(reverse) {
    return <ReadStreamBackwardComponent variables={{database, stream, from, limit}}>
      {({ data, error, loading }) => {
        if(error) { return <pre>{JSON.stringify(error)}</pre> }
        if(loading) { return <Loading database={database} stream={stream} /> }

        if(!data || !data.readStreamBackward) {
          return <Grid key="nodata" item xs={12}>
            <ExpansionPanel TransitionProps={{
              timeout: 0
            }}>
              <ExpansionPanelSummary>
                <Grid container spacing={0}>
                  no events
                </Grid>
              </ExpansionPanelSummary>
            </ExpansionPanel>
          </Grid>
        }

        const slice = data.readStreamBackward as Slice;
        return <SliceView database={database} stream={stream} from={from} limit={limit} reverse={reverse} slice={slice} />
      }}
    </ReadStreamBackwardComponent>
  }

  return <ReadStreamForwardComponent variables={{database, stream, from, limit}}>
    {({ data, error, loading }) => {
      if(error) { return <pre>{JSON.stringify(error)}</pre> }
      if(loading) { return <Loading database={database} stream={stream} /> }

      if(!data || !data.readStreamForward) {
        return <Grid key="nodata" item xs={12}>
          <ExpansionPanel TransitionProps={{
            timeout: 0
          }}>
            <ExpansionPanelSummary>
              <Grid container spacing={0}>
                no events
              </Grid>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        </Grid>
      }

      const slice = data.readStreamForward as Slice;
      return <SliceView database={database} stream={stream} from={from} limit={limit} reverse={reverse} slice={slice} />
    }}
  </ReadStreamForwardComponent>
}

import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { StreamsQueryComponent } from './data/types'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

type Props = {
  database: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const query = gql`
query StreamsQuery($database: String!){
  database(name: $database) {
    id,
    name,
    streams {
      total
      names
    }
  },
}`;

const NoStreams: FunctionComponent<Props> = ({ database }) => <p>
  No streams in database, create a new stream by creating an new event for it.
</p>

export const Streams: FunctionComponent<Props> = ({ database }) => {
  const classes = useStyles();

  return (<StreamsQueryComponent variables={{database}}>
    {({ data, error, loading }) => {
              var names: string[] = [];
              if(data && data.database && data.database.streams && data.database.streams.names) {
                names = data.database.streams.names
              }
      return <>
        <Toolbar>
          <Button variant="contained" component={Link} to={`/${database}/new`} color="primary">
            New stream
          </Button>
        </Toolbar>
        <Paper>
        {loading && <CircularProgress /> }
        {error && <Paper>
          <Typography variant="h5" component="h3">
            Error
          </Typography>
          <Typography component="p">
            {error}
          </Typography>
        </Paper>}
        <List component="nav">
          {names.map((name) => (<ListItem button component={Link} to={`/${database}/streams/${name}`}><ListItemText>{name}</ListItemText></ListItem>))}
        </List>
      </Paper>
        </>
    }}</StreamsQueryComponent>
)
}

import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { StreamsQueryComponent } from './data/types'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

type Props = {
  database: string;
}

gql`
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

const NoStreams: FunctionComponent<Props> = () => <p>
  No streams found in database, create a new stream by creating an new event for it.
</p>

export const Streams: FunctionComponent<Props> = ({ database }) => {
  return (<StreamsQueryComponent variables={{database}}>
    {({ data, error, loading }) => {
      var names: string[] = [];
      if(data && data.database && data.database.streams && data.database.streams.names) {
        names = data.database.streams.names
      }
      
      if(!names) {
        return <NoStreams database={database} />
      }

      return <>
        <Toolbar>
          <Button variant="contained" component={Link} to={`/${encodeURIComponent(database)}/new`} color="primary">
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
        <List>
          {names.map((name) => (<ListItem button component={Link} to={`/${encodeURIComponent(database)}/${encodeURIComponent(name)}`}><ListItemText>{name}</ListItemText></ListItem>))}
        </List>
      </Paper>
        </>
    }}</StreamsQueryComponent>
)
}

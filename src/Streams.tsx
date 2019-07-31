import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { StreamsQueryComponent } from './data/types'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Skeleton from 'react-loading-skeleton';

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
  No streams found
</p>

export const Streams: FunctionComponent<Props> = ({ database }) => {
  return (<StreamsQueryComponent variables={{database}}>
    {({ data, error, loading }) => {
      if(loading) {
        return <Paper>
          <List>
          {Array.from(Array(3).keys()).map((i) => <ListItem key={i} button disabled><ListItemText><Skeleton /></ListItemText></ListItem>)}
          </List>
          </Paper>
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

      var names: string[] = [];
      if(data && data.database && data.database.streams && data.database.streams.names) {
        names = data.database.streams.names
      }
      
      if(!names || names.length === 0) {
        return <NoStreams database={database} />
      }

      return <>
        <Toolbar>
          <Button variant="contained" component={Link} to={`/${encodeURIComponent(database)}/new`} color="primary">
            New stream
          </Button>
        </Toolbar>
        <Paper>
        <List>
          {names.map((name) => (<ListItem button component={Link} to={`/${encodeURIComponent(database)}/${encodeURIComponent(name)}`}><ListItemText>{name}</ListItemText></ListItem>))}
        </List>
      </Paper>
        </>
    }}</StreamsQueryComponent>
)
}

import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { StreamsQueryComponent, StreamsPage } from './data/types'
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

interface StreamsProps {
  database: string;
  page: StreamsPage;
}

const StreamsContent: FunctionComponent<StreamsProps> = ({database, page}) => {
  debugger;
  if(!page.names || page.names.length === 0) {
    return <List><ListItem><ListItemText>No Streams in database</ListItemText></ListItem></List>
  }
  return <List>
          {page.names.map((name) => (<ListItem button component={Link} to={`/${encodeURIComponent(database)}/${encodeURIComponent(name)}`}><ListItemText>{name}</ListItemText></ListItem>))}
        </List>
}

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

      var page: StreamsPage = {total: 0};
      if(data && data.database && data.database.streams) {
        page = data.database.streams
      }
      
      return <>
        <Toolbar>
          <Button variant="contained" component={Link} to={`/${encodeURIComponent(database)}/new`} color="primary">
            New stream
          </Button>
        </Toolbar>
        <Paper>
        <StreamsContent database={database} page={page} />
      </Paper>
        </>
    }}</StreamsQueryComponent>
)
}

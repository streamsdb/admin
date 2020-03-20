import React, { FunctionComponent } from 'react';
import gql from "graphql-tag";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { StreamsQueryComponent  } from './data/types'
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
  filter?: string;
  cursor?: string;
  limit?: number;
  reverse?: boolean;
}

gql`
query StreamsQuery($database: String! $filter: String!, $cursor: String!, $reverse: Boolean!, $limit: Int){
  streams(db: $database, filter: $filter, cursor: $cursor, reverse: $reverse, limit: $limit) {
    names
  },
}`;

interface StreamsProps {
  database: string;
  names: string[];
}

const StreamsContent: FunctionComponent<StreamsProps> = ({database, names}) => {
  if(!names || names.length === 0) {
    return <List><ListItem><ListItemText>No Streams in database</ListItemText></ListItem></List>
  }
  return <List>
    {names.map((name) => (<ListItem button component={Link} to={`/${encodeURIComponent(database)}/${encodeURIComponent(name)}`}><ListItemText>{name}</ListItemText></ListItem>))}
  </List>
}

export const Streams: FunctionComponent<Props> = ({ database, filter = "", cursor = "", limit = 0, reverse = false }) => {
  const searchParams = new URLSearchParams(useLocation().search);
  const filterFromQuery = searchParams.get('filter');

  if(filterFromQuery !== null){
    filter = filterFromQuery;
  }


  return (<StreamsQueryComponent variables={{database, filter, cursor, limit, reverse }}>
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

      if(data === undefined || data.streams === undefined) {
        throw  new Error('unexpected undefined result from query');
      }

      const page = data.streams;

      return <>
        <Toolbar>
          <Button variant="contained" component={Link} to={`/${encodeURIComponent(database)}/new`} color="primary">
            New stream
          </Button>
        </Toolbar>
        <Paper>
        <StreamsContent database={database} names={page.names!} />
      </Paper>
        </>
    }}</StreamsQueryComponent>
)
}

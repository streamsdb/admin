import React, { FunctionComponent } from 'react';
import { DatabasesComponent } from '../data/types';
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

type Props = {
}

gql`
query Databases{
  databases {
    names
  },
}`;

export const Databases: FunctionComponent<Props> = () => <aside>
  <h1>Databases</h1>
  <DatabasesComponent>
    {({ data, error, loading, refetch }) => {
      var names: string[] = [];
      if(data && data.databases && data.databases.names) {
        names = data.databases.names
      }

      return <Paper>
        {loading && <CircularProgress /> }
        {error && <Paper>
          <Typography variant="h5" component="h3">
            Error
          </Typography>
          <Typography component="p">
            {JSON.stringify(error)}
          </Typography>
        </Paper>}
        <List>
          {names.length === 0 ? <ListItem key="empty">There are no databases you have access to</ListItem> :
          names.map((name) => (<ListItem key={name} button component={Link} to={`/${name}`}><ListItemText>{name}</ListItemText></ListItem>))}
        </List>
      </Paper>
    }}
  </DatabasesComponent>
</aside>


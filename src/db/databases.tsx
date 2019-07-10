import React, { FunctionComponent } from 'react';
import { DatabasesComponent } from '../data/types';
import {
  createStyles,
  fade,
  Theme,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { Link } from "react-router-dom";
import { Alert } from 'reactstrap';
import gql from "graphql-tag";
import brace from 'brace';
import AceEditor from 'react-ace';
import TextField, {TextFieldProps } from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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



type Props = {
}

const query = gql`
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
            {error}
          </Typography>
        </Paper>}
        <List component="nav">
          {names.map((name) => (<ListItem key={name} button component={Link} to={`/${name}/streams`}><ListItemText>{name}</ListItemText></ListItem>))}
        </List>
      </Paper>
    }}
  </DatabasesComponent>
</aside>


import React, { FunctionComponent } from 'react';
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
import { ReadMessageComponent } from '../data/types';
import brace from 'brace';
import AceEditor from 'react-ace';
import TextField, {TextFieldProps } from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const query = gql`
query ReadMessage($database: String!, $stream: String!, $from: Int!)
{
  readStream(db:$database, name:$stream, from:$from, limit: 1) {
    messages {
      position
      timestamp
      type
      value
    }
  }
}
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  }),
);

function RedditTextField(props: TextFieldProps) {
  const classes = useStylesReddit();

  return (
    <TextField
      InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  );
}

type Props = {
  database: string;
  stream: string;
  from?: number;
}

export const Message: FunctionComponent<Props> = ({database, stream, from}) => {
  const classes = useStylesReddit();

  if (!from) {
    from = 1
  }

  return <ReadMessageComponent variables={{database, stream, from}}>
      {({ data, error, loading }) => {
        if(loading) {
          return <CircularProgress />;
        } 
        if(error) {
          return <div>
            <Alert color="primary">
              failed to query stream {stream}: {error.message}
            </Alert>
          </div>
        }

        if(!data || !data.readStream || !data.readStream.messages) {
          return <Alert color="primary">
            not found
          </Alert>
        }

        var { head, messages, next, hasNext, head } = data.readStream;
        var message = messages[0];
        from = message.position;

        var value;
        try {
          value = JSON.stringify(JSON.parse(message.value), null, 4);
        } catch (e) {
          value = message.value;
        }


        return (
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <RedditTextField
                  id="standard-name"
                  label="stream name"
                  value={stream}
                />
              </Grid>
              <Grid item xs={12}>
                <RedditTextField
                  id="standard-name"
                  label="event type"
                  value={message.type}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="value">event value</InputLabel>
                <AceEditor
                  readOnly={true}
                  className={classes.root}
                  mode="json"
                  theme="tomorrow"
                  value={value}
                  name="value"
                  editorProps={{$blockScrolling: true}}
                  width="100%"
                  wrapEnabled={true}
                  fontSize={16}
                />   
              </Grid>
            </Grid>
          </form>)
    }}
    </ReadMessageComponent>
}

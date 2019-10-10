import React, { FunctionComponent } from 'react';
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
import Skeleton from 'react-loading-skeleton';
import AceEditor from 'react-ace';
import TextField, {TextFieldProps } from '@material-ui/core/TextField';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

export interface StreamMessage {
  stream: string;
  type: string;
  header: string;
  value: string;
}

type Props = {
  loading: boolean;
  readOnly: boolean;
  message: StreamMessage;
  onChange?: ((message: StreamMessage) => void);
}

const tryToPrettyfiJson = (input: string) => {
  try{
    return JSON.stringify(JSON.parse(input),null,2); 
  }
  catch{
    return input;
  }
}

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
      paddingLeft: '5px',
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

const MessageComponent: FunctionComponent<Props> = ({loading, readOnly, message, onChange}) => {
  const classes = useStylesReddit();

  return <Grid container spacing={3}>
    <Grid item xs={12}>
      {loading ? (<Skeleton />) : (<RedditTextField
        inputProps={{
          readOnly: readOnly,
        }}
        id="standard-name"
        label="stream name"
        value={message.stream}
        onChange={(e) => onChange && onChange({...message, stream: e.target.value})}
      />)}
    </Grid>
    <Grid item xs={12}>
      {loading ? (<Skeleton />) : (<RedditTextField
        inputProps={{
          readOnly: readOnly,
        }}
        id="standard-name"
        label="event type"
        value={message.type}
        onChange={(e) => onChange && onChange({...message, type: e.target.value})}
      />)}
    </Grid>
    <Grid item xs={12}>
      <InputLabel htmlFor="value">event value</InputLabel>
      {loading ? (<Skeleton />) : (<AceEditor
        readOnly={readOnly}
        className={classes.root}
        mode="json"
        theme="tomorrow"
        value={tryToPrettyfiJson(message.value)}
        name="value"
        editorProps={{$blockScrolling: true}}
        width="100%"
        wrapEnabled={true}
        fontSize={16}
        onChange={(newValue) => onChange && onChange({...message, value: newValue})}
      />)}
    </Grid>
    <Grid item xs={12}>
      <InputLabel htmlFor="value">event header</InputLabel>
      {loading ? (<Skeleton />) : (<AceEditor
        readOnly={readOnly}
        className={classes.root}
        mode="json"
        theme="tomorrow"
        value={tryToPrettyfiJson(message.header)}
        name="header"
        editorProps={{$blockScrolling: true}}
        width="100%"
        wrapEnabled={true}
        fontSize={16}
        onChange={(newValue) => onChange && onChange({...message, header: newValue})}
      />)}
    </Grid>
  </Grid>
}

MessageComponent.defaultProps= {
  loading: false,
}

export default MessageComponent;

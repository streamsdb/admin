import React, { FunctionComponent, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { DeleteMessageComponent } from '../../../data/types';
import { Redirect  } from 'react-router';
import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

type Props = {
  database: string;
  stream: string;
  position: number;
}


const DeleteButton: FunctionComponent<Props> = ({database, stream, position}) => {
  const { enqueueSnackbar } = useSnackbar();
  const displayError = (e: ApolloError) => {
    enqueueSnackbar('delete message error: ' + e.message, { variant: 'error'});
  }

  return <DeleteMessageComponent onError={displayError} variables={{database, stream, position}}>{(mutate, { loading, error, data }) => {
      if(loading) {
        return <IconButton><CircularProgress size={20} /></IconButton>;
      }

      if(!error && data !== undefined && data.deleteMessage !== undefined) {
        return <Redirect to={`/${database}/streams/${stream}`} />
      }

      return <IconButton onClick={() => mutate()}>
          <DeleteIcon />
        </IconButton>
    }
  }
  </DeleteMessageComponent>
}

export default DeleteButton;

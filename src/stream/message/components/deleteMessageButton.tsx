import React, { FunctionComponent } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { DeleteMessageComponent, ReadMessageComponent } from '../../../data/types';
import { Redirect  } from 'react-router';

type Props = {
  database: string;
  stream: string;
  position: number;
}

export const DeleteMessageButton: FunctionComponent<Props> = ({database, stream, position}) => {
  return <DeleteMessageComponent variables={{database, stream, position}}>{(mutate, { loading, error, data }) => {
      if(loading) {
        return <IconButton><CircularProgress /></IconButton>;
      } 

      if(data !== undefined && data.deleteMessage !== undefined) {
        return <Redirect to={`/${database}/streams/${stream}/last`} />
      }

      return <IconButton onClick={() => mutate()}><DeleteIcon /></IconButton>
    }
  }
  </DeleteMessageComponent>
}

import React, { FunctionComponent } from 'react';
import { Redirect  } from 'react-router';
import { useAuthContext } from './state';

type Props = {
  returnUrl: string | undefined;
}

export const Logout: FunctionComponent<Props> = ({returnUrl}) => {
  const { setUnauthenticated } = useAuthContext();

  setUnauthenticated();
  return <Redirect to={returnUrl ? returnUrl : "/login"} />
}

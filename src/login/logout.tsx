import React, { FunctionComponent } from 'react';
import { Redirect  } from 'react-router';

type Props = {
  returnUrl: string | undefined;
}

export const Logout: FunctionComponent<Props> = ({returnUrl}) => {
  localStorage.removeItem("token")
  return <Redirect to={returnUrl ? returnUrl : "/login"} />
}

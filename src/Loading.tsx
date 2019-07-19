import * as React from "react";
import { loadingContext } from "./State";
import LinearProgress from '@material-ui/core/LinearProgress';

export const Loading = () => {
  const context = React.useContext(loadingContext);

  if(context.loading) { debugger; return <LinearProgress /> } 
  else { return <></> }
}


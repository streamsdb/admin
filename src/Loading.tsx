import * as React from "react";
import { loadingContext } from "./State";
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';

export const Loading = () => {
  const context = React.useContext(loadingContext);
  return <Fade
    in={context.loading}
    style={{
      transitionDelay: context.loading ? '600ms' : '0ms',
      }}>
    <LinearProgress />
  </Fade>
}


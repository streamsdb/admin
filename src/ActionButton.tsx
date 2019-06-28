import React, { FunctionComponent } from "react";
import { Button, Spinner } from "reactstrap";
import classnames from "classnames";

type Props = {
  spinning: boolean;
}



export const SpinnerButton: FunctionComponent<Props> = ({spinning, children, ...rest}) => (
  <Button {...rest}>
    (running) ? (
      <Spinner
        className={classnames({
          "position-relative": true,
          "button-style": false,
        })}
        size="sm"
      />
    ) : ({children})
  </Button>
);


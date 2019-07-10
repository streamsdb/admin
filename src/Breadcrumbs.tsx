import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import withBreadcrumbs, {
  BreadcrumbsRoute,
  BreadcrumbsProps,
  InjectedProps
} from "react-router-breadcrumbs-hoc";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    paper: {
      padding: theme.spacing(1, 2),
    },
  }),
);

const Root = ({ breadcrumbs }: InjectedProps<unknown>) => {
  const classes = useStyles();
  const links = breadcrumbs.map(({ breadcrumb, match }: BreadcrumbsProps<unknown>) => (<Link component={RouterLink} to={match.url}>{breadcrumb}</Link>))

  return (
        <Breadcrumbs aria-label="Breadcrumb">
        {links}
        </Breadcrumbs>
  );  
}

export default withBreadcrumbs([])(Root);

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
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

const Root = ({ breadcrumbs }: InjectedProps<unknown>) => {
  const links = breadcrumbs.slice(1).map(({ breadcrumb, match }: BreadcrumbsProps<unknown>) => (
    <Typography>
      <Box fontWeight="fontWeightBold">
        <Link color="inherit" component={RouterLink} to={match.url}>{breadcrumb}</Link>
      </Box>
    </Typography>
  ))

  return (
        <Breadcrumbs color="inherit" separator="›" aria-label="Breadcrumb">
                  {links}
        </Breadcrumbs>
  );  
}

export default withBreadcrumbs([])(Root);

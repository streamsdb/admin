import React, { FunctionComponent, PropsWithChildren } from 'react';
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
import Box from '@material-ui/core/Box';

export default (routes: BreadcrumbsRoute[], excludePaths: string[]) => withBreadcrumbs(routes, { excludePaths })(({ breadcrumbs }: InjectedProps<unknown>) => {
  const withoutHome = breadcrumbs.slice(1);

  const links = breadcrumbs.slice(1).map(({ breadcrumb, match }, index) => (
    <Link color="inherit"  style={ index !== withoutHome.length -1 ? { fontWeight: 'normal' } : { fontWeight: 'bold' } } component={RouterLink} to={match.url}>{breadcrumb}</Link>
  ));

  return <Breadcrumbs color="inherit" separator="/" aria-label="Breadcrumb">
    {links}
  </Breadcrumbs>
});

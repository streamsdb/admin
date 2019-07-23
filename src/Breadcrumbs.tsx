import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import withBreadcrumbs, {
  BreadcrumbsRoute,
  InjectedProps
} from "react-router-breadcrumbs-hoc";

export default (routes: BreadcrumbsRoute[], excludePaths: string[]) => withBreadcrumbs(routes, { excludePaths })(({ breadcrumbs }: InjectedProps<unknown>) => {
  const links = breadcrumbs.slice(1).map(({ breadcrumb, match }, index) => (
    <Link key={match.url} color="inherit"  style={ index > 1 ? { fontWeight: 'normal' } : { fontWeight: 'bold' } } component={RouterLink} to={match.url}>{breadcrumb}</Link>
  ));

  return <Breadcrumbs color="inherit" separator="/" aria-label="Breadcrumb">
    {links}
  </Breadcrumbs>
});

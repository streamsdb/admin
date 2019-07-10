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
          <IconButton component={RouterLink} to={"/"} edge="end">
            <svg viewBox="0 0 426 482" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M-1-1h428v484H-1z"/>
              <g>
                <g stroke="#fff" stroke-linejoin="undefined" stroke-linecap="undefined" stroke-width="25" fill="#000">
                  <path d="M207.694 6.224l210.138 121.799"/>
                  <path fill-opacity="null" stroke-opacity="null" d="M413.956 120.248v239.915M11.335 122.401l405.636 233.391M208.555 473.348l209.277-119.709M216.306 473.348L7.46 353.355M10.474 119.386v240.737M6.168 125.66L215.876 6.136M212.431 382.808l125.307-72.661M6.168 270.091l213.583 112.747M216.737 95.977L89.707 171.06M208.555 96.351L411.373 206.37"/>
                </g>
              </g>
            </svg>
           </IconButton>
        {links}
        </Breadcrumbs>
  );  
}

export default withBreadcrumbs([])(Root);

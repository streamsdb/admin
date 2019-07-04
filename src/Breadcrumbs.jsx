import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";

const Breadcrumbs = ({ breadcrumbs }) => (
  <Breadcrumb>
    {
      breadcrumbs.map(({ breadcrumb, match }) => 
        <BreadcrumbItem key={match.url}><Link to={match.url}>{breadcrumb}</Link></BreadcrumbItem>
    )}
  </Breadcrumb>
)

export default withBreadcrumbs()(Breadcrumbs);

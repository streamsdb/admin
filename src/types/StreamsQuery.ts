/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StreamsQuery
// ====================================================

export interface StreamsQuery_database_streams {
  __typename: "StreamsPage";
  total: number;
  names: string[] | null;
}

export interface StreamsQuery_database {
  __typename: "DB";
  id: string;
  name: string;
  streams: StreamsQuery_database_streams;
}

export interface StreamsQuery {
  database: StreamsQuery_database | null;
}

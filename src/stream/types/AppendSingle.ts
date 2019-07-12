/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AppendSingle
// ====================================================

export interface AppendSingle_appendStream {
  __typename: "AppendResult";
  from: number;
}

export interface AppendSingle {
  appendStream: AppendSingle_appendStream | null;
}

export interface AppendSingleVariables {
  db: string;
  stream: string;
  eventtype: string;
  payload: any;
}

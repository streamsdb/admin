/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StreamQuery
// ====================================================

export interface StreamQuery_readStream_messages {
  __typename: "Message";
  position: number;
  type: string;
  timestamp: string;
  value: any;
}

export interface StreamQuery_readStream {
  __typename: "Slice";
  stream: string;
  from: number;
  hasNext: boolean;
  head: number;
  messages: StreamQuery_readStream_messages[] | null;
}

export interface StreamQuery {
  readStream: StreamQuery_readStream;
}

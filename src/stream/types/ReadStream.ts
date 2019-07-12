/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReadStream
// ====================================================

export interface ReadStream_readStream_messages {
  __typename: "Message";
  position: number;
  timestamp: any;
  type: string;
  value: any;
}

export interface ReadStream_readStream {
  __typename: "Slice";
  stream: string;
  from: number;
  next: number;
  hasNext: boolean;
  head: number;
  messages: ReadStream_readStream_messages[] | null;
}

export interface ReadStream {
  readStream: ReadStream_readStream;
}

export interface ReadStreamVariables {
  database: string;
  stream: string;
  from: number;
  limit: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReadMessage
// ====================================================

export interface ReadMessage_readStream_messages {
  __typename: "Message";
  position: number;
  timestamp: any;
  type: string;
  value: any;
}

export interface ReadMessage_readStream {
  __typename: "Slice";
  messages: ReadMessage_readStream_messages[] | null;
}

export interface ReadMessage {
  readStream: ReadMessage_readStream;
}

export interface ReadMessageVariables {
  database: string;
  stream: string;
  from: number;
}

import gql from "graphql-tag";
import * as ReactApollo from "react-apollo";
import * as React from "react";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
  Bytes: any;
};

export type AppendResult = {
  __typename?: "AppendResult";
  from: Scalars["Int"];
  count: Scalars["Int"];
  head: Scalars["Int"];
};

export type CreateDatabaseResult = {
  __typename?: "CreateDatabaseResult";
  Name: Scalars["String"];
};

export type Db = {
  __typename?: "DB";
  id: Scalars["ID"];
  name: Scalars["String"];
  streams: StreamsPage;
};

export type DbStreamsArgs = {
  after?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type LoginResult = {
  __typename?: "LoginResult";
  email: Scalars["String"];
  token: Scalars["String"];
};

export type Message = {
  __typename?: "Message";
  position: Scalars["Int"];
  timestamp: Scalars["Timestamp"];
  type: Scalars["String"];
  value: Scalars["Bytes"];
};

export type MessageInput = {
  type: Scalars["String"];
  value: Scalars["Bytes"];
};

export type Mutation = {
  __typename?: "Mutation";
  register?: Maybe<RegistrationResult>;
  createDatabase?: Maybe<CreateDatabaseResult>;
  appendStream?: Maybe<AppendResult>;
  login?: Maybe<LoginResult>;
};

export type MutationRegisterArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateDatabaseArgs = {
  name: Scalars["String"];
};

export type MutationAppendStreamArgs = {
  db: Scalars["String"];
  stream: Scalars["String"];
  messages: Array<MessageInput>;
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  readStream: Slice;
  databases?: Maybe<Array<Scalars["String"]>>;
  database?: Maybe<Db>;
};

export type QueryReadStreamArgs = {
  db: Scalars["String"];
  name: Scalars["String"];
  from: Scalars["Int"];
  limit: Scalars["Int"];
};

export type QueryDatabaseArgs = {
  name: Scalars["String"];
};

export type RegistrationResult = {
  __typename?: "RegistrationResult";
  email: Scalars["String"];
  token: Scalars["String"];
};

export type Slice = {
  __typename?: "Slice";
  stream: Scalars["String"];
  from: Scalars["Int"];
  next: Scalars["Int"];
  hasNext: Scalars["Boolean"];
  head: Scalars["Int"];
  messages?: Maybe<Array<Message>>;
};

export type Streams = {
  __typename?: "Streams";
  db: Scalars["String"];
  names?: Maybe<Array<Scalars["String"]>>;
};

export type StreamsPage = {
  __typename?: "StreamsPage";
  total: Scalars["Int"];
  names?: Maybe<Array<Scalars["String"]>>;
};

export type AppendSingleMutationVariables = {
  db: Scalars["String"];
  stream: Scalars["String"];
  eventtype: Scalars["String"];
  payload: Scalars["Bytes"];
};

export type AppendSingleMutation = { __typename?: "Mutation" } & {
  appendStream: Maybe<
    { __typename?: "AppendResult" } & Pick<AppendResult, "from">
  >;
};

export type StreamQueryQueryVariables = {
  database: Scalars["String"];
  stream: Scalars["String"];
  from: Scalars["Int"];
  limit: Scalars["Int"];
};

export type StreamQueryQuery = { __typename?: "Query" } & {
  readStream: { __typename?: "Slice" } & Pick<
    Slice,
    "stream" | "from" | "next" | "hasNext" | "head"
  > & {
      messages: Maybe<
        Array<
          { __typename?: "Message" } & Pick<
            Message,
            "position" | "type" | "timestamp" | "value"
          >
        >
      >;
    };
};

export type StreamsQueryQueryVariables = {};

export type StreamsQueryQuery = { __typename?: "Query" } & {
  database: Maybe<
    { __typename?: "DB" } & Pick<Db, "id" | "name"> & {
        streams: { __typename?: "StreamsPage" } & Pick<
          StreamsPage,
          "total" | "names"
        >;
      }
  >;
};

export const AppendSingleDocument = gql`
  mutation AppendSingle(
    $db: String!
    $stream: String!
    $eventtype: String!
    $payload: Bytes!
  ) {
    appendStream(
      db: $db
      stream: $stream
      messages: [{ type: $eventtype, value: $payload }]
    ) {
      from
    }
  }
`;
export type AppendSingleMutationFn = ReactApollo.MutationFn<
  AppendSingleMutation,
  AppendSingleMutationVariables
>;
export type AppendSingleComponentProps = Omit<
  ReactApollo.MutationProps<
    AppendSingleMutation,
    AppendSingleMutationVariables
  >,
  "mutation"
>;

export const AppendSingleComponent = (props: AppendSingleComponentProps) => (
  <ReactApollo.Mutation<AppendSingleMutation, AppendSingleMutationVariables>
    mutation={AppendSingleDocument}
    {...props}
  />
);

export type AppendSingleProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AppendSingleMutation, AppendSingleMutationVariables>
> &
  TChildProps;
export function withAppendSingle<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AppendSingleMutation,
    AppendSingleMutationVariables,
    AppendSingleProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AppendSingleMutation,
    AppendSingleMutationVariables,
    AppendSingleProps<TChildProps>
  >(AppendSingleDocument, {
    alias: "withAppendSingle",
    ...operationOptions
  });
}
export const StreamQueryDocument = gql`
  query StreamQuery(
    $database: String!
    $stream: String!
    $from: Int!
    $limit: Int!
  ) {
    readStream(db: $database, name: $stream, from: $from, limit: $limit) {
      stream
      from
      next
      hasNext
      head
      messages {
        position
        type
        timestamp
        value
      }
    }
  }
`;
export type StreamQueryComponentProps = Omit<
  ReactApollo.QueryProps<StreamQueryQuery, StreamQueryQueryVariables>,
  "query"
> &
  ({ variables: StreamQueryQueryVariables; skip?: false } | { skip: true });

export const StreamQueryComponent = (props: StreamQueryComponentProps) => (
  <ReactApollo.Query<StreamQueryQuery, StreamQueryQueryVariables>
    query={StreamQueryDocument}
    {...props}
  />
);

export type StreamQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<StreamQueryQuery, StreamQueryQueryVariables>
> &
  TChildProps;
export function withStreamQuery<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    StreamQueryQuery,
    StreamQueryQueryVariables,
    StreamQueryProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    StreamQueryQuery,
    StreamQueryQueryVariables,
    StreamQueryProps<TChildProps>
  >(StreamQueryDocument, {
    alias: "withStreamQuery",
    ...operationOptions
  });
}
export const StreamsQueryDocument = gql`
  query StreamsQuery {
    database(name: "default") {
      id
      name
      streams {
        total
        names
      }
    }
  }
`;
export type StreamsQueryComponentProps = Omit<
  ReactApollo.QueryProps<StreamsQueryQuery, StreamsQueryQueryVariables>,
  "query"
>;

export const StreamsQueryComponent = (props: StreamsQueryComponentProps) => (
  <ReactApollo.Query<StreamsQueryQuery, StreamsQueryQueryVariables>
    query={StreamsQueryDocument}
    {...props}
  />
);

export type StreamsQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<StreamsQueryQuery, StreamsQueryQueryVariables>
> &
  TChildProps;
export function withStreamsQuery<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    StreamsQueryQuery,
    StreamsQueryQueryVariables,
    StreamsQueryProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    StreamsQueryQuery,
    StreamsQueryQueryVariables,
    StreamsQueryProps<TChildProps>
  >(StreamsQueryDocument, {
    alias: "withStreamsQuery",
    ...operationOptions
  });
}

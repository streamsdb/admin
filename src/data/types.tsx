import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
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

export type DatabasesPage = {
  __typename?: "DatabasesPage";
  total: Scalars["Int"];
  names?: Maybe<Array<Scalars["String"]>>;
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

export type DeleteMessageResult = {
  __typename?: "DeleteMessageResult";
  deleted: Scalars["Boolean"];
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
  deleteMessage?: Maybe<DeleteMessageResult>;
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

export type MutationDeleteMessageArgs = {
  db: Scalars["String"];
  stream: Scalars["String"];
  at: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  readMessage: ReadMessageResult;
  readStreamForward: Slice;
  readStreamBackward: Slice;
  databases: DatabasesPage;
  database?: Maybe<Db>;
};

export type QueryReadMessageArgs = {
  db: Scalars["String"];
  name: Scalars["String"];
  at: Scalars["Int"];
};

export type QueryReadStreamForwardArgs = {
  db: Scalars["String"];
  name: Scalars["String"];
  from: Scalars["Int"];
  limit: Scalars["Int"];
};

export type QueryReadStreamBackwardArgs = {
  db: Scalars["String"];
  name: Scalars["String"];
  from: Scalars["Int"];
  limit: Scalars["Int"];
};

export type QueryDatabaseArgs = {
  name: Scalars["String"];
};

export type ReadMessageResult = {
  __typename?: "ReadMessageResult";
  found: Scalars["Boolean"];
  message?: Maybe<Message>;
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
  messages: Array<Message>;
  reverse: Scalars["Boolean"];
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

export type DatabasesQueryVariables = {};

export type DatabasesQuery = { __typename?: "Query" } & {
  databases: { __typename?: "DatabasesPage" } & Pick<DatabasesPage, "names">;
};

export type LoginMutationVariables = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<{ __typename?: "LoginResult" } & Pick<LoginResult, "token">>;
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

export type DeleteMessageMutationVariables = {
  database: Scalars["String"];
  stream: Scalars["String"];
  position: Scalars["Int"];
};

export type DeleteMessageMutation = { __typename?: "Mutation" } & {
  deleteMessage: Maybe<
    { __typename?: "DeleteMessageResult" } & Pick<
      DeleteMessageResult,
      "deleted"
    >
  >;
};

export type ListStreamQueryVariables = {
  database: Scalars["String"];
  stream: Scalars["String"];
  from: Scalars["Int"];
  limit: Scalars["Int"];
};

export type ListStreamQuery = { __typename?: "Query" } & {
  readStreamBackward: { __typename?: "Slice" } & Pick<
    Slice,
    "stream" | "from" | "next" | "hasNext" | "head"
  > & {
      messages: Array<
        { __typename?: "Message" } & Pick<
          Message,
          "position" | "timestamp" | "type" | "value"
        >
      >;
    };
};

export type StreamsQueryQueryVariables = {
  database: Scalars["String"];
};

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

export const DatabasesDocument = gql`
  query Databases {
    databases {
      names
    }
  }
`;
export type DatabasesComponentProps = Omit<
  ReactApollo.QueryProps<DatabasesQuery, DatabasesQueryVariables>,
  "query"
>;

export const DatabasesComponent = (props: DatabasesComponentProps) => (
  <ReactApollo.Query<DatabasesQuery, DatabasesQueryVariables>
    query={DatabasesDocument}
    {...props}
  />
);

export type DatabasesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<DatabasesQuery, DatabasesQueryVariables>
> &
  TChildProps;
export function withDatabases<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DatabasesQuery,
    DatabasesQueryVariables,
    DatabasesProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    DatabasesQuery,
    DatabasesQueryVariables,
    DatabasesProps<TChildProps>
  >(DatabasesDocument, {
    alias: "withDatabases",
    ...operationOptions
  });
}
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(email: $username, password: $password) {
      token
    }
  }
`;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;
export type LoginComponentProps = Omit<
  ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>,
  "mutation"
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: "withLogin",
    ...operationOptions
  });
}
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
export const DeleteMessageDocument = gql`
  mutation DeleteMessage(
    $database: String!
    $stream: String!
    $position: Int!
  ) {
    deleteMessage(db: $database, stream: $stream, at: $position) {
      deleted
    }
  }
`;
export type DeleteMessageMutationFn = ReactApollo.MutationFn<
  DeleteMessageMutation,
  DeleteMessageMutationVariables
>;
export type DeleteMessageComponentProps = Omit<
  ReactApollo.MutationProps<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
  >,
  "mutation"
>;

export const DeleteMessageComponent = (props: DeleteMessageComponentProps) => (
  <ReactApollo.Mutation<DeleteMessageMutation, DeleteMessageMutationVariables>
    mutation={DeleteMessageDocument}
    {...props}
  />
);

export type DeleteMessageProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteMessageMutation, DeleteMessageMutationVariables>
> &
  TChildProps;
export function withDeleteMessage<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeleteMessageMutation,
    DeleteMessageMutationVariables,
    DeleteMessageProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteMessageMutation,
    DeleteMessageMutationVariables,
    DeleteMessageProps<TChildProps>
  >(DeleteMessageDocument, {
    alias: "withDeleteMessage",
    ...operationOptions
  });
}
export const ListStreamDocument = gql`
  query ListStream(
    $database: String!
    $stream: String!
    $from: Int!
    $limit: Int!
  ) {
    readStreamBackward(
      db: $database
      name: $stream
      from: $from
      limit: $limit
    ) {
      stream
      from
      next
      hasNext
      head
      messages {
        position
        timestamp
        type
        value
      }
    }
  }
`;
export type ListStreamComponentProps = Omit<
  ReactApollo.QueryProps<ListStreamQuery, ListStreamQueryVariables>,
  "query"
> &
  ({ variables: ListStreamQueryVariables; skip?: false } | { skip: true });

export const ListStreamComponent = (props: ListStreamComponentProps) => (
  <ReactApollo.Query<ListStreamQuery, ListStreamQueryVariables>
    query={ListStreamDocument}
    {...props}
  />
);

export type ListStreamProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ListStreamQuery, ListStreamQueryVariables>
> &
  TChildProps;
export function withListStream<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ListStreamQuery,
    ListStreamQueryVariables,
    ListStreamProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    ListStreamQuery,
    ListStreamQueryVariables,
    ListStreamProps<TChildProps>
  >(ListStreamDocument, {
    alias: "withListStream",
    ...operationOptions
  });
}
export const StreamsQueryDocument = gql`
  query StreamsQuery($database: String!) {
    database(name: $database) {
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
> &
  ({ variables: StreamsQueryQueryVariables; skip?: false } | { skip: true });

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

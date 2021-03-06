import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
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
   __typename?: 'AppendResult';
  from: Scalars['Int'];
  count: Scalars['Int'];
  head: Scalars['Int'];
};


export type CreateDatabaseResult = {
   __typename?: 'CreateDatabaseResult';
  Name: Scalars['String'];
};

export type DatabasesPage = {
   __typename?: 'DatabasesPage';
  total: Scalars['Int'];
  names?: Maybe<Array<Scalars['String']>>;
};

export type Db = {
   __typename?: 'DB';
  name: Scalars['String'];
};

export type DeleteMessageResult = {
   __typename?: 'DeleteMessageResult';
  deleted: Scalars['Boolean'];
};

export type DeleteStreamResult = {
   __typename?: 'DeleteStreamResult';
  deleted: Scalars['Boolean'];
};

export type LoginResult = {
   __typename?: 'LoginResult';
  email: Scalars['String'];
  token: Scalars['String'];
};

export type Message = {
   __typename?: 'Message';
  position: Scalars['Int'];
  timestamp: Scalars['Timestamp'];
  type: Scalars['String'];
  value: Scalars['Bytes'];
  header: Scalars['Bytes'];
};

export type MessageInput = {
  type: Scalars['String'];
  value: Scalars['Bytes'];
};

export type Mutation = {
   __typename?: 'Mutation';
  register?: Maybe<RegistrationResult>;
  createDatabase?: Maybe<CreateDatabaseResult>;
  appendStream?: Maybe<AppendResult>;
  login?: Maybe<LoginResult>;
  deleteMessage?: Maybe<DeleteMessageResult>;
  deleteStream?: Maybe<DeleteStreamResult>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateDatabaseArgs = {
  name: Scalars['String'];
};


export type MutationAppendStreamArgs = {
  db: Scalars['String'];
  stream: Scalars['String'];
  messages: Array<MessageInput>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  db: Scalars['String'];
  stream: Scalars['String'];
  at: Scalars['Int'];
};


export type MutationDeleteStreamArgs = {
  db: Scalars['String'];
  stream: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  readMessage: ReadMessageResult;
  readStreamForward: Slice;
  readStreamBackward: Slice;
  streams: StreamsPage;
  databases: DatabasesPage;
  database?: Maybe<Db>;
};


export type QueryReadMessageArgs = {
  db: Scalars['String'];
  name: Scalars['String'];
  at: Scalars['Int'];
};


export type QueryReadStreamForwardArgs = {
  db: Scalars['String'];
  name: Scalars['String'];
  from: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryReadStreamBackwardArgs = {
  db: Scalars['String'];
  name: Scalars['String'];
  from: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryStreamsArgs = {
  db: Scalars['String'];
  filter?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryDatabaseArgs = {
  name: Scalars['String'];
};

export type ReadMessageResult = {
   __typename?: 'ReadMessageResult';
  found: Scalars['Boolean'];
  message?: Maybe<Message>;
};

export type RegistrationResult = {
   __typename?: 'RegistrationResult';
  email: Scalars['String'];
  token: Scalars['String'];
};

export type Slice = {
   __typename?: 'Slice';
  stream: Scalars['String'];
  from: Scalars['Int'];
  next: Scalars['Int'];
  hasNext: Scalars['Boolean'];
  head: Scalars['Int'];
  messages: Array<Message>;
  reverse: Scalars['Boolean'];
};

export type StreamsPage = {
   __typename?: 'StreamsPage';
  db: Scalars['String'];
  names?: Maybe<Array<Scalars['String']>>;
  filter: Scalars['String'];
  limit: Scalars['Int'];
  cursor: Scalars['String'];
  hasNext: Scalars['Boolean'];
  nextCursor: Scalars['String'];
  hasPrevious: Scalars['Boolean'];
  previousCursor: Scalars['String'];
  reverse: Scalars['Boolean'];
};


export type StreamsQueryQueryVariables = {
  database: Scalars['String'];
  filter: Scalars['String'];
  cursor: Scalars['String'];
  reverse: Scalars['Boolean'];
  limit?: Maybe<Scalars['Int']>;
};


export type StreamsQueryQuery = (
  { __typename?: 'Query' }
  & { streams: (
    { __typename?: 'StreamsPage' }
    & Pick<StreamsPage, 'names'>
  ) }
);

export type DatabasesQueryVariables = {};


export type DatabasesQuery = (
  { __typename?: 'Query' }
  & { databases: (
    { __typename?: 'DatabasesPage' }
    & Pick<DatabasesPage, 'names'>
  ) }
);

export type LoginMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'token'>
  )> }
);

export type DeleteMessageMutationVariables = {
  database: Scalars['String'];
  stream: Scalars['String'];
  position: Scalars['Int'];
};


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & { deleteMessage?: Maybe<(
    { __typename?: 'DeleteMessageResult' }
    & Pick<DeleteMessageResult, 'deleted'>
  )> }
);

export type ReadStreamBackwardQueryVariables = {
  database: Scalars['String'];
  stream: Scalars['String'];
  from: Scalars['Int'];
  limit: Scalars['Int'];
};


export type ReadStreamBackwardQuery = (
  { __typename?: 'Query' }
  & { readStreamBackward: (
    { __typename?: 'Slice' }
    & Pick<Slice, 'stream' | 'from' | 'next' | 'hasNext' | 'head' | 'reverse'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'position' | 'timestamp' | 'type' | 'value' | 'header'>
    )> }
  ) }
);

export type ReadStreamForwardQueryVariables = {
  database: Scalars['String'];
  stream: Scalars['String'];
  from: Scalars['Int'];
  limit: Scalars['Int'];
};


export type ReadStreamForwardQuery = (
  { __typename?: 'Query' }
  & { readStreamForward: (
    { __typename?: 'Slice' }
    & Pick<Slice, 'stream' | 'from' | 'next' | 'hasNext' | 'head' | 'reverse'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'position' | 'timestamp' | 'type' | 'value' | 'header'>
    )> }
  ) }
);

export type ReadMessageForwardQueryVariables = {
  database: Scalars['String'];
  stream: Scalars['String'];
  from: Scalars['Int'];
};


export type ReadMessageForwardQuery = (
  { __typename?: 'Query' }
  & { readStreamForward: (
    { __typename?: 'Slice' }
    & Pick<Slice, 'head' | 'next' | 'hasNext'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'position' | 'timestamp' | 'type' | 'value' | 'header'>
    )> }
  ) }
);

export type AppendSingleMutationVariables = {
  db: Scalars['String'];
  stream: Scalars['String'];
  eventtype: Scalars['String'];
  payload: Scalars['Bytes'];
};


export type AppendSingleMutation = (
  { __typename?: 'Mutation' }
  & { appendStream?: Maybe<(
    { __typename?: 'AppendResult' }
    & Pick<AppendResult, 'from'>
  )> }
);


export const StreamsQueryDocument = gql`
    query StreamsQuery($database: String!, $filter: String!, $cursor: String!, $reverse: Boolean!, $limit: Int) {
  streams(db: $database, filter: $filter, cursor: $cursor, reverse: $reverse, limit: $limit) {
    names
  }
}
    `;
export type StreamsQueryComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<StreamsQueryQuery, StreamsQueryQueryVariables>, 'query'> & ({ variables: StreamsQueryQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const StreamsQueryComponent = (props: StreamsQueryComponentProps) => (
      <ApolloReactComponents.Query<StreamsQueryQuery, StreamsQueryQueryVariables> query={StreamsQueryDocument} {...props} />
    );
    
export type StreamsQueryProps<TChildProps = {}> = ApolloReactHoc.DataProps<StreamsQueryQuery, StreamsQueryQueryVariables> & TChildProps;
export function withStreamsQuery<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  StreamsQueryQuery,
  StreamsQueryQueryVariables,
  StreamsQueryProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, StreamsQueryQuery, StreamsQueryQueryVariables, StreamsQueryProps<TChildProps>>(StreamsQueryDocument, {
      alias: 'streamsQuery',
      ...operationOptions
    });
};

/**
 * __useStreamsQueryQuery__
 *
 * To run a query within a React component, call `useStreamsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamsQueryQuery({
 *   variables: {
 *      database: // value for 'database'
 *      filter: // value for 'filter'
 *      cursor: // value for 'cursor'
 *      reverse: // value for 'reverse'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useStreamsQueryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StreamsQueryQuery, StreamsQueryQueryVariables>) {
        return ApolloReactHooks.useQuery<StreamsQueryQuery, StreamsQueryQueryVariables>(StreamsQueryDocument, baseOptions);
      }
export function useStreamsQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StreamsQueryQuery, StreamsQueryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<StreamsQueryQuery, StreamsQueryQueryVariables>(StreamsQueryDocument, baseOptions);
        }
export type StreamsQueryQueryHookResult = ReturnType<typeof useStreamsQueryQuery>;
export type StreamsQueryLazyQueryHookResult = ReturnType<typeof useStreamsQueryLazyQuery>;
export type StreamsQueryQueryResult = ApolloReactCommon.QueryResult<StreamsQueryQuery, StreamsQueryQueryVariables>;
export const DatabasesDocument = gql`
    query Databases {
  databases {
    names
  }
}
    `;
export type DatabasesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<DatabasesQuery, DatabasesQueryVariables>, 'query'>;

    export const DatabasesComponent = (props: DatabasesComponentProps) => (
      <ApolloReactComponents.Query<DatabasesQuery, DatabasesQueryVariables> query={DatabasesDocument} {...props} />
    );
    
export type DatabasesProps<TChildProps = {}> = ApolloReactHoc.DataProps<DatabasesQuery, DatabasesQueryVariables> & TChildProps;
export function withDatabases<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DatabasesQuery,
  DatabasesQueryVariables,
  DatabasesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, DatabasesQuery, DatabasesQueryVariables, DatabasesProps<TChildProps>>(DatabasesDocument, {
      alias: 'databases',
      ...operationOptions
    });
};

/**
 * __useDatabasesQuery__
 *
 * To run a query within a React component, call `useDatabasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDatabasesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDatabasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDatabasesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DatabasesQuery, DatabasesQueryVariables>) {
        return ApolloReactHooks.useQuery<DatabasesQuery, DatabasesQueryVariables>(DatabasesDocument, baseOptions);
      }
export function useDatabasesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DatabasesQuery, DatabasesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DatabasesQuery, DatabasesQueryVariables>(DatabasesDocument, baseOptions);
        }
export type DatabasesQueryHookResult = ReturnType<typeof useDatabasesQuery>;
export type DatabasesLazyQueryHookResult = ReturnType<typeof useDatabasesLazyQuery>;
export type DatabasesQueryResult = ApolloReactCommon.QueryResult<DatabasesQuery, DatabasesQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(email: $username, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> & TChildProps;
export function withLogin<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($database: String!, $stream: String!, $position: Int!) {
  deleteMessage(db: $database, stream: $stream, at: $position) {
    deleted
  }
}
    `;
export type DeleteMessageMutationFn = ApolloReactCommon.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;
export type DeleteMessageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteMessageMutation, DeleteMessageMutationVariables>, 'mutation'>;

    export const DeleteMessageComponent = (props: DeleteMessageComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteMessageMutation, DeleteMessageMutationVariables> mutation={DeleteMessageDocument} {...props} />
    );
    
export type DeleteMessageProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteMessageMutation, DeleteMessageMutationVariables> & TChildProps;
export function withDeleteMessage<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteMessageMutation,
  DeleteMessageMutationVariables,
  DeleteMessageProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteMessageMutation, DeleteMessageMutationVariables, DeleteMessageProps<TChildProps>>(DeleteMessageDocument, {
      alias: 'deleteMessage',
      ...operationOptions
    });
};

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      database: // value for 'database'
 *      stream: // value for 'stream'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = ApolloReactCommon.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const ReadStreamBackwardDocument = gql`
    query ReadStreamBackward($database: String!, $stream: String!, $from: Int!, $limit: Int!) {
  readStreamBackward(db: $database, name: $stream, from: $from, limit: $limit) {
    stream
    from
    next
    hasNext
    head
    reverse
    messages {
      position
      timestamp
      type
      value
      header
    }
  }
}
    `;
export type ReadStreamBackwardComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ReadStreamBackwardQuery, ReadStreamBackwardQueryVariables>, 'query'> & ({ variables: ReadStreamBackwardQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ReadStreamBackwardComponent = (props: ReadStreamBackwardComponentProps) => (
      <ApolloReactComponents.Query<ReadStreamBackwardQuery, ReadStreamBackwardQueryVariables> query={ReadStreamBackwardDocument} {...props} />
    );
    
export type ReadStreamBackwardProps<TChildProps = {}> = ApolloReactHoc.DataProps<ReadStreamBackwardQuery, ReadStreamBackwardQueryVariables> & TChildProps;
export function withReadStreamBackward<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ReadStreamBackwardQuery,
  ReadStreamBackwardQueryVariables,
  ReadStreamBackwardProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, ReadStreamBackwardQuery, ReadStreamBackwardQueryVariables, ReadStreamBackwardProps<TChildProps>>(ReadStreamBackwardDocument, {
      alias: 'readStreamBackward',
      ...operationOptions
    });
};

/**
 * __useReadStreamBackwardQuery__
 *
 * To run a query within a React component, call `useReadStreamBackwardQuery` and pass it any options that fit your needs.
 * When your component renders, `useReadStreamBackwardQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReadStreamBackwardQuery({
 *   variables: {
 *      database: // value for 'database'
 *      stream: // value for 'stream'
 *      from: // value for 'from'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useReadStreamBackwardQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReadStreamBackwardQuery, ReadStreamBackwardQueryVariables>) {
        return ApolloReactHooks.useQuery<ReadStreamBackwardQuery, ReadStreamBackwardQueryVariables>(ReadStreamBackwardDocument, baseOptions);
      }
export function useReadStreamBackwardLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReadStreamBackwardQuery, ReadStreamBackwardQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReadStreamBackwardQuery, ReadStreamBackwardQueryVariables>(ReadStreamBackwardDocument, baseOptions);
        }
export type ReadStreamBackwardQueryHookResult = ReturnType<typeof useReadStreamBackwardQuery>;
export type ReadStreamBackwardLazyQueryHookResult = ReturnType<typeof useReadStreamBackwardLazyQuery>;
export type ReadStreamBackwardQueryResult = ApolloReactCommon.QueryResult<ReadStreamBackwardQuery, ReadStreamBackwardQueryVariables>;
export const ReadStreamForwardDocument = gql`
    query ReadStreamForward($database: String!, $stream: String!, $from: Int!, $limit: Int!) {
  readStreamForward(db: $database, name: $stream, from: $from, limit: $limit) {
    stream
    from
    next
    hasNext
    head
    reverse
    messages {
      position
      timestamp
      type
      value
      header
    }
  }
}
    `;
export type ReadStreamForwardComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ReadStreamForwardQuery, ReadStreamForwardQueryVariables>, 'query'> & ({ variables: ReadStreamForwardQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ReadStreamForwardComponent = (props: ReadStreamForwardComponentProps) => (
      <ApolloReactComponents.Query<ReadStreamForwardQuery, ReadStreamForwardQueryVariables> query={ReadStreamForwardDocument} {...props} />
    );
    
export type ReadStreamForwardProps<TChildProps = {}> = ApolloReactHoc.DataProps<ReadStreamForwardQuery, ReadStreamForwardQueryVariables> & TChildProps;
export function withReadStreamForward<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ReadStreamForwardQuery,
  ReadStreamForwardQueryVariables,
  ReadStreamForwardProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, ReadStreamForwardQuery, ReadStreamForwardQueryVariables, ReadStreamForwardProps<TChildProps>>(ReadStreamForwardDocument, {
      alias: 'readStreamForward',
      ...operationOptions
    });
};

/**
 * __useReadStreamForwardQuery__
 *
 * To run a query within a React component, call `useReadStreamForwardQuery` and pass it any options that fit your needs.
 * When your component renders, `useReadStreamForwardQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReadStreamForwardQuery({
 *   variables: {
 *      database: // value for 'database'
 *      stream: // value for 'stream'
 *      from: // value for 'from'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useReadStreamForwardQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReadStreamForwardQuery, ReadStreamForwardQueryVariables>) {
        return ApolloReactHooks.useQuery<ReadStreamForwardQuery, ReadStreamForwardQueryVariables>(ReadStreamForwardDocument, baseOptions);
      }
export function useReadStreamForwardLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReadStreamForwardQuery, ReadStreamForwardQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReadStreamForwardQuery, ReadStreamForwardQueryVariables>(ReadStreamForwardDocument, baseOptions);
        }
export type ReadStreamForwardQueryHookResult = ReturnType<typeof useReadStreamForwardQuery>;
export type ReadStreamForwardLazyQueryHookResult = ReturnType<typeof useReadStreamForwardLazyQuery>;
export type ReadStreamForwardQueryResult = ApolloReactCommon.QueryResult<ReadStreamForwardQuery, ReadStreamForwardQueryVariables>;
export const ReadMessageForwardDocument = gql`
    query ReadMessageForward($database: String!, $stream: String!, $from: Int!) {
  readStreamForward(db: $database, name: $stream, from: $from, limit: 1) {
    head
    next
    hasNext
    messages {
      position
      timestamp
      type
      value
      header
    }
  }
}
    `;
export type ReadMessageForwardComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ReadMessageForwardQuery, ReadMessageForwardQueryVariables>, 'query'> & ({ variables: ReadMessageForwardQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ReadMessageForwardComponent = (props: ReadMessageForwardComponentProps) => (
      <ApolloReactComponents.Query<ReadMessageForwardQuery, ReadMessageForwardQueryVariables> query={ReadMessageForwardDocument} {...props} />
    );
    
export type ReadMessageForwardProps<TChildProps = {}> = ApolloReactHoc.DataProps<ReadMessageForwardQuery, ReadMessageForwardQueryVariables> & TChildProps;
export function withReadMessageForward<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ReadMessageForwardQuery,
  ReadMessageForwardQueryVariables,
  ReadMessageForwardProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, ReadMessageForwardQuery, ReadMessageForwardQueryVariables, ReadMessageForwardProps<TChildProps>>(ReadMessageForwardDocument, {
      alias: 'readMessageForward',
      ...operationOptions
    });
};

/**
 * __useReadMessageForwardQuery__
 *
 * To run a query within a React component, call `useReadMessageForwardQuery` and pass it any options that fit your needs.
 * When your component renders, `useReadMessageForwardQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReadMessageForwardQuery({
 *   variables: {
 *      database: // value for 'database'
 *      stream: // value for 'stream'
 *      from: // value for 'from'
 *   },
 * });
 */
export function useReadMessageForwardQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ReadMessageForwardQuery, ReadMessageForwardQueryVariables>) {
        return ApolloReactHooks.useQuery<ReadMessageForwardQuery, ReadMessageForwardQueryVariables>(ReadMessageForwardDocument, baseOptions);
      }
export function useReadMessageForwardLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReadMessageForwardQuery, ReadMessageForwardQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ReadMessageForwardQuery, ReadMessageForwardQueryVariables>(ReadMessageForwardDocument, baseOptions);
        }
export type ReadMessageForwardQueryHookResult = ReturnType<typeof useReadMessageForwardQuery>;
export type ReadMessageForwardLazyQueryHookResult = ReturnType<typeof useReadMessageForwardLazyQuery>;
export type ReadMessageForwardQueryResult = ApolloReactCommon.QueryResult<ReadMessageForwardQuery, ReadMessageForwardQueryVariables>;
export const AppendSingleDocument = gql`
    mutation AppendSingle($db: String!, $stream: String!, $eventtype: String!, $payload: Bytes!) {
  appendStream(db: $db, stream: $stream, messages: [{type: $eventtype, value: $payload}]) {
    from
  }
}
    `;
export type AppendSingleMutationFn = ApolloReactCommon.MutationFunction<AppendSingleMutation, AppendSingleMutationVariables>;
export type AppendSingleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AppendSingleMutation, AppendSingleMutationVariables>, 'mutation'>;

    export const AppendSingleComponent = (props: AppendSingleComponentProps) => (
      <ApolloReactComponents.Mutation<AppendSingleMutation, AppendSingleMutationVariables> mutation={AppendSingleDocument} {...props} />
    );
    
export type AppendSingleProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AppendSingleMutation, AppendSingleMutationVariables> & TChildProps;
export function withAppendSingle<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AppendSingleMutation,
  AppendSingleMutationVariables,
  AppendSingleProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AppendSingleMutation, AppendSingleMutationVariables, AppendSingleProps<TChildProps>>(AppendSingleDocument, {
      alias: 'appendSingle',
      ...operationOptions
    });
};

/**
 * __useAppendSingleMutation__
 *
 * To run a mutation, you first call `useAppendSingleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppendSingleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appendSingleMutation, { data, loading, error }] = useAppendSingleMutation({
 *   variables: {
 *      db: // value for 'db'
 *      stream: // value for 'stream'
 *      eventtype: // value for 'eventtype'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useAppendSingleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AppendSingleMutation, AppendSingleMutationVariables>) {
        return ApolloReactHooks.useMutation<AppendSingleMutation, AppendSingleMutationVariables>(AppendSingleDocument, baseOptions);
      }
export type AppendSingleMutationHookResult = ReturnType<typeof useAppendSingleMutation>;
export type AppendSingleMutationResult = ApolloReactCommon.MutationResult<AppendSingleMutation>;
export type AppendSingleMutationOptions = ApolloReactCommon.BaseMutationOptions<AppendSingleMutation, AppendSingleMutationVariables>;
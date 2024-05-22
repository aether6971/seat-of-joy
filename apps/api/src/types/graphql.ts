import { GraphQLResolveInfo } from 'graphql';
import { Context } from './contextType';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Error = {
  __typename?: 'Error';
  code?: Maybe<Scalars['Int']['output']>;
  message: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPasswordChange: ResponseType;
  login: ResponseType;
  logout: ResponseType;
  logoutAll: ResponseType;
  register: ResponseType;
  sendForgotPasswordEmail: ResponseType;
};


export type MutationForgotPasswordChangeArgs = {
  key: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']['output']>;
  me?: Maybe<MeResponse>;
};


export type QueryHelloArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ResponseType = {
  __typename?: 'ResponseType';
  response: UResponseType;
};

export type UResponseType = {
  __typename?: 'UResponseType';
  errors?: Maybe<Array<Error>>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type MeResponse = {
  __typename?: 'meResponse';
  response: UResponseType;
  user?: Maybe<Array<User>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Error: ResolverTypeWrapper<Error>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ResponseType: ResolverTypeWrapper<ResponseType>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UResponseType: ResolverTypeWrapper<UResponseType>;
  User: ResolverTypeWrapper<User>;
  meResponse: ResolverTypeWrapper<MeResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Error: Error;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  ResponseType: ResponseType;
  String: Scalars['String']['output'];
  UResponseType: UResponseType;
  User: User;
  meResponse: MeResponse;
};

export type ErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  forgotPasswordChange?: Resolver<ResolversTypes['ResponseType'], ParentType, ContextType, RequireFields<MutationForgotPasswordChangeArgs, 'key' | 'newPassword'>>;
  login?: Resolver<ResolversTypes['ResponseType'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password'>>;
  logout?: Resolver<ResolversTypes['ResponseType'], ParentType, ContextType>;
  logoutAll?: Resolver<ResolversTypes['ResponseType'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['ResponseType'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password' | 'username'>>;
  sendForgotPasswordEmail?: Resolver<ResolversTypes['ResponseType'], ParentType, ContextType, RequireFields<MutationSendForgotPasswordEmailArgs, 'email'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryHelloArgs>>;
  me?: Resolver<Maybe<ResolversTypes['meResponse']>, ParentType, ContextType>;
};

export type ResponseTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ResponseType'] = ResolversParentTypes['ResponseType']> = {
  response?: Resolver<ResolversTypes['UResponseType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UResponseTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UResponseType'] = ResolversParentTypes['UResponseType']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['meResponse'] = ResolversParentTypes['meResponse']> = {
  response?: Resolver<ResolversTypes['UResponseType'], ParentType, ContextType>;
  user?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Error?: ErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponseType?: ResponseTypeResolvers<ContextType>;
  UResponseType?: UResponseTypeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  meResponse?: MeResponseResolvers<ContextType>;
};


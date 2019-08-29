import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface Error {
  __typename?: "Error";
  path: Scalars["String"];
  message: Scalars["String"];
}

export interface Mutation {
  __typename?: "Mutation";
  confirm: Scalars["Boolean"];
  logout: Scalars["Boolean"];
  login?: Maybe<Error[]>;
  register?: Maybe<Error[]>;
}

export interface MutationConfirmArgs {
  id: Scalars["String"];
}

export interface MutationLoginArgs {
  username: Scalars["String"];
  password: Scalars["String"];
}

export interface MutationRegisterArgs {
  email: Scalars["String"];
  username: Scalars["String"];
  password: Scalars["String"];
}

export interface Query {
  __typename?: "Query";
  test?: Maybe<Scalars["Boolean"]>;
  currentUser?: Maybe<User>;
  login?: Maybe<Scalars["Boolean"]>;
}

export interface User {
  __typename?: "User";
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export interface StitchingResolver<TResult, TParent, TContext, TArgs> {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export interface ResolversTypes {
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Error: ResolverTypeWrapper<Error>;
}

/** Mapping between all available schema types and the resolvers parents */
export interface ResolversParentTypes {
  Query: {};
  Boolean: Scalars["Boolean"];
  User: User;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Mutation: {};
  Error: Error;
}

export interface ErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Error"] = ResolversParentTypes["Error"]
> {
  path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}

export interface MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> {
  confirm?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationConfirmArgs, "id">
  >;
  logout?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  login?: Resolver<
    Maybe<Array<ResolversTypes["Error"]>>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "username" | "password">
  >;
  register?: Resolver<
    Maybe<Array<ResolversTypes["Error"]>>,
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "email" | "username" | "password">
  >;
}

export interface QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> {
  test?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  currentUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType
  >;
  login?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
}

export interface UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}

export interface Resolvers<ContextType = any> {
  Error?: ErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

export interface IntrospectionResultData {
  __schema: {
    types: Array<{
      kind: string;
      name: string;
      possibleTypes: Array<{
        name: string;
      }>;
    }>;
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: []
  }
};

export default result;

// @ts-nocheck
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /**
   * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
   */
  Jwt: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

export type Attendee = Node & {
  __typename?: 'Attendee';
  createdAt: Scalars['Datetime'];
  email: Scalars['String'];
  /** Reads a single `Event` that is related to this `Attendee`. */
  event?: Maybe<Event>;
  eventId: Scalars['UUID'];
  firstname: Scalars['String'];
  id: Scalars['UUID'];
  lastname: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Registration` that is related to this `Attendee`. */
  registration?: Maybe<Registration>;
  registrationId?: Maybe<Scalars['UUID']>;
  status: EventStatus;
  /** Reads a single `TestTable` that is related to this `Attendee`. */
  testTable?: Maybe<TestTable>;
  updatedAt: Scalars['Datetime'];
};

/**
 * A condition to be used against `Attendee` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AttendeeCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `registrationId` field. */
  registrationId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<EventStatus>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Attendee` object types. All fields are combined with a logical ‘and.’ */
export type AttendeeFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AttendeeFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `eventId` field. */
  eventId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AttendeeFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AttendeeFilter>>;
  /** Filter by the object’s `registrationId` field. */
  registrationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<EventStatusFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Attendee` */
export type AttendeeInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email: Scalars['String'];
  eventId: Scalars['UUID'];
  firstname: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  lastname: Scalars['String'];
  registrationId?: InputMaybe<Scalars['UUID']>;
  status: EventStatus;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Attendee`. Fields that are set will be updated. */
export type AttendeePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  eventId?: InputMaybe<Scalars['UUID']>;
  firstname?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  lastname?: InputMaybe<Scalars['String']>;
  registrationId?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<EventStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Attendee` values. */
export type AttendeesConnection = {
  __typename?: 'AttendeesConnection';
  /** A list of edges which contains the `Attendee` and cursor to aid in pagination. */
  edges: Array<AttendeesEdge>;
  /** A list of `Attendee` objects. */
  nodes: Array<Attendee>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Attendee` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Attendee` edge in the connection. */
export type AttendeesEdge = {
  __typename?: 'AttendeesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Attendee` at the end of the edge. */
  node: Attendee;
};

/** Methods to use when ordering `Attendee`. */
export enum AttendeesOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RegistrationIdAsc = 'REGISTRATION_ID_ASC',
  RegistrationIdDesc = 'REGISTRATION_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** All input for the create `Attendee` mutation. */
export type CreateAttendeeInput = {
  /** The `Attendee` to be created by this mutation. */
  attendee: AttendeeInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our create `Attendee` mutation. */
export type CreateAttendeePayload = {
  __typename?: 'CreateAttendeePayload';
  /** The `Attendee` that was created by this mutation. */
  attendee?: Maybe<Attendee>;
  /** An edge for our `Attendee`. May be used by Relay 1. */
  attendeeEdge?: Maybe<AttendeesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `Attendee`. */
  event?: Maybe<Event>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Registration` that is related to this `Attendee`. */
  registration?: Maybe<Registration>;
};


/** The output of our create `Attendee` mutation. */
export type CreateAttendeePayloadAttendeeEdgeArgs = {
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};

/** All input for the create `Event` mutation. */
export type CreateEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Event` to be created by this mutation. */
  event: EventInput;
};

/** The output of our create `Event` mutation. */
export type CreateEventPayload = {
  __typename?: 'CreateEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Event` that was created by this mutation. */
  event?: Maybe<Event>;
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>;
  /** Reads a single `Organization` that is related to this `Event`. */
  organization?: Maybe<Organization>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Event` mutation. */
export type CreateEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};

/** All input for the create `Organization` mutation. */
export type CreateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Organization` to be created by this mutation. */
  organization: OrganizationInput;
};

/** All input for the create `OrganizationMembership` mutation. */
export type CreateOrganizationMembershipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `OrganizationMembership` to be created by this mutation. */
  organizationMembership: OrganizationMembershipInput;
};

/** The output of our create `OrganizationMembership` mutation. */
export type CreateOrganizationMembershipPayload = {
  __typename?: 'CreateOrganizationMembershipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  /** The `OrganizationMembership` that was created by this mutation. */
  organizationMembership?: Maybe<OrganizationMembership>;
  /** An edge for our `OrganizationMembership`. May be used by Relay 1. */
  organizationMembershipEdge?: Maybe<OrganizationMembershipsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
};


/** The output of our create `OrganizationMembership` mutation. */
export type CreateOrganizationMembershipPayloadOrganizationMembershipEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};

/** The output of our create `Organization` mutation. */
export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Organization` that was created by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Organization` mutation. */
export type CreateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

/** All input for the create `Registration` mutation. */
export type CreateRegistrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Registration` to be created by this mutation. */
  registration: RegistrationInput;
};

/** The output of our create `Registration` mutation. */
export type CreateRegistrationPayload = {
  __typename?: 'CreateRegistrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `Registration`. */
  event?: Maybe<Event>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Registration` that was created by this mutation. */
  registration?: Maybe<Registration>;
  /** An edge for our `Registration`. May be used by Relay 1. */
  registrationEdge?: Maybe<RegistrationsEdge>;
};


/** The output of our create `Registration` mutation. */
export type CreateRegistrationPayloadRegistrationEdgeArgs = {
  orderBy?: InputMaybe<Array<RegistrationsOrderBy>>;
};

/** All input for the create `TestTable` mutation. */
export type CreateTestTableInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `TestTable` to be created by this mutation. */
  testTable: TestTableInput;
};

/** The output of our create `TestTable` mutation. */
export type CreateTestTablePayload = {
  __typename?: 'CreateTestTablePayload';
  /** Reads a single `Attendee` that is related to this `TestTable`. */
  attendee?: Maybe<Attendee>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TestTable` that was created by this mutation. */
  testTable?: Maybe<TestTable>;
  /** An edge for our `TestTable`. May be used by Relay 1. */
  testTableEdge?: Maybe<TestTablesEdge>;
};


/** The output of our create `TestTable` mutation. */
export type CreateTestTablePayloadTestTableEdgeArgs = {
  orderBy?: InputMaybe<Array<TestTablesOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']>>;
};

/** All input for the `deleteAttendeeByEmailAndEventId` mutation. */
export type DeleteAttendeeByEmailAndEventIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  eventId: Scalars['UUID'];
};

/** All input for the `deleteAttendeeByNodeId` mutation. */
export type DeleteAttendeeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Attendee` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteAttendee` mutation. */
export type DeleteAttendeeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Attendee` mutation. */
export type DeleteAttendeePayload = {
  __typename?: 'DeleteAttendeePayload';
  /** The `Attendee` that was deleted by this mutation. */
  attendee?: Maybe<Attendee>;
  /** An edge for our `Attendee`. May be used by Relay 1. */
  attendeeEdge?: Maybe<AttendeesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedAttendeeNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Event` that is related to this `Attendee`. */
  event?: Maybe<Event>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Registration` that is related to this `Attendee`. */
  registration?: Maybe<Registration>;
};


/** The output of our delete `Attendee` mutation. */
export type DeleteAttendeePayloadAttendeeEdgeArgs = {
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};

/** All input for the `deleteEventByNodeId` mutation. */
export type DeleteEventByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Event` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteEventByOrganizationIdAndName` mutation. */
export type DeleteEventByOrganizationIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
};

/** All input for the `deleteEventByOrganizationIdAndSlug` mutation. */
export type DeleteEventByOrganizationIdAndSlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  slug: Scalars['String'];
};

/** All input for the `deleteEvent` mutation. */
export type DeleteEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Event` mutation. */
export type DeleteEventPayload = {
  __typename?: 'DeleteEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedEventNodeId?: Maybe<Scalars['ID']>;
  /** The `Event` that was deleted by this mutation. */
  event?: Maybe<Event>;
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>;
  /** Reads a single `Organization` that is related to this `Event`. */
  organization?: Maybe<Organization>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Event` mutation. */
export type DeleteEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};

export type DeleteFileInput = {
  key: Scalars['String'];
};

export type DeleteFilePayload = {
  __typename?: 'DeleteFilePayload';
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `deleteOrganizationByName` mutation. */
export type DeleteOrganizationByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

/** All input for the `deleteOrganizationByNodeId` mutation. */
export type DeleteOrganizationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Organization` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteOrganizationBySlug` mutation. */
export type DeleteOrganizationBySlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
};

/** All input for the `deleteOrganization` mutation. */
export type DeleteOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteOrganizationMembershipByNodeId` mutation. */
export type DeleteOrganizationMembershipByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `OrganizationMembership` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteOrganizationMembershipByOrganizationIdAndUserId` mutation. */
export type DeleteOrganizationMembershipByOrganizationIdAndUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

/** All input for the `deleteOrganizationMembership` mutation. */
export type DeleteOrganizationMembershipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `OrganizationMembership` mutation. */
export type DeleteOrganizationMembershipPayload = {
  __typename?: 'DeleteOrganizationMembershipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedOrganizationMembershipNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  /** The `OrganizationMembership` that was deleted by this mutation. */
  organizationMembership?: Maybe<OrganizationMembership>;
  /** An edge for our `OrganizationMembership`. May be used by Relay 1. */
  organizationMembershipEdge?: Maybe<OrganizationMembershipsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
};


/** The output of our delete `OrganizationMembership` mutation. */
export type DeleteOrganizationMembershipPayloadOrganizationMembershipEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};

/** The output of our delete `Organization` mutation. */
export type DeleteOrganizationPayload = {
  __typename?: 'DeleteOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedOrganizationNodeId?: Maybe<Scalars['ID']>;
  /** The `Organization` that was deleted by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Organization` mutation. */
export type DeleteOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `deleteRegistrationByNodeId` mutation. */
export type DeleteRegistrationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Registration` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteRegistration` mutation. */
export type DeleteRegistrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Registration` mutation. */
export type DeleteRegistrationPayload = {
  __typename?: 'DeleteRegistrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedRegistrationNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Event` that is related to this `Registration`. */
  event?: Maybe<Event>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Registration` that was deleted by this mutation. */
  registration?: Maybe<Registration>;
  /** An edge for our `Registration`. May be used by Relay 1. */
  registrationEdge?: Maybe<RegistrationsEdge>;
};


/** The output of our delete `Registration` mutation. */
export type DeleteRegistrationPayloadRegistrationEdgeArgs = {
  orderBy?: InputMaybe<Array<RegistrationsOrderBy>>;
};

/** All input for the `deleteTestTableByAttendeeId` mutation. */
export type DeleteTestTableByAttendeeIdInput = {
  attendeeId: Scalars['UUID'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** All input for the `deleteTestTableByNodeId` mutation. */
export type DeleteTestTableByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TestTable` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteTestTable` mutation. */
export type DeleteTestTableInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `TestTable` mutation. */
export type DeleteTestTablePayload = {
  __typename?: 'DeleteTestTablePayload';
  /** Reads a single `Attendee` that is related to this `TestTable`. */
  attendee?: Maybe<Attendee>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedTestTableNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TestTable` that was deleted by this mutation. */
  testTable?: Maybe<TestTable>;
  /** An edge for our `TestTable`. May be used by Relay 1. */
  testTableEdge?: Maybe<TestTablesEdge>;
};


/** The output of our delete `TestTable` mutation. */
export type DeleteTestTablePayloadTestTableEdgeArgs = {
  orderBy?: InputMaybe<Array<TestTablesOrderBy>>;
};

/** All input for the `deleteUserByEmail` mutation. */
export type DeleteUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

/** All input for the `deleteUserByNodeId` mutation. */
export type DeleteUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedUserNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export type Event = Node & {
  __typename?: 'Event';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Attendee`. */
  attendees: AttendeesConnection;
  bookingEndsAt?: Maybe<Scalars['Datetime']>;
  bookingStartsAt?: Maybe<Scalars['Datetime']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  description: Scalars['String'];
  happeningAt?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  lat?: Maybe<Scalars['Float']>;
  lon?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Organization` that is related to this `Event`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  placeName?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Registration`. */
  registrations: RegistrationsConnection;
  slug?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Datetime'];
  zipCode?: Maybe<Scalars['String']>;
};


export type EventAttendeesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AttendeeCondition>;
  filter?: InputMaybe<AttendeeFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};


export type EventRegistrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<RegistrationCondition>;
  filter?: InputMaybe<RegistrationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<RegistrationsOrderBy>>;
};

/** A condition to be used against `Event` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EventCondition = {
  /** Checks for equality with the object’s `bookingEndsAt` field. */
  bookingEndsAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `bookingStartsAt` field. */
  bookingStartsAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `city` field. */
  city?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `happeningAt` field. */
  happeningAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Event` object types. All fields are combined with a logical ‘and.’ */
export type EventFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EventFilter>>;
  /** Filter by the object’s `bookingEndsAt` field. */
  bookingEndsAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `bookingStartsAt` field. */
  bookingStartsAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `city` field. */
  city?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `happeningAt` field. */
  happeningAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EventFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EventFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Event` */
export type EventInput = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  bookingEndsAt?: InputMaybe<Scalars['Datetime']>;
  bookingStartsAt?: InputMaybe<Scalars['Datetime']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description: Scalars['String'];
  happeningAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
  placeName?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `Event`. Fields that are set will be updated. */
export type EventPatch = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  bookingEndsAt?: InputMaybe<Scalars['Datetime']>;
  bookingStartsAt?: InputMaybe<Scalars['Datetime']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  happeningAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  organizationId?: InputMaybe<Scalars['UUID']>;
  placeName?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export enum EventStatus {
  /** Inscription annulée */
  Cancelled = 'CANCELLED',
  /** Présence confirmée à l'évenement */
  Confirmed = 'CONFIRMED',
  /** En attente */
  Idle = 'IDLE'
}

/** A filter to be used against EventStatus fields. All fields are combined with a logical ‘and.’ */
export type EventStatusFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<EventStatus>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<EventStatus>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<EventStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<EventStatus>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<EventStatus>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<EventStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<EventStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<EventStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<EventStatus>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<EventStatus>>;
};

/** A connection to a list of `Event` values. */
export type EventsConnection = {
  __typename?: 'EventsConnection';
  /** A list of edges which contains the `Event` and cursor to aid in pagination. */
  edges: Array<EventsEdge>;
  /** A list of `Event` objects. */
  nodes: Array<Event>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Event` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Event` edge in the connection. */
export type EventsEdge = {
  __typename?: 'EventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Event` at the end of the edge. */
  node: Event;
};

/** Methods to use when ordering `Event`. */
export enum EventsOrderBy {
  BookingEndsAtAsc = 'BOOKING_ENDS_AT_ASC',
  BookingEndsAtDesc = 'BOOKING_ENDS_AT_DESC',
  BookingStartsAtAsc = 'BOOKING_STARTS_AT_ASC',
  BookingStartsAtDesc = 'BOOKING_STARTS_AT_DESC',
  CityAsc = 'CITY_ASC',
  CityDesc = 'CITY_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  HappeningAtAsc = 'HAPPENING_AT_ASC',
  HappeningAtDesc = 'HAPPENING_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type GeneratePresignedPostInput = {
  key: Scalars['String'];
};

export type GeneratePresignedPostPayload = {
  __typename?: 'GeneratePresignedPostPayload';
  fields?: Maybe<Scalars['JSON']>;
  url?: Maybe<Scalars['String']>;
};

/** All input for the `login` mutation. */
export type LoginInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

/** The output of our `login` mutation. */
export type LoginPayload = {
  __typename?: 'LoginPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwt?: Maybe<Scalars['Jwt']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Attendee`. */
  createAttendee?: Maybe<CreateAttendeePayload>;
  /** Creates a single `Event`. */
  createEvent?: Maybe<CreateEventPayload>;
  /** Creates a single `Organization`. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `OrganizationMembership`. */
  createOrganizationMembership?: Maybe<CreateOrganizationMembershipPayload>;
  /** Creates a single `Registration`. */
  createRegistration?: Maybe<CreateRegistrationPayload>;
  /** Creates a single `TestTable`. */
  createTestTable?: Maybe<CreateTestTablePayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Deletes a single `Attendee` using a unique key. */
  deleteAttendee?: Maybe<DeleteAttendeePayload>;
  /** Deletes a single `Attendee` using a unique key. */
  deleteAttendeeByEmailAndEventId?: Maybe<DeleteAttendeePayload>;
  /** Deletes a single `Attendee` using its globally unique id. */
  deleteAttendeeByNodeId?: Maybe<DeleteAttendeePayload>;
  /** Deletes a single `Event` using a unique key. */
  deleteEvent?: Maybe<DeleteEventPayload>;
  /** Deletes a single `Event` using its globally unique id. */
  deleteEventByNodeId?: Maybe<DeleteEventPayload>;
  /** Deletes a single `Event` using a unique key. */
  deleteEventByOrganizationIdAndName?: Maybe<DeleteEventPayload>;
  /** Deletes a single `Event` using a unique key. */
  deleteEventByOrganizationIdAndSlug?: Maybe<DeleteEventPayload>;
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationByName?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using its globally unique id. */
  deleteOrganizationByNodeId?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationBySlug?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `OrganizationMembership` using a unique key. */
  deleteOrganizationMembership?: Maybe<DeleteOrganizationMembershipPayload>;
  /** Deletes a single `OrganizationMembership` using its globally unique id. */
  deleteOrganizationMembershipByNodeId?: Maybe<DeleteOrganizationMembershipPayload>;
  /** Deletes a single `OrganizationMembership` using a unique key. */
  deleteOrganizationMembershipByOrganizationIdAndUserId?: Maybe<DeleteOrganizationMembershipPayload>;
  /** Deletes a single `Registration` using a unique key. */
  deleteRegistration?: Maybe<DeleteRegistrationPayload>;
  /** Deletes a single `Registration` using its globally unique id. */
  deleteRegistrationByNodeId?: Maybe<DeleteRegistrationPayload>;
  /** Deletes a single `TestTable` using a unique key. */
  deleteTestTable?: Maybe<DeleteTestTablePayload>;
  /** Deletes a single `TestTable` using a unique key. */
  deleteTestTableByAttendeeId?: Maybe<DeleteTestTablePayload>;
  /** Deletes a single `TestTable` using its globally unique id. */
  deleteTestTableByNodeId?: Maybe<DeleteTestTablePayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserByNodeId?: Maybe<DeleteUserPayload>;
  generatePresignedPost?: Maybe<GeneratePresignedPostPayload>;
  login?: Maybe<LoginPayload>;
  register?: Maybe<RegisterPayload>;
  /** Updates a single `Attendee` using a unique key and a patch. */
  updateAttendee?: Maybe<UpdateAttendeePayload>;
  /** Updates a single `Attendee` using a unique key and a patch. */
  updateAttendeeByEmailAndEventId?: Maybe<UpdateAttendeePayload>;
  /** Updates a single `Attendee` using its globally unique id and a patch. */
  updateAttendeeByNodeId?: Maybe<UpdateAttendeePayload>;
  /** Updates a single `Event` using a unique key and a patch. */
  updateEvent?: Maybe<UpdateEventPayload>;
  /** Updates a single `Event` using its globally unique id and a patch. */
  updateEventByNodeId?: Maybe<UpdateEventPayload>;
  /** Updates a single `Event` using a unique key and a patch. */
  updateEventByOrganizationIdAndName?: Maybe<UpdateEventPayload>;
  /** Updates a single `Event` using a unique key and a patch. */
  updateEventByOrganizationIdAndSlug?: Maybe<UpdateEventPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationByName?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using its globally unique id and a patch. */
  updateOrganizationByNodeId?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationBySlug?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `OrganizationMembership` using a unique key and a patch. */
  updateOrganizationMembership?: Maybe<UpdateOrganizationMembershipPayload>;
  /** Updates a single `OrganizationMembership` using its globally unique id and a patch. */
  updateOrganizationMembershipByNodeId?: Maybe<UpdateOrganizationMembershipPayload>;
  /** Updates a single `OrganizationMembership` using a unique key and a patch. */
  updateOrganizationMembershipByOrganizationIdAndUserId?: Maybe<UpdateOrganizationMembershipPayload>;
  /** Updates a single `Registration` using a unique key and a patch. */
  updateRegistration?: Maybe<UpdateRegistrationPayload>;
  /** Updates a single `Registration` using its globally unique id and a patch. */
  updateRegistrationByNodeId?: Maybe<UpdateRegistrationPayload>;
  /** Updates a single `TestTable` using a unique key and a patch. */
  updateTestTable?: Maybe<UpdateTestTablePayload>;
  /** Updates a single `TestTable` using a unique key and a patch. */
  updateTestTableByAttendeeId?: Maybe<UpdateTestTablePayload>;
  /** Updates a single `TestTable` using its globally unique id and a patch. */
  updateTestTableByNodeId?: Maybe<UpdateTestTablePayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserByNodeId?: Maybe<UpdateUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAttendeeArgs = {
  input: CreateAttendeeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrganizationMembershipArgs = {
  input: CreateOrganizationMembershipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRegistrationArgs = {
  input: CreateRegistrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTestTableArgs = {
  input: CreateTestTableInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAttendeeArgs = {
  input: DeleteAttendeeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAttendeeByEmailAndEventIdArgs = {
  input: DeleteAttendeeByEmailAndEventIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAttendeeByNodeIdArgs = {
  input: DeleteAttendeeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventArgs = {
  input: DeleteEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventByNodeIdArgs = {
  input: DeleteEventByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventByOrganizationIdAndNameArgs = {
  input: DeleteEventByOrganizationIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventByOrganizationIdAndSlugArgs = {
  input: DeleteEventByOrganizationIdAndSlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFileArgs = {
  input: DeleteFileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationByNameArgs = {
  input: DeleteOrganizationByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationByNodeIdArgs = {
  input: DeleteOrganizationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationBySlugArgs = {
  input: DeleteOrganizationBySlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationMembershipArgs = {
  input: DeleteOrganizationMembershipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationMembershipByNodeIdArgs = {
  input: DeleteOrganizationMembershipByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationMembershipByOrganizationIdAndUserIdArgs = {
  input: DeleteOrganizationMembershipByOrganizationIdAndUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRegistrationArgs = {
  input: DeleteRegistrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRegistrationByNodeIdArgs = {
  input: DeleteRegistrationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTestTableArgs = {
  input: DeleteTestTableInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTestTableByAttendeeIdArgs = {
  input: DeleteTestTableByAttendeeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTestTableByNodeIdArgs = {
  input: DeleteTestTableByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByEmailArgs = {
  input: DeleteUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByNodeIdArgs = {
  input: DeleteUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGeneratePresignedPostArgs = {
  input: GeneratePresignedPostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationLoginArgs = {
  input: LoginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterArgs = {
  input: RegisterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAttendeeArgs = {
  input: UpdateAttendeeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAttendeeByEmailAndEventIdArgs = {
  input: UpdateAttendeeByEmailAndEventIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAttendeeByNodeIdArgs = {
  input: UpdateAttendeeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventByNodeIdArgs = {
  input: UpdateEventByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventByOrganizationIdAndNameArgs = {
  input: UpdateEventByOrganizationIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventByOrganizationIdAndSlugArgs = {
  input: UpdateEventByOrganizationIdAndSlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationByNameArgs = {
  input: UpdateOrganizationByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationByNodeIdArgs = {
  input: UpdateOrganizationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationBySlugArgs = {
  input: UpdateOrganizationBySlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationMembershipArgs = {
  input: UpdateOrganizationMembershipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationMembershipByNodeIdArgs = {
  input: UpdateOrganizationMembershipByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationMembershipByOrganizationIdAndUserIdArgs = {
  input: UpdateOrganizationMembershipByOrganizationIdAndUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRegistrationArgs = {
  input: UpdateRegistrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRegistrationByNodeIdArgs = {
  input: UpdateRegistrationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTestTableArgs = {
  input: UpdateTestTableInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTestTableByAttendeeIdArgs = {
  input: UpdateTestTableByAttendeeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTestTableByNodeIdArgs = {
  input: UpdateTestTableByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByEmailArgs = {
  input: UpdateUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByNodeIdArgs = {
  input: UpdateUserByNodeIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** A company, organization, or institution. */
export type Organization = Node & {
  __typename?: 'Organization';
  createdAt: Scalars['Datetime'];
  description: Scalars['String'];
  /** Reads and enables pagination through a set of `Event`. */
  events: EventsConnection;
  id: Scalars['UUID'];
  /** The URL of the organization's logo. */
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships: OrganizationMembershipsConnection;
  slug?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Datetime'];
};


/** A company, organization, or institution. */
export type OrganizationEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<EventCondition>;
  filter?: InputMaybe<EventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};


/** A company, organization, or institution. */
export type OrganizationOrganizationMembershipsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationMembershipCondition>;
  filter?: InputMaybe<OrganizationMembershipFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};

/**
 * A condition to be used against `Organization` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type OrganizationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Organization` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OrganizationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OrganizationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OrganizationFilter>>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Organization` */
export type OrganizationInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  /** The URL of the organization's logo. */
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  slug?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type OrganizationMembership = Node & {
  __typename?: 'OrganizationMembership';
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  role: OrganizationMembershipsRolesEnum;
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `OrganizationMembership` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type OrganizationMembershipCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `OrganizationMembership` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationMembershipFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OrganizationMembershipFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OrganizationMembershipFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OrganizationMembershipFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `role` field. */
  role?: InputMaybe<OrganizationMembershipsRolesEnumFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `OrganizationMembership` */
export type OrganizationMembershipInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  organizationId: Scalars['UUID'];
  role?: InputMaybe<OrganizationMembershipsRolesEnum>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userId: Scalars['UUID'];
};

/** Represents an update to a `OrganizationMembership`. Fields that are set will be updated. */
export type OrganizationMembershipPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  organizationId?: InputMaybe<Scalars['UUID']>;
  role?: InputMaybe<OrganizationMembershipsRolesEnum>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `OrganizationMembership` values. */
export type OrganizationMembershipsConnection = {
  __typename?: 'OrganizationMembershipsConnection';
  /** A list of edges which contains the `OrganizationMembership` and cursor to aid in pagination. */
  edges: Array<OrganizationMembershipsEdge>;
  /** A list of `OrganizationMembership` objects. */
  nodes: Array<OrganizationMembership>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `OrganizationMembership` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `OrganizationMembership` edge in the connection. */
export type OrganizationMembershipsEdge = {
  __typename?: 'OrganizationMembershipsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `OrganizationMembership` at the end of the edge. */
  node: OrganizationMembership;
};

/** Methods to use when ordering `OrganizationMembership`. */
export enum OrganizationMembershipsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export enum OrganizationMembershipsRolesEnum {
  /** Admin of the organization */
  Admin = 'ADMIN',
  /** Client of the organization */
  Client = 'CLIENT',
  /** Member of the organization */
  Developer = 'DEVELOPER',
  /** Guest of the organization */
  Guest = 'GUEST',
  /** Manager of the organization */
  Manager = 'MANAGER',
  /** Owner of the organization */
  Owner = 'OWNER'
}

/** A filter to be used against OrganizationMembershipsRolesEnum fields. All fields are combined with a logical ‘and.’ */
export type OrganizationMembershipsRolesEnumFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<OrganizationMembershipsRolesEnum>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<OrganizationMembershipsRolesEnum>>;
};

/** Represents an update to a `Organization`. Fields that are set will be updated. */
export type OrganizationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  /** The URL of the organization's logo. */
  logoUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Organization` values. */
export type OrganizationsConnection = {
  __typename?: 'OrganizationsConnection';
  /** A list of edges which contains the `Organization` and cursor to aid in pagination. */
  edges: Array<OrganizationsEdge>;
  /** A list of `Organization` objects. */
  nodes: Array<Organization>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Organization` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Organization` edge in the connection. */
export type OrganizationsEdge = {
  __typename?: 'OrganizationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Organization` at the end of the edge. */
  node: Organization;
};

/** Methods to use when ordering `Organization`. */
export enum OrganizationsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  attendee?: Maybe<Attendee>;
  attendeeByEmailAndEventId?: Maybe<Attendee>;
  /** Reads a single `Attendee` using its globally unique `ID`. */
  attendeeByNodeId?: Maybe<Attendee>;
  /** Reads and enables pagination through a set of `Attendee`. */
  attendees?: Maybe<AttendeesConnection>;
  /** The currently logged in user (or null if not logged in). */
  currentUser?: Maybe<User>;
  /** Handy method to get the current user ID. */
  currentUserId?: Maybe<Scalars['UUID']>;
  dateTruncFunc?: Maybe<Scalars['Datetime']>;
  event?: Maybe<Event>;
  /** Reads a single `Event` using its globally unique `ID`. */
  eventByNodeId?: Maybe<Event>;
  eventByOrganizationIdAndName?: Maybe<Event>;
  eventByOrganizationIdAndSlug?: Maybe<Event>;
  eventBySlug?: Maybe<Event>;
  /** Reads and enables pagination through a set of `Event`. */
  events?: Maybe<EventsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  organization?: Maybe<Organization>;
  organizationByName?: Maybe<Organization>;
  /** Reads a single `Organization` using its globally unique `ID`. */
  organizationByNodeId?: Maybe<Organization>;
  organizationBySlug?: Maybe<Organization>;
  organizationMembership?: Maybe<OrganizationMembership>;
  /** Reads a single `OrganizationMembership` using its globally unique `ID`. */
  organizationMembershipByNodeId?: Maybe<OrganizationMembership>;
  organizationMembershipByOrganizationIdAndUserId?: Maybe<OrganizationMembership>;
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships?: Maybe<OrganizationMembershipsConnection>;
  /** Reads and enables pagination through a set of `Organization`. */
  organizations?: Maybe<OrganizationsConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  registration?: Maybe<Registration>;
  /** Reads a single `Registration` using its globally unique `ID`. */
  registrationByNodeId?: Maybe<Registration>;
  /** Reads and enables pagination through a set of `Registration`. */
  registrations?: Maybe<RegistrationsConnection>;
  testTable?: Maybe<TestTable>;
  testTableByAttendeeId?: Maybe<TestTable>;
  /** Reads a single `TestTable` using its globally unique `ID`. */
  testTableByNodeId?: Maybe<TestTable>;
  /** Reads and enables pagination through a set of `TestTable`. */
  testTables?: Maybe<TestTablesConnection>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAttendeeArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAttendeeByEmailAndEventIdArgs = {
  email: Scalars['String'];
  eventId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAttendeeByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAttendeesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AttendeeCondition>;
  filter?: InputMaybe<AttendeeFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDateTruncFuncArgs = {
  date?: InputMaybe<Scalars['Datetime']>;
  unit?: InputMaybe<Scalars['String']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEventArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventByOrganizationIdAndNameArgs = {
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventByOrganizationIdAndSlugArgs = {
  organizationId: Scalars['UUID'];
  slug: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventBySlugArgs = {
  eventSlug?: InputMaybe<Scalars['String']>;
  organizationSlug?: InputMaybe<Scalars['String']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<EventCondition>;
  filter?: InputMaybe<EventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationByNameArgs = {
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipByOrganizationIdAndUserIdArgs = {
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationMembershipCondition>;
  filter?: InputMaybe<OrganizationMembershipFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationCondition>;
  filter?: InputMaybe<OrganizationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRegistrationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRegistrationByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRegistrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<RegistrationCondition>;
  filter?: InputMaybe<RegistrationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<RegistrationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTestTableArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTestTableByAttendeeIdArgs = {
  attendeeId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTestTableByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTestTablesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<TestTableCondition>;
  filter?: InputMaybe<TestTableFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TestTablesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserCondition>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** All input for the `register` mutation. */
export type RegisterInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

/** The output of our `register` mutation. */
export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwt?: Maybe<Scalars['Jwt']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type Registration = Node & {
  __typename?: 'Registration';
  /** Reads and enables pagination through a set of `Attendee`. */
  attendees: AttendeesConnection;
  createdAt: Scalars['Datetime'];
  email: Scalars['String'];
  /** Reads a single `Event` that is related to this `Registration`. */
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['UUID']>;
  firstname: Scalars['String'];
  id: Scalars['UUID'];
  lastname: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  updatedAt: Scalars['Datetime'];
};


export type RegistrationAttendeesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AttendeeCondition>;
  filter?: InputMaybe<AttendeeFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};

/**
 * A condition to be used against `Registration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type RegistrationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Registration` object types. All fields are combined with a logical ‘and.’ */
export type RegistrationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RegistrationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `eventId` field. */
  eventId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<RegistrationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<RegistrationFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Registration` */
export type RegistrationInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email: Scalars['String'];
  eventId?: InputMaybe<Scalars['UUID']>;
  firstname: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  lastname: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Registration`. Fields that are set will be updated. */
export type RegistrationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  eventId?: InputMaybe<Scalars['UUID']>;
  firstname?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  lastname?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Registration` values. */
export type RegistrationsConnection = {
  __typename?: 'RegistrationsConnection';
  /** A list of edges which contains the `Registration` and cursor to aid in pagination. */
  edges: Array<RegistrationsEdge>;
  /** A list of `Registration` objects. */
  nodes: Array<Registration>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Registration` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Registration` edge in the connection. */
export type RegistrationsEdge = {
  __typename?: 'RegistrationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Registration` at the end of the edge. */
  node: Registration;
};

/** Methods to use when ordering `Registration`. */
export enum RegistrationsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type TestTable = Node & {
  __typename?: 'TestTable';
  /** Reads a single `Attendee` that is related to this `TestTable`. */
  attendee?: Maybe<Attendee>;
  attendeeId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  infos?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  status?: Maybe<TestTableStatus>;
  updatedAt: Scalars['Datetime'];
};

/**
 * A condition to be used against `TestTable` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TestTableCondition = {
  /** Checks for equality with the object’s `attendeeId` field. */
  attendeeId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<TestTableStatus>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `TestTable` object types. All fields are combined with a logical ‘and.’ */
export type TestTableFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TestTableFilter>>;
  /** Filter by the object’s `attendeeId` field. */
  attendeeId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TestTableFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TestTableFilter>>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<TestTableStatusFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `TestTable` */
export type TestTableInput = {
  attendeeId: Scalars['UUID'];
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  infos?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TestTableStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `TestTable`. Fields that are set will be updated. */
export type TestTablePatch = {
  attendeeId?: InputMaybe<Scalars['UUID']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  infos?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TestTableStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export enum TestTableStatus {
  /** Status est non ok */
  Nok = 'NOK',
  /** Status est ok */
  Ok = 'OK'
}

/** A filter to be used against TestTableStatus fields. All fields are combined with a logical ‘and.’ */
export type TestTableStatusFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<TestTableStatus>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<TestTableStatus>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<TestTableStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<TestTableStatus>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<TestTableStatus>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<TestTableStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<TestTableStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<TestTableStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<TestTableStatus>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<TestTableStatus>>;
};

/** A connection to a list of `TestTable` values. */
export type TestTablesConnection = {
  __typename?: 'TestTablesConnection';
  /** A list of edges which contains the `TestTable` and cursor to aid in pagination. */
  edges: Array<TestTablesEdge>;
  /** A list of `TestTable` objects. */
  nodes: Array<TestTable>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TestTable` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `TestTable` edge in the connection. */
export type TestTablesEdge = {
  __typename?: 'TestTablesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TestTable` at the end of the edge. */
  node: TestTable;
};

/** Methods to use when ordering `TestTable`. */
export enum TestTablesOrderBy {
  AttendeeIdAsc = 'ATTENDEE_ID_ASC',
  AttendeeIdDesc = 'ATTENDEE_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['UUID']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['UUID']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['UUID']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['UUID']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['UUID']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['UUID']>>;
};

/** All input for the `updateAttendeeByEmailAndEventId` mutation. */
export type UpdateAttendeeByEmailAndEventIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  eventId: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Attendee` being updated. */
  patch: AttendeePatch;
};

/** All input for the `updateAttendeeByNodeId` mutation. */
export type UpdateAttendeeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Attendee` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Attendee` being updated. */
  patch: AttendeePatch;
};

/** All input for the `updateAttendee` mutation. */
export type UpdateAttendeeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Attendee` being updated. */
  patch: AttendeePatch;
};

/** The output of our update `Attendee` mutation. */
export type UpdateAttendeePayload = {
  __typename?: 'UpdateAttendeePayload';
  /** The `Attendee` that was updated by this mutation. */
  attendee?: Maybe<Attendee>;
  /** An edge for our `Attendee`. May be used by Relay 1. */
  attendeeEdge?: Maybe<AttendeesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `Attendee`. */
  event?: Maybe<Event>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Registration` that is related to this `Attendee`. */
  registration?: Maybe<Registration>;
};


/** The output of our update `Attendee` mutation. */
export type UpdateAttendeePayloadAttendeeEdgeArgs = {
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};

/** All input for the `updateEventByNodeId` mutation. */
export type UpdateEventByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Event` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Event` being updated. */
  patch: EventPatch;
};

/** All input for the `updateEventByOrganizationIdAndName` mutation. */
export type UpdateEventByOrganizationIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Event` being updated. */
  patch: EventPatch;
};

/** All input for the `updateEventByOrganizationIdAndSlug` mutation. */
export type UpdateEventByOrganizationIdAndSlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Event` being updated. */
  patch: EventPatch;
  slug: Scalars['String'];
};

/** All input for the `updateEvent` mutation. */
export type UpdateEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Event` being updated. */
  patch: EventPatch;
};

/** The output of our update `Event` mutation. */
export type UpdateEventPayload = {
  __typename?: 'UpdateEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Event` that was updated by this mutation. */
  event?: Maybe<Event>;
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>;
  /** Reads a single `Organization` that is related to this `Event`. */
  organization?: Maybe<Organization>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Event` mutation. */
export type UpdateEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};

/** All input for the `updateOrganizationByName` mutation. */
export type UpdateOrganizationByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
};

/** All input for the `updateOrganizationByNodeId` mutation. */
export type UpdateOrganizationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Organization` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
};

/** All input for the `updateOrganizationBySlug` mutation. */
export type UpdateOrganizationBySlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
  slug: Scalars['String'];
};

/** All input for the `updateOrganization` mutation. */
export type UpdateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
};

/** All input for the `updateOrganizationMembershipByNodeId` mutation. */
export type UpdateOrganizationMembershipByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `OrganizationMembership` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `OrganizationMembership` being updated. */
  patch: OrganizationMembershipPatch;
};

/** All input for the `updateOrganizationMembershipByOrganizationIdAndUserId` mutation. */
export type UpdateOrganizationMembershipByOrganizationIdAndUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  /** An object where the defined keys will be set on the `OrganizationMembership` being updated. */
  patch: OrganizationMembershipPatch;
  userId: Scalars['UUID'];
};

/** All input for the `updateOrganizationMembership` mutation. */
export type UpdateOrganizationMembershipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `OrganizationMembership` being updated. */
  patch: OrganizationMembershipPatch;
};

/** The output of our update `OrganizationMembership` mutation. */
export type UpdateOrganizationMembershipPayload = {
  __typename?: 'UpdateOrganizationMembershipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  /** The `OrganizationMembership` that was updated by this mutation. */
  organizationMembership?: Maybe<OrganizationMembership>;
  /** An edge for our `OrganizationMembership`. May be used by Relay 1. */
  organizationMembershipEdge?: Maybe<OrganizationMembershipsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
};


/** The output of our update `OrganizationMembership` mutation. */
export type UpdateOrganizationMembershipPayloadOrganizationMembershipEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};

/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayload = {
  __typename?: 'UpdateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Organization` that was updated by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `updateRegistrationByNodeId` mutation. */
export type UpdateRegistrationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Registration` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Registration` being updated. */
  patch: RegistrationPatch;
};

/** All input for the `updateRegistration` mutation. */
export type UpdateRegistrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Registration` being updated. */
  patch: RegistrationPatch;
};

/** The output of our update `Registration` mutation. */
export type UpdateRegistrationPayload = {
  __typename?: 'UpdateRegistrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `Registration`. */
  event?: Maybe<Event>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Registration` that was updated by this mutation. */
  registration?: Maybe<Registration>;
  /** An edge for our `Registration`. May be used by Relay 1. */
  registrationEdge?: Maybe<RegistrationsEdge>;
};


/** The output of our update `Registration` mutation. */
export type UpdateRegistrationPayloadRegistrationEdgeArgs = {
  orderBy?: InputMaybe<Array<RegistrationsOrderBy>>;
};

/** All input for the `updateTestTableByAttendeeId` mutation. */
export type UpdateTestTableByAttendeeIdInput = {
  attendeeId: Scalars['UUID'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `TestTable` being updated. */
  patch: TestTablePatch;
};

/** All input for the `updateTestTableByNodeId` mutation. */
export type UpdateTestTableByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `TestTable` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `TestTable` being updated. */
  patch: TestTablePatch;
};

/** All input for the `updateTestTable` mutation. */
export type UpdateTestTableInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `TestTable` being updated. */
  patch: TestTablePatch;
};

/** The output of our update `TestTable` mutation. */
export type UpdateTestTablePayload = {
  __typename?: 'UpdateTestTablePayload';
  /** Reads a single `Attendee` that is related to this `TestTable`. */
  attendee?: Maybe<Attendee>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `TestTable` that was updated by this mutation. */
  testTable?: Maybe<TestTable>;
  /** An edge for our `TestTable`. May be used by Relay 1. */
  testTableEdge?: Maybe<TestTablesEdge>;
};


/** The output of our update `TestTable` mutation. */
export type UpdateTestTablePayloadTestTableEdgeArgs = {
  orderBy?: InputMaybe<Array<TestTablesOrderBy>>;
};

/** All input for the `updateUserByEmail` mutation. */
export type UpdateUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserByNodeId` mutation. */
export type UpdateUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export type User = Node & {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  hasPassword?: Maybe<Scalars['Boolean']>;
  id: Scalars['UUID'];
  isAdmin: Scalars['Boolean'];
  lastname: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships: OrganizationMembershipsConnection;
  updatedAt: Scalars['Datetime'];
};


export type UserOrganizationMembershipsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationMembershipCondition>;
  filter?: InputMaybe<OrganizationMembershipFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hasPassword` field. */
  hasPassword?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  lastname: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  lastname?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node: User;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type MyAttendeeFragment = { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any };

export type MyEventFragment = { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any, attendees: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } };

export type OrganizationFragmentFragment = { __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any };

export type CreateAttendeeMutationVariables = Exact<{
  input: CreateAttendeeInput;
}>;


export type CreateAttendeeMutation = { __typename?: 'Mutation', createAttendee?: { __typename?: 'CreateAttendeePayload', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any } | null } | null };

export type UpdateAttendeeMutationVariables = Exact<{
  input: UpdateAttendeeInput;
}>;


export type UpdateAttendeeMutation = { __typename?: 'Mutation', updateAttendee?: { __typename?: 'UpdateAttendeePayload', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any } | null } | null };

export type DeleteAttendeeMutationVariables = Exact<{
  input: DeleteAttendeeInput;
}>;


export type DeleteAttendeeMutation = { __typename?: 'Mutation', deleteAttendee?: { __typename?: 'DeleteAttendeePayload', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any } | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginPayload', jwt?: any | null } | null };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'CreateEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any, attendees: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } } | null } | null };

export type UpdateEventMutationVariables = Exact<{
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'UpdateEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any, attendees: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } } | null } | null };

export type DeleteEventMutationVariables = Exact<{
  input: DeleteEventInput;
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'DeleteEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any, attendees: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } } | null } | null };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'CreateOrganizationPayload', organization?: { __typename?: 'Organization', id: any } | null } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization?: { __typename?: 'UpdateOrganizationPayload', organization?: { __typename?: 'Organization', id: any } | null } | null };

export type GetAllAttendeeByEventIdQueryVariables = Exact<{
  eventId: Scalars['UUID'];
}>;


export type GetAllAttendeeByEventIdQuery = { __typename?: 'Query', attendees?: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } | null };

export type GetAttendeeByIdQueryVariables = Exact<{
  attendeeId: Scalars['UUID'];
}>;


export type GetAttendeeByIdQuery = { __typename?: 'Query', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any } | null };

export type GetAllEventsByOrganizationIdQueryVariables = Exact<{
  organizationId: Scalars['UUID'];
}>;


export type GetAllEventsByOrganizationIdQuery = { __typename?: 'Query', events?: { __typename?: 'EventsConnection', nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any, attendees: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } }> } | null };

export type GetEventByIdQueryVariables = Exact<{
  eventId: Scalars['UUID'];
}>;


export type GetEventByIdQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any, attendees: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } } | null };

export type GetAttendeeByEventSlugQueryVariables = Exact<{
  eventSlug: Scalars['String'];
  organizationSlug: Scalars['String'];
  after?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<AttendeeFilter>;
  orderBy?: InputMaybe<Array<AttendeesOrderBy> | AttendeesOrderBy>;
}>;


export type GetAttendeeByEventSlugQuery = { __typename?: 'Query', eventBySlug?: { __typename?: 'Event', name: string, slug?: string | null, attendees: { __typename?: 'AttendeesConnection', totalCount: number, nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } } | null };

export type GetAllOrganizationQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationsOrderBy> | OrganizationsOrderBy>;
  filter?: InputMaybe<OrganizationFilter>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetAllOrganizationQuery = { __typename?: 'Query', organizations?: { __typename?: 'OrganizationsConnection', totalCount: number, nodes: Array<{ __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any, events: { __typename?: 'EventsConnection', totalCount: number } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } | null };

export type GetOrganizationByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetOrganizationByIdQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any, events: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any, attendees: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } }> } } | null };

export type GetOrganizationBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
  after?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventsOrderBy> | EventsOrderBy>;
  filter?: InputMaybe<EventFilter>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetOrganizationBySlugQuery = { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any, events: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any, attendees: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } } | null };

export const MyAttendeeFragmentDoc = gql`
    fragment MyAttendee on Attendee {
  id
  firstname
  lastname
  email
  createdAt
  updatedAt
  status
  eventId
}
    `;
export const MyEventFragmentDoc = gql`
    fragment MyEvent on Event {
  id
  name
  slug
  description
  addressLine2
  addressLine1
  city
  zipCode
  country
  happeningAt
  bookingStartsAt
  bookingEndsAt
  createdAt
  updatedAt
  placeName
  organizationId
  attendees {
    nodes {
      ...MyAttendee
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const OrganizationFragmentFragmentDoc = gql`
    fragment OrganizationFragment on Organization {
  id
  name
  slug
  description
  logoUrl
  createdAt
  updatedAt
}
    `;
export const CreateAttendeeDocument = gql`
    mutation CreateAttendee($input: CreateAttendeeInput!) {
  createAttendee(input: $input) {
    attendee {
      ...MyAttendee
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const UpdateAttendeeDocument = gql`
    mutation UpdateAttendee($input: UpdateAttendeeInput!) {
  updateAttendee(input: $input) {
    attendee {
      ...MyAttendee
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const DeleteAttendeeDocument = gql`
    mutation DeleteAttendee($input: DeleteAttendeeInput!) {
  deleteAttendee(input: $input) {
    attendee {
      ...MyAttendee
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    jwt
  }
}
    `;
export const CreateEventDocument = gql`
    mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    event {
      ...MyEvent
    }
  }
}
    ${MyEventFragmentDoc}`;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
    event {
      ...MyEvent
    }
  }
}
    ${MyEventFragmentDoc}`;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    event {
      ...MyEvent
    }
  }
}
    ${MyEventFragmentDoc}`;
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    organization {
      id
    }
  }
}
    `;
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($input: UpdateOrganizationInput!) {
  updateOrganization(input: $input) {
    organization {
      id
    }
  }
}
    `;
export const GetAllAttendeeByEventIdDocument = gql`
    query GetAllAttendeeByEventId($eventId: UUID!) {
  attendees(orderBy: [CREATED_AT_DESC], condition: {eventId: $eventId}) {
    nodes {
      ...MyAttendee
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const GetAttendeeByIdDocument = gql`
    query GetAttendeeById($attendeeId: UUID!) {
  attendee(id: $attendeeId) {
    ...MyAttendee
  }
}
    ${MyAttendeeFragmentDoc}`;
export const GetAllEventsByOrganizationIdDocument = gql`
    query GetAllEventsByOrganizationId($organizationId: UUID!) {
  events(orderBy: [CREATED_AT_DESC], condition: {organizationId: $organizationId}) {
    nodes {
      ...MyEvent
    }
  }
}
    ${MyEventFragmentDoc}`;
export const GetEventByIdDocument = gql`
    query GetEventById($eventId: UUID!) {
  event(id: $eventId) {
    ...MyEvent
    attendees {
      nodes {
        ...MyAttendee
      }
    }
  }
}
    ${MyEventFragmentDoc}
${MyAttendeeFragmentDoc}`;
export const GetAttendeeByEventSlugDocument = gql`
    query GetAttendeeByEventSlug($eventSlug: String!, $organizationSlug: String!, $after: Cursor, $first: Int, $before: Cursor, $last: Int, $offset: Int, $filter: AttendeeFilter = {}, $orderBy: [AttendeesOrderBy!] = NATURAL) {
  eventBySlug(eventSlug: $eventSlug, organizationSlug: $organizationSlug) {
    name
    slug
    attendees(
      first: $first
      after: $after
      last: $last
      before: $before
      offset: $offset
      filter: $filter
      orderBy: $orderBy
    ) {
      nodes {
        ...MyAttendee
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const GetAllOrganizationDocument = gql`
    query GetAllOrganization($after: Cursor, $first: Int, $before: Cursor, $last: Int, $orderBy: [OrganizationsOrderBy!] = CREATED_AT_ASC, $filter: OrganizationFilter, $offset: Int) {
  organizations(
    filter: $filter
    first: $first
    after: $after
    last: $last
    before: $before
    orderBy: $orderBy
    offset: $offset
  ) {
    nodes {
      ...OrganizationFragment
      events {
        totalCount
      }
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
    ${OrganizationFragmentFragmentDoc}`;
export const GetOrganizationByIdDocument = gql`
    query GetOrganizationById($id: UUID!) {
  organization(id: $id) {
    ...OrganizationFragment
    events {
      totalCount
      nodes {
        ...MyEvent
      }
    }
  }
}
    ${OrganizationFragmentFragmentDoc}
${MyEventFragmentDoc}`;
export const GetOrganizationBySlugDocument = gql`
    query GetOrganizationBySlug($slug: String!, $after: Cursor, $first: Int, $before: Cursor, $last: Int, $orderBy: [EventsOrderBy!] = CREATED_AT_ASC, $filter: EventFilter, $offset: Int) {
  organizationBySlug(slug: $slug) {
    ...OrganizationFragment
    events(
      filter: $filter
      first: $first
      after: $after
      last: $last
      before: $before
      orderBy: $orderBy
      offset: $offset
    ) {
      nodes {
        ...MyEvent
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
}
    ${OrganizationFragmentFragmentDoc}
${MyEventFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateAttendee(variables: CreateAttendeeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateAttendeeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAttendeeMutation>(CreateAttendeeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAttendee', 'mutation');
    },
    UpdateAttendee(variables: UpdateAttendeeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateAttendeeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAttendeeMutation>(UpdateAttendeeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateAttendee', 'mutation');
    },
    DeleteAttendee(variables: DeleteAttendeeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteAttendeeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteAttendeeMutation>(DeleteAttendeeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteAttendee', 'mutation');
    },
    Login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Login', 'mutation');
    },
    CreateEvent(variables: CreateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEventMutation>(CreateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateEvent', 'mutation');
    },
    UpdateEvent(variables: UpdateEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEventMutation>(UpdateEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateEvent', 'mutation');
    },
    DeleteEvent(variables: DeleteEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEventMutation>(DeleteEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteEvent', 'mutation');
    },
    CreateOrganization(variables: CreateOrganizationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrganizationMutation>(CreateOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateOrganization', 'mutation');
    },
    UpdateOrganization(variables: UpdateOrganizationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateOrganizationMutation>(UpdateOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateOrganization', 'mutation');
    },
    GetAllAttendeeByEventId(variables: GetAllAttendeeByEventIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllAttendeeByEventIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllAttendeeByEventIdQuery>(GetAllAttendeeByEventIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllAttendeeByEventId', 'query');
    },
    GetAttendeeById(variables: GetAttendeeByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAttendeeByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAttendeeByIdQuery>(GetAttendeeByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAttendeeById', 'query');
    },
    GetAllEventsByOrganizationId(variables: GetAllEventsByOrganizationIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllEventsByOrganizationIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllEventsByOrganizationIdQuery>(GetAllEventsByOrganizationIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllEventsByOrganizationId', 'query');
    },
    GetEventById(variables: GetEventByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventByIdQuery>(GetEventByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEventById', 'query');
    },
    GetAttendeeByEventSlug(variables: GetAttendeeByEventSlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAttendeeByEventSlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAttendeeByEventSlugQuery>(GetAttendeeByEventSlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAttendeeByEventSlug', 'query');
    },
    GetAllOrganization(variables?: GetAllOrganizationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllOrganizationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllOrganizationQuery>(GetAllOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllOrganization', 'query');
    },
    GetOrganizationById(variables: GetOrganizationByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrganizationByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganizationByIdQuery>(GetOrganizationByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOrganizationById', 'query');
    },
    GetOrganizationBySlug(variables: GetOrganizationBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrganizationBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganizationBySlugQuery>(GetOrganizationBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOrganizationBySlug', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
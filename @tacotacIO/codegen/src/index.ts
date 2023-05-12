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
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

/** Event from organizations */
export type Attendee = {
  __typename?: 'Attendee';
  civility: CivilityStatus;
  createdAt: Scalars['Datetime'];
  email?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  hearAbout?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  isEmailSent?: Maybe<Scalars['Boolean']>;
  isFundraisingGenerosityOk?: Maybe<Scalars['Boolean']>;
  isInscriptor?: Maybe<Scalars['Boolean']>;
  isNewsEventEmail?: Maybe<Scalars['Boolean']>;
  isNewsFondationEmail?: Maybe<Scalars['Boolean']>;
  isVip?: Maybe<Scalars['Boolean']>;
  lastname: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  panelNumber?: Maybe<Scalars['Int']>;
  pdfUrl?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  qrCodeUrl?: Maybe<Scalars['String']>;
  /** Reads a single `Registration` that is related to this `Attendee`. */
  registration?: Maybe<Registration>;
  registrationId?: Maybe<Scalars['UUID']>;
  signCode?: Maybe<Scalars['String']>;
  status: EventStatus;
  ticketNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Datetime'];
  zipCode?: Maybe<Scalars['String']>;
};

/**
 * A condition to be used against `Attendee` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AttendeeCondition = {
  /** Checks for equality with the object’s `civility` field. */
  civility?: InputMaybe<CivilityStatus>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `firstname` field. */
  firstname?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `isInscriptor` field. */
  isInscriptor?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `lastname` field. */
  lastname?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `phoneNumber` field. */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `registrationId` field. */
  registrationId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `signCode` field. */
  signCode?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<EventStatus>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `zipCode` field. */
  zipCode?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `Attendee` object types. All fields are combined with a logical ‘and.’ */
export type AttendeeFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AttendeeFilter>>;
  /** Filter by the object’s `civility` field. */
  civility?: InputMaybe<CivilityStatusFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `firstname` field. */
  firstname?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `isInscriptor` field. */
  isInscriptor?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `lastname` field. */
  lastname?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AttendeeFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AttendeeFilter>>;
  /** Filter by the object’s `phoneNumber` field. */
  phoneNumber?: InputMaybe<StringFilter>;
  /** Filter by the object’s `registrationId` field. */
  registrationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `signCode` field. */
  signCode?: InputMaybe<StringFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<EventStatusFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `zipCode` field. */
  zipCode?: InputMaybe<StringFilter>;
};

export type AttendeeImport = {
  __typename?: 'AttendeeImport';
  data?: Maybe<Attendee>;
  errorCode?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  errorValue?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Attendee` */
export type AttendeeInput = {
  civility: CivilityStatus;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  firstname: Scalars['String'];
  hearAbout?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  isEmailSent?: InputMaybe<Scalars['Boolean']>;
  isFundraisingGenerosityOk?: InputMaybe<Scalars['Boolean']>;
  isInscriptor?: InputMaybe<Scalars['Boolean']>;
  isNewsEventEmail?: InputMaybe<Scalars['Boolean']>;
  isNewsFondationEmail?: InputMaybe<Scalars['Boolean']>;
  isVip?: InputMaybe<Scalars['Boolean']>;
  lastname: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  panelNumber?: InputMaybe<Scalars['Int']>;
  pdfUrl?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  qrCodeUrl?: InputMaybe<Scalars['String']>;
  registrationId?: InputMaybe<Scalars['UUID']>;
  signCode?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<EventStatus>;
  ticketNumber?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `Attendee`. Fields that are set will be updated. */
export type AttendeePatch = {
  civility?: InputMaybe<CivilityStatus>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  hearAbout?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  isEmailSent?: InputMaybe<Scalars['Boolean']>;
  isFundraisingGenerosityOk?: InputMaybe<Scalars['Boolean']>;
  isInscriptor?: InputMaybe<Scalars['Boolean']>;
  isNewsEventEmail?: InputMaybe<Scalars['Boolean']>;
  isNewsFondationEmail?: InputMaybe<Scalars['Boolean']>;
  isVip?: InputMaybe<Scalars['Boolean']>;
  lastname?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  panelNumber?: InputMaybe<Scalars['Int']>;
  pdfUrl?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  qrCodeUrl?: InputMaybe<Scalars['String']>;
  registrationId?: InputMaybe<Scalars['UUID']>;
  signCode?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<EventStatus>;
  ticketNumber?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  zipCode?: InputMaybe<Scalars['String']>;
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
  CivilityAsc = 'CIVILITY_ASC',
  CivilityDesc = 'CIVILITY_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  FirstnameAsc = 'FIRSTNAME_ASC',
  FirstnameDesc = 'FIRSTNAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsInscriptorAsc = 'IS_INSCRIPTOR_ASC',
  IsInscriptorDesc = 'IS_INSCRIPTOR_DESC',
  LastnameAsc = 'LASTNAME_ASC',
  LastnameDesc = 'LASTNAME_DESC',
  Natural = 'NATURAL',
  PhoneNumberAsc = 'PHONE_NUMBER_ASC',
  PhoneNumberDesc = 'PHONE_NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RegistrationIdAsc = 'REGISTRATION_ID_ASC',
  RegistrationIdDesc = 'REGISTRATION_ID_DESC',
  SignCodeAsc = 'SIGN_CODE_ASC',
  SignCodeDesc = 'SIGN_CODE_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ZipCodeAsc = 'ZIP_CODE_ASC',
  ZipCodeDesc = 'ZIP_CODE_DESC'
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

/** All input for the `changePassword` mutation. */
export type ChangePasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

/** The output of our `changePassword` mutation. */
export type ChangePasswordPayload = {
  __typename?: 'ChangePasswordPayload';
  boolean?: Maybe<Scalars['Boolean']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export enum CivilityStatus {
  /** Madame */
  Mme = 'MME',
  /** Monsieur */
  Mr = 'MR'
}

/** A filter to be used against CivilityStatus fields. All fields are combined with a logical ‘and.’ */
export type CivilityStatusFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<CivilityStatus>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<CivilityStatus>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<CivilityStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<CivilityStatus>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<CivilityStatus>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<CivilityStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<CivilityStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<CivilityStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<CivilityStatus>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<CivilityStatus>>;
};

/** All input for the `confirmAccountDeletion` mutation. */
export type ConfirmAccountDeletionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

/** The output of our `confirmAccountDeletion` mutation. */
export type ConfirmAccountDeletionPayload = {
  __typename?: 'ConfirmAccountDeletionPayload';
  boolean?: Maybe<Scalars['Boolean']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Registration` that is related to this `Attendee`. */
  registration?: Maybe<Registration>;
};


/** The output of our create `Attendee` mutation. */
export type CreateAttendeePayloadAttendeeEdgeArgs = {
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};

/** All input for the create `EventBranding` mutation. */
export type CreateEventBrandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `EventBranding` to be created by this mutation. */
  eventBranding: EventBrandingInput;
};

/** The output of our create `EventBranding` mutation. */
export type CreateEventBrandingPayload = {
  __typename?: 'CreateEventBrandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `EventBranding`. */
  event?: Maybe<Event>;
  /** The `EventBranding` that was created by this mutation. */
  eventBranding?: Maybe<EventBranding>;
  /** An edge for our `EventBranding`. May be used by Relay 1. */
  eventBrandingEdge?: Maybe<EventBrandingsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `EventBranding` mutation. */
export type CreateEventBrandingPayloadEventBrandingEdgeArgs = {
  orderBy?: InputMaybe<Array<EventBrandingsOrderBy>>;
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

/** All input for the create `Log` mutation. */
export type CreateLogInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Log` to be created by this mutation. */
  log: LogInput;
};

/** The output of our create `Log` mutation. */
export type CreateLogPayload = {
  __typename?: 'CreateLogPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `Log`. */
  event?: Maybe<Event>;
  /** The `Log` that was created by this mutation. */
  log?: Maybe<Log>;
  /** An edge for our `Log`. May be used by Relay 1. */
  logEdge?: Maybe<LogsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Log` mutation. */
export type CreateLogPayloadLogEdgeArgs = {
  orderBy?: InputMaybe<Array<LogsOrderBy>>;
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

/** All input for the create `UserAuthentication` mutation. */
export type CreateUserAuthenticationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `UserAuthentication` to be created by this mutation. */
  userAuthentication: UserAuthenticationInput;
};

/** The output of our create `UserAuthentication` mutation. */
export type CreateUserAuthenticationPayload = {
  __typename?: 'CreateUserAuthenticationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserAuthentication`. */
  user?: Maybe<User>;
  /** The `UserAuthentication` that was created by this mutation. */
  userAuthentication?: Maybe<UserAuthentication>;
  /** An edge for our `UserAuthentication`. May be used by Relay 1. */
  userAuthenticationEdge?: Maybe<UserAuthenticationsEdge>;
};


/** The output of our create `UserAuthentication` mutation. */
export type CreateUserAuthenticationPayloadUserAuthenticationEdgeArgs = {
  orderBy?: InputMaybe<Array<UserAuthenticationsOrderBy>>;
};

/** All input for the create `UserEmail` mutation. */
export type CreateUserEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `UserEmail` to be created by this mutation. */
  userEmail: UserEmailInput;
};

/** The output of our create `UserEmail` mutation. */
export type CreateUserEmailPayload = {
  __typename?: 'CreateUserEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  /** The `UserEmail` that was created by this mutation. */
  userEmail?: Maybe<UserEmail>;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Registration` that is related to this `Attendee`. */
  registration?: Maybe<Registration>;
};


/** The output of our delete `Attendee` mutation. */
export type DeleteAttendeePayloadAttendeeEdgeArgs = {
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};

/** All input for the `deleteEventBranding` mutation. */
export type DeleteEventBrandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `EventBranding` mutation. */
export type DeleteEventBrandingPayload = {
  __typename?: 'DeleteEventBrandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedEventBrandingNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Event` that is related to this `EventBranding`. */
  event?: Maybe<Event>;
  /** The `EventBranding` that was deleted by this mutation. */
  eventBranding?: Maybe<EventBranding>;
  /** An edge for our `EventBranding`. May be used by Relay 1. */
  eventBrandingEdge?: Maybe<EventBrandingsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `EventBranding` mutation. */
export type DeleteEventBrandingPayloadEventBrandingEdgeArgs = {
  orderBy?: InputMaybe<Array<EventBrandingsOrderBy>>;
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

/** All input for the `deleteLog` mutation. */
export type DeleteLogInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Log` mutation. */
export type DeleteLogPayload = {
  __typename?: 'DeleteLogPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedLogNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Event` that is related to this `Log`. */
  event?: Maybe<Event>;
  /** The `Log` that was deleted by this mutation. */
  log?: Maybe<Log>;
  /** An edge for our `Log`. May be used by Relay 1. */
  logEdge?: Maybe<LogsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Log` mutation. */
export type DeleteLogPayloadLogEdgeArgs = {
  orderBy?: InputMaybe<Array<LogsOrderBy>>;
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

/** All input for the `deleteUserAuthentication` mutation. */
export type DeleteUserAuthenticationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserAuthentication` mutation. */
export type DeleteUserAuthenticationPayload = {
  __typename?: 'DeleteUserAuthenticationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedUserAuthenticationNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserAuthentication`. */
  user?: Maybe<User>;
  /** The `UserAuthentication` that was deleted by this mutation. */
  userAuthentication?: Maybe<UserAuthentication>;
  /** An edge for our `UserAuthentication`. May be used by Relay 1. */
  userAuthenticationEdge?: Maybe<UserAuthenticationsEdge>;
};


/** The output of our delete `UserAuthentication` mutation. */
export type DeleteUserAuthenticationPayloadUserAuthenticationEdgeArgs = {
  orderBy?: InputMaybe<Array<UserAuthenticationsOrderBy>>;
};

/** All input for the `deleteUserEmail` mutation. */
export type DeleteUserEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserEmail` mutation. */
export type DeleteUserEmailPayload = {
  __typename?: 'DeleteUserEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedUserEmailNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  /** The `UserEmail` that was deleted by this mutation. */
  userEmail?: Maybe<UserEmail>;
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the user. */
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

export type Event = {
  __typename?: 'Event';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  bookingEndsAt?: Maybe<Scalars['Datetime']>;
  bookingStartsAt?: Maybe<Scalars['Datetime']>;
  capacity?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  description: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  endsAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `EventBranding` that is related to this `Event`. */
  eventBranding?: Maybe<EventBranding>;
  /**
   * Reads and enables pagination through a set of `EventBranding`.
   * @deprecated Please use eventBranding instead
   */
  eventBrandings: EventBrandingsConnection;
  id: Scalars['UUID'];
  isVip?: Maybe<Scalars['Boolean']>;
  lat?: Maybe<Scalars['Float']>;
  /** Reads and enables pagination through a set of `Log`. */
  logs: LogsConnection;
  /** Reads and enables pagination through a set of `Log`. */
  logsList: Array<Log>;
  lon?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  /** Reads a single `Organization` that is related to this `Event`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  placeName?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Registration`. */
  registrations: RegistrationsConnection;
  slug?: Maybe<Scalars['String']>;
  startsAt?: Maybe<Scalars['Datetime']>;
  totalConfirmedRegistrations?: Maybe<Scalars['Int']>;
  totalRegistrations?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['Datetime'];
  webhooks?: Maybe<Array<Maybe<Scalars['String']>>>;
  zipCode?: Maybe<Scalars['String']>;
};


export type EventEventBrandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<EventBrandingCondition>;
  filter?: InputMaybe<EventBrandingFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventBrandingsOrderBy>>;
};


export type EventLogsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<LogCondition>;
  filter?: InputMaybe<LogFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LogsOrderBy>>;
};


export type EventLogsListArgs = {
  condition?: InputMaybe<LogCondition>;
  filter?: InputMaybe<LogFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LogsOrderBy>>;
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

export type EventBranding = {
  __typename?: 'EventBranding';
  awardWinningAssoList?: Maybe<Array<Maybe<Scalars['String']>>>;
  color1?: Maybe<Scalars['String']>;
  color2?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `Event` that is related to this `EventBranding`. */
  event?: Maybe<Event>;
  eventId: Scalars['UUID'];
  font?: Maybe<Fonts>;
  headerMailContact?: Maybe<Scalars['String']>;
  headerMailName?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  logo?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['JSON']>;
  richText?: Maybe<Scalars['String']>;
  shortText?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Datetime'];
};

/**
 * A condition to be used against `EventBranding` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EventBrandingCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `EventBranding` object types. All fields are combined with a logical ‘and.’ */
export type EventBrandingFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EventBrandingFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `eventId` field. */
  eventId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EventBrandingFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EventBrandingFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `EventBranding` */
export type EventBrandingInput = {
  awardWinningAssoList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  color1?: InputMaybe<Scalars['String']>;
  color2?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  eventId: Scalars['UUID'];
  font?: InputMaybe<Fonts>;
  headerMailContact?: InputMaybe<Scalars['String']>;
  headerMailName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  logo?: InputMaybe<Scalars['String']>;
  placeholder?: InputMaybe<Scalars['JSON']>;
  richText?: InputMaybe<Scalars['String']>;
  shortText?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `EventBranding`. Fields that are set will be updated. */
export type EventBrandingPatch = {
  awardWinningAssoList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  color1?: InputMaybe<Scalars['String']>;
  color2?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  eventId?: InputMaybe<Scalars['UUID']>;
  font?: InputMaybe<Fonts>;
  headerMailContact?: InputMaybe<Scalars['String']>;
  headerMailName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  logo?: InputMaybe<Scalars['String']>;
  placeholder?: InputMaybe<Scalars['JSON']>;
  richText?: InputMaybe<Scalars['String']>;
  shortText?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `EventBranding` values. */
export type EventBrandingsConnection = {
  __typename?: 'EventBrandingsConnection';
  /** A list of edges which contains the `EventBranding` and cursor to aid in pagination. */
  edges: Array<EventBrandingsEdge>;
  /** A list of `EventBranding` objects. */
  nodes: Array<EventBranding>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EventBranding` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EventBranding` edge in the connection. */
export type EventBrandingsEdge = {
  __typename?: 'EventBrandingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EventBranding` at the end of the edge. */
  node: EventBranding;
};

/** Methods to use when ordering `EventBranding`. */
export enum EventBrandingsOrderBy {
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

/** A condition to be used against `Event` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EventCondition = {
  /** Checks for equality with the object’s `bookingEndsAt` field. */
  bookingEndsAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `bookingStartsAt` field. */
  bookingStartsAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `capacity` field. */
  capacity?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `city` field. */
  city?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `endsAt` field. */
  endsAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `startsAt` field. */
  startsAt?: InputMaybe<Scalars['Datetime']>;
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
  /** Filter by the object’s `capacity` field. */
  capacity?: InputMaybe<IntFilter>;
  /** Filter by the object’s `city` field. */
  city?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `endsAt` field. */
  endsAt?: InputMaybe<DatetimeFilter>;
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
  /** Filter by the object’s `startsAt` field. */
  startsAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `totalConfirmedRegistrations` field. */
  totalConfirmedRegistrations?: InputMaybe<IntFilter>;
  /** Filter by the object’s `totalRegistrations` field. */
  totalRegistrations?: InputMaybe<IntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Event` */
export type EventInput = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  bookingEndsAt?: InputMaybe<Scalars['Datetime']>;
  bookingStartsAt?: InputMaybe<Scalars['Datetime']>;
  capacity?: InputMaybe<Scalars['Int']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description: Scalars['String'];
  details?: InputMaybe<Scalars['String']>;
  endsAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  isVip?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
  placeName?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  startsAt?: InputMaybe<Scalars['Datetime']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  webhooks?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  zipCode?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `Event`. Fields that are set will be updated. */
export type EventPatch = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  bookingEndsAt?: InputMaybe<Scalars['Datetime']>;
  bookingStartsAt?: InputMaybe<Scalars['Datetime']>;
  capacity?: InputMaybe<Scalars['Int']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  endsAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  isVip?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  organizationId?: InputMaybe<Scalars['UUID']>;
  placeName?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  startsAt?: InputMaybe<Scalars['Datetime']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  webhooks?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export enum EventStatus {
  /** Inscription annulée */
  Cancelled = 'CANCELLED',
  /** Présence confirmée à l'évenement */
  Confirmed = 'CONFIRMED',
  /** En attente */
  Idle = 'IDLE',
  /** Panneau scanné */
  PanelScan = 'PANEL_SCAN',
  /** Ticket scanné */
  TicketScan = 'TICKET_SCAN'
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
  CapacityAsc = 'CAPACITY_ASC',
  CapacityDesc = 'CAPACITY_DESC',
  CityAsc = 'CITY_ASC',
  CityDesc = 'CITY_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EndsAtAsc = 'ENDS_AT_ASC',
  EndsAtDesc = 'ENDS_AT_DESC',
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
  StartsAtAsc = 'STARTS_AT_ASC',
  StartsAtDesc = 'STARTS_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export enum Fonts {
  /** Montserrat */
  Montserrat = 'MONTSERRAT',
  /** Open Sans */
  Opensans = 'OPENSANS',
  /** Roboto */
  Roboto = 'ROBOTO'
}

/** All input for the `forgotPassword` mutation. */
export type ForgotPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

/** The output of our `forgotPassword` mutation. */
export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type GeneratePresignedPostInput = {
  key: Scalars['String'];
};

export type GeneratePresignedPostPayload = {
  __typename?: 'GeneratePresignedPostPayload';
  fields?: Maybe<Scalars['JSON']>;
  url?: Maybe<Scalars['String']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

/** Logs from events */
export type Log = {
  __typename?: 'Log';
  createdAt: Scalars['Datetime'];
  /** Reads a single `Event` that is related to this `Log`. */
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['UUID']>;
  id: Scalars['UUID'];
  payload?: Maybe<Scalars['JSON']>;
  status: LogsStatus;
  updatedAt: Scalars['Datetime'];
};

/** A condition to be used against `Log` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type LogCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<LogsStatus>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Log` object types. All fields are combined with a logical ‘and.’ */
export type LogFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<LogFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `eventId` field. */
  eventId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<LogFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<LogFilter>>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<LogsStatusFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Log` */
export type LogInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  eventId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  payload?: InputMaybe<Scalars['JSON']>;
  status: LogsStatus;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Log`. Fields that are set will be updated. */
export type LogPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  eventId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  payload?: InputMaybe<Scalars['JSON']>;
  status?: InputMaybe<LogsStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  success?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of `Log` values. */
export type LogsConnection = {
  __typename?: 'LogsConnection';
  /** A list of edges which contains the `Log` and cursor to aid in pagination. */
  edges: Array<LogsEdge>;
  /** A list of `Log` objects. */
  nodes: Array<Log>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Log` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Log` edge in the connection. */
export type LogsEdge = {
  __typename?: 'LogsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Log` at the end of the edge. */
  node: Log;
};

/** Methods to use when ordering `Log`. */
export enum LogsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
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

export enum LogsStatus {
  /** Une erreur s'est produite */
  Error = 'ERROR',
  /** Tout se passe bien */
  Ok = 'OK',
  /** Attention */
  Warning = 'WARNING',
  /** Pas d'email */
  WarningEmail = 'WARNING_EMAIL',
  /** Pas de panneau */
  WarningPanel = 'WARNING_PANEL',
  /** Probleme de QR Code */
  WarningSignCode = 'WARNING_SIGN_CODE'
}

/** A filter to be used against LogsStatus fields. All fields are combined with a logical ‘and.’ */
export type LogsStatusFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<LogsStatus>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<LogsStatus>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<LogsStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<LogsStatus>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<LogsStatus>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<LogsStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<LogsStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<LogsStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<LogsStatus>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<LogsStatus>>;
};

/** All input for the `makeEmailPrimary` mutation. */
export type MakeEmailPrimaryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  emailId: Scalars['UUID'];
};

/** The output of our `makeEmailPrimary` mutation. */
export type MakeEmailPrimaryPayload = {
  __typename?: 'MakeEmailPrimaryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  userEmail?: Maybe<UserEmail>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Enter your old password and a new password to change your password. */
  changePassword?: Maybe<ChangePasswordPayload>;
  /** If you're certain you want to delete your account, use `requestAccountDeletion` to request an account deletion token, and then supply the token through this mutation to complete account deletion. */
  confirmAccountDeletion?: Maybe<ConfirmAccountDeletionPayload>;
  /** Creates a single `Attendee`. */
  createAttendee?: Maybe<CreateAttendeePayload>;
  /** Creates a single `Event`. */
  createEvent?: Maybe<CreateEventPayload>;
  /** Creates a single `EventBranding`. */
  createEventBranding?: Maybe<CreateEventBrandingPayload>;
  /** Creates a single `Log`. */
  createLog?: Maybe<CreateLogPayload>;
  /** Creates a single `Organization`. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `OrganizationMembership`. */
  createOrganizationMembership?: Maybe<CreateOrganizationMembershipPayload>;
  /** Creates a single `Registration`. */
  createRegistration?: Maybe<CreateRegistrationPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `UserAuthentication`. */
  createUserAuthentication?: Maybe<CreateUserAuthenticationPayload>;
  /** Creates a single `UserEmail`. */
  createUserEmail?: Maybe<CreateUserEmailPayload>;
  /** Deletes a single `Attendee` using a unique key. */
  deleteAttendee?: Maybe<DeleteAttendeePayload>;
  /** Deletes a single `Event` using a unique key. */
  deleteEvent?: Maybe<DeleteEventPayload>;
  /** Deletes a single `EventBranding` using a unique key. */
  deleteEventBranding?: Maybe<DeleteEventBrandingPayload>;
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Deletes a single `Log` using a unique key. */
  deleteLog?: Maybe<DeleteLogPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `OrganizationMembership` using a unique key. */
  deleteOrganizationMembership?: Maybe<DeleteOrganizationMembershipPayload>;
  /** Deletes a single `Registration` using a unique key. */
  deleteRegistration?: Maybe<DeleteRegistrationPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `UserAuthentication` using a unique key. */
  deleteUserAuthentication?: Maybe<DeleteUserAuthenticationPayload>;
  /** Deletes a single `UserEmail` using a unique key. */
  deleteUserEmail?: Maybe<DeleteUserEmailPayload>;
  /** If you've forgotten your password, give us one of your email addresses and we'll send you a reset token. Note this only works if you have added an email address! */
  forgotPassword?: Maybe<ForgotPasswordPayload>;
  generatePresignedPost?: Maybe<GeneratePresignedPostPayload>;
  /** Use this mutation to log in to your account; this login uses sessions so you do not need to take further action. */
  login?: Maybe<LoginPayload>;
  /** Use this mutation to logout from your account. Don't forget to clear the client state! */
  logout?: Maybe<LogoutPayload>;
  /** Your primary email is where we'll notify of account events; other emails may be used for discovery or login. Use this when you're changing your email address. */
  makeEmailPrimary?: Maybe<MakeEmailPrimaryPayload>;
  /** Use this mutation to create an account on our system. This may only be used if you are logged out. */
  register?: Maybe<RegisterPayload>;
  registerAttendees?: Maybe<RegisterAttendeesPayload>;
  registerAttendeesCsv?: Maybe<RegisterAttendeesCsvPayload>;
  /** Begin the account deletion flow by requesting the confirmation email */
  requestAccountDeletion?: Maybe<RequestAccountDeletionPayload>;
  /** If you didn't receive the verification code for this email, we can resend it. We silently cap the rate of resends on the backend, so calls to this function may not result in another email being sent if it has been called recently. */
  resendEmailVerificationCode?: Maybe<ResendEmailVerificationCodePayload>;
  /** After triggering forgotPassword, you'll be sent a reset token. Combine this with your user ID and a new password to reset your password. */
  resetPassword?: Maybe<ResetPasswordPayload>;
  /** scan du billet pour update la table attendees et logs */
  scanAttendee?: Maybe<ScanAttendeePayload>;
  /** scan de tous les tickets offline */
  scanAttendeesOffline?: Maybe<ScanAttendeesOfflinePayload>;
  /** Select event to retrieve all attendee and send email to all attendee */
  sendEmailAllAttendeeEvent?: Maybe<SendEmailAllAttendeeEventPayload>;
  /** Select event to retrieve all attendee and send email to all attendee and confirm donation */
  sendEmailConfirmDonationByEventId?: Maybe<SendEmailConfirmDonationByEventIdPayload>;
  /** Updates a single `Attendee` using a unique key and a patch. */
  updateAttendee?: Maybe<UpdateAttendeePayload>;
  updateAttendeeEmailAndSendEmail?: Maybe<UpdateAttendeeEmailAndSendEmailPayload>;
  /** Updates a single `Event` using a unique key and a patch. */
  updateEvent?: Maybe<UpdateEventPayload>;
  /** Updates a single `EventBranding` using a unique key and a patch. */
  updateEventBranding?: Maybe<UpdateEventBrandingPayload>;
  /** Updates a single `Log` using a unique key and a patch. */
  updateLog?: Maybe<UpdateLogPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `OrganizationMembership` using a unique key and a patch. */
  updateOrganizationMembership?: Maybe<UpdateOrganizationMembershipPayload>;
  /** Updates a single `Registration` using a unique key and a patch. */
  updateRegistration?: Maybe<UpdateRegistrationPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `UserAuthentication` using a unique key and a patch. */
  updateUserAuthentication?: Maybe<UpdateUserAuthenticationPayload>;
  /** Updates a single `UserEmail` using a unique key and a patch. */
  updateUserEmail?: Maybe<UpdateUserEmailPayload>;
  /** Once you have received a verification token for your email, you may call this mutation with that token to make your email verified. */
  verifyEmail?: Maybe<VerifyEmailPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationConfirmAccountDeletionArgs = {
  input: ConfirmAccountDeletionInput;
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
export type MutationCreateEventBrandingArgs = {
  input: CreateEventBrandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateLogArgs = {
  input: CreateLogInput;
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
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserAuthenticationArgs = {
  input: CreateUserAuthenticationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserEmailArgs = {
  input: CreateUserEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAttendeeArgs = {
  input: DeleteAttendeeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventArgs = {
  input: DeleteEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventBrandingArgs = {
  input: DeleteEventBrandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFileArgs = {
  input: DeleteFileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLogArgs = {
  input: DeleteLogInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationMembershipArgs = {
  input: DeleteOrganizationMembershipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRegistrationArgs = {
  input: DeleteRegistrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserAuthenticationArgs = {
  input: DeleteUserAuthenticationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserEmailArgs = {
  input: DeleteUserEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
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
export type MutationMakeEmailPrimaryArgs = {
  input: MakeEmailPrimaryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterArgs = {
  input: RegisterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterAttendeesArgs = {
  input: RegisterAttendeesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterAttendeesCsvArgs = {
  input: RegisterAttendeesCsvInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRequestAccountDeletionArgs = {
  input: RequestAccountDeletionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationResendEmailVerificationCodeArgs = {
  input: ResendEmailVerificationCodeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationScanAttendeeArgs = {
  input: ScanAttendeeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationScanAttendeesOfflineArgs = {
  input: ScanAttendeesOfflineInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSendEmailAllAttendeeEventArgs = {
  input: SendEmailAllAttendeeEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSendEmailConfirmDonationByEventIdArgs = {
  input: SendEmailConfirmDonationByEventIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAttendeeArgs = {
  input: UpdateAttendeeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAttendeeEmailAndSendEmailArgs = {
  input: UpdateAttendeeEmailAndSendEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventBrandingArgs = {
  input: UpdateEventBrandingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLogArgs = {
  input: UpdateLogInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationMembershipArgs = {
  input: UpdateOrganizationMembershipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRegistrationArgs = {
  input: UpdateRegistrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserAuthenticationArgs = {
  input: UpdateUserAuthenticationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserEmailArgs = {
  input: UpdateUserEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

/** A company, organization, or institution. */
export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['Datetime'];
  description: Scalars['String'];
  /** Reads and enables pagination through a set of `Event`. */
  events: EventsConnection;
  id: Scalars['UUID'];
  /** The URL of the organization's logo. */
  logoUrl: Scalars['String'];
  name: Scalars['String'];
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
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>;
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
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
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

export type OrganizationMembership = {
  __typename?: 'OrganizationMembership';
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
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
  MemberNameAsc = 'MEMBER_NAME_ASC',
  MemberNameDesc = 'MEMBER_NAME_DESC',
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
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
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
export type Query = {
  __typename?: 'Query';
  attendee?: Maybe<Attendee>;
  /** Reads and enables pagination through a set of `Attendee`. */
  attendees?: Maybe<AttendeesConnection>;
  /** Reads a set of `Attendee`. */
  attendeesList?: Maybe<Array<Attendee>>;
  /** Handy method to get the current session ID. */
  currentSessionId?: Maybe<Scalars['UUID']>;
  /** The currently logged in user (or null if not logged in). */
  currentUser?: Maybe<User>;
  /** Handy method to get the current user ID for use in RLS policies, etc; in GraphQL, use `currentUser{id}` instead. */
  currentUserId?: Maybe<Scalars['UUID']>;
  dateTruncFunc?: Maybe<Scalars['Datetime']>;
  event?: Maybe<Event>;
  eventBranding?: Maybe<EventBranding>;
  eventBrandingByEventId?: Maybe<EventBranding>;
  /** Reads and enables pagination through a set of `EventBranding`. */
  eventBrandings?: Maybe<EventBrandingsConnection>;
  eventByOrganizationIdAndName?: Maybe<Event>;
  eventByOrganizationIdAndSlug?: Maybe<Event>;
  eventBySlug?: Maybe<Event>;
  /** Reads and enables pagination through a set of `Event`. */
  events?: Maybe<EventsConnection>;
  log?: Maybe<Log>;
  /** Reads and enables pagination through a set of `Log`. */
  logs?: Maybe<LogsConnection>;
  /** Reads a set of `Log`. */
  logsList?: Maybe<Array<Log>>;
  organization?: Maybe<Organization>;
  organizationByName?: Maybe<Organization>;
  organizationBySlug?: Maybe<Organization>;
  organizationMembership?: Maybe<OrganizationMembership>;
  organizationMembershipByOrganizationIdAndUserId?: Maybe<OrganizationMembership>;
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships?: Maybe<OrganizationMembershipsConnection>;
  /** Reads and enables pagination through a set of `Organization`. */
  organizations?: Maybe<OrganizationsConnection>;
  /** Reads a set of `Organization`. */
  organizationsList?: Maybe<Array<Organization>>;
  registration?: Maybe<Registration>;
  /** Reads and enables pagination through a set of `Registration`. */
  registrations?: Maybe<RegistrationsConnection>;
  user?: Maybe<User>;
  userAuthentication?: Maybe<UserAuthentication>;
  userAuthenticationByServiceAndIdentifier?: Maybe<UserAuthentication>;
  /** Reads and enables pagination through a set of `UserAuthentication`. */
  userAuthentications?: Maybe<UserAuthenticationsConnection>;
  userByUsername?: Maybe<User>;
  userEmail?: Maybe<UserEmail>;
  userEmailByUserIdAndEmail?: Maybe<UserEmail>;
  /** Reads a set of `UserEmail`. */
  userEmailsList?: Maybe<Array<UserEmail>>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAttendeeArgs = {
  id: Scalars['UUID'];
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
export type QueryAttendeesListArgs = {
  condition?: InputMaybe<AttendeeCondition>;
  filter?: InputMaybe<AttendeeFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDateTruncFuncArgs = {
  date: Scalars['Datetime'];
  unit: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventBrandingArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventBrandingByEventIdArgs = {
  eventId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventBrandingsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<EventBrandingCondition>;
  filter?: InputMaybe<EventBrandingFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventBrandingsOrderBy>>;
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
  eventSlug: Scalars['String'];
  organizationSlug: Scalars['String'];
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
export type QueryLogArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLogsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<LogCondition>;
  filter?: InputMaybe<LogFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LogsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLogsListArgs = {
  condition?: InputMaybe<LogCondition>;
  filter?: InputMaybe<LogFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LogsOrderBy>>;
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
export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipArgs = {
  id: Scalars['UUID'];
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
export type QueryOrganizationsListArgs = {
  condition?: InputMaybe<OrganizationCondition>;
  filter?: InputMaybe<OrganizationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRegistrationArgs = {
  id: Scalars['UUID'];
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
export type QueryUserArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserAuthenticationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserAuthenticationByServiceAndIdentifierArgs = {
  identifier: Scalars['String'];
  service: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserAuthenticationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserAuthenticationCondition>;
  filter?: InputMaybe<UserAuthenticationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserAuthenticationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserEmailArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserEmailByUserIdAndEmailArgs = {
  email: Scalars['String'];
  userId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserEmailsListArgs = {
  condition?: InputMaybe<UserEmailCondition>;
  filter?: InputMaybe<UserEmailFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserEmailsOrderBy>>;
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

/** All input for the `registerAttendeesCsv` mutation. */
export type RegisterAttendeesCsvInput = {
  attendeesCsv: Array<InputMaybe<AttendeePatch>>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventId: Scalars['UUID'];
  isForcing: Scalars['Boolean'];
};

/** The output of our `registerAttendeesCsv` mutation. */
export type RegisterAttendeesCsvPayload = {
  __typename?: 'RegisterAttendeesCsvPayload';
  attendeeImports?: Maybe<Array<Maybe<AttendeeImport>>>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `registerAttendees` mutation. */
export type RegisterAttendeesInput = {
  attendees: Array<InputMaybe<AttendeePatch>>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventId: Scalars['UUID'];
};

/** The output of our `registerAttendees` mutation. */
export type RegisterAttendeesPayload = {
  __typename?: 'RegisterAttendeesPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `Registration`. */
  event?: Maybe<Event>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  registration?: Maybe<Registration>;
  /** An edge for our `Registration`. May be used by Relay 1. */
  registrationEdge?: Maybe<RegistrationsEdge>;
};


/** The output of our `registerAttendees` mutation. */
export type RegisterAttendeesPayloadRegistrationEdgeArgs = {
  orderBy?: InputMaybe<Array<RegistrationsOrderBy>>;
};

export type RegisterInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type Registration = {
  __typename?: 'Registration';
  /** Reads and enables pagination through a set of `Attendee`. */
  attendees: AttendeesConnection;
  /** Reads and enables pagination through a set of `Attendee`. */
  attendeesList: Array<Attendee>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `Event` that is related to this `Registration`. */
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['UUID']>;
  hearAboutList?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['UUID'];
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


export type RegistrationAttendeesListArgs = {
  condition?: InputMaybe<AttendeeCondition>;
  filter?: InputMaybe<AttendeeFilter>;
  first?: InputMaybe<Scalars['Int']>;
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
  eventId?: InputMaybe<Scalars['UUID']>;
  hearAboutList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Registration`. Fields that are set will be updated. */
export type RegistrationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  eventId?: InputMaybe<Scalars['UUID']>;
  hearAboutList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id?: InputMaybe<Scalars['UUID']>;
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

/** All input for the `requestAccountDeletion` mutation. */
export type RequestAccountDeletionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our `requestAccountDeletion` mutation. */
export type RequestAccountDeletionPayload = {
  __typename?: 'RequestAccountDeletionPayload';
  boolean?: Maybe<Scalars['Boolean']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `resendEmailVerificationCode` mutation. */
export type ResendEmailVerificationCodeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  emailId: Scalars['UUID'];
};

/** The output of our `resendEmailVerificationCode` mutation. */
export type ResendEmailVerificationCodePayload = {
  __typename?: 'ResendEmailVerificationCodePayload';
  boolean?: Maybe<Scalars['Boolean']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `resetPassword` mutation. */
export type ResetPasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  newPassword: Scalars['String'];
  resetToken: Scalars['String'];
  userId: Scalars['UUID'];
};

/** The output of our `resetPassword` mutation. */
export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  success?: Maybe<Scalars['Boolean']>;
};

export type RowEventAttendee = {
  __typename?: 'RowEventAttendee';
  addressLine1?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  endsAt?: Maybe<Scalars['Datetime']>;
  firstname?: Maybe<Scalars['String']>;
  headerMailContact?: Maybe<Scalars['String']>;
  headerMailName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  pdfUrl?: Maybe<Scalars['String']>;
  placeName?: Maybe<Scalars['String']>;
  qrCodeUrl?: Maybe<Scalars['String']>;
  signCode?: Maybe<Scalars['String']>;
  startsAt?: Maybe<Scalars['Datetime']>;
  ticketNumber?: Maybe<Scalars['String']>;
};

export type RowEventAttendeeConfirm = {
  __typename?: 'RowEventAttendeeConfirm';
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  placeName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

/** All input for the `scanAttendee` mutation. */
export type ScanAttendeeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  ticketPayload: TicketPayloadInput;
};

/** The output of our `scanAttendee` mutation. */
export type ScanAttendeePayload = {
  __typename?: 'ScanAttendeePayload';
  attendee?: Maybe<Attendee>;
  /** An edge for our `Attendee`. May be used by Relay 1. */
  attendeeEdge?: Maybe<AttendeesEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Registration` that is related to this `Attendee`. */
  registration?: Maybe<Registration>;
};


/** The output of our `scanAttendee` mutation. */
export type ScanAttendeePayloadAttendeeEdgeArgs = {
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};

/** All input for the `scanAttendeesOffline` mutation. */
export type ScanAttendeesOfflineInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  ticketPayloads: Array<InputMaybe<TicketPayloadInput>>;
};

/** The output of our `scanAttendeesOffline` mutation. */
export type ScanAttendeesOfflinePayload = {
  __typename?: 'ScanAttendeesOfflinePayload';
  attendees?: Maybe<Array<Maybe<Attendee>>>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `sendEmailAllAttendeeEvent` mutation. */
export type SendEmailAllAttendeeEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventId: Scalars['UUID'];
};

/** The output of our `sendEmailAllAttendeeEvent` mutation. */
export type SendEmailAllAttendeeEventPayload = {
  __typename?: 'SendEmailAllAttendeeEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  rowEventAttendees?: Maybe<Array<Maybe<RowEventAttendee>>>;
};

/** All input for the `sendEmailConfirmDonationByEventId` mutation. */
export type SendEmailConfirmDonationByEventIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  eventId: Scalars['UUID'];
};

/** The output of our `sendEmailConfirmDonationByEventId` mutation. */
export type SendEmailConfirmDonationByEventIdPayload = {
  __typename?: 'SendEmailConfirmDonationByEventIdPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  rowEventAttendeeConfirms?: Maybe<Array<Maybe<RowEventAttendeeConfirm>>>;
};

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

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Triggered when the logged in user's record is updated in some way. */
  currentUserUpdated?: Maybe<UserSubscriptionPayload>;
};

/** An input for mutations affecting `TicketPayload` */
export type TicketPayloadInput = {
  attendeeId?: InputMaybe<Scalars['UUID']>;
  email?: InputMaybe<Scalars['String']>;
  eventId?: InputMaybe<Scalars['UUID']>;
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  panelNumber?: InputMaybe<Scalars['Int']>;
  payload?: InputMaybe<Scalars['JSON']>;
  registrationId?: InputMaybe<Scalars['UUID']>;
  signCode?: InputMaybe<Scalars['String']>;
  ticketNumber?: InputMaybe<Scalars['String']>;
};

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

/** All input for the `updateAttendeeEmailAndSendEmail` mutation. */
export type UpdateAttendeeEmailAndSendEmailInput = {
  attendees: Array<InputMaybe<AttendeePatch>>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our `updateAttendeeEmailAndSendEmail` mutation. */
export type UpdateAttendeeEmailAndSendEmailPayload = {
  __typename?: 'UpdateAttendeeEmailAndSendEmailPayload';
  attendees?: Maybe<Array<Maybe<Attendee>>>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Registration` that is related to this `Attendee`. */
  registration?: Maybe<Registration>;
};


/** The output of our update `Attendee` mutation. */
export type UpdateAttendeePayloadAttendeeEdgeArgs = {
  orderBy?: InputMaybe<Array<AttendeesOrderBy>>;
};

/** All input for the `updateEventBranding` mutation. */
export type UpdateEventBrandingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `EventBranding` being updated. */
  patch: EventBrandingPatch;
};

/** The output of our update `EventBranding` mutation. */
export type UpdateEventBrandingPayload = {
  __typename?: 'UpdateEventBrandingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `EventBranding`. */
  event?: Maybe<Event>;
  /** The `EventBranding` that was updated by this mutation. */
  eventBranding?: Maybe<EventBranding>;
  /** An edge for our `EventBranding`. May be used by Relay 1. */
  eventBrandingEdge?: Maybe<EventBrandingsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `EventBranding` mutation. */
export type UpdateEventBrandingPayloadEventBrandingEdgeArgs = {
  orderBy?: InputMaybe<Array<EventBrandingsOrderBy>>;
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

/** All input for the `updateLog` mutation. */
export type UpdateLogInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Log` being updated. */
  patch: LogPatch;
};

/** The output of our update `Log` mutation. */
export type UpdateLogPayload = {
  __typename?: 'UpdateLogPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `Log`. */
  event?: Maybe<Event>;
  /** The `Log` that was updated by this mutation. */
  log?: Maybe<Log>;
  /** An edge for our `Log`. May be used by Relay 1. */
  logEdge?: Maybe<LogsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Log` mutation. */
export type UpdateLogPayloadLogEdgeArgs = {
  orderBy?: InputMaybe<Array<LogsOrderBy>>;
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

/** All input for the `updateUserAuthentication` mutation. */
export type UpdateUserAuthenticationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `UserAuthentication` being updated. */
  patch: UserAuthenticationPatch;
};

/** The output of our update `UserAuthentication` mutation. */
export type UpdateUserAuthenticationPayload = {
  __typename?: 'UpdateUserAuthenticationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserAuthentication`. */
  user?: Maybe<User>;
  /** The `UserAuthentication` that was updated by this mutation. */
  userAuthentication?: Maybe<UserAuthentication>;
  /** An edge for our `UserAuthentication`. May be used by Relay 1. */
  userAuthenticationEdge?: Maybe<UserAuthenticationsEdge>;
};


/** The output of our update `UserAuthentication` mutation. */
export type UpdateUserAuthenticationPayloadUserAuthenticationEdgeArgs = {
  orderBy?: InputMaybe<Array<UserAuthenticationsOrderBy>>;
};

/** All input for the `updateUserEmail` mutation. */
export type UpdateUserEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `UserEmail` being updated. */
  patch: UserEmailPatch;
};

/** The output of our update `UserEmail` mutation. */
export type UpdateUserEmailPayload = {
  __typename?: 'UpdateUserEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  /** The `UserEmail` that was updated by this mutation. */
  userEmail?: Maybe<UserEmail>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the user. */
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

/** A user who can log in to the application. */
export type User = {
  __typename?: 'User';
  /** Optional avatar URL. */
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  firstname: Scalars['String'];
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** If true, the user has elevated privileges. */
  isAdmin: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  isVolunteer: Scalars['Boolean'];
  lastname: Scalars['String'];
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships: OrganizationMembershipsConnection;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `UserAuthentication`. */
  userAuthentications: UserAuthenticationsConnection;
  /** Reads and enables pagination through a set of `UserEmail`. */
  userEmailsList: Array<UserEmail>;
  /** Public-facing username (or 'handle') of the user. */
  username: Scalars['String'];
};


/** A user who can log in to the application. */
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


/** A user who can log in to the application. */
export type UserUserAuthenticationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserAuthenticationCondition>;
  filter?: InputMaybe<UserAuthenticationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserAuthenticationsOrderBy>>;
};


/** A user who can log in to the application. */
export type UserUserEmailsListArgs = {
  condition?: InputMaybe<UserEmailCondition>;
  filter?: InputMaybe<UserEmailFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserEmailsOrderBy>>;
};

/** Contains information about the login providers this user has used, so that they may disconnect them should they wish. */
export type UserAuthentication = {
  __typename?: 'UserAuthentication';
  createdAt: Scalars['Datetime'];
  /** Additional profile details extracted from this login method */
  details: Scalars['JSON'];
  id: Scalars['UUID'];
  /** A unique identifier for the user within the login service. */
  identifier: Scalars['String'];
  /** The login service used, e.g. `twitter` or `github`. */
  service: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserAuthentication`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `UserAuthentication` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserAuthenticationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `service` field. */
  service?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `UserAuthentication` object types. All fields are combined with a logical ‘and.’ */
export type UserAuthenticationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserAuthenticationFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserAuthenticationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserAuthenticationFilter>>;
  /** Filter by the object’s `service` field. */
  service?: InputMaybe<StringFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `UserAuthentication` */
export type UserAuthenticationInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Additional profile details extracted from this login method */
  details?: InputMaybe<Scalars['JSON']>;
  id?: InputMaybe<Scalars['UUID']>;
  /** A unique identifier for the user within the login service. */
  identifier: Scalars['String'];
  /** The login service used, e.g. `twitter` or `github`. */
  service: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userId: Scalars['UUID'];
};

/** Represents an update to a `UserAuthentication`. Fields that are set will be updated. */
export type UserAuthenticationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Additional profile details extracted from this login method */
  details?: InputMaybe<Scalars['JSON']>;
  id?: InputMaybe<Scalars['UUID']>;
  /** A unique identifier for the user within the login service. */
  identifier?: InputMaybe<Scalars['String']>;
  /** The login service used, e.g. `twitter` or `github`. */
  service?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `UserAuthentication` values. */
export type UserAuthenticationsConnection = {
  __typename?: 'UserAuthenticationsConnection';
  /** A list of edges which contains the `UserAuthentication` and cursor to aid in pagination. */
  edges: Array<UserAuthenticationsEdge>;
  /** A list of `UserAuthentication` objects. */
  nodes: Array<UserAuthentication>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserAuthentication` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserAuthentication` edge in the connection. */
export type UserAuthenticationsEdge = {
  __typename?: 'UserAuthenticationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserAuthentication` at the end of the edge. */
  node: UserAuthentication;
};

/** Methods to use when ordering `UserAuthentication`. */
export enum UserAuthenticationsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ServiceAsc = 'SERVICE_ASC',
  ServiceDesc = 'SERVICE_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']>;
};

/** A user's email address. */
export type UserEmail = {
  __typename?: 'UserEmail';
  createdAt: Scalars['Datetime'];
  /** The user's email address. */
  email: Scalars['String'];
  id: Scalars['UUID'];
  isPrimary: Scalars['Boolean'];
  /** True if the user has is_verified their email address (by clicking the link in the email we sent them, or logging in with a social login provider), false otherwise. */
  isVerified: Scalars['Boolean'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserEmail`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `UserEmail` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserEmailCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `isPrimary` field. */
  isPrimary?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `UserEmail` object types. All fields are combined with a logical ‘and.’ */
export type UserEmailFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserEmailFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `isPrimary` field. */
  isPrimary?: InputMaybe<BooleanFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserEmailFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserEmailFilter>>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `UserEmail` */
export type UserEmailInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** The user's email address. */
  email: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  isPrimary?: InputMaybe<Scalars['Boolean']>;
  /** True if the user has is_verified their email address (by clicking the link in the email we sent them, or logging in with a social login provider), false otherwise. */
  isVerified?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** Represents an update to a `UserEmail`. Fields that are set will be updated. */
export type UserEmailPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** The user's email address. */
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  isPrimary?: InputMaybe<Scalars['Boolean']>;
  /** True if the user has is_verified their email address (by clicking the link in the email we sent them, or logging in with a social login provider), false otherwise. */
  isVerified?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** Methods to use when ordering `UserEmail`. */
export enum UserEmailsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsPrimaryAsc = 'IS_PRIMARY_ASC',
  IsPrimaryDesc = 'IS_PRIMARY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
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
  /** Filter by the object’s `username` field. */
  username?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  /** Optional avatar URL. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  firstname: Scalars['String'];
  /** Unique identifier for the user. */
  id?: InputMaybe<Scalars['UUID']>;
  /** If true, the user has elevated privileges. */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  isVolunteer?: InputMaybe<Scalars['Boolean']>;
  lastname: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Public-facing username (or 'handle') of the user. */
  username: Scalars['String'];
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  /** Optional avatar URL. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  firstname?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the user. */
  id?: InputMaybe<Scalars['UUID']>;
  /** If true, the user has elevated privileges. */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  isVolunteer?: InputMaybe<Scalars['Boolean']>;
  lastname?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Public-facing username (or 'handle') of the user. */
  username?: InputMaybe<Scalars['String']>;
};

export type UserSubscriptionPayload = {
  __typename?: 'UserSubscriptionPayload';
  event?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
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
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC'
}

/** All input for the `verifyEmail` mutation. */
export type VerifyEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
  userEmailId: Scalars['UUID'];
};

/** The output of our `verifyEmail` mutation. */
export type VerifyEmailPayload = {
  __typename?: 'VerifyEmailPayload';
  boolean?: Maybe<Scalars['Boolean']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type MyAttendeeFragment = { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: EventStatus, panelNumber?: number | null, ticketNumber?: string | null, signCode?: string | null, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null };

export type EventBrandingFragmentFragment = { __typename?: 'EventBranding', awardWinningAssoList?: Array<string | null> | null, color1?: string | null, color2?: string | null, createdAt: any, font?: Fonts | null, id: any, logo?: string | null, placeholder?: any | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null };

export type MyEventFragment = { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null };

export type OrganizationFragmentFragment = { __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any };

export type RegistrationFragmentFragment = { __typename?: 'Registration', eventId?: any | null, createdAt: any, hearAboutList?: Array<string | null> | null, id: any, updatedAt: any };

export type MyUserFragment = { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, userEmailsList: Array<{ __typename?: 'UserEmail', id: any, email: string }> };

export type CreateAttendeeMutationVariables = Exact<{
  input: CreateAttendeeInput;
}>;


export type CreateAttendeeMutation = { __typename?: 'Mutation', createAttendee?: { __typename?: 'CreateAttendeePayload', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: EventStatus, panelNumber?: number | null, ticketNumber?: string | null, signCode?: string | null, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null } | null } | null };

export type UpdateAttendeeMutationVariables = Exact<{
  input: UpdateAttendeeInput;
}>;


export type UpdateAttendeeMutation = { __typename?: 'Mutation', updateAttendee?: { __typename?: 'UpdateAttendeePayload', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: EventStatus, panelNumber?: number | null, ticketNumber?: string | null, signCode?: string | null, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null } | null } | null };

export type DeleteAttendeeMutationVariables = Exact<{
  input: DeleteAttendeeInput;
}>;


export type DeleteAttendeeMutation = { __typename?: 'Mutation', deleteAttendee?: { __typename?: 'DeleteAttendeePayload', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: EventStatus, panelNumber?: number | null, ticketNumber?: string | null, signCode?: string | null, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null } | null } | null };

export type RegisterAttendeesMutationVariables = Exact<{
  input: RegisterAttendeesInput;
}>;


export type RegisterAttendeesMutation = { __typename?: 'Mutation', registerAttendees?: { __typename?: 'RegisterAttendeesPayload', registration?: { __typename?: 'Registration', id: any } | null } | null };

export type SendEmailAllAttendeeEventMutationVariables = Exact<{
  eventId: Scalars['UUID'];
}>;


export type SendEmailAllAttendeeEventMutation = { __typename?: 'Mutation', sendEmailAllAttendeeEvent?: { __typename?: 'SendEmailAllAttendeeEventPayload', clientMutationId?: string | null, rowEventAttendees?: Array<{ __typename?: 'RowEventAttendee', id?: string | null, email?: string | null } | null> | null } | null };

export type UpdateAttendeeEmailAndSendEmailMutationVariables = Exact<{
  attendees: Array<InputMaybe<AttendeePatch>> | InputMaybe<AttendeePatch>;
}>;


export type UpdateAttendeeEmailAndSendEmailMutation = { __typename?: 'Mutation', updateAttendeeEmailAndSendEmail?: { __typename?: 'UpdateAttendeeEmailAndSendEmailPayload', attendees?: Array<{ __typename?: 'Attendee', email?: string | null } | null> | null } | null };

export type ScanAttendeeMutationVariables = Exact<{
  scanAttendeeInput: ScanAttendeeInput;
}>;


export type ScanAttendeeMutation = { __typename?: 'Mutation', scanAttendee?: { __typename?: 'ScanAttendeePayload', clientMutationId?: string | null, attendee?: { __typename?: 'Attendee', id: any } | null } | null };

export type ScanAttendeesOfflineMutationVariables = Exact<{
  input: ScanAttendeesOfflineInput;
}>;


export type ScanAttendeesOfflineMutation = { __typename?: 'Mutation', scanAttendeesOffline?: { __typename?: 'ScanAttendeesOfflinePayload', clientMutationId?: string | null, attendees?: Array<{ __typename?: 'Attendee', id: any } | null> | null } | null };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'CreateEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null } | null } | null };

export type UpdateEventMutationVariables = Exact<{
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'UpdateEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null } | null } | null };

export type DeleteEventMutationVariables = Exact<{
  input: DeleteEventInput;
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'DeleteEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null } | null } | null };

export type SendEmailConfirmDonationByEventIdMutationVariables = Exact<{
  eventId: Scalars['UUID'];
}>;


export type SendEmailConfirmDonationByEventIdMutation = { __typename?: 'Mutation', sendEmailConfirmDonationByEventId?: { __typename?: 'SendEmailConfirmDonationByEventIdPayload', clientMutationId?: string | null, rowEventAttendeeConfirms?: Array<{ __typename?: 'RowEventAttendeeConfirm', email?: string | null } | null> | null } | null };

export type CreateEventBrandingMutationVariables = Exact<{
  input: CreateEventBrandingInput;
}>;


export type CreateEventBrandingMutation = { __typename?: 'Mutation', createEventBranding?: { __typename?: 'CreateEventBrandingPayload', clientMutationId?: string | null, eventBranding?: { __typename?: 'EventBranding', awardWinningAssoList?: Array<string | null> | null, color1?: string | null, color2?: string | null, createdAt: any, font?: Fonts | null, id: any, logo?: string | null, placeholder?: any | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null } | null } | null };

export type UpdateEventBrandingMutationVariables = Exact<{
  input: UpdateEventBrandingInput;
}>;


export type UpdateEventBrandingMutation = { __typename?: 'Mutation', updateEventBranding?: { __typename?: 'UpdateEventBrandingPayload', clientMutationId?: string | null, eventBranding?: { __typename?: 'EventBranding', awardWinningAssoList?: Array<string | null> | null, color1?: string | null, color2?: string | null, createdAt: any, font?: Fonts | null, id: any, logo?: string | null, placeholder?: any | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null } | null } | null };

export type DeleteEventBrandingMutationVariables = Exact<{
  input: DeleteEventBrandingInput;
}>;


export type DeleteEventBrandingMutation = { __typename?: 'Mutation', deleteEventBranding?: { __typename?: 'DeleteEventBrandingPayload', clientMutationId?: string | null, eventBranding?: { __typename?: 'EventBranding', awardWinningAssoList?: Array<string | null> | null, color1?: string | null, color2?: string | null, createdAt: any, font?: Fonts | null, id: any, logo?: string | null, placeholder?: any | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null } | null } | null };

export type GeneratePresignedPostMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type GeneratePresignedPostMutation = { __typename?: 'Mutation', generatePresignedPost?: { __typename?: 'GeneratePresignedPostPayload', fields?: any | null, url?: string | null } | null };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'CreateOrganizationPayload', organization?: { __typename?: 'Organization', id: any } | null } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization?: { __typename?: 'UpdateOrganizationPayload', organization?: { __typename?: 'Organization', id: any } | null } | null };

export type CreateRegistrationMutationVariables = Exact<{
  registration: RegistrationInput;
}>;


export type CreateRegistrationMutation = { __typename?: 'Mutation', createRegistration?: { __typename?: 'CreateRegistrationPayload', clientMutationId?: string | null, registration?: { __typename?: 'Registration', id: any } | null } | null };

export type RegisterAttendeesCsvMutationVariables = Exact<{
  input: RegisterAttendeesCsvInput;
}>;


export type RegisterAttendeesCsvMutation = { __typename?: 'Mutation', registerAttendeesCsv?: { __typename?: 'RegisterAttendeesCsvPayload', clientMutationId?: string | null, attendeeImports?: Array<{ __typename?: 'AttendeeImport', errorCode?: string | null, errorMessage?: string | null, errorValue?: string | null, data?: { __typename?: 'Attendee', email?: string | null, id: any, status: EventStatus } | null } | null> | null } | null };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'ForgotPasswordPayload', clientMutationId?: string | null } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginPayload', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: any } } | null };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register?: { __typename?: 'RegisterPayload', refreshToken: string, accessToken: string, user: { __typename?: 'User', id: any } } | null };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'ResetPasswordPayload', success?: boolean | null } | null };

export type GetAttendeeByIdQueryVariables = Exact<{
  attendeeId: Scalars['UUID'];
}>;


export type GetAttendeeByIdQuery = { __typename?: 'Query', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: EventStatus, panelNumber?: number | null, ticketNumber?: string | null, signCode?: string | null, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null } | null };

export type GetAttendeesWithoutMailByRegistrationIdQueryVariables = Exact<{
  registrationId: Scalars['UUID'];
}>;


export type GetAttendeesWithoutMailByRegistrationIdQuery = { __typename?: 'Query', attendees?: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', civility: CivilityStatus, email?: string | null, firstname: string, id: any, lastname: string, isInscriptor?: boolean | null }> } | null };

export type GetAllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEventsQuery = { __typename?: 'Query', events?: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, eventBranding?: { __typename?: 'EventBranding', awardWinningAssoList?: Array<string | null> | null, color1?: string | null, color2?: string | null, createdAt: any, font?: Fonts | null, id: any, logo?: string | null, placeholder?: any | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } | null };

export type GetAllEventsByOrganizationIdQueryVariables = Exact<{
  organizationId: Scalars['UUID'];
}>;


export type GetAllEventsByOrganizationIdQuery = { __typename?: 'Query', events?: { __typename?: 'EventsConnection', nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null }> } | null };

export type GetAllEventsByOrganizationSlugQueryVariables = Exact<{
  organizationSlug: Scalars['String'];
}>;


export type GetAllEventsByOrganizationSlugQuery = { __typename?: 'Query', events?: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } | null };

export type GetEventByIdQueryVariables = Exact<{
  eventId: Scalars['UUID'];
  orderBy?: InputMaybe<Array<LogsOrderBy> | LogsOrderBy>;
  attendeesOrderBy?: InputMaybe<Array<AttendeesOrderBy> | AttendeesOrderBy>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<LogFilter>;
}>;


export type GetEventByIdQuery = { __typename?: 'Query', event?: { __typename?: 'Event', capacity?: number | null, id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, eventBranding?: { __typename?: 'EventBranding', awardWinningAssoList?: Array<string | null> | null, color1?: string | null, color2?: string | null, createdAt: any, font?: Fonts | null, id: any, logo?: string | null, placeholder?: any | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null } | null, registrations: { __typename?: 'RegistrationsConnection', nodes: Array<{ __typename?: 'Registration', attendeesList: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: EventStatus, panelNumber?: number | null, ticketNumber?: string | null, signCode?: string | null, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null }> }> }, logsList: Array<{ __typename?: 'Log', id: any, status: LogsStatus, payload?: any | null, updatedAt: any }> } | null };

export type GetEventBySlugQueryVariables = Exact<{
  eventSlug: Scalars['String'];
  organizationSlug: Scalars['String'];
  filter?: InputMaybe<AttendeeFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetEventBySlugQuery = { __typename?: 'Query', eventBySlug?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, eventBranding?: { __typename?: 'EventBranding', awardWinningAssoList?: Array<string | null> | null, color1?: string | null, color2?: string | null, createdAt: any, font?: Fonts | null, id: any, logo?: string | null, placeholder?: any | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null } | null, registrations: { __typename?: 'RegistrationsConnection', totalCount: number, nodes: Array<{ __typename?: 'Registration', attendeesList: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: EventStatus, panelNumber?: number | null, ticketNumber?: string | null, signCode?: string | null, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null }> }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } } | null };

export type GetEventByEventSlugQueryVariables = Exact<{
  eventSlug: Scalars['String'];
}>;


export type GetEventByEventSlugQuery = { __typename?: 'Query', events?: { __typename?: 'EventsConnection', edges: Array<{ __typename?: 'EventsEdge', node: { __typename?: 'Event', id: any, capacity?: number | null, city?: string | null, description: string, placeName?: string | null, slug?: string | null, name: string, country?: string | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, zipCode?: string | null, startsAt?: any | null } }> } | null };

export type GetEventBrandingByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetEventBrandingByIdQuery = { __typename?: 'Query', eventBranding?: { __typename?: 'EventBranding', awardWinningAssoList?: Array<string | null> | null, color1?: string | null, color2?: string | null, createdAt: any, font?: Fonts | null, id: any, logo?: string | null, placeholder?: any | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null } | null };

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


export type GetOrganizationByIdQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any, events: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null }> } } | null };

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


export type GetOrganizationBySlugQuery = { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any, events: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, totalConfirmedRegistrations?: number | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, registrations: { __typename?: 'RegistrationsConnection', totalCount: number } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } } | null };

export type GetAllUsersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<UserFilter>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', users?: { __typename?: 'UsersConnection', totalCount: number, edges: Array<{ __typename?: 'UsersEdge', node: { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, userEmailsList: Array<{ __typename?: 'UserEmail', id: any, email: string }> } }> } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, userEmailsList: Array<{ __typename?: 'UserEmail', id: any, email: string }> } | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, userEmailsList: Array<{ __typename?: 'UserEmail', id: any, email: string }> } | null };

export const MyAttendeeFragmentDoc = gql`
    fragment MyAttendee on Attendee {
  id
  firstname
  lastname
  email
  createdAt
  updatedAt
  status
  panelNumber
  ticketNumber
  signCode
  registrationId
  qrCodeUrl
  pdfUrl
  isInscriptor
}
    `;
export const EventBrandingFragmentFragmentDoc = gql`
    fragment EventBrandingFragment on EventBranding {
  awardWinningAssoList
  color1
  color2
  createdAt
  font
  id
  logo
  placeholder
  shortText
  richText
  updatedAt
  headerMailName
  headerMailContact
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
  totalConfirmedRegistrations
  country
  startsAt
  endsAt
  bookingStartsAt
  bookingEndsAt
  createdAt
  updatedAt
  placeName
  capacity
  webhooks
  organizationId
  totalRegistrations
  totalConfirmedRegistrations
}
    `;
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
export const RegistrationFragmentFragmentDoc = gql`
    fragment RegistrationFragment on Registration {
  eventId
  createdAt
  hearAboutList
  id
  updatedAt
}
    `;
export const MyUserFragmentDoc = gql`
    fragment MyUser on User {
  id
  firstname
  lastname
  avatarUrl
  isAdmin
  createdAt
  updatedAt
  userEmailsList {
    id
    email
  }
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
export const RegisterAttendeesDocument = gql`
    mutation RegisterAttendees($input: RegisterAttendeesInput!) {
  registerAttendees(input: $input) {
    registration {
      id
    }
  }
}
    `;
export const SendEmailAllAttendeeEventDocument = gql`
    mutation SendEmailAllAttendeeEvent($eventId: UUID!) {
  sendEmailAllAttendeeEvent(input: {eventId: $eventId}) {
    clientMutationId
    rowEventAttendees {
      id
      email
    }
  }
}
    `;
export const UpdateAttendeeEmailAndSendEmailDocument = gql`
    mutation UpdateAttendeeEmailAndSendEmail($attendees: [AttendeePatch]!) {
  updateAttendeeEmailAndSendEmail(input: {attendees: $attendees}) {
    attendees {
      email
    }
  }
}
    `;
export const ScanAttendeeDocument = gql`
    mutation ScanAttendee($scanAttendeeInput: ScanAttendeeInput!) {
  scanAttendee(input: $scanAttendeeInput) {
    clientMutationId
    attendee {
      id
    }
  }
}
    `;
export const ScanAttendeesOfflineDocument = gql`
    mutation ScanAttendeesOffline($input: ScanAttendeesOfflineInput!) {
  scanAttendeesOffline(input: $input) {
    attendees {
      id
    }
    clientMutationId
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
export const SendEmailConfirmDonationByEventIdDocument = gql`
    mutation SendEmailConfirmDonationByEventId($eventId: UUID!) {
  sendEmailConfirmDonationByEventId(input: {eventId: $eventId}) {
    rowEventAttendeeConfirms {
      email
    }
    clientMutationId
  }
}
    `;
export const CreateEventBrandingDocument = gql`
    mutation CreateEventBranding($input: CreateEventBrandingInput!) {
  createEventBranding(input: $input) {
    eventBranding {
      ...EventBrandingFragment
    }
    clientMutationId
  }
}
    ${EventBrandingFragmentFragmentDoc}`;
export const UpdateEventBrandingDocument = gql`
    mutation UpdateEventBranding($input: UpdateEventBrandingInput!) {
  updateEventBranding(input: $input) {
    eventBranding {
      ...EventBrandingFragment
    }
    clientMutationId
  }
}
    ${EventBrandingFragmentFragmentDoc}`;
export const DeleteEventBrandingDocument = gql`
    mutation DeleteEventBranding($input: DeleteEventBrandingInput!) {
  deleteEventBranding(input: $input) {
    eventBranding {
      ...EventBrandingFragment
    }
    clientMutationId
  }
}
    ${EventBrandingFragmentFragmentDoc}`;
export const GeneratePresignedPostDocument = gql`
    mutation GeneratePresignedPost($key: String!) {
  generatePresignedPost(input: {key: $key}) {
    fields
    url
  }
}
    `;
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
export const CreateRegistrationDocument = gql`
    mutation CreateRegistration($registration: RegistrationInput!) {
  createRegistration(input: {registration: $registration}) {
    clientMutationId
    registration {
      id
    }
  }
}
    `;
export const RegisterAttendeesCsvDocument = gql`
    mutation RegisterAttendeesCsv($input: RegisterAttendeesCsvInput!) {
  registerAttendeesCsv(input: $input) {
    clientMutationId
    attendeeImports {
      data {
        email
        id
        status
      }
      errorCode
      errorMessage
      errorValue
    }
  }
}
    `;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input) {
    clientMutationId
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
    user {
      id
    }
  }
}
    `;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: RegisterInput!) {
  register(input: $input) {
    user {
      id
    }
    refreshToken
    accessToken
  }
}
    `;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    success
  }
}
    `;
export const GetAttendeeByIdDocument = gql`
    query GetAttendeeById($attendeeId: UUID!) {
  attendee(id: $attendeeId) {
    ...MyAttendee
  }
}
    ${MyAttendeeFragmentDoc}`;
export const GetAttendeesWithoutMailByRegistrationIdDocument = gql`
    query GetAttendeesWithoutMailByRegistrationId($registrationId: UUID!) {
  attendees(
    condition: {registrationId: $registrationId, isInscriptor: false, email: null}
  ) {
    nodes {
      civility
      email
      firstname
      id
      lastname
      isInscriptor
    }
  }
}
    `;
export const GetAllEventsDocument = gql`
    query GetAllEvents {
  events(orderBy: [CREATED_AT_DESC]) {
    nodes {
      ...MyEvent
      eventBranding {
        ...EventBrandingFragment
      }
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
    ${MyEventFragmentDoc}
${EventBrandingFragmentFragmentDoc}`;
export const GetAllEventsByOrganizationIdDocument = gql`
    query GetAllEventsByOrganizationId($organizationId: UUID!) {
  events(orderBy: [CREATED_AT_DESC], condition: {organizationId: $organizationId}) {
    nodes {
      ...MyEvent
    }
  }
}
    ${MyEventFragmentDoc}`;
export const GetAllEventsByOrganizationSlugDocument = gql`
    query GetAllEventsByOrganizationSlug($organizationSlug: String!) {
  events(orderBy: [CREATED_AT_DESC], condition: {slug: $organizationSlug}) {
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
    ${MyEventFragmentDoc}`;
export const GetEventByIdDocument = gql`
    query GetEventById($eventId: UUID!, $orderBy: [LogsOrderBy!] = UPDATED_AT_DESC, $attendeesOrderBy: [AttendeesOrderBy!] = LASTNAME_DESC, $first: Int, $offset: Int, $filter: LogFilter) {
  event(id: $eventId) {
    ...MyEvent
    eventBranding {
      ...EventBrandingFragment
    }
    capacity
    registrations {
      nodes {
        attendeesList(orderBy: $attendeesOrderBy) {
          ...MyAttendee
        }
      }
    }
    logsList(orderBy: $orderBy, filter: $filter, first: $first, offset: $offset) {
      id
      status
      payload
      updatedAt
    }
  }
}
    ${MyEventFragmentDoc}
${EventBrandingFragmentFragmentDoc}
${MyAttendeeFragmentDoc}`;
export const GetEventBySlugDocument = gql`
    query GetEventBySlug($eventSlug: String!, $organizationSlug: String!, $filter: AttendeeFilter, $first: Int, $offset: Int) {
  eventBySlug(eventSlug: $eventSlug, organizationSlug: $organizationSlug) {
    ...MyEvent
    eventBranding {
      ...EventBrandingFragment
    }
    registrations(first: $first, offset: $offset) {
      nodes {
        attendeesList(filter: $filter) {
          ...MyAttendee
        }
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
    ${MyEventFragmentDoc}
${EventBrandingFragmentFragmentDoc}
${MyAttendeeFragmentDoc}`;
export const GetEventByEventSlugDocument = gql`
    query GetEventByEventSlug($eventSlug: String!) {
  events(condition: {slug: $eventSlug}) {
    edges {
      node {
        id
        capacity
        city
        description
        placeName
        slug
        name
        country
        bookingStartsAt
        bookingEndsAt
        zipCode
        startsAt
      }
    }
  }
}
    `;
export const GetEventBrandingByIdDocument = gql`
    query GetEventBrandingById($id: UUID!) {
  eventBranding(id: $id) {
    ...EventBrandingFragment
  }
}
    ${EventBrandingFragmentFragmentDoc}`;
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
        registrations {
          totalCount
        }
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
export const GetAllUsersDocument = gql`
    query GetAllUsers($first: Int, $offset: Int, $filter: UserFilter) {
  users(first: $first, offset: $offset, filter: $filter) {
    edges {
      node {
        ...MyUser
      }
    }
    totalCount
  }
}
    ${MyUserFragmentDoc}`;
export const GetUserByIdDocument = gql`
    query GetUserById($id: UUID!) {
  user(id: $id) {
    ...MyUser
  }
}
    ${MyUserFragmentDoc}`;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    ...MyUser
  }
}
    ${MyUserFragmentDoc}`;

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
    RegisterAttendees(variables: RegisterAttendeesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterAttendeesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterAttendeesMutation>(RegisterAttendeesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RegisterAttendees', 'mutation');
    },
    SendEmailAllAttendeeEvent(variables: SendEmailAllAttendeeEventMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SendEmailAllAttendeeEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendEmailAllAttendeeEventMutation>(SendEmailAllAttendeeEventDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SendEmailAllAttendeeEvent', 'mutation');
    },
    UpdateAttendeeEmailAndSendEmail(variables: UpdateAttendeeEmailAndSendEmailMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateAttendeeEmailAndSendEmailMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAttendeeEmailAndSendEmailMutation>(UpdateAttendeeEmailAndSendEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateAttendeeEmailAndSendEmail', 'mutation');
    },
    ScanAttendee(variables: ScanAttendeeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ScanAttendeeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ScanAttendeeMutation>(ScanAttendeeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ScanAttendee', 'mutation');
    },
    ScanAttendeesOffline(variables: ScanAttendeesOfflineMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ScanAttendeesOfflineMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ScanAttendeesOfflineMutation>(ScanAttendeesOfflineDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ScanAttendeesOffline', 'mutation');
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
    SendEmailConfirmDonationByEventId(variables: SendEmailConfirmDonationByEventIdMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SendEmailConfirmDonationByEventIdMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendEmailConfirmDonationByEventIdMutation>(SendEmailConfirmDonationByEventIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SendEmailConfirmDonationByEventId', 'mutation');
    },
    CreateEventBranding(variables: CreateEventBrandingMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateEventBrandingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEventBrandingMutation>(CreateEventBrandingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateEventBranding', 'mutation');
    },
    UpdateEventBranding(variables: UpdateEventBrandingMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateEventBrandingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEventBrandingMutation>(UpdateEventBrandingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateEventBranding', 'mutation');
    },
    DeleteEventBranding(variables: DeleteEventBrandingMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteEventBrandingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEventBrandingMutation>(DeleteEventBrandingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteEventBranding', 'mutation');
    },
    GeneratePresignedPost(variables: GeneratePresignedPostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GeneratePresignedPostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<GeneratePresignedPostMutation>(GeneratePresignedPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GeneratePresignedPost', 'mutation');
    },
    CreateOrganization(variables: CreateOrganizationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrganizationMutation>(CreateOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateOrganization', 'mutation');
    },
    UpdateOrganization(variables: UpdateOrganizationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateOrganizationMutation>(UpdateOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateOrganization', 'mutation');
    },
    CreateRegistration(variables: CreateRegistrationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateRegistrationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateRegistrationMutation>(CreateRegistrationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateRegistration', 'mutation');
    },
    RegisterAttendeesCsv(variables: RegisterAttendeesCsvMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterAttendeesCsvMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterAttendeesCsvMutation>(RegisterAttendeesCsvDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RegisterAttendeesCsv', 'mutation');
    },
    ForgotPassword(variables: ForgotPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ForgotPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ForgotPasswordMutation>(ForgotPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ForgotPassword', 'mutation');
    },
    Login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Login', 'mutation');
    },
    RegisterUser(variables: RegisterUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterUserMutation>(RegisterUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RegisterUser', 'mutation');
    },
    ResetPassword(variables: ResetPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResetPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordMutation>(ResetPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ResetPassword', 'mutation');
    },
    GetAttendeeById(variables: GetAttendeeByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAttendeeByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAttendeeByIdQuery>(GetAttendeeByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAttendeeById', 'query');
    },
    GetAttendeesWithoutMailByRegistrationId(variables: GetAttendeesWithoutMailByRegistrationIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAttendeesWithoutMailByRegistrationIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAttendeesWithoutMailByRegistrationIdQuery>(GetAttendeesWithoutMailByRegistrationIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAttendeesWithoutMailByRegistrationId', 'query');
    },
    GetAllEvents(variables?: GetAllEventsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllEventsQuery>(GetAllEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllEvents', 'query');
    },
    GetAllEventsByOrganizationId(variables: GetAllEventsByOrganizationIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllEventsByOrganizationIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllEventsByOrganizationIdQuery>(GetAllEventsByOrganizationIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllEventsByOrganizationId', 'query');
    },
    GetAllEventsByOrganizationSlug(variables: GetAllEventsByOrganizationSlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllEventsByOrganizationSlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllEventsByOrganizationSlugQuery>(GetAllEventsByOrganizationSlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllEventsByOrganizationSlug', 'query');
    },
    GetEventById(variables: GetEventByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventByIdQuery>(GetEventByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEventById', 'query');
    },
    GetEventBySlug(variables: GetEventBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventBySlugQuery>(GetEventBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEventBySlug', 'query');
    },
    GetEventByEventSlug(variables: GetEventByEventSlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventByEventSlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventByEventSlugQuery>(GetEventByEventSlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEventByEventSlug', 'query');
    },
    GetEventBrandingById(variables: GetEventBrandingByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventBrandingByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventBrandingByIdQuery>(GetEventBrandingByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEventBrandingById', 'query');
    },
    GetAllOrganization(variables?: GetAllOrganizationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllOrganizationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllOrganizationQuery>(GetAllOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllOrganization', 'query');
    },
    GetOrganizationById(variables: GetOrganizationByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrganizationByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganizationByIdQuery>(GetOrganizationByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOrganizationById', 'query');
    },
    GetOrganizationBySlug(variables: GetOrganizationBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrganizationBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganizationBySlugQuery>(GetOrganizationBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOrganizationBySlug', 'query');
    },
    GetAllUsers(variables?: GetAllUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllUsersQuery>(GetAllUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllUsers', 'query');
    },
    GetUserById(variables: GetUserByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByIdQuery>(GetUserByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserById', 'query');
    },
    GetCurrentUser(variables?: GetCurrentUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCurrentUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCurrentUserQuery>(GetCurrentUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCurrentUser', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
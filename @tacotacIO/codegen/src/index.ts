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
  notes?: Maybe<Scalars['String']>;
  panelNumber?: Maybe<Scalars['String']>;
  qrCode?: Maybe<Scalars['String']>;
  status: EventStatus;
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
  /** Checks for equality with the object’s `firstname` field. */
  firstname?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `lastname` field. */
  lastname?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `notes` field. */
  notes?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `panelNumber` field. */
  panelNumber?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `qrCode` field. */
  qrCode?: InputMaybe<Scalars['String']>;
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
  /** Filter by the object’s `firstname` field. */
  firstname?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `lastname` field. */
  lastname?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AttendeeFilter>;
  /** Filter by the object’s `notes` field. */
  notes?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AttendeeFilter>>;
  /** Filter by the object’s `panelNumber` field. */
  panelNumber?: InputMaybe<StringFilter>;
  /** Filter by the object’s `qrCode` field. */
  qrCode?: InputMaybe<StringFilter>;
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
  notes?: InputMaybe<Scalars['String']>;
  panelNumber?: InputMaybe<Scalars['String']>;
  qrCode?: InputMaybe<Scalars['String']>;
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
  notes?: InputMaybe<Scalars['String']>;
  panelNumber?: InputMaybe<Scalars['String']>;
  qrCode?: InputMaybe<Scalars['String']>;
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
  FirstnameAsc = 'FIRSTNAME_ASC',
  FirstnameDesc = 'FIRSTNAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LastnameAsc = 'LASTNAME_ASC',
  LastnameDesc = 'LASTNAME_DESC',
  Natural = 'NATURAL',
  NotesAsc = 'NOTES_ASC',
  NotesDesc = 'NOTES_DESC',
  PanelNumberAsc = 'PANEL_NUMBER_ASC',
  PanelNumberDesc = 'PANEL_NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  QrCodeAsc = 'QR_CODE_ASC',
  QrCodeDesc = 'QR_CODE_DESC',
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

/** All input for the `checkSpecialId` mutation. */
export type CheckSpecialIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our `checkSpecialId` mutation. */
export type CheckSpecialIdPayload = {
  __typename?: 'CheckSpecialIdPayload';
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
  /** Reads a single `Event` that is related to this `Attendee`. */
  event?: Maybe<Event>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
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

/** All input for the create `Option` mutation. */
export type CreateOptionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Option` to be created by this mutation. */
  option: OptionInput;
};

/** The output of our create `Option` mutation. */
export type CreateOptionPayload = {
  __typename?: 'CreateOptionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Option` that was created by this mutation. */
  option?: Maybe<Option>;
  /** An edge for our `Option`. May be used by Relay 1. */
  optionEdge?: Maybe<OptionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Special` that is related to this `Option`. */
  special?: Maybe<Special>;
};


/** The output of our create `Option` mutation. */
export type CreateOptionPayloadOptionEdgeArgs = {
  orderBy?: InputMaybe<Array<OptionsOrderBy>>;
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

/** All input for the create `Special` mutation. */
export type CreateSpecialInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Special` to be created by this mutation. */
  special: SpecialInput;
};

/** The output of our create `Special` mutation. */
export type CreateSpecialPayload = {
  __typename?: 'CreateSpecialPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Special` that was created by this mutation. */
  special?: Maybe<Special>;
  /** An edge for our `Special`. May be used by Relay 1. */
  specialEdge?: Maybe<SpecialsEdge>;
};


/** The output of our create `Special` mutation. */
export type CreateSpecialPayloadSpecialEdgeArgs = {
  orderBy?: InputMaybe<Array<SpecialsOrderBy>>;
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

/** All input for the `deleteOptionByNodeId` mutation. */
export type DeleteOptionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Option` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteOption` mutation. */
export type DeleteOptionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Option` mutation. */
export type DeleteOptionPayload = {
  __typename?: 'DeleteOptionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedOptionNodeId?: Maybe<Scalars['ID']>;
  /** The `Option` that was deleted by this mutation. */
  option?: Maybe<Option>;
  /** An edge for our `Option`. May be used by Relay 1. */
  optionEdge?: Maybe<OptionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Special` that is related to this `Option`. */
  special?: Maybe<Special>;
};


/** The output of our delete `Option` mutation. */
export type DeleteOptionPayloadOptionEdgeArgs = {
  orderBy?: InputMaybe<Array<OptionsOrderBy>>;
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

/** All input for the `deleteRegistrationByEmail` mutation. */
export type DeleteRegistrationByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
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

/** All input for the `deleteSpecialByNodeId` mutation. */
export type DeleteSpecialByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Special` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteSpecial` mutation. */
export type DeleteSpecialInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Special` mutation. */
export type DeleteSpecialPayload = {
  __typename?: 'DeleteSpecialPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedSpecialNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Special` that was deleted by this mutation. */
  special?: Maybe<Special>;
  /** An edge for our `Special`. May be used by Relay 1. */
  specialEdge?: Maybe<SpecialsEdge>;
};


/** The output of our delete `Special` mutation. */
export type DeleteSpecialPayloadSpecialEdgeArgs = {
  orderBy?: InputMaybe<Array<SpecialsOrderBy>>;
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
  isPublished: Scalars['Boolean'];
  lat?: Maybe<Scalars['Float']>;
  lon?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Organization` that is related to this `Event`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  placeName?: Maybe<Scalars['String']>;
  registrationId?: Maybe<Scalars['UUID']>;
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

/** A condition to be used against `Event` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EventCondition = {
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
  /** Checks for equality with the object’s `zipCode` field. */
  zipCode?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `Event` object types. All fields are combined with a logical ‘and.’ */
export type EventFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EventFilter>>;
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
  /** Filter by the object’s `zipCode` field. */
  zipCode?: InputMaybe<StringFilter>;
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
  isPublished?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
  placeName?: InputMaybe<Scalars['String']>;
  registrationId?: InputMaybe<Scalars['UUID']>;
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
  isPublished?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  organizationId?: InputMaybe<Scalars['UUID']>;
  placeName?: InputMaybe<Scalars['String']>;
  registrationId?: InputMaybe<Scalars['UUID']>;
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
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ZipCodeAsc = 'ZIP_CODE_ASC',
  ZipCodeDesc = 'ZIP_CODE_DESC'
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
  checkSpecialId?: Maybe<CheckSpecialIdPayload>;
  /** Creates a single `Attendee`. */
  createAttendee?: Maybe<CreateAttendeePayload>;
  /** Creates a single `Event`. */
  createEvent?: Maybe<CreateEventPayload>;
  /** Creates a single `Option`. */
  createOption?: Maybe<CreateOptionPayload>;
  /** Creates a single `Organization`. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `OrganizationMembership`. */
  createOrganizationMembership?: Maybe<CreateOrganizationMembershipPayload>;
  /** Creates a single `Registration`. */
  createRegistration?: Maybe<CreateRegistrationPayload>;
  /** Creates a single `Special`. */
  createSpecial?: Maybe<CreateSpecialPayload>;
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
  /** Deletes a single `Option` using a unique key. */
  deleteOption?: Maybe<DeleteOptionPayload>;
  /** Deletes a single `Option` using its globally unique id. */
  deleteOptionByNodeId?: Maybe<DeleteOptionPayload>;
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
  /** Deletes a single `Registration` using a unique key. */
  deleteRegistrationByEmail?: Maybe<DeleteRegistrationPayload>;
  /** Deletes a single `Registration` using its globally unique id. */
  deleteRegistrationByNodeId?: Maybe<DeleteRegistrationPayload>;
  /** Deletes a single `Special` using a unique key. */
  deleteSpecial?: Maybe<DeleteSpecialPayload>;
  /** Deletes a single `Special` using its globally unique id. */
  deleteSpecialByNodeId?: Maybe<DeleteSpecialPayload>;
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
  /** Updates a single `Option` using a unique key and a patch. */
  updateOption?: Maybe<UpdateOptionPayload>;
  /** Updates a single `Option` using its globally unique id and a patch. */
  updateOptionByNodeId?: Maybe<UpdateOptionPayload>;
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
  /** Updates a single `Registration` using a unique key and a patch. */
  updateRegistrationByEmail?: Maybe<UpdateRegistrationPayload>;
  /** Updates a single `Registration` using its globally unique id and a patch. */
  updateRegistrationByNodeId?: Maybe<UpdateRegistrationPayload>;
  /** Updates a single `Special` using a unique key and a patch. */
  updateSpecial?: Maybe<UpdateSpecialPayload>;
  /** Updates a single `Special` using its globally unique id and a patch. */
  updateSpecialByNodeId?: Maybe<UpdateSpecialPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserByNodeId?: Maybe<UpdateUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCheckSpecialIdArgs = {
  input: CheckSpecialIdInput;
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
export type MutationCreateOptionArgs = {
  input: CreateOptionInput;
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
export type MutationCreateSpecialArgs = {
  input: CreateSpecialInput;
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
export type MutationDeleteOptionArgs = {
  input: DeleteOptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOptionByNodeIdArgs = {
  input: DeleteOptionByNodeIdInput;
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
export type MutationDeleteRegistrationByEmailArgs = {
  input: DeleteRegistrationByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRegistrationByNodeIdArgs = {
  input: DeleteRegistrationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpecialArgs = {
  input: DeleteSpecialInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpecialByNodeIdArgs = {
  input: DeleteSpecialByNodeIdInput;
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
export type MutationUpdateOptionArgs = {
  input: UpdateOptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOptionByNodeIdArgs = {
  input: UpdateOptionByNodeIdInput;
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
export type MutationUpdateRegistrationByEmailArgs = {
  input: UpdateRegistrationByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRegistrationByNodeIdArgs = {
  input: UpdateRegistrationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpecialArgs = {
  input: UpdateSpecialInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpecialByNodeIdArgs = {
  input: UpdateSpecialByNodeIdInput;
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

export type Option = Node & {
  __typename?: 'Option';
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Special` that is related to this `Option`. */
  special?: Maybe<Special>;
  specialId: Scalars['UUID'];
  texte: Scalars['String'];
  updatedAt: Scalars['Datetime'];
};

/** A condition to be used against `Option` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type OptionCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `specialId` field. */
  specialId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `texte` field. */
  texte?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Option` object types. All fields are combined with a logical ‘and.’ */
export type OptionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OptionFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OptionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OptionFilter>>;
  /** Filter by the object’s `specialId` field. */
  specialId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `texte` field. */
  texte?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Option` */
export type OptionInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  specialId: Scalars['UUID'];
  texte: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Option`. Fields that are set will be updated. */
export type OptionPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  specialId?: InputMaybe<Scalars['UUID']>;
  texte?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Option` values. */
export type OptionsConnection = {
  __typename?: 'OptionsConnection';
  /** A list of edges which contains the `Option` and cursor to aid in pagination. */
  edges: Array<OptionsEdge>;
  /** A list of `Option` objects. */
  nodes: Array<Option>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Option` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Option` edge in the connection. */
export type OptionsEdge = {
  __typename?: 'OptionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Option` at the end of the edge. */
  node: Option;
};

/** Methods to use when ordering `Option`. */
export enum OptionsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SpecialIdAsc = 'SPECIAL_ID_ASC',
  SpecialIdDesc = 'SPECIAL_ID_DESC',
  TexteAsc = 'TEXTE_ASC',
  TexteDesc = 'TEXTE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

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
  option?: Maybe<Option>;
  /** Reads a single `Option` using its globally unique `ID`. */
  optionByNodeId?: Maybe<Option>;
  /** Reads and enables pagination through a set of `Option`. */
  options?: Maybe<OptionsConnection>;
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
  registrationByEmail?: Maybe<Registration>;
  /** Reads a single `Registration` using its globally unique `ID`. */
  registrationByNodeId?: Maybe<Registration>;
  /** Reads and enables pagination through a set of `Registration`. */
  registrations?: Maybe<RegistrationsConnection>;
  special?: Maybe<Special>;
  /** Reads a single `Special` using its globally unique `ID`. */
  specialByNodeId?: Maybe<Special>;
  /** Reads and enables pagination through a set of `Special`. */
  specials?: Maybe<SpecialsConnection>;
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
export type QueryOptionArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOptionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOptionsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OptionCondition>;
  filter?: InputMaybe<OptionFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OptionsOrderBy>>;
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
export type QueryRegistrationByEmailArgs = {
  email: Scalars['String'];
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
export type QuerySpecialArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpecialByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpecialsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<SpecialCondition>;
  filter?: InputMaybe<SpecialFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SpecialsOrderBy>>;
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
  createdAt: Scalars['Datetime'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['UUID'];
  lastname: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  updatedAt: Scalars['Datetime'];
};

/**
 * A condition to be used against `Registration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type RegistrationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `firstname` field. */
  firstname?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `lastname` field. */
  lastname?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Registration` object types. All fields are combined with a logical ‘and.’ */
export type RegistrationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RegistrationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `firstname` field. */
  firstname?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `lastname` field. */
  lastname?: InputMaybe<StringFilter>;
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
  firstname: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  lastname: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Registration`. Fields that are set will be updated. */
export type RegistrationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
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
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  FirstnameAsc = 'FIRSTNAME_ASC',
  FirstnameDesc = 'FIRSTNAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LastnameAsc = 'LASTNAME_ASC',
  LastnameDesc = 'LASTNAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type Special = Node & {
  __typename?: 'Special';
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  isHidden: Scalars['Boolean'];
  isMandatory: Scalars['Boolean'];
  isModifiable: Scalars['Boolean'];
  isSensitive: Scalars['Boolean'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `Option`. */
  options: OptionsConnection;
  type: SpecialType;
  updatedAt: Scalars['Datetime'];
};


export type SpecialOptionsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OptionCondition>;
  filter?: InputMaybe<OptionFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OptionsOrderBy>>;
};

/** A condition to be used against `Special` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SpecialCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `isHidden` field. */
  isHidden?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `isMandatory` field. */
  isMandatory?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `isModifiable` field. */
  isModifiable?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `isSensitive` field. */
  isSensitive?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<SpecialType>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Special` object types. All fields are combined with a logical ‘and.’ */
export type SpecialFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SpecialFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `isHidden` field. */
  isHidden?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isMandatory` field. */
  isMandatory?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isModifiable` field. */
  isModifiable?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isSensitive` field. */
  isSensitive?: InputMaybe<BooleanFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SpecialFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SpecialFilter>>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<SpecialTypeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Special` */
export type SpecialInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  isHidden: Scalars['Boolean'];
  isMandatory: Scalars['Boolean'];
  isModifiable: Scalars['Boolean'];
  isSensitive: Scalars['Boolean'];
  type: SpecialType;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Special`. Fields that are set will be updated. */
export type SpecialPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  isHidden?: InputMaybe<Scalars['Boolean']>;
  isMandatory?: InputMaybe<Scalars['Boolean']>;
  isModifiable?: InputMaybe<Scalars['Boolean']>;
  isSensitive?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<SpecialType>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export enum SpecialType {
  ChoixMultiple = 'CHOIX_MULTIPLE',
  ChoixUnique = 'CHOIX_UNIQUE',
  Date = 'DATE',
  IntitulDuPoste = 'INTITUL_DU_POSTE',
  NomEntreprise = 'NOM_ENTREPRISE',
  RGimeSpecial = 'R_GIME_SPECIAL'
}

/** A filter to be used against SpecialType fields. All fields are combined with a logical ‘and.’ */
export type SpecialTypeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<SpecialType>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<SpecialType>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<SpecialType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<SpecialType>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<SpecialType>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<SpecialType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<SpecialType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<SpecialType>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<SpecialType>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<SpecialType>>;
};

/** A connection to a list of `Special` values. */
export type SpecialsConnection = {
  __typename?: 'SpecialsConnection';
  /** A list of edges which contains the `Special` and cursor to aid in pagination. */
  edges: Array<SpecialsEdge>;
  /** A list of `Special` objects. */
  nodes: Array<Special>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Special` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Special` edge in the connection. */
export type SpecialsEdge = {
  __typename?: 'SpecialsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Special` at the end of the edge. */
  node: Special;
};

/** Methods to use when ordering `Special`. */
export enum SpecialsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IsHiddenAsc = 'IS_HIDDEN_ASC',
  IsHiddenDesc = 'IS_HIDDEN_DESC',
  IsMandatoryAsc = 'IS_MANDATORY_ASC',
  IsMandatoryDesc = 'IS_MANDATORY_DESC',
  IsModifiableAsc = 'IS_MODIFIABLE_ASC',
  IsModifiableDesc = 'IS_MODIFIABLE_DESC',
  IsSensitiveAsc = 'IS_SENSITIVE_ASC',
  IsSensitiveDesc = 'IS_SENSITIVE_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']>;
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

/** All input for the `updateOptionByNodeId` mutation. */
export type UpdateOptionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Option` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Option` being updated. */
  patch: OptionPatch;
};

/** All input for the `updateOption` mutation. */
export type UpdateOptionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Option` being updated. */
  patch: OptionPatch;
};

/** The output of our update `Option` mutation. */
export type UpdateOptionPayload = {
  __typename?: 'UpdateOptionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Option` that was updated by this mutation. */
  option?: Maybe<Option>;
  /** An edge for our `Option`. May be used by Relay 1. */
  optionEdge?: Maybe<OptionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Special` that is related to this `Option`. */
  special?: Maybe<Special>;
};


/** The output of our update `Option` mutation. */
export type UpdateOptionPayloadOptionEdgeArgs = {
  orderBy?: InputMaybe<Array<OptionsOrderBy>>;
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

/** All input for the `updateRegistrationByEmail` mutation. */
export type UpdateRegistrationByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  /** An object where the defined keys will be set on the `Registration` being updated. */
  patch: RegistrationPatch;
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

/** All input for the `updateSpecialByNodeId` mutation. */
export type UpdateSpecialByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Special` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Special` being updated. */
  patch: SpecialPatch;
};

/** All input for the `updateSpecial` mutation. */
export type UpdateSpecialInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Special` being updated. */
  patch: SpecialPatch;
};

/** The output of our update `Special` mutation. */
export type UpdateSpecialPayload = {
  __typename?: 'UpdateSpecialPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Special` that was updated by this mutation. */
  special?: Maybe<Special>;
  /** An edge for our `Special`. May be used by Relay 1. */
  specialEdge?: Maybe<SpecialsEdge>;
};


/** The output of our update `Special` mutation. */
export type UpdateSpecialPayloadSpecialEdgeArgs = {
  orderBy?: InputMaybe<Array<SpecialsOrderBy>>;
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

export type MyEventFragment = { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any };

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


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'CreateEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any } | null } | null };

export type UpdateEventMutationVariables = Exact<{
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'UpdateEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any } | null } | null };

export type DeleteEventMutationVariables = Exact<{
  input: DeleteEventInput;
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'DeleteEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any } | null } | null };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'CreateOrganizationPayload', organization?: { __typename?: 'Organization', id: any } | null } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization?: { __typename?: 'UpdateOrganizationPayload', organization?: { __typename?: 'Organization', id: any } | null } | null };

export type GetAllEventsByOrganizationIdQueryVariables = Exact<{
  organizationId: Scalars['UUID'];
}>;


export type GetAllEventsByOrganizationIdQuery = { __typename?: 'Query', events?: { __typename?: 'EventsConnection', nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any }> } | null };

export type GetEventByIdQueryVariables = Exact<{
  eventId: Scalars['UUID'];
}>;


export type GetEventByIdQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any, attendees: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } } | null };

export type GetEventBySlugQueryVariables = Exact<{
  eventSlug: Scalars['String'];
  organizationSlug: Scalars['String'];
}>;


export type GetEventBySlugQuery = { __typename?: 'Query', eventBySlug?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any, organization?: { __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any } | null, attendees: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email: string, createdAt: any, updatedAt: any, status: EventStatus, eventId: any }> } } | null };

export type GetAllOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrganizationQuery = { __typename?: 'Query', organizations?: { __typename?: 'OrganizationsConnection', nodes: Array<{ __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any, events: { __typename?: 'EventsConnection', totalCount: number } }> } | null };

export type GetOrganizationByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetOrganizationByIdQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any, events: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any }> } } | null };

export type GetOrganizationBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetOrganizationBySlugQuery = { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', id: any, name: string, slug?: string | null, description: string, logoUrl: string, createdAt: any, updatedAt: any, events: { __typename?: 'EventsConnection', nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description: string, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, happeningAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, organizationId: any }> } } | null };

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
export const GetEventBySlugDocument = gql`
    query GetEventBySlug($eventSlug: String!, $organizationSlug: String!) {
  eventBySlug(eventSlug: $eventSlug, organizationSlug: $organizationSlug) {
    organization {
      ...OrganizationFragment
    }
    ...MyEvent
    attendees {
      nodes {
        ...MyAttendee
      }
    }
  }
}
    ${OrganizationFragmentFragmentDoc}
${MyEventFragmentDoc}
${MyAttendeeFragmentDoc}`;
export const GetAllOrganizationDocument = gql`
    query GetAllOrganization {
  organizations {
    nodes {
      ...OrganizationFragment
      events {
        totalCount
      }
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
    query GetOrganizationBySlug($slug: String!) {
  organizationBySlug(slug: $slug) {
    ...OrganizationFragment
    events {
      nodes {
        ...MyEvent
      }
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
    GetAllEventsByOrganizationId(variables: GetAllEventsByOrganizationIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllEventsByOrganizationIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllEventsByOrganizationIdQuery>(GetAllEventsByOrganizationIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllEventsByOrganizationId', 'query');
    },
    GetEventById(variables: GetEventByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventByIdQuery>(GetEventByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEventById', 'query');
    },
    GetEventBySlug(variables: GetEventBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEventBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetEventBySlugQuery>(GetEventBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetEventBySlug', 'query');
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
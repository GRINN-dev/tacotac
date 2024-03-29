// @ts-nocheck
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

/** All input for the `acceptInvitationToOrganization` mutation. */
export type AcceptInvitationToOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  invitationId: Scalars['UUID'];
};

/** The output of our `acceptInvitationToOrganization` mutation. */
export type AcceptInvitationToOrganizationPayload = {
  __typename?: 'AcceptInvitationToOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type AdditionalInformation = {
  __typename?: 'AdditionalInformation';
  label?: Maybe<Scalars['String']>;
  values?: Maybe<Scalars['String']>;
};

/** Event from organizations */
export type Attendee = {
  __typename?: 'Attendee';
  additionalData?: Maybe<Array<Maybe<AdditionalInformation>>>;
  /** Reads and enables pagination through a set of `AttendeeFormField`. */
  attendeeFormFields: AttendeeFormFieldsConnection;
  civility: Scalars['String'];
  createdAt: Scalars['Datetime'];
  email?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['UUID']>;
  firstname: Scalars['String'];
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
  qrCodeUrl?: Maybe<Scalars['String']>;
  /** Reads a single `Registration` that is related to this `Attendee`. */
  registration?: Maybe<Registration>;
  registrationId?: Maybe<Scalars['UUID']>;
  status: AttendeeStatus;
  ticketNumber: Scalars['String'];
  updatedAt: Scalars['Datetime'];
};


/** Event from organizations */
export type AttendeeAttendeeFormFieldsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AttendeeFormFieldCondition>;
  filter?: InputMaybe<AttendeeFormFieldFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AttendeeFormFieldsOrderBy>>;
};

/**
 * A condition to be used against `Attendee` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AttendeeCondition = {
  /** Checks for equality with the object’s `civility` field. */
  civility?: InputMaybe<Scalars['String']>;
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
  /** Checks for equality with the object’s `isNewsEventEmail` field. */
  isNewsEventEmail?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `isNewsFondationEmail` field. */
  isNewsFondationEmail?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `isVip` field. */
  isVip?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `lastname` field. */
  lastname?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `panelNumber` field. */
  panelNumber?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `registrationId` field. */
  registrationId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<AttendeeStatus>;
  /** Checks for equality with the object’s `ticketNumber` field. */
  ticketNumber?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Attendee` object types. All fields are combined with a logical ‘and.’ */
export type AttendeeFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AttendeeFilter>>;
  /** Filter by the object’s `attendeeFormFields` relation. */
  attendeeFormFields?: InputMaybe<AttendeeToManyAttendeeFormFieldFilter>;
  /** Some related `attendeeFormFields` exist. */
  attendeeFormFieldsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `civility` field. */
  civility?: InputMaybe<StringFilter>;
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
  /** Filter by the object’s `isInscriptor` field. */
  isInscriptor?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isNewsEventEmail` field. */
  isNewsEventEmail?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isNewsFondationEmail` field. */
  isNewsFondationEmail?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isVip` field. */
  isVip?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `lastname` field. */
  lastname?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AttendeeFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AttendeeFilter>>;
  /** Filter by the object’s `panelNumber` field. */
  panelNumber?: InputMaybe<IntFilter>;
  /** Filter by the object’s `registration` relation. */
  registration?: InputMaybe<RegistrationFilter>;
  /** A related `registration` exists. */
  registrationExists?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `registrationId` field. */
  registrationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<AttendeeStatusFilter>;
  /** Filter by the object’s `ticketNumber` field. */
  ticketNumber?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type AttendeeFormField = {
  __typename?: 'AttendeeFormField';
  /** Reads a single `Attendee` that is related to this `AttendeeFormField`. */
  attendee?: Maybe<Attendee>;
  attendeeId: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  /** Reads a single `FormField` that is related to this `AttendeeFormField`. */
  field?: Maybe<FormField>;
  fieldId: Scalars['UUID'];
  id: Scalars['UUID'];
  updatedAt: Scalars['Datetime'];
  value?: Maybe<Scalars['String']>;
};

/**
 * A condition to be used against `AttendeeFormField` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AttendeeFormFieldCondition = {
  /** Checks for equality with the object’s `attendeeId` field. */
  attendeeId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `fieldId` field. */
  fieldId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `AttendeeFormField` object types. All fields are combined with a logical ‘and.’ */
export type AttendeeFormFieldFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AttendeeFormFieldFilter>>;
  /** Filter by the object’s `attendee` relation. */
  attendee?: InputMaybe<AttendeeFilter>;
  /** Filter by the object’s `attendeeId` field. */
  attendeeId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `field` relation. */
  field?: InputMaybe<FormFieldFilter>;
  /** Filter by the object’s `fieldId` field. */
  fieldId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AttendeeFormFieldFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AttendeeFormFieldFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `AttendeeFormField` */
export type AttendeeFormFieldInput = {
  attendeeId: Scalars['UUID'];
  createdAt?: InputMaybe<Scalars['Datetime']>;
  fieldId: Scalars['UUID'];
  id?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `AttendeeFormField`. Fields that are set will be updated. */
export type AttendeeFormFieldPatch = {
  attendeeId?: InputMaybe<Scalars['UUID']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  fieldId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  value?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `AttendeeFormField` values. */
export type AttendeeFormFieldsConnection = {
  __typename?: 'AttendeeFormFieldsConnection';
  /** A list of edges which contains the `AttendeeFormField` and cursor to aid in pagination. */
  edges: Array<AttendeeFormFieldsEdge>;
  /** A list of `AttendeeFormField` objects. */
  nodes: Array<AttendeeFormField>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AttendeeFormField` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `AttendeeFormField` edge in the connection. */
export type AttendeeFormFieldsEdge = {
  __typename?: 'AttendeeFormFieldsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AttendeeFormField` at the end of the edge. */
  node: AttendeeFormField;
};

/** Methods to use when ordering `AttendeeFormField`. */
export enum AttendeeFormFieldsOrderBy {
  AttendeeIdAsc = 'ATTENDEE_ID_ASC',
  AttendeeIdDesc = 'ATTENDEE_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  FieldIdAsc = 'FIELD_ID_ASC',
  FieldIdDesc = 'FIELD_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type AttendeeImport = {
  __typename?: 'AttendeeImport';
  data?: Maybe<Attendee>;
  errorCode?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  errorValue?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Attendee` */
export type AttendeeInput = {
  civility: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  firstname: Scalars['String'];
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
  qrCodeUrl?: InputMaybe<Scalars['String']>;
  registrationId?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<AttendeeStatus>;
  ticketNumber?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Attendee`. Fields that are set will be updated. */
export type AttendeePatch = {
  civility?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
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
  qrCodeUrl?: InputMaybe<Scalars['String']>;
  registrationId?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<AttendeeStatus>;
  ticketNumber?: InputMaybe<Scalars['String']>;
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
  IsNewsEventEmailAsc = 'IS_NEWS_EVENT_EMAIL_ASC',
  IsNewsEventEmailDesc = 'IS_NEWS_EVENT_EMAIL_DESC',
  IsNewsFondationEmailAsc = 'IS_NEWS_FONDATION_EMAIL_ASC',
  IsNewsFondationEmailDesc = 'IS_NEWS_FONDATION_EMAIL_DESC',
  IsVipAsc = 'IS_VIP_ASC',
  IsVipDesc = 'IS_VIP_DESC',
  LastnameAsc = 'LASTNAME_ASC',
  LastnameDesc = 'LASTNAME_DESC',
  Natural = 'NATURAL',
  PanelNumberAsc = 'PANEL_NUMBER_ASC',
  PanelNumberDesc = 'PANEL_NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RegistrationIdAsc = 'REGISTRATION_ID_ASC',
  RegistrationIdDesc = 'REGISTRATION_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TicketNumberAsc = 'TICKET_NUMBER_ASC',
  TicketNumberDesc = 'TICKET_NUMBER_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export enum AttendeeStatus {
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

/** A filter to be used against AttendeeStatus fields. All fields are combined with a logical ‘and.’ */
export type AttendeeStatusFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<AttendeeStatus>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<AttendeeStatus>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<AttendeeStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<AttendeeStatus>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<AttendeeStatus>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<AttendeeStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<AttendeeStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<AttendeeStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<AttendeeStatus>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<AttendeeStatus>>;
};

/** A filter to be used against many `AttendeeFormField` object types. All fields are combined with a logical ‘and.’ */
export type AttendeeToManyAttendeeFormFieldFilter = {
  /** Every related `AttendeeFormField` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AttendeeFormFieldFilter>;
  /** No related `AttendeeFormField` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AttendeeFormFieldFilter>;
  /** Some related `AttendeeFormField` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AttendeeFormFieldFilter>;
};

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

/** All input for the `cancelInvitation` mutation. */
export type CancelInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  invitationId: Scalars['UUID'];
};

/** The output of our `cancelInvitation` mutation. */
export type CancelInvitationPayload = {
  __typename?: 'CancelInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `changeMembershipRole` mutation. */
export type ChangeMembershipRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  membershipId: Scalars['UUID'];
  role: Scalars['String'];
};

/** The output of our `changeMembershipRole` mutation. */
export type ChangeMembershipRolePayload = {
  __typename?: 'ChangeMembershipRolePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  organizationMembership?: Maybe<OrganizationMembership>;
  /** An edge for our `OrganizationMembership`. May be used by Relay 1. */
  organizationMembershipEdge?: Maybe<OrganizationMembershipsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
};


/** The output of our `changeMembershipRole` mutation. */
export type ChangeMembershipRolePayloadOrganizationMembershipEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
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

/** An input for mutations affecting `CompleteAttendee` */
export type CompleteAttendeeInput = {
  attendee?: InputMaybe<AttendeeInput>;
  attendeeFormFields?: InputMaybe<Array<InputMaybe<AttendeeFormFieldInput>>>;
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

/** All input for the create `AttendeeFormField` mutation. */
export type CreateAttendeeFormFieldInput = {
  /** The `AttendeeFormField` to be created by this mutation. */
  attendeeFormField: AttendeeFormFieldInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our create `AttendeeFormField` mutation. */
export type CreateAttendeeFormFieldPayload = {
  __typename?: 'CreateAttendeeFormFieldPayload';
  /** Reads a single `Attendee` that is related to this `AttendeeFormField`. */
  attendee?: Maybe<Attendee>;
  /** The `AttendeeFormField` that was created by this mutation. */
  attendeeFormField?: Maybe<AttendeeFormField>;
  /** An edge for our `AttendeeFormField`. May be used by Relay 1. */
  attendeeFormFieldEdge?: Maybe<AttendeeFormFieldsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `FormField` that is related to this `AttendeeFormField`. */
  field?: Maybe<FormField>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `AttendeeFormField` mutation. */
export type CreateAttendeeFormFieldPayloadAttendeeFormFieldEdgeArgs = {
  orderBy?: InputMaybe<Array<AttendeeFormFieldsOrderBy>>;
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

/** All input for the create `FormField` mutation. */
export type CreateFormFieldInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `FormField` to be created by this mutation. */
  formField: FormFieldInput;
};

/** The output of our create `FormField` mutation. */
export type CreateFormFieldPayload = {
  __typename?: 'CreateFormFieldPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `FormField`. */
  event?: Maybe<Event>;
  /** The `FormField` that was created by this mutation. */
  formField?: Maybe<FormField>;
  /** An edge for our `FormField`. May be used by Relay 1. */
  formFieldEdge?: Maybe<FormFieldsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `FormField` mutation. */
export type CreateFormFieldPayloadFormFieldEdgeArgs = {
  orderBy?: InputMaybe<Array<FormFieldsOrderBy>>;
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

/** All input for the `createOrganization` mutation. */
export type CreateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

/** All input for the create `OrganizationInvitation` mutation. */
export type CreateOrganizationInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `OrganizationInvitation` to be created by this mutation. */
  organizationInvitation: OrganizationInvitationInput;
};

/** The output of our create `OrganizationInvitation` mutation. */
export type CreateOrganizationInvitationPayload = {
  __typename?: 'CreateOrganizationInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Organization` that is related to this `OrganizationInvitation`. */
  organization?: Maybe<Organization>;
  /** The `OrganizationInvitation` that was created by this mutation. */
  organizationInvitation?: Maybe<OrganizationInvitation>;
  /** An edge for our `OrganizationInvitation`. May be used by Relay 1. */
  organizationInvitationEdge?: Maybe<OrganizationInvitationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationInvitation`. */
  user?: Maybe<User>;
};


/** The output of our create `OrganizationInvitation` mutation. */
export type CreateOrganizationInvitationPayloadOrganizationInvitationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationInvitationsOrderBy>>;
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

/** The output of our `createOrganization` mutation. */
export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `createOrganization` mutation. */
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

/** A `UUID` edge in the connection. */
export type CurrentUserInvitedOrganizationIdEdge = {
  __typename?: 'CurrentUserInvitedOrganizationIdEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UUID` at the end of the edge. */
  node?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `UUID` values. */
export type CurrentUserInvitedOrganizationIdsConnection = {
  __typename?: 'CurrentUserInvitedOrganizationIdsConnection';
  /** A list of edges which contains the `UUID` and cursor to aid in pagination. */
  edges: Array<CurrentUserInvitedOrganizationIdEdge>;
  /** A list of `UUID` objects. */
  nodes: Array<Maybe<Scalars['UUID']>>;
  /** The count of *all* `UUID` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UUID` edge in the connection. */
export type CurrentUserMemberOrganizationIdEdge = {
  __typename?: 'CurrentUserMemberOrganizationIdEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UUID` at the end of the edge. */
  node?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `UUID` values. */
export type CurrentUserMemberOrganizationIdsConnection = {
  __typename?: 'CurrentUserMemberOrganizationIdsConnection';
  /** A list of edges which contains the `UUID` and cursor to aid in pagination. */
  edges: Array<CurrentUserMemberOrganizationIdEdge>;
  /** A list of `UUID` objects. */
  nodes: Array<Maybe<Scalars['UUID']>>;
  /** The count of *all* `UUID` you could get from the connection. */
  totalCount: Scalars['Int'];
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

/** All input for the `deleteAttendeeFormField` mutation. */
export type DeleteAttendeeFormFieldInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `AttendeeFormField` mutation. */
export type DeleteAttendeeFormFieldPayload = {
  __typename?: 'DeleteAttendeeFormFieldPayload';
  /** Reads a single `Attendee` that is related to this `AttendeeFormField`. */
  attendee?: Maybe<Attendee>;
  /** The `AttendeeFormField` that was deleted by this mutation. */
  attendeeFormField?: Maybe<AttendeeFormField>;
  /** An edge for our `AttendeeFormField`. May be used by Relay 1. */
  attendeeFormFieldEdge?: Maybe<AttendeeFormFieldsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedAttendeeFormFieldNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `FormField` that is related to this `AttendeeFormField`. */
  field?: Maybe<FormField>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `AttendeeFormField` mutation. */
export type DeleteAttendeeFormFieldPayloadAttendeeFormFieldEdgeArgs = {
  orderBy?: InputMaybe<Array<AttendeeFormFieldsOrderBy>>;
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

/** All input for the `deleteFormField` mutation. */
export type DeleteFormFieldInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `FormField` mutation. */
export type DeleteFormFieldPayload = {
  __typename?: 'DeleteFormFieldPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedFormFieldNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Event` that is related to this `FormField`. */
  event?: Maybe<Event>;
  /** The `FormField` that was deleted by this mutation. */
  formField?: Maybe<FormField>;
  /** An edge for our `FormField`. May be used by Relay 1. */
  formFieldEdge?: Maybe<FormFieldsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `FormField` mutation. */
export type DeleteFormFieldPayloadFormFieldEdgeArgs = {
  orderBy?: InputMaybe<Array<FormFieldsOrderBy>>;
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

/** All input for the `deleteOrganizationInvitation` mutation. */
export type DeleteOrganizationInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `OrganizationInvitation` mutation. */
export type DeleteOrganizationInvitationPayload = {
  __typename?: 'DeleteOrganizationInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedOrganizationInvitationNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Organization` that is related to this `OrganizationInvitation`. */
  organization?: Maybe<Organization>;
  /** The `OrganizationInvitation` that was deleted by this mutation. */
  organizationInvitation?: Maybe<OrganizationInvitation>;
  /** An edge for our `OrganizationInvitation`. May be used by Relay 1. */
  organizationInvitationEdge?: Maybe<OrganizationInvitationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationInvitation`. */
  user?: Maybe<User>;
};


/** The output of our delete `OrganizationInvitation` mutation. */
export type DeleteOrganizationInvitationPayloadOrganizationInvitationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationInvitationsOrderBy>>;
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
  /** Reads and enables pagination through a set of `Attendee`. */
  attendees: AttendeesConnection;
  bookingEndsAt?: Maybe<Scalars['Datetime']>;
  bookingStartsAt?: Maybe<Scalars['Datetime']>;
  capacity?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  description?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['String']>;
  endsAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `EventBranding` that is related to this `Event`. */
  eventBranding?: Maybe<EventBranding>;
  /**
   * Reads and enables pagination through a set of `EventBranding`.
   * @deprecated Please use eventBranding instead
   */
  eventBrandings: EventBrandingsConnection;
  /** Reads and enables pagination through a set of `FormField`. */
  formFields: FormFieldsConnection;
  id: Scalars['UUID'];
  isCancelled: Scalars['Boolean'];
  isDraft: Scalars['Boolean'];
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
  state?: Maybe<Scalars['String']>;
  /** @deprecated use state instead */
  status?: Maybe<EventStatus>;
  totalConfirmedRegistrations?: Maybe<Scalars['Int']>;
  totalRegistrations?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['Datetime'];
  webhooks?: Maybe<Array<Maybe<Scalars['String']>>>;
  zipCode?: Maybe<Scalars['String']>;
};


export type EventAttendeesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AttendeeFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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


export type EventFormFieldsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<FormFieldCondition>;
  filter?: InputMaybe<FormFieldFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<FormFieldsOrderBy>>;
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
  createdAt: Scalars['Datetime'];
  cssVariables?: Maybe<Scalars['JSON']>;
  /** Reads a single `Event` that is related to this `EventBranding`. */
  event?: Maybe<Event>;
  eventId: Scalars['UUID'];
  font?: Maybe<Fonts>;
  headerMailContact?: Maybe<Scalars['String']>;
  headerMailName?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageTicketUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
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
  /** Checks for equality with the object’s `font` field. */
  font?: InputMaybe<Fonts>;
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
  /** Filter by the object’s `event` relation. */
  event?: InputMaybe<EventFilter>;
  /** Filter by the object’s `eventId` field. */
  eventId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `font` field. */
  font?: InputMaybe<FontsFilter>;
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
  createdAt?: InputMaybe<Scalars['Datetime']>;
  cssVariables?: InputMaybe<Scalars['JSON']>;
  eventId: Scalars['UUID'];
  font?: InputMaybe<Fonts>;
  headerMailContact?: InputMaybe<Scalars['String']>;
  headerMailName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  imageTicketUrl?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  richText?: InputMaybe<Scalars['String']>;
  shortText?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `EventBranding`. Fields that are set will be updated. */
export type EventBrandingPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  cssVariables?: InputMaybe<Scalars['JSON']>;
  eventId?: InputMaybe<Scalars['UUID']>;
  font?: InputMaybe<Fonts>;
  headerMailContact?: InputMaybe<Scalars['String']>;
  headerMailName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  imageTicketUrl?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
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
  FontAsc = 'FONT_ASC',
  FontDesc = 'FONT_DESC',
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
  /** Checks for equality with the object’s `isCancelled` field. */
  isCancelled?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `isDraft` field. */
  isDraft?: InputMaybe<Scalars['Boolean']>;
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
  /** Filter by the object’s `eventBranding` relation. */
  eventBranding?: InputMaybe<EventBrandingFilter>;
  /** A related `eventBranding` exists. */
  eventBrandingExists?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `formFields` relation. */
  formFields?: InputMaybe<EventToManyFormFieldFilter>;
  /** Some related `formFields` exist. */
  formFieldsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `isCancelled` field. */
  isCancelled?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isDraft` field. */
  isDraft?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `logs` relation. */
  logs?: InputMaybe<EventToManyLogFilter>;
  /** Some related `logs` exist. */
  logsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EventFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EventFilter>>;
  /** Filter by the object’s `organization` relation. */
  organization?: InputMaybe<OrganizationFilter>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `registrations` relation. */
  registrations?: InputMaybe<EventToManyRegistrationFilter>;
  /** Some related `registrations` exist. */
  registrationsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `startsAt` field. */
  startsAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `state` field. */
  state?: InputMaybe<StringFilter>;
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
  description?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  endsAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  isCancelled?: InputMaybe<Scalars['Boolean']>;
  isDraft?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
  placeName?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  startsAt?: InputMaybe<Scalars['Datetime']>;
  status?: InputMaybe<EventStatus>;
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
  isCancelled?: InputMaybe<Scalars['Boolean']>;
  isDraft?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  organizationId?: InputMaybe<Scalars['UUID']>;
  placeName?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  startsAt?: InputMaybe<Scalars['Datetime']>;
  status?: InputMaybe<EventStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  webhooks?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  zipCode?: InputMaybe<Scalars['String']>;
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
  IsCancelledAsc = 'IS_CANCELLED_ASC',
  IsCancelledDesc = 'IS_CANCELLED_DESC',
  IsDraftAsc = 'IS_DRAFT_ASC',
  IsDraftDesc = 'IS_DRAFT_DESC',
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

export enum EventStatus {
  /** Annulé */
  Cancelled = 'CANCELLED',
  /** Brouillon */
  Draft = 'DRAFT',
  /** Terminé */
  Finished = 'FINISHED',
  /** En cours */
  Ongoing = 'ONGOING',
  /** A venir */
  Pending = 'PENDING'
}

/** A filter to be used against many `FormField` object types. All fields are combined with a logical ‘and.’ */
export type EventToManyFormFieldFilter = {
  /** Every related `FormField` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<FormFieldFilter>;
  /** No related `FormField` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<FormFieldFilter>;
  /** Some related `FormField` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<FormFieldFilter>;
};

/** A filter to be used against many `Log` object types. All fields are combined with a logical ‘and.’ */
export type EventToManyLogFilter = {
  /** Every related `Log` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<LogFilter>;
  /** No related `Log` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<LogFilter>;
  /** Some related `Log` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<LogFilter>;
};

/** A filter to be used against many `Registration` object types. All fields are combined with a logical ‘and.’ */
export type EventToManyRegistrationFilter = {
  /** Every related `Registration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<RegistrationFilter>;
  /** No related `Registration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<RegistrationFilter>;
  /** Some related `Registration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<RegistrationFilter>;
};

export enum FieldTypes {
  /** Un input de type `checkbox` */
  Checkbox = 'CHECKBOX',
  /** Un input de type `date` */
  Date = 'DATE',
  /** Un input de type `email` */
  Email = 'EMAIL',
  /** Un input de type `number` */
  Number = 'NUMBER',
  /** Un input de type `radio` */
  Radio = 'RADIO',
  /** Un input de type `select` */
  Select = 'SELECT',
  /** Un input de type `tel` */
  Tel = 'TEL',
  /** Un input de type `text` */
  Text = 'TEXT',
  /** Un input de type `textarea` */
  Textarea = 'TEXTAREA'
}

/** A filter to be used against FieldTypes fields. All fields are combined with a logical ‘and.’ */
export type FieldTypesFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<FieldTypes>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<FieldTypes>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<FieldTypes>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<FieldTypes>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<FieldTypes>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<FieldTypes>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<FieldTypes>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<FieldTypes>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<FieldTypes>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<FieldTypes>>;
};

export enum Fonts {
  /** Montserrat */
  Montserrat = 'MONTSERRAT',
  /** Open Sans */
  Opensans = 'OPENSANS',
  /** Roboto */
  Roboto = 'ROBOTO'
}

/** A filter to be used against Fonts fields. All fields are combined with a logical ‘and.’ */
export type FontsFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Fonts>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Fonts>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Fonts>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Fonts>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Fonts>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Fonts>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Fonts>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Fonts>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Fonts>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Fonts>>;
};

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

export type FormField = {
  __typename?: 'FormField';
  appliesToAllAttendees: Scalars['Boolean'];
  /** Reads and enables pagination through a set of `AttendeeFormField`. */
  attendeeFormFieldsByFieldId: AttendeeFormFieldsConnection;
  createdAt: Scalars['Datetime'];
  /** Reads a single `Event` that is related to this `FormField`. */
  event?: Maybe<Event>;
  eventId: Scalars['UUID'];
  id: Scalars['UUID'];
  isDeletable: Scalars['Boolean'];
  isRequiredForAttendee: Scalars['Boolean'];
  isRequiredForInscriptor: Scalars['Boolean'];
  label: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<Scalars['String']>>>;
  placeholder?: Maybe<Scalars['String']>;
  position: Scalars['Int'];
  type: FieldTypes;
  updatedAt: Scalars['Datetime'];
};


export type FormFieldAttendeeFormFieldsByFieldIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AttendeeFormFieldCondition>;
  filter?: InputMaybe<AttendeeFormFieldFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AttendeeFormFieldsOrderBy>>;
};

/**
 * A condition to be used against `FormField` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type FormFieldCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<FieldTypes>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `FormField` object types. All fields are combined with a logical ‘and.’ */
export type FormFieldFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<FormFieldFilter>>;
  /** Filter by the object’s `attendeeFormFieldsByFieldId` relation. */
  attendeeFormFieldsByFieldId?: InputMaybe<FormFieldToManyAttendeeFormFieldFilter>;
  /** Some related `attendeeFormFieldsByFieldId` exist. */
  attendeeFormFieldsByFieldIdExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `event` relation. */
  event?: InputMaybe<EventFilter>;
  /** Filter by the object’s `eventId` field. */
  eventId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<FormFieldFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<FormFieldFilter>>;
  /** Filter by the object’s `position` field. */
  position?: InputMaybe<IntFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<FieldTypesFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `FormField` */
export type FormFieldInput = {
  appliesToAllAttendees?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  eventId: Scalars['UUID'];
  id?: InputMaybe<Scalars['UUID']>;
  isDeletable?: InputMaybe<Scalars['Boolean']>;
  isRequiredForAttendee?: InputMaybe<Scalars['Boolean']>;
  isRequiredForInscriptor?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  placeholder?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  type: FieldTypes;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `FormField`. Fields that are set will be updated. */
export type FormFieldPatch = {
  appliesToAllAttendees?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  eventId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  isDeletable?: InputMaybe<Scalars['Boolean']>;
  isRequiredForAttendee?: InputMaybe<Scalars['Boolean']>;
  isRequiredForInscriptor?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  placeholder?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<FieldTypes>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `FormField` values. */
export type FormFieldsConnection = {
  __typename?: 'FormFieldsConnection';
  /** A list of edges which contains the `FormField` and cursor to aid in pagination. */
  edges: Array<FormFieldsEdge>;
  /** A list of `FormField` objects. */
  nodes: Array<FormField>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FormField` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `FormField` edge in the connection. */
export type FormFieldsEdge = {
  __typename?: 'FormFieldsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `FormField` at the end of the edge. */
  node: FormField;
};

/** Methods to use when ordering `FormField`. */
export enum FormFieldsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A filter to be used against many `AttendeeFormField` object types. All fields are combined with a logical ‘and.’ */
export type FormFieldToManyAttendeeFormFieldFilter = {
  /** Every related `AttendeeFormField` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AttendeeFormFieldFilter>;
  /** No related `AttendeeFormField` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AttendeeFormFieldFilter>;
  /** Some related `AttendeeFormField` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AttendeeFormFieldFilter>;
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

/** All input for the `inviteToOrganization` mutation. */
export type InviteToOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  role?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

/** The output of our `inviteToOrganization` mutation. */
export type InviteToOrganizationPayload = {
  __typename?: 'InviteToOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  typeErrorCodeAndMessage?: Maybe<TypeErrorCodeAndMessage>;
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
  /** Filter by the object’s `event` relation. */
  event?: InputMaybe<EventFilter>;
  /** A related `event` exists. */
  eventExists?: InputMaybe<Scalars['Boolean']>;
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

/** An input for mutations affecting `Log` */
export type LogInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  eventId?: InputMaybe<Scalars['UUID']>;
  id?: InputMaybe<Scalars['UUID']>;
  payload?: InputMaybe<Scalars['JSON']>;
  status: LogsStatus;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  success?: Maybe<Scalars['Boolean']>;
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

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  acceptInvitationToOrganization?: Maybe<AcceptInvitationToOrganizationPayload>;
  cancelInvitation?: Maybe<CancelInvitationPayload>;
  changeMembershipRole?: Maybe<ChangeMembershipRolePayload>;
  /** Enter your old password and a new password to change your password. */
  changePassword?: Maybe<ChangePasswordPayload>;
  /** If you're certain you want to delete your account, use `requestAccountDeletion` to request an account deletion token, and then supply the token through this mutation to complete account deletion. */
  confirmAccountDeletion?: Maybe<ConfirmAccountDeletionPayload>;
  /** Creates a single `Attendee`. */
  createAttendee?: Maybe<CreateAttendeePayload>;
  /** Creates a single `AttendeeFormField`. */
  createAttendeeFormField?: Maybe<CreateAttendeeFormFieldPayload>;
  /** Creates a single `Event`. */
  createEvent?: Maybe<CreateEventPayload>;
  /** Creates a single `EventBranding`. */
  createEventBranding?: Maybe<CreateEventBrandingPayload>;
  /** Creates a single `FormField`. */
  createFormField?: Maybe<CreateFormFieldPayload>;
  /** Creates a single `Log`. */
  createLog?: Maybe<CreateLogPayload>;
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `OrganizationInvitation`. */
  createOrganizationInvitation?: Maybe<CreateOrganizationInvitationPayload>;
  /** Creates a single `OrganizationMembership`. */
  createOrganizationMembership?: Maybe<CreateOrganizationMembershipPayload>;
  /** Creates a single `Registration`. */
  createRegistration?: Maybe<CreateRegistrationPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `UserAuthentication`. */
  createUserAuthentication?: Maybe<CreateUserAuthenticationPayload>;
  /** Deletes a single `Attendee` using a unique key. */
  deleteAttendee?: Maybe<DeleteAttendeePayload>;
  /** Deletes a single `AttendeeFormField` using a unique key. */
  deleteAttendeeFormField?: Maybe<DeleteAttendeeFormFieldPayload>;
  /** Deletes a single `Event` using a unique key. */
  deleteEvent?: Maybe<DeleteEventPayload>;
  /** Deletes a single `EventBranding` using a unique key. */
  deleteEventBranding?: Maybe<DeleteEventBrandingPayload>;
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Deletes a single `FormField` using a unique key. */
  deleteFormField?: Maybe<DeleteFormFieldPayload>;
  /** Deletes a single `Log` using a unique key. */
  deleteLog?: Maybe<DeleteLogPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `OrganizationInvitation` using a unique key. */
  deleteOrganizationInvitation?: Maybe<DeleteOrganizationInvitationPayload>;
  /** Deletes a single `OrganizationMembership` using a unique key. */
  deleteOrganizationMembership?: Maybe<DeleteOrganizationMembershipPayload>;
  /** Deletes a single `Registration` using a unique key. */
  deleteRegistration?: Maybe<DeleteRegistrationPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `UserAuthentication` using a unique key. */
  deleteUserAuthentication?: Maybe<DeleteUserAuthenticationPayload>;
  /** If you've forgotten your password, give us one of your email addresses and we'll send you a reset token. Note this only works if you have added an email address! */
  forgotPassword?: Maybe<ForgotPasswordPayload>;
  generatePresignedPost?: Maybe<GeneratePresignedPostPayload>;
  inviteToOrganization?: Maybe<InviteToOrganizationPayload>;
  /** Use this mutation to log in to your account; this login uses sessions so you do not need to take further action. */
  login?: Maybe<LoginPayload>;
  /** Use this mutation to logout from your account. Don't forget to clear the client state! */
  logout?: Maybe<LogoutPayload>;
  /** Use this mutation to create an account on our system. This may only be used if you are logged out. */
  register?: Maybe<RegisterPayload>;
  registerAttendees?: Maybe<RegisterAttendeesPayload>;
  registerAttendeesCsv?: Maybe<RegisterAttendeesCsvPayload>;
  registerCompleteAttendeeCsv?: Maybe<RegisterCompleteAttendeeCsvPayload>;
  registerCompleteAttendees?: Maybe<RegisterCompleteAttendeesPayload>;
  removeFromOrganization?: Maybe<RemoveFromOrganizationPayload>;
  /** Begin the account deletion flow by requesting the confirmation email */
  requestAccountDeletion?: Maybe<RequestAccountDeletionPayload>;
  /** If you didn't receive the verification code for this email, we can resend it. We silently cap the rate of resends on the backend, so calls to this function may not result in another email being sent if it has been called recently. */
  resendEmailVerificationCode?: Maybe<ResendEmailVerificationCodePayload>;
  /** After triggering forgotPassword, you'll be sent a reset token. Combine this with your user ID and a new password to reset your password. */
  resetPassword?: Maybe<ResetPasswordPayload>;
  scanAttendee?: Maybe<ScanAttendeePayload>;
  scanAttendeesAsync?: Maybe<ScanAttendeesAsyncPayload>;
  /** Select event to retrieve all attendee and send email to all attendee */
  sendEmailAllAttendeeEvent?: Maybe<SendEmailAllAttendeeEventPayload>;
  /** Select ticket_number to send email to attendee */
  sendEmailAttendeeEvent?: Maybe<SendEmailAttendeeEventPayload>;
  /** Select event to retrieve all attendee and send email to all attendee and confirm donation */
  sendEmailConfirmDonationByEventId?: Maybe<SendEmailConfirmDonationByEventIdPayload>;
  transferOrganizationOwnership?: Maybe<TransferOrganizationOwnershipPayload>;
  /** Updates a single `Attendee` using a unique key and a patch. */
  updateAttendee?: Maybe<UpdateAttendeePayload>;
  updateAttendeeEmailAndSendEmail?: Maybe<UpdateAttendeeEmailAndSendEmailPayload>;
  /** Updates a single `AttendeeFormField` using a unique key and a patch. */
  updateAttendeeFormField?: Maybe<UpdateAttendeeFormFieldPayload>;
  /** Updates a single `Event` using a unique key and a patch. */
  updateEvent?: Maybe<UpdateEventPayload>;
  /** Updates a single `EventBranding` using a unique key and a patch. */
  updateEventBranding?: Maybe<UpdateEventBrandingPayload>;
  /** Updates a single `FormField` using a unique key and a patch. */
  updateFormField?: Maybe<UpdateFormFieldPayload>;
  /** Updates a single `Log` using a unique key and a patch. */
  updateLog?: Maybe<UpdateLogPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `OrganizationInvitation` using a unique key and a patch. */
  updateOrganizationInvitation?: Maybe<UpdateOrganizationInvitationPayload>;
  /** Updates a single `OrganizationMembership` using a unique key and a patch. */
  updateOrganizationMembership?: Maybe<UpdateOrganizationMembershipPayload>;
  /** Updates a single `Registration` using a unique key and a patch. */
  updateRegistration?: Maybe<UpdateRegistrationPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `UserAuthentication` using a unique key and a patch. */
  updateUserAuthentication?: Maybe<UpdateUserAuthenticationPayload>;
  /** Once you have received a verification token for your email, you may call this mutation with that token to make your email verified. */
  verifyEmail?: Maybe<VerifyEmailPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAcceptInvitationToOrganizationArgs = {
  input: AcceptInvitationToOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCancelInvitationArgs = {
  input: CancelInvitationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationChangeMembershipRoleArgs = {
  input: ChangeMembershipRoleInput;
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
export type MutationCreateAttendeeFormFieldArgs = {
  input: CreateAttendeeFormFieldInput;
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
export type MutationCreateFormFieldArgs = {
  input: CreateFormFieldInput;
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
export type MutationCreateOrganizationInvitationArgs = {
  input: CreateOrganizationInvitationInput;
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
export type MutationDeleteAttendeeArgs = {
  input: DeleteAttendeeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAttendeeFormFieldArgs = {
  input: DeleteAttendeeFormFieldInput;
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
export type MutationDeleteFormFieldArgs = {
  input: DeleteFormFieldInput;
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
export type MutationDeleteOrganizationInvitationArgs = {
  input: DeleteOrganizationInvitationInput;
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
export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGeneratePresignedPostArgs = {
  input: GeneratePresignedPostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationInviteToOrganizationArgs = {
  input: InviteToOrganizationInput;
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
export type MutationRegisterAttendeesArgs = {
  input: RegisterAttendeesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterAttendeesCsvArgs = {
  input: RegisterAttendeesCsvInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterCompleteAttendeeCsvArgs = {
  input: RegisterCompleteAttendeeCsvInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterCompleteAttendeesArgs = {
  input: RegisterCompleteAttendeesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRemoveFromOrganizationArgs = {
  input: RemoveFromOrganizationInput;
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
export type MutationScanAttendeesAsyncArgs = {
  input: ScanAttendeesAsyncInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSendEmailAllAttendeeEventArgs = {
  input: SendEmailAllAttendeeEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSendEmailAttendeeEventArgs = {
  input: SendEmailAttendeeEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSendEmailConfirmDonationByEventIdArgs = {
  input: SendEmailConfirmDonationByEventIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationTransferOrganizationOwnershipArgs = {
  input: TransferOrganizationOwnershipInput;
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
export type MutationUpdateAttendeeFormFieldArgs = {
  input: UpdateAttendeeFormFieldInput;
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
export type MutationUpdateFormFieldArgs = {
  input: UpdateFormFieldInput;
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
export type MutationUpdateOrganizationInvitationArgs = {
  input: UpdateOrganizationInvitationInput;
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
export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

/** A company, organization, or institution. */
export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['Datetime'];
  currentUserIsOwner?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Event`. */
  events: EventsConnection;
  id: Scalars['UUID'];
  logoUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** Reads and enables pagination through a set of `OrganizationInvitation`. */
  organizationInvitations: OrganizationInvitationsConnection;
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
export type OrganizationOrganizationInvitationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationInvitationCondition>;
  filter?: InputMaybe<OrganizationInvitationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationInvitationsOrderBy>>;
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
  /** Filter by the object’s `currentUserIsOwner` field. */
  currentUserIsOwner?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `events` relation. */
  events?: InputMaybe<OrganizationToManyEventFilter>;
  /** Some related `events` exist. */
  eventsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OrganizationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OrganizationFilter>>;
  /** Filter by the object’s `organizationInvitations` relation. */
  organizationInvitations?: InputMaybe<OrganizationToManyOrganizationInvitationFilter>;
  /** Some related `organizationInvitations` exist. */
  organizationInvitationsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `organizationMemberships` relation. */
  organizationMemberships?: InputMaybe<OrganizationToManyOrganizationMembershipFilter>;
  /** Some related `organizationMemberships` exist. */
  organizationMembershipsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type OrganizationInvitation = {
  __typename?: 'OrganizationInvitation';
  code?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** Reads a single `Organization` that is related to this `OrganizationInvitation`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  role: OrganizationMembershipsRolesEnum;
  /** Reads a single `User` that is related to this `OrganizationInvitation`. */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['UUID']>;
};

/**
 * A condition to be used against `OrganizationInvitation` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type OrganizationInvitationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `OrganizationInvitation` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationInvitationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OrganizationInvitationFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OrganizationInvitationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OrganizationInvitationFilter>>;
  /** Filter by the object’s `organization` relation. */
  organization?: InputMaybe<OrganizationFilter>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `role` field. */
  role?: InputMaybe<OrganizationMembershipsRolesEnumFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** A related `user` exists. */
  userExists?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `OrganizationInvitation` */
export type OrganizationInvitationInput = {
  code?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  organizationId: Scalars['UUID'];
  role?: InputMaybe<OrganizationMembershipsRolesEnum>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** Represents an update to a `OrganizationInvitation`. Fields that are set will be updated. */
export type OrganizationInvitationPatch = {
  code?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  organizationId?: InputMaybe<Scalars['UUID']>;
  role?: InputMaybe<OrganizationMembershipsRolesEnum>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `OrganizationInvitation` values. */
export type OrganizationInvitationsConnection = {
  __typename?: 'OrganizationInvitationsConnection';
  /** A list of edges which contains the `OrganizationInvitation` and cursor to aid in pagination. */
  edges: Array<OrganizationInvitationsEdge>;
  /** A list of `OrganizationInvitation` objects. */
  nodes: Array<OrganizationInvitation>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `OrganizationInvitation` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `OrganizationInvitation` edge in the connection. */
export type OrganizationInvitationsEdge = {
  __typename?: 'OrganizationInvitationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `OrganizationInvitation` at the end of the edge. */
  node: OrganizationInvitation;
};

/** Methods to use when ordering `OrganizationInvitation`. */
export enum OrganizationInvitationsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

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
  /** Filter by the object’s `organization` relation. */
  organization?: InputMaybe<OrganizationFilter>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `role` field. */
  role?: InputMaybe<OrganizationMembershipsRolesEnumFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
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
  /** Guest of the organization */
  Guest = 'GUEST',
  /** Host of the organization's events */
  Host = 'HOST',
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

/** A filter to be used against many `Event` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationToManyEventFilter = {
  /** Every related `Event` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<EventFilter>;
  /** No related `Event` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<EventFilter>;
  /** Some related `Event` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<EventFilter>;
};

/** A filter to be used against many `OrganizationInvitation` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationToManyOrganizationInvitationFilter = {
  /** Every related `OrganizationInvitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<OrganizationInvitationFilter>;
  /** No related `OrganizationInvitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<OrganizationInvitationFilter>;
  /** Some related `OrganizationInvitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<OrganizationInvitationFilter>;
};

/** A filter to be used against many `OrganizationMembership` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationToManyOrganizationMembershipFilter = {
  /** Every related `OrganizationMembership` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<OrganizationMembershipFilter>;
  /** No related `OrganizationMembership` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<OrganizationMembershipFilter>;
  /** Some related `OrganizationMembership` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<OrganizationMembershipFilter>;
};

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
  attendeeByTicketNumber?: Maybe<Attendee>;
  attendeeFormField?: Maybe<AttendeeFormField>;
  /** Reads and enables pagination through a set of `AttendeeFormField`. */
  attendeeFormFields?: Maybe<AttendeeFormFieldsConnection>;
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
  currentUserInvitedOrganizationIds?: Maybe<CurrentUserInvitedOrganizationIdsConnection>;
  currentUserMemberOrganizationIds?: Maybe<CurrentUserMemberOrganizationIdsConnection>;
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
  formField?: Maybe<FormField>;
  /** Reads and enables pagination through a set of `FormField`. */
  formFields?: Maybe<FormFieldsConnection>;
  log?: Maybe<Log>;
  /** Reads and enables pagination through a set of `Log`. */
  logs?: Maybe<LogsConnection>;
  /** Reads a set of `Log`. */
  logsList?: Maybe<Array<Log>>;
  organization?: Maybe<Organization>;
  organizationByName?: Maybe<Organization>;
  organizationBySlug?: Maybe<Organization>;
  organizationForInvitation?: Maybe<Organization>;
  organizationInvitation?: Maybe<OrganizationInvitation>;
  organizationInvitationByOrganizationIdAndEmail?: Maybe<OrganizationInvitation>;
  organizationInvitationByOrganizationIdAndUserId?: Maybe<OrganizationInvitation>;
  /** Reads and enables pagination through a set of `OrganizationInvitation`. */
  organizationInvitations?: Maybe<OrganizationInvitationsConnection>;
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
  /** Reads and enables pagination through a set of `Event`. */
  userEvents?: Maybe<EventsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAttendeeArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAttendeeByTicketNumberArgs = {
  ticketNumber: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAttendeeFormFieldArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAttendeeFormFieldsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AttendeeFormFieldCondition>;
  filter?: InputMaybe<AttendeeFormFieldFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AttendeeFormFieldsOrderBy>>;
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
export type QueryCurrentUserInvitedOrganizationIdsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UuidFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCurrentUserMemberOrganizationIdsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UuidFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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
export type QueryFormFieldArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFormFieldsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<FormFieldCondition>;
  filter?: InputMaybe<FormFieldFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<FormFieldsOrderBy>>;
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
export type QueryOrganizationForInvitationArgs = {
  code?: InputMaybe<Scalars['String']>;
  invitationId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationInvitationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationInvitationByOrganizationIdAndEmailArgs = {
  email: Scalars['String'];
  organizationId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationInvitationByOrganizationIdAndUserIdArgs = {
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationInvitationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationInvitationCondition>;
  filter?: InputMaybe<OrganizationInvitationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationInvitationsOrderBy>>;
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
export type QueryUserEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<EventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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

/** All input for the `registerCompleteAttendeeCsv` mutation. */
export type RegisterCompleteAttendeeCsvInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  completeAttendees: Array<InputMaybe<CompleteAttendeeInput>>;
  eventId: Scalars['UUID'];
  isForcing?: InputMaybe<Scalars['Boolean']>;
};

/** The output of our `registerCompleteAttendeeCsv` mutation. */
export type RegisterCompleteAttendeeCsvPayload = {
  __typename?: 'RegisterCompleteAttendeeCsvPayload';
  attendeeImports?: Maybe<Array<Maybe<AttendeeImport>>>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `registerCompleteAttendees` mutation. */
export type RegisterCompleteAttendeesInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  completeAttendees: Array<InputMaybe<CompleteAttendeeInput>>;
  eventId: Scalars['UUID'];
};

/** The output of our `registerCompleteAttendees` mutation. */
export type RegisterCompleteAttendeesPayload = {
  __typename?: 'RegisterCompleteAttendeesPayload';
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


/** The output of our `registerCompleteAttendees` mutation. */
export type RegisterCompleteAttendeesPayloadRegistrationEdgeArgs = {
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
  /** Filter by the object’s `attendees` relation. */
  attendees?: InputMaybe<RegistrationToManyAttendeeFilter>;
  /** Some related `attendees` exist. */
  attendeesExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `event` relation. */
  event?: InputMaybe<EventFilter>;
  /** A related `event` exists. */
  eventExists?: InputMaybe<Scalars['Boolean']>;
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

/** A filter to be used against many `Attendee` object types. All fields are combined with a logical ‘and.’ */
export type RegistrationToManyAttendeeFilter = {
  /** Every related `Attendee` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AttendeeFilter>;
  /** No related `Attendee` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AttendeeFilter>;
  /** Some related `Attendee` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AttendeeFilter>;
};

/** All input for the `removeFromOrganization` mutation. */
export type RemoveFromOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

/** The output of our `removeFromOrganization` mutation. */
export type RemoveFromOrganizationPayload = {
  __typename?: 'RemoveFromOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

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
  userId: Scalars['UUID'];
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
  payload: TicketPayloadInput;
};

/** The output of our `scanAttendee` mutation. */
export type ScanAttendeePayload = {
  __typename?: 'ScanAttendeePayload';
  boolean?: Maybe<Scalars['Boolean']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `scanAttendeesAsync` mutation. */
export type ScanAttendeesAsyncInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  payloads: Array<InputMaybe<TicketPayloadInput>>;
};

/** The output of our `scanAttendeesAsync` mutation. */
export type ScanAttendeesAsyncPayload = {
  __typename?: 'ScanAttendeesAsyncPayload';
  boolean?: Maybe<Scalars['Boolean']>;
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

/** All input for the `sendEmailAttendeeEvent` mutation. */
export type SendEmailAttendeeEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  ticketNumber: Scalars['String'];
};

/** The output of our `sendEmailAttendeeEvent` mutation. */
export type SendEmailAttendeeEventPayload = {
  __typename?: 'SendEmailAttendeeEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  rowEventAttendee?: Maybe<RowEventAttendee>;
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
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']>>;
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
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']>>;
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

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Triggered when the logged in user's record is updated in some way. */
  currentUserUpdated?: Maybe<UserSubscriptionPayload>;
};

/** An input for mutations affecting `TicketPayload` */
export type TicketPayloadInput = {
  email?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  panelNumber?: InputMaybe<Scalars['Int']>;
  ticketNumber?: InputMaybe<Scalars['String']>;
};

/** All input for the `transferOrganizationOwnership` mutation. */
export type TransferOrganizationOwnershipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

/** The output of our `transferOrganizationOwnership` mutation. */
export type TransferOrganizationOwnershipPayload = {
  __typename?: 'TransferOrganizationOwnershipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `transferOrganizationOwnership` mutation. */
export type TransferOrganizationOwnershipPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

export type TypeErrorCodeAndMessage = {
  __typename?: 'TypeErrorCodeAndMessage';
  data?: Maybe<Scalars['JSON']>;
  errorCode?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  errorValue?: Maybe<Scalars['Int']>;
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

/** All input for the `updateAttendeeFormField` mutation. */
export type UpdateAttendeeFormFieldInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `AttendeeFormField` being updated. */
  patch: AttendeeFormFieldPatch;
};

/** The output of our update `AttendeeFormField` mutation. */
export type UpdateAttendeeFormFieldPayload = {
  __typename?: 'UpdateAttendeeFormFieldPayload';
  /** Reads a single `Attendee` that is related to this `AttendeeFormField`. */
  attendee?: Maybe<Attendee>;
  /** The `AttendeeFormField` that was updated by this mutation. */
  attendeeFormField?: Maybe<AttendeeFormField>;
  /** An edge for our `AttendeeFormField`. May be used by Relay 1. */
  attendeeFormFieldEdge?: Maybe<AttendeeFormFieldsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `FormField` that is related to this `AttendeeFormField`. */
  field?: Maybe<FormField>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `AttendeeFormField` mutation. */
export type UpdateAttendeeFormFieldPayloadAttendeeFormFieldEdgeArgs = {
  orderBy?: InputMaybe<Array<AttendeeFormFieldsOrderBy>>;
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

/** All input for the `updateFormField` mutation. */
export type UpdateFormFieldInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `FormField` being updated. */
  patch: FormFieldPatch;
};

/** The output of our update `FormField` mutation. */
export type UpdateFormFieldPayload = {
  __typename?: 'UpdateFormFieldPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Event` that is related to this `FormField`. */
  event?: Maybe<Event>;
  /** The `FormField` that was updated by this mutation. */
  formField?: Maybe<FormField>;
  /** An edge for our `FormField`. May be used by Relay 1. */
  formFieldEdge?: Maybe<FormFieldsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `FormField` mutation. */
export type UpdateFormFieldPayloadFormFieldEdgeArgs = {
  orderBy?: InputMaybe<Array<FormFieldsOrderBy>>;
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

/** All input for the `updateOrganizationInvitation` mutation. */
export type UpdateOrganizationInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `OrganizationInvitation` being updated. */
  patch: OrganizationInvitationPatch;
};

/** The output of our update `OrganizationInvitation` mutation. */
export type UpdateOrganizationInvitationPayload = {
  __typename?: 'UpdateOrganizationInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Organization` that is related to this `OrganizationInvitation`. */
  organization?: Maybe<Organization>;
  /** The `OrganizationInvitation` that was updated by this mutation. */
  organizationInvitation?: Maybe<OrganizationInvitation>;
  /** An edge for our `OrganizationInvitation`. May be used by Relay 1. */
  organizationInvitationEdge?: Maybe<OrganizationInvitationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationInvitation`. */
  user?: Maybe<User>;
};


/** The output of our update `OrganizationInvitation` mutation. */
export type UpdateOrganizationInvitationPayloadOrganizationInvitationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationInvitationsOrderBy>>;
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
  email: Scalars['String'];
  /** Reads and enables pagination through a set of `Event`. */
  events: EventsConnection;
  firstname: Scalars['String'];
  hasPassword?: Maybe<Scalars['Boolean']>;
  /** Unique identifier for the user. */
  id: Scalars['UUID'];
  /** If true, the user has elevated privileges. */
  isAdmin: Scalars['Boolean'];
  isOnboarded: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  isVolunteer: Scalars['Boolean'];
  lastname: Scalars['String'];
  /** Reads and enables pagination through a set of `OrganizationInvitation`. */
  organizationInvitations: OrganizationInvitationsConnection;
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships: OrganizationMembershipsConnection;
  organizations: UsersOrganizationsConnection;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `UserAuthentication`. */
  userAuthentications: UserAuthenticationsConnection;
  /** Public-facing username (or 'handle') of the user. */
  username: Scalars['String'];
};


/** A user who can log in to the application. */
export type UserEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<EventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


/** A user who can log in to the application. */
export type UserOrganizationInvitationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationInvitationCondition>;
  filter?: InputMaybe<OrganizationInvitationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationInvitationsOrderBy>>;
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
export type UserOrganizationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UsersOrganizationsRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
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
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `isVolunteer` field. */
  isVolunteer?: InputMaybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `lastname` field. */
  lastname?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']>;
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
  /** Filter by the object’s `isVolunteer` field. */
  isVolunteer?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `lastname` field. */
  lastname?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `organizationInvitations` relation. */
  organizationInvitations?: InputMaybe<UserToManyOrganizationInvitationFilter>;
  /** Some related `organizationInvitations` exist. */
  organizationInvitationsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `organizationMemberships` relation. */
  organizationMemberships?: InputMaybe<UserToManyOrganizationMembershipFilter>;
  /** Some related `organizationMemberships` exist. */
  organizationMembershipsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `userAuthentications` relation. */
  userAuthentications?: InputMaybe<UserToManyUserAuthenticationFilter>;
  /** Some related `userAuthentications` exist. */
  userAuthenticationsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `username` field. */
  username?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  /** Optional avatar URL. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  /** Unique identifier for the user. */
  id?: InputMaybe<Scalars['UUID']>;
  /** If true, the user has elevated privileges. */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isOnboarded?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  isVolunteer?: InputMaybe<Scalars['Boolean']>;
  lastname: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Public-facing username (or 'handle') of the user. */
  username?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  /** Optional avatar URL. */
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  /** Unique identifier for the user. */
  id?: InputMaybe<Scalars['UUID']>;
  /** If true, the user has elevated privileges. */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isOnboarded?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  isVolunteer?: InputMaybe<Scalars['Boolean']>;
  lastname?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Public-facing username (or 'handle') of the user. */
  username?: InputMaybe<Scalars['String']>;
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
  IsVolunteerAsc = 'IS_VOLUNTEER_ASC',
  IsVolunteerDesc = 'IS_VOLUNTEER_DESC',
  LastnameAsc = 'LASTNAME_ASC',
  LastnameDesc = 'LASTNAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC'
}

/** A `UsersOrganizationsRecord` edge in the connection. */
export type UsersOrganizationEdge = {
  __typename?: 'UsersOrganizationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UsersOrganizationsRecord` at the end of the edge. */
  node: UsersOrganizationsRecord;
};

/** A connection to a list of `UsersOrganizationsRecord` values. */
export type UsersOrganizationsConnection = {
  __typename?: 'UsersOrganizationsConnection';
  /** A list of edges which contains the `UsersOrganizationsRecord` and cursor to aid in pagination. */
  edges: Array<UsersOrganizationEdge>;
  /** A list of `UsersOrganizationsRecord` objects. */
  nodes: Array<UsersOrganizationsRecord>;
  /** The count of *all* `UsersOrganizationsRecord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** The return type of our `organizations` query. */
export type UsersOrganizationsRecord = {
  __typename?: 'UsersOrganizationsRecord';
  organization?: Maybe<Organization>;
  role?: Maybe<Scalars['String']>;
};

/** A filter to be used against `UsersOrganizationsRecord` object types. All fields are combined with a logical ‘and.’ */
export type UsersOrganizationsRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UsersOrganizationsRecordFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<UsersOrganizationsRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UsersOrganizationsRecordFilter>>;
  /** Filter by the object’s `role` field. */
  role?: InputMaybe<StringFilter>;
};

export type UserSubscriptionPayload = {
  __typename?: 'UserSubscriptionPayload';
  event?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

/** A filter to be used against many `OrganizationInvitation` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyOrganizationInvitationFilter = {
  /** Every related `OrganizationInvitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<OrganizationInvitationFilter>;
  /** No related `OrganizationInvitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<OrganizationInvitationFilter>;
  /** Some related `OrganizationInvitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<OrganizationInvitationFilter>;
};

/** A filter to be used against many `OrganizationMembership` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyOrganizationMembershipFilter = {
  /** Every related `OrganizationMembership` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<OrganizationMembershipFilter>;
  /** No related `OrganizationMembership` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<OrganizationMembershipFilter>;
  /** Some related `OrganizationMembership` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<OrganizationMembershipFilter>;
};

/** A filter to be used against many `UserAuthentication` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyUserAuthenticationFilter = {
  /** Every related `UserAuthentication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<UserAuthenticationFilter>;
  /** No related `UserAuthentication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<UserAuthenticationFilter>;
  /** Some related `UserAuthentication` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<UserAuthenticationFilter>;
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

/** All input for the `verifyEmail` mutation. */
export type VerifyEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
  userId: Scalars['UUID'];
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

export type MyAttendeeFragment = { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: AttendeeStatus, panelNumber?: number | null, ticketNumber: string, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null, isVip?: boolean | null, additionalData?: Array<{ __typename?: 'AdditionalInformation', label?: string | null, values?: string | null } | null> | null };

export type EventBrandingFragmentFragment = { __typename?: 'EventBranding', createdAt: any, font?: Fonts | null, id: any, logo?: string | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null, cssVariables?: any | null, imageTicketUrl?: string | null };

export type MyEventFragment = { __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null };

export type MyFormFieldFragment = { __typename?: 'FormField', id: any, type: FieldTypes, label: string, name?: string | null, placeholder?: string | null, options?: Array<string | null> | null, appliesToAllAttendees: boolean, isDeletable: boolean, isRequiredForAttendee: boolean, isRequiredForInscriptor: boolean, position: number };

export type OrganizationFragmentFragment = { __typename?: 'Organization', id: any, name: string, slug?: string | null, description?: string | null, logoUrl?: string | null, createdAt: any, updatedAt: any };

export type RegistrationFragmentFragment = { __typename?: 'Registration', eventId?: any | null, createdAt: any, hearAboutList?: Array<string | null> | null, id: any, updatedAt: any };

export type MyUserFragment = { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, email: string, username: string };

export type CreateAttendeeMutationVariables = Exact<{
  input: CreateAttendeeInput;
}>;


export type CreateAttendeeMutation = { __typename?: 'Mutation', createAttendee?: { __typename?: 'CreateAttendeePayload', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: AttendeeStatus, panelNumber?: number | null, ticketNumber: string, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null, isVip?: boolean | null, additionalData?: Array<{ __typename?: 'AdditionalInformation', label?: string | null, values?: string | null } | null> | null } | null } | null };

export type UpdateAttendeeMutationVariables = Exact<{
  input: UpdateAttendeeInput;
}>;


export type UpdateAttendeeMutation = { __typename?: 'Mutation', updateAttendee?: { __typename?: 'UpdateAttendeePayload', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: AttendeeStatus, panelNumber?: number | null, ticketNumber: string, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null, isVip?: boolean | null, additionalData?: Array<{ __typename?: 'AdditionalInformation', label?: string | null, values?: string | null } | null> | null } | null } | null };

export type DeleteAttendeeMutationVariables = Exact<{
  input: DeleteAttendeeInput;
}>;


export type DeleteAttendeeMutation = { __typename?: 'Mutation', deleteAttendee?: { __typename?: 'DeleteAttendeePayload', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: AttendeeStatus, panelNumber?: number | null, ticketNumber: string, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null, isVip?: boolean | null, additionalData?: Array<{ __typename?: 'AdditionalInformation', label?: string | null, values?: string | null } | null> | null } | null } | null };

export type RegisterAttendeesMutationVariables = Exact<{
  input: RegisterAttendeesInput;
}>;


export type RegisterAttendeesMutation = { __typename?: 'Mutation', registerAttendees?: { __typename?: 'RegisterAttendeesPayload', registration?: { __typename?: 'Registration', id: any, attendeesList: Array<{ __typename?: 'Attendee', id: any, qrCodeUrl?: string | null, pdfUrl?: string | null }> } | null } | null };

export type SendEmailAllAttendeeEventMutationVariables = Exact<{
  eventId: Scalars['UUID'];
}>;


export type SendEmailAllAttendeeEventMutation = { __typename?: 'Mutation', sendEmailAllAttendeeEvent?: { __typename?: 'SendEmailAllAttendeeEventPayload', clientMutationId?: string | null, rowEventAttendees?: Array<{ __typename?: 'RowEventAttendee', id?: string | null, email?: string | null } | null> | null } | null };

export type SendEmailAttendeeEventMutationVariables = Exact<{
  ticketNumber: Scalars['String'];
}>;


export type SendEmailAttendeeEventMutation = { __typename?: 'Mutation', sendEmailAttendeeEvent?: { __typename?: 'SendEmailAttendeeEventPayload', clientMutationId?: string | null, rowEventAttendee?: { __typename?: 'RowEventAttendee', id?: string | null, email?: string | null } | null } | null };

export type UpdateAttendeeEmailAndSendEmailMutationVariables = Exact<{
  attendees: Array<InputMaybe<AttendeePatch>> | InputMaybe<AttendeePatch>;
}>;


export type UpdateAttendeeEmailAndSendEmailMutation = { __typename?: 'Mutation', updateAttendeeEmailAndSendEmail?: { __typename?: 'UpdateAttendeeEmailAndSendEmailPayload', attendees?: Array<{ __typename?: 'Attendee', email?: string | null } | null> | null } | null };

export type ScanAttendeeMutationVariables = Exact<{
  scanAttendeeInput: ScanAttendeeInput;
}>;


export type ScanAttendeeMutation = { __typename?: 'Mutation', scanAttendee?: { __typename?: 'ScanAttendeePayload', clientMutationId?: string | null, boolean?: boolean | null } | null };

export type ScanAttendeesOfflineMutationVariables = Exact<{
  input: ScanAttendeesAsyncInput;
}>;


export type ScanAttendeesOfflineMutation = { __typename?: 'Mutation', scanAttendeesAsync?: { __typename?: 'ScanAttendeesAsyncPayload', boolean?: boolean | null, clientMutationId?: string | null } | null };

export type RegisterCompleteAttendeesMutationVariables = Exact<{
  input: RegisterCompleteAttendeesInput;
}>;


export type RegisterCompleteAttendeesMutation = { __typename?: 'Mutation', registerCompleteAttendees?: { __typename?: 'RegisterCompleteAttendeesPayload', registration?: { __typename?: 'Registration', id: any, attendeesList: Array<{ __typename?: 'Attendee', id: any, qrCodeUrl?: string | null, pdfUrl?: string | null }> } | null } | null };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'CreateEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null } | null } | null };

export type UpdateEventMutationVariables = Exact<{
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'UpdateEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null } | null } | null };

export type DeleteEventMutationVariables = Exact<{
  input: DeleteEventInput;
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'DeleteEventPayload', event?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null } | null } | null };

export type SendEmailConfirmDonationByEventIdMutationVariables = Exact<{
  eventId: Scalars['UUID'];
}>;


export type SendEmailConfirmDonationByEventIdMutation = { __typename?: 'Mutation', sendEmailConfirmDonationByEventId?: { __typename?: 'SendEmailConfirmDonationByEventIdPayload', clientMutationId?: string | null, rowEventAttendeeConfirms?: Array<{ __typename?: 'RowEventAttendeeConfirm', email?: string | null } | null> | null } | null };

export type CreateEventBrandingMutationVariables = Exact<{
  input: CreateEventBrandingInput;
}>;


export type CreateEventBrandingMutation = { __typename?: 'Mutation', createEventBranding?: { __typename?: 'CreateEventBrandingPayload', clientMutationId?: string | null, eventBranding?: { __typename?: 'EventBranding', createdAt: any, font?: Fonts | null, id: any, logo?: string | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null, cssVariables?: any | null, imageTicketUrl?: string | null } | null } | null };

export type UpdateEventBrandingMutationVariables = Exact<{
  input: UpdateEventBrandingInput;
}>;


export type UpdateEventBrandingMutation = { __typename?: 'Mutation', updateEventBranding?: { __typename?: 'UpdateEventBrandingPayload', clientMutationId?: string | null, eventBranding?: { __typename?: 'EventBranding', createdAt: any, font?: Fonts | null, id: any, logo?: string | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null, cssVariables?: any | null, imageTicketUrl?: string | null } | null } | null };

export type DeleteEventBrandingMutationVariables = Exact<{
  input: DeleteEventBrandingInput;
}>;


export type DeleteEventBrandingMutation = { __typename?: 'Mutation', deleteEventBranding?: { __typename?: 'DeleteEventBrandingPayload', clientMutationId?: string | null, eventBranding?: { __typename?: 'EventBranding', createdAt: any, font?: Fonts | null, id: any, logo?: string | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null, cssVariables?: any | null, imageTicketUrl?: string | null } | null } | null };

export type CreateFormFieldMutationVariables = Exact<{
  input: CreateFormFieldInput;
}>;


export type CreateFormFieldMutation = { __typename?: 'Mutation', createFormField?: { __typename?: 'CreateFormFieldPayload', formField?: { __typename?: 'FormField', id: any, type: FieldTypes, label: string, name?: string | null, placeholder?: string | null, options?: Array<string | null> | null, appliesToAllAttendees: boolean, isDeletable: boolean, isRequiredForAttendee: boolean, isRequiredForInscriptor: boolean, position: number } | null } | null };

export type UpdateFormFieldMutationVariables = Exact<{
  input: UpdateFormFieldInput;
}>;


export type UpdateFormFieldMutation = { __typename?: 'Mutation', updateFormField?: { __typename?: 'UpdateFormFieldPayload', formField?: { __typename?: 'FormField', id: any, type: FieldTypes, label: string, name?: string | null, placeholder?: string | null, options?: Array<string | null> | null, appliesToAllAttendees: boolean, isDeletable: boolean, isRequiredForAttendee: boolean, isRequiredForInscriptor: boolean, position: number } | null } | null };

export type DeleteFormFieldMutationVariables = Exact<{
  input: DeleteFormFieldInput;
}>;


export type DeleteFormFieldMutation = { __typename?: 'Mutation', deleteFormField?: { __typename?: 'DeleteFormFieldPayload', formField?: { __typename?: 'FormField', id: any, type: FieldTypes, label: string, name?: string | null, placeholder?: string | null, options?: Array<string | null> | null, appliesToAllAttendees: boolean, isDeletable: boolean, isRequiredForAttendee: boolean, isRequiredForInscriptor: boolean, position: number } | null } | null };

export type GeneratePresignedPostMutationVariables = Exact<{
  key: Scalars['String'];
}>;


export type GeneratePresignedPostMutation = { __typename?: 'Mutation', generatePresignedPost?: { __typename?: 'GeneratePresignedPostPayload', fields?: any | null, url?: string | null } | null };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'CreateOrganizationPayload', organization?: { __typename?: 'Organization', id: any, slug?: string | null } | null } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization?: { __typename?: 'UpdateOrganizationPayload', organization?: { __typename?: 'Organization', id: any } | null } | null };

export type InviteUserToOrganizationMutationVariables = Exact<{
  input: InviteToOrganizationInput;
}>;


export type InviteUserToOrganizationMutation = { __typename?: 'Mutation', inviteToOrganization?: { __typename?: 'InviteToOrganizationPayload', clientMutationId?: string | null, typeErrorCodeAndMessage?: { __typename?: 'TypeErrorCodeAndMessage', errorCode?: string | null, errorMessage?: string | null } | null } | null };

export type RemoveUserFromOrganizationMutationVariables = Exact<{
  input: RemoveFromOrganizationInput;
}>;


export type RemoveUserFromOrganizationMutation = { __typename?: 'Mutation', removeFromOrganization?: { __typename?: 'RemoveFromOrganizationPayload', clientMutationId?: string | null } | null };

export type AcceptOrganizationInvitationMutationVariables = Exact<{
  input: AcceptInvitationToOrganizationInput;
}>;


export type AcceptOrganizationInvitationMutation = { __typename?: 'Mutation', acceptInvitationToOrganization?: { __typename?: 'AcceptInvitationToOrganizationPayload', clientMutationId?: string | null } | null };

export type CancelInvitationMutationVariables = Exact<{
  input: CancelInvitationInput;
}>;


export type CancelInvitationMutation = { __typename?: 'Mutation', cancelInvitation?: { __typename?: 'CancelInvitationPayload', clientMutationId?: string | null } | null };

export type ChangeMembershipRoleMutationVariables = Exact<{
  input: ChangeMembershipRoleInput;
}>;


export type ChangeMembershipRoleMutation = { __typename?: 'Mutation', changeMembershipRole?: { __typename?: 'ChangeMembershipRolePayload', clientMutationId?: string | null } | null };

export type CreateRegistrationMutationVariables = Exact<{
  registration: RegistrationInput;
}>;


export type CreateRegistrationMutation = { __typename?: 'Mutation', createRegistration?: { __typename?: 'CreateRegistrationPayload', clientMutationId?: string | null, registration?: { __typename?: 'Registration', id: any } | null } | null };

export type RegisterAttendeesCsvMutationVariables = Exact<{
  input: RegisterAttendeesCsvInput;
}>;


export type RegisterAttendeesCsvMutation = { __typename?: 'Mutation', registerAttendeesCsv?: { __typename?: 'RegisterAttendeesCsvPayload', clientMutationId?: string | null, attendeeImports?: Array<{ __typename?: 'AttendeeImport', errorCode?: string | null, errorMessage?: string | null, errorValue?: string | null, data?: { __typename?: 'Attendee', email?: string | null, id: any, status: AttendeeStatus } | null } | null> | null } | null };

export type RegisterCompleteAttendeesCsvMutationVariables = Exact<{
  input: RegisterCompleteAttendeeCsvInput;
}>;


export type RegisterCompleteAttendeesCsvMutation = { __typename?: 'Mutation', registerCompleteAttendeeCsv?: { __typename?: 'RegisterCompleteAttendeeCsvPayload', clientMutationId?: string | null, attendeeImports?: Array<{ __typename?: 'AttendeeImport', errorCode?: string | null, errorMessage?: string | null, errorValue?: string | null, data?: { __typename?: 'Attendee', email?: string | null, id: any, status: AttendeeStatus } | null } | null> | null } | null };

export type DeleteRegistrationMutationVariables = Exact<{
  input: DeleteRegistrationInput;
}>;


export type DeleteRegistrationMutation = { __typename?: 'Mutation', deleteRegistration?: { __typename?: 'DeleteRegistrationPayload', clientMutationId?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'UpdateUserPayload', user?: { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, email: string, username: string } | null } | null };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'ForgotPasswordPayload', clientMutationId?: string | null } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginPayload', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: any } } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'LogoutPayload', success?: boolean | null } | null };

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


export type GetAttendeeByIdQuery = { __typename?: 'Query', attendee?: { __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: AttendeeStatus, panelNumber?: number | null, ticketNumber: string, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null, isVip?: boolean | null, attendeeFormFields: { __typename?: 'AttendeeFormFieldsConnection', nodes: Array<{ __typename?: 'AttendeeFormField', value?: string | null, field?: { __typename?: 'FormField', name?: string | null, id: any, label: string } | null }> }, registration?: { __typename?: 'Registration', id: any, attendeesList: Array<{ __typename?: 'Attendee', email?: string | null, firstname: string, lastname: string, isInscriptor?: boolean | null }> } | null, additionalData?: Array<{ __typename?: 'AdditionalInformation', label?: string | null, values?: string | null } | null> | null } | null };

export type GetAttendeesWithoutMailByRegistrationIdQueryVariables = Exact<{
  registrationId: Scalars['UUID'];
}>;


export type GetAttendeesWithoutMailByRegistrationIdQuery = { __typename?: 'Query', attendees?: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', civility: string, email?: string | null, firstname: string, id: any, lastname: string, isInscriptor?: boolean | null }> } | null };

export type GetAttendeeByTicketNumberQueryVariables = Exact<{
  ticketNumber: Scalars['String'];
}>;


export type GetAttendeeByTicketNumberQuery = { __typename?: 'Query', attendeeByTicketNumber?: { __typename?: 'Attendee', eventId?: any | null, id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: AttendeeStatus, panelNumber?: number | null, ticketNumber: string, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null, isVip?: boolean | null, registration?: { __typename?: 'Registration', id: any, eventId?: any | null } | null, additionalData?: Array<{ __typename?: 'AdditionalInformation', label?: string | null, values?: string | null } | null> | null } | null };

export type SearchAttendeeQueryVariables = Exact<{
  search: Scalars['String'];
  eventId: Scalars['UUID'];
}>;


export type SearchAttendeeQuery = { __typename?: 'Query', attendees?: { __typename?: 'AttendeesConnection', nodes: Array<{ __typename?: 'Attendee', eventId?: any | null, id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: AttendeeStatus, panelNumber?: number | null, ticketNumber: string, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null, isVip?: boolean | null, registration?: { __typename?: 'Registration', id: any, eventId?: any | null } | null, additionalData?: Array<{ __typename?: 'AdditionalInformation', label?: string | null, values?: string | null } | null> | null }> } | null };

export type GetAllEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEventsQuery = { __typename?: 'Query', events?: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null, organization?: { __typename?: 'Organization', id: any, name: string, slug?: string | null } | null, attendees: { __typename?: 'AttendeesConnection', totalCount: number }, eventBranding?: { __typename?: 'EventBranding', createdAt: any, font?: Fonts | null, id: any, logo?: string | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null, cssVariables?: any | null, imageTicketUrl?: string | null } | null, registrations: { __typename?: 'RegistrationsConnection', totalCount: number } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } | null };

export type GetAllEventsByOrganizationIdQueryVariables = Exact<{
  organizationId: Scalars['UUID'];
}>;


export type GetAllEventsByOrganizationIdQuery = { __typename?: 'Query', events?: { __typename?: 'EventsConnection', nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null }> } | null };

export type GetAllEventsByOrganizationSlugQueryVariables = Exact<{
  organizationSlug: Scalars['String'];
}>;


export type GetAllEventsByOrganizationSlugQuery = { __typename?: 'Query', events?: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } | null };

export type GetEventByIdQueryVariables = Exact<{
  eventId: Scalars['UUID'];
  orderBy?: InputMaybe<Array<LogsOrderBy> | LogsOrderBy>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<LogFilter>;
}>;


export type GetEventByIdQuery = { __typename?: 'Query', event?: { __typename?: 'Event', capacity?: number | null, id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null, eventBranding?: { __typename?: 'EventBranding', createdAt: any, font?: Fonts | null, id: any, logo?: string | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null, cssVariables?: any | null, imageTicketUrl?: string | null } | null, formFields: { __typename?: 'FormFieldsConnection', nodes: Array<{ __typename?: 'FormField', id: any, type: FieldTypes, label: string, name?: string | null, placeholder?: string | null, options?: Array<string | null> | null, appliesToAllAttendees: boolean, isDeletable: boolean, isRequiredForAttendee: boolean, isRequiredForInscriptor: boolean, position: number }> }, attendees: { __typename?: 'AttendeesConnection', totalCount: number, nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: AttendeeStatus, panelNumber?: number | null, ticketNumber: string, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null, isVip?: boolean | null, additionalData?: Array<{ __typename?: 'AdditionalInformation', label?: string | null, values?: string | null } | null> | null }> }, logsList: Array<{ __typename?: 'Log', id: any, status: LogsStatus, payload?: any | null, updatedAt: any }> } | null };

export type GetEventBySlugQueryVariables = Exact<{
  eventSlug: Scalars['String'];
  organizationSlug: Scalars['String'];
}>;


export type GetEventBySlugQuery = { __typename?: 'Query', eventBySlug?: { __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null, formFields: { __typename?: 'FormFieldsConnection', nodes: Array<{ __typename?: 'FormField', id: any, type: FieldTypes, label: string, name?: string | null, placeholder?: string | null, options?: Array<string | null> | null, appliesToAllAttendees: boolean, isDeletable: boolean, isRequiredForAttendee: boolean, isRequiredForInscriptor: boolean, position: number }> }, eventBranding?: { __typename?: 'EventBranding', createdAt: any, font?: Fonts | null, id: any, logo?: string | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null, cssVariables?: any | null, imageTicketUrl?: string | null } | null, organization?: { __typename?: 'Organization', slug?: string | null } | null, attendees: { __typename?: 'AttendeesConnection', totalCount: number, nodes: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: AttendeeStatus, panelNumber?: number | null, ticketNumber: string, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null, isVip?: boolean | null, additionalData?: Array<{ __typename?: 'AdditionalInformation', label?: string | null, values?: string | null } | null> | null }> } } | null };

export type GetEventByEventSlugQueryVariables = Exact<{
  eventSlug: Scalars['String'];
}>;


export type GetEventByEventSlugQuery = { __typename?: 'Query', events?: { __typename?: 'EventsConnection', edges: Array<{ __typename?: 'EventsEdge', node: { __typename?: 'Event', id: any, capacity?: number | null, city?: string | null, description?: string | null, placeName?: string | null, slug?: string | null, name: string, country?: string | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, zipCode?: string | null, startsAt?: any | null } }> } | null };

export type GetEventLogsBySlugQueryVariables = Exact<{
  eventSlug: Scalars['String'];
  organizationSlug: Scalars['String'];
  orderBy?: InputMaybe<Array<LogsOrderBy> | LogsOrderBy>;
  attendeesOrderBy?: InputMaybe<Array<AttendeesOrderBy> | AttendeesOrderBy>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<LogFilter>;
}>;


export type GetEventLogsBySlugQuery = { __typename?: 'Query', eventBySlug?: { __typename?: 'Event', capacity?: number | null, id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null, eventBranding?: { __typename?: 'EventBranding', createdAt: any, font?: Fonts | null, id: any, logo?: string | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null, cssVariables?: any | null, imageTicketUrl?: string | null } | null, registrations: { __typename?: 'RegistrationsConnection', nodes: Array<{ __typename?: 'Registration', attendeesList: Array<{ __typename?: 'Attendee', id: any, firstname: string, lastname: string, email?: string | null, createdAt: any, updatedAt: any, status: AttendeeStatus, panelNumber?: number | null, ticketNumber: string, registrationId?: any | null, qrCodeUrl?: string | null, pdfUrl?: string | null, isInscriptor?: boolean | null, isVip?: boolean | null, additionalData?: Array<{ __typename?: 'AdditionalInformation', label?: string | null, values?: string | null } | null> | null }> }> }, logsList: Array<{ __typename?: 'Log', id: any, status: LogsStatus, payload?: any | null, updatedAt: any }> } | null };

export type GetCurrentUserEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserEventsQuery = { __typename?: 'Query', userEvents?: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null, organization?: { __typename?: 'Organization', id: any, name: string, slug?: string | null } | null, attendees: { __typename?: 'AttendeesConnection', totalCount: number }, eventBranding?: { __typename?: 'EventBranding', createdAt: any, font?: Fonts | null, id: any, logo?: string | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null, cssVariables?: any | null, imageTicketUrl?: string | null } | null, registrations: { __typename?: 'RegistrationsConnection', totalCount: number } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } | null };

export type GetEventBrandingByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetEventBrandingByIdQuery = { __typename?: 'Query', eventBranding?: { __typename?: 'EventBranding', createdAt: any, font?: Fonts | null, id: any, logo?: string | null, shortText?: string | null, richText?: string | null, updatedAt: any, headerMailName?: string | null, headerMailContact?: string | null, cssVariables?: any | null, imageTicketUrl?: string | null } | null };

export type GetAllOrganizationQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['Cursor']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationsOrderBy> | OrganizationsOrderBy>;
  filter?: InputMaybe<OrganizationFilter>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetAllOrganizationQuery = { __typename?: 'Query', organizations?: { __typename?: 'OrganizationsConnection', totalCount: number, nodes: Array<{ __typename?: 'Organization', id: any, name: string, slug?: string | null, description?: string | null, logoUrl?: string | null, createdAt: any, updatedAt: any, events: { __typename?: 'EventsConnection', totalCount: number } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } | null };

export type GetOrganizationByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetOrganizationByIdQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', id: any, name: string, slug?: string | null, description?: string | null, logoUrl?: string | null, createdAt: any, updatedAt: any, events: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null }> }, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, role: OrganizationMembershipsRolesEnum, createdAt: any, user?: { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, email: string, username: string } | null }> } } | null };

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


export type GetOrganizationBySlugQuery = { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', id: any, name: string, slug?: string | null, description?: string | null, logoUrl?: string | null, createdAt: any, updatedAt: any, organizationMemberships: { __typename?: 'OrganizationMembershipsConnection', nodes: Array<{ __typename?: 'OrganizationMembership', id: any, role: OrganizationMembershipsRolesEnum, createdAt: any, user?: { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, email: string, username: string } | null }> }, organizationInvitations: { __typename?: 'OrganizationInvitationsConnection', nodes: Array<{ __typename?: 'OrganizationInvitation', id: any, email?: string | null, role: OrganizationMembershipsRolesEnum, code?: string | null }> }, events: { __typename?: 'EventsConnection', totalCount: number, nodes: Array<{ __typename?: 'Event', id: any, name: string, slug?: string | null, description?: string | null, addressLine2?: string | null, addressLine1?: string | null, city?: string | null, zipCode?: string | null, country?: string | null, startsAt?: any | null, endsAt?: any | null, bookingStartsAt?: any | null, bookingEndsAt?: any | null, createdAt: any, updatedAt: any, placeName?: string | null, capacity?: number | null, webhooks?: Array<string | null> | null, organizationId: any, totalRegistrations?: number | null, isDraft: boolean, totalConfirmedRegistrations?: number | null, isCancelled: boolean, state?: string | null, attendees: { __typename?: 'AttendeesConnection', totalCount: number }, organization?: { __typename?: 'Organization', slug?: string | null } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: any | null, endCursor?: any | null } } } | null };

export type OrganizationForInvitationQueryVariables = Exact<{
  id: Scalars['UUID'];
  code: Scalars['String'];
}>;


export type OrganizationForInvitationQuery = { __typename?: 'Query', organizationForInvitation?: { __typename?: 'Organization', id: any, name: string, slug?: string | null } | null };

export type GetAllUsersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<UserFilter>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', users?: { __typename?: 'UsersConnection', totalCount: number, edges: Array<{ __typename?: 'UsersEdge', node: { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, email: string, username: string } }> } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, email: string, username: string } | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: any, firstname: string, lastname: string, avatarUrl?: string | null, isAdmin: boolean, createdAt: any, updatedAt: any, email: string, username: string, events: { __typename?: 'EventsConnection', nodes: Array<{ __typename?: 'Event', id: any, name: string, startsAt?: any | null, city?: string | null, organization?: { __typename?: 'Organization', id: any, name: string, slug?: string | null } | null }> }, organizations: { __typename?: 'UsersOrganizationsConnection', nodes: Array<{ __typename?: 'UsersOrganizationsRecord', role?: string | null, organization?: { __typename?: 'Organization', id: any, name: string, slug?: string | null, logoUrl?: string | null } | null }> } } | null };

export const MyAttendeeFragmentDoc = `
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
  registrationId
  qrCodeUrl
  pdfUrl
  isInscriptor
  isVip
  additionalData {
    label
    values
  }
}
    `;
export const EventBrandingFragmentFragmentDoc = `
    fragment EventBrandingFragment on EventBranding {
  createdAt
  font
  id
  logo
  shortText
  richText
  updatedAt
  headerMailName
  headerMailContact
  cssVariables
  imageTicketUrl
}
    `;
export const MyEventFragmentDoc = `
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
  isDraft
  totalConfirmedRegistrations
  isCancelled
  state
}
    `;
export const MyFormFieldFragmentDoc = `
    fragment MyFormField on FormField {
  id
  type
  label
  name
  placeholder
  options
  appliesToAllAttendees
  isDeletable
  isRequiredForAttendee
  isRequiredForInscriptor
  position
}
    `;
export const OrganizationFragmentFragmentDoc = `
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
export const RegistrationFragmentFragmentDoc = `
    fragment RegistrationFragment on Registration {
  eventId
  createdAt
  hearAboutList
  id
  updatedAt
}
    `;
export const MyUserFragmentDoc = `
    fragment MyUser on User {
  id
  firstname
  lastname
  avatarUrl
  isAdmin
  createdAt
  updatedAt
  email
  username
}
    `;
export const CreateAttendeeDocument = `
    mutation CreateAttendee($input: CreateAttendeeInput!) {
  createAttendee(input: $input) {
    attendee {
      ...MyAttendee
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const UpdateAttendeeDocument = `
    mutation UpdateAttendee($input: UpdateAttendeeInput!) {
  updateAttendee(input: $input) {
    attendee {
      ...MyAttendee
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const DeleteAttendeeDocument = `
    mutation DeleteAttendee($input: DeleteAttendeeInput!) {
  deleteAttendee(input: $input) {
    attendee {
      ...MyAttendee
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const RegisterAttendeesDocument = `
    mutation RegisterAttendees($input: RegisterAttendeesInput!) {
  registerAttendees(input: $input) {
    registration {
      id
      attendeesList {
        id
        qrCodeUrl
        pdfUrl
      }
    }
  }
}
    `;
export const SendEmailAllAttendeeEventDocument = `
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
export const SendEmailAttendeeEventDocument = `
    mutation SendEmailAttendeeEvent($ticketNumber: String!) {
  sendEmailAttendeeEvent(input: {ticketNumber: $ticketNumber}) {
    clientMutationId
    rowEventAttendee {
      id
      email
    }
  }
}
    `;
export const UpdateAttendeeEmailAndSendEmailDocument = `
    mutation UpdateAttendeeEmailAndSendEmail($attendees: [AttendeePatch]!) {
  updateAttendeeEmailAndSendEmail(input: {attendees: $attendees}) {
    attendees {
      email
    }
  }
}
    `;
export const ScanAttendeeDocument = `
    mutation ScanAttendee($scanAttendeeInput: ScanAttendeeInput!) {
  scanAttendee(input: $scanAttendeeInput) {
    clientMutationId
    boolean
  }
}
    `;
export const ScanAttendeesOfflineDocument = `
    mutation ScanAttendeesOffline($input: ScanAttendeesAsyncInput!) {
  scanAttendeesAsync(input: $input) {
    boolean
    clientMutationId
  }
}
    `;
export const RegisterCompleteAttendeesDocument = `
    mutation RegisterCompleteAttendees($input: RegisterCompleteAttendeesInput!) {
  registerCompleteAttendees(input: $input) {
    registration {
      id
      attendeesList {
        id
        qrCodeUrl
        pdfUrl
      }
    }
  }
}
    `;
export const CreateEventDocument = `
    mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    event {
      ...MyEvent
    }
  }
}
    ${MyEventFragmentDoc}`;
export const UpdateEventDocument = `
    mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
    event {
      ...MyEvent
    }
  }
}
    ${MyEventFragmentDoc}`;
export const DeleteEventDocument = `
    mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    event {
      ...MyEvent
    }
  }
}
    ${MyEventFragmentDoc}`;
export const SendEmailConfirmDonationByEventIdDocument = `
    mutation SendEmailConfirmDonationByEventId($eventId: UUID!) {
  sendEmailConfirmDonationByEventId(input: {eventId: $eventId}) {
    rowEventAttendeeConfirms {
      email
    }
    clientMutationId
  }
}
    `;
export const CreateEventBrandingDocument = `
    mutation CreateEventBranding($input: CreateEventBrandingInput!) {
  createEventBranding(input: $input) {
    eventBranding {
      ...EventBrandingFragment
    }
    clientMutationId
  }
}
    ${EventBrandingFragmentFragmentDoc}`;
export const UpdateEventBrandingDocument = `
    mutation UpdateEventBranding($input: UpdateEventBrandingInput!) {
  updateEventBranding(input: $input) {
    eventBranding {
      ...EventBrandingFragment
    }
    clientMutationId
  }
}
    ${EventBrandingFragmentFragmentDoc}`;
export const DeleteEventBrandingDocument = `
    mutation DeleteEventBranding($input: DeleteEventBrandingInput!) {
  deleteEventBranding(input: $input) {
    eventBranding {
      ...EventBrandingFragment
    }
    clientMutationId
  }
}
    ${EventBrandingFragmentFragmentDoc}`;
export const CreateFormFieldDocument = `
    mutation CreateFormField($input: CreateFormFieldInput!) {
  createFormField(input: $input) {
    formField {
      ...MyFormField
    }
  }
}
    ${MyFormFieldFragmentDoc}`;
export const UpdateFormFieldDocument = `
    mutation UpdateFormField($input: UpdateFormFieldInput!) {
  updateFormField(input: $input) {
    formField {
      ...MyFormField
    }
  }
}
    ${MyFormFieldFragmentDoc}`;
export const DeleteFormFieldDocument = `
    mutation DeleteFormField($input: DeleteFormFieldInput!) {
  deleteFormField(input: $input) {
    formField {
      ...MyFormField
    }
  }
}
    ${MyFormFieldFragmentDoc}`;
export const GeneratePresignedPostDocument = `
    mutation GeneratePresignedPost($key: String!) {
  generatePresignedPost(input: {key: $key}) {
    fields
    url
  }
}
    `;
export const CreateOrganizationDocument = `
    mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    organization {
      id
      slug
    }
  }
}
    `;
export const UpdateOrganizationDocument = `
    mutation UpdateOrganization($input: UpdateOrganizationInput!) {
  updateOrganization(input: $input) {
    organization {
      id
    }
  }
}
    `;
export const InviteUserToOrganizationDocument = `
    mutation InviteUserToOrganization($input: InviteToOrganizationInput!) {
  inviteToOrganization(input: $input) {
    clientMutationId
    typeErrorCodeAndMessage {
      errorCode
      errorMessage
    }
  }
}
    `;
export const RemoveUserFromOrganizationDocument = `
    mutation RemoveUserFromOrganization($input: RemoveFromOrganizationInput!) {
  removeFromOrganization(input: $input) {
    clientMutationId
  }
}
    `;
export const AcceptOrganizationInvitationDocument = `
    mutation AcceptOrganizationInvitation($input: AcceptInvitationToOrganizationInput!) {
  acceptInvitationToOrganization(input: $input) {
    clientMutationId
  }
}
    `;
export const CancelInvitationDocument = `
    mutation CancelInvitation($input: CancelInvitationInput!) {
  cancelInvitation(input: $input) {
    clientMutationId
  }
}
    `;
export const ChangeMembershipRoleDocument = `
    mutation ChangeMembershipRole($input: ChangeMembershipRoleInput!) {
  changeMembershipRole(input: $input) {
    clientMutationId
  }
}
    `;
export const CreateRegistrationDocument = `
    mutation CreateRegistration($registration: RegistrationInput!) {
  createRegistration(input: {registration: $registration}) {
    clientMutationId
    registration {
      id
    }
  }
}
    `;
export const RegisterAttendeesCsvDocument = `
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
export const RegisterCompleteAttendeesCsvDocument = `
    mutation RegisterCompleteAttendeesCsv($input: RegisterCompleteAttendeeCsvInput!) {
  registerCompleteAttendeeCsv(input: $input) {
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
export const DeleteRegistrationDocument = `
    mutation DeleteRegistration($input: DeleteRegistrationInput!) {
  deleteRegistration(input: $input) {
    clientMutationId
  }
}
    `;
export const UpdateUserDocument = `
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    user {
      ...MyUser
    }
  }
}
    ${MyUserFragmentDoc}`;
export const ForgotPasswordDocument = `
    mutation ForgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input) {
    clientMutationId
  }
}
    `;
export const LoginDocument = `
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
export const LogoutDocument = `
    mutation Logout {
  logout {
    success
  }
}
    `;
export const RegisterUserDocument = `
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
export const ResetPasswordDocument = `
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    success
  }
}
    `;
export const GetAttendeeByIdDocument = `
    query GetAttendeeById($attendeeId: UUID!) {
  attendee(id: $attendeeId) {
    attendeeFormFields {
      nodes {
        value
        field {
          name
          id
          label
        }
      }
    }
    registration {
      id
      attendeesList {
        email
        firstname
        lastname
        isInscriptor
      }
    }
    ...MyAttendee
  }
}
    ${MyAttendeeFragmentDoc}`;
export const GetAttendeesWithoutMailByRegistrationIdDocument = `
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
export const GetAttendeeByTicketNumberDocument = `
    query GetAttendeeByTicketNumber($ticketNumber: String!) {
  attendeeByTicketNumber(ticketNumber: $ticketNumber) {
    ...MyAttendee
    eventId
    registration {
      id
      eventId
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const SearchAttendeeDocument = `
    query SearchAttendee($search: String!, $eventId: UUID!) {
  attendees(
    filter: {eventId: {equalTo: $eventId}, or: [{firstname: {includesInsensitive: $search}}, {lastname: {includesInsensitive: $search}}, {email: {includesInsensitive: $search}}, {ticketNumber: {includesInsensitive: $search}}]}
  ) {
    nodes {
      registration {
        id
        eventId
      }
      eventId
      ...MyAttendee
    }
  }
}
    ${MyAttendeeFragmentDoc}`;
export const GetAllEventsDocument = `
    query GetAllEvents {
  events(orderBy: [CREATED_AT_DESC]) {
    nodes {
      ...MyEvent
      organization {
        id
        name
        slug
      }
      attendees {
        totalCount
      }
      eventBranding {
        ...EventBrandingFragment
      }
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
    ${MyEventFragmentDoc}
${EventBrandingFragmentFragmentDoc}`;
export const GetAllEventsByOrganizationIdDocument = `
    query GetAllEventsByOrganizationId($organizationId: UUID!) {
  events(orderBy: [CREATED_AT_DESC], condition: {organizationId: $organizationId}) {
    nodes {
      ...MyEvent
    }
  }
}
    ${MyEventFragmentDoc}`;
export const GetAllEventsByOrganizationSlugDocument = `
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
export const GetEventByIdDocument = `
    query GetEventById($eventId: UUID!, $orderBy: [LogsOrderBy!] = UPDATED_AT_DESC, $first: Int, $offset: Int, $filter: LogFilter) {
  event(id: $eventId) {
    ...MyEvent
    eventBranding {
      ...EventBrandingFragment
    }
    formFields(orderBy: POSITION_ASC) {
      nodes {
        ...MyFormField
      }
    }
    capacity
    attendees {
      totalCount
      nodes {
        ...MyAttendee
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
${MyFormFieldFragmentDoc}
${MyAttendeeFragmentDoc}`;
export const GetEventBySlugDocument = `
    query GetEventBySlug($eventSlug: String!, $organizationSlug: String!) {
  eventBySlug(eventSlug: $eventSlug, organizationSlug: $organizationSlug) {
    formFields(orderBy: POSITION_ASC) {
      nodes {
        ...MyFormField
      }
    }
    ...MyEvent
    eventBranding {
      ...EventBrandingFragment
    }
    organization {
      slug
    }
    attendees {
      totalCount
      nodes {
        ...MyAttendee
      }
    }
  }
}
    ${MyFormFieldFragmentDoc}
${MyEventFragmentDoc}
${EventBrandingFragmentFragmentDoc}
${MyAttendeeFragmentDoc}`;
export const GetEventByEventSlugDocument = `
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
export const GetEventLogsBySlugDocument = `
    query GetEventLogsBySlug($eventSlug: String!, $organizationSlug: String!, $orderBy: [LogsOrderBy!] = UPDATED_AT_DESC, $attendeesOrderBy: [AttendeesOrderBy!] = LASTNAME_DESC, $first: Int, $offset: Int, $filter: LogFilter) {
  eventBySlug(eventSlug: $eventSlug, organizationSlug: $organizationSlug) {
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
export const GetCurrentUserEventsDocument = `
    query GetCurrentUserEvents {
  userEvents {
    nodes {
      ...MyEvent
      organization {
        id
        name
        slug
      }
      attendees {
        totalCount
      }
      eventBranding {
        ...EventBrandingFragment
      }
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
    ${MyEventFragmentDoc}
${EventBrandingFragmentFragmentDoc}`;
export const GetEventBrandingByIdDocument = `
    query GetEventBrandingById($id: UUID!) {
  eventBranding(id: $id) {
    ...EventBrandingFragment
  }
}
    ${EventBrandingFragmentFragmentDoc}`;
export const GetAllOrganizationDocument = `
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
export const GetOrganizationByIdDocument = `
    query GetOrganizationById($id: UUID!) {
  organization(id: $id) {
    ...OrganizationFragment
    events {
      totalCount
      nodes {
        ...MyEvent
      }
    }
    organizationMemberships {
      nodes {
        id
        role
        createdAt
        user {
          ...MyUser
        }
      }
    }
  }
}
    ${OrganizationFragmentFragmentDoc}
${MyEventFragmentDoc}
${MyUserFragmentDoc}`;
export const GetOrganizationBySlugDocument = `
    query GetOrganizationBySlug($slug: String!, $after: Cursor, $first: Int, $before: Cursor, $last: Int, $orderBy: [EventsOrderBy!] = CREATED_AT_ASC, $filter: EventFilter, $offset: Int) {
  organizationBySlug(slug: $slug) {
    ...OrganizationFragment
    organizationMemberships {
      nodes {
        id
        role
        user {
          ...MyUser
        }
        createdAt
      }
    }
    organizationInvitations {
      nodes {
        id
        email
        role
        code
      }
    }
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
        attendees {
          totalCount
        }
        organization {
          slug
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
${MyUserFragmentDoc}
${MyEventFragmentDoc}`;
export const OrganizationForInvitationDocument = `
    query OrganizationForInvitation($id: UUID!, $code: String!) {
  organizationForInvitation(invitationId: $id, code: $code) {
    id
    name
    slug
  }
}
    `;
export const GetAllUsersDocument = `
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
export const GetUserByIdDocument = `
    query GetUserById($id: UUID!) {
  user(id: $id) {
    ...MyUser
  }
}
    ${MyUserFragmentDoc}`;
export const GetCurrentUserDocument = `
    query GetCurrentUser {
  currentUser {
    ...MyUser
    events(filter: {state: {in: ["PENDING", "ONGOING"]}}) {
      nodes {
        id
        name
        startsAt
        city
        organization {
          id
          name
          slug
        }
      }
    }
    organizations {
      nodes {
        role
        organization {
          id
          name
          slug
          logoUrl
        }
      }
    }
  }
}
    ${MyUserFragmentDoc}`;
export type Requester<C = {}, E = unknown> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    CreateAttendee(variables: CreateAttendeeMutationVariables, options?: C): Promise<CreateAttendeeMutation> {
      return requester<CreateAttendeeMutation, CreateAttendeeMutationVariables>(CreateAttendeeDocument, variables, options) as Promise<CreateAttendeeMutation>;
    },
    UpdateAttendee(variables: UpdateAttendeeMutationVariables, options?: C): Promise<UpdateAttendeeMutation> {
      return requester<UpdateAttendeeMutation, UpdateAttendeeMutationVariables>(UpdateAttendeeDocument, variables, options) as Promise<UpdateAttendeeMutation>;
    },
    DeleteAttendee(variables: DeleteAttendeeMutationVariables, options?: C): Promise<DeleteAttendeeMutation> {
      return requester<DeleteAttendeeMutation, DeleteAttendeeMutationVariables>(DeleteAttendeeDocument, variables, options) as Promise<DeleteAttendeeMutation>;
    },
    RegisterAttendees(variables: RegisterAttendeesMutationVariables, options?: C): Promise<RegisterAttendeesMutation> {
      return requester<RegisterAttendeesMutation, RegisterAttendeesMutationVariables>(RegisterAttendeesDocument, variables, options) as Promise<RegisterAttendeesMutation>;
    },
    SendEmailAllAttendeeEvent(variables: SendEmailAllAttendeeEventMutationVariables, options?: C): Promise<SendEmailAllAttendeeEventMutation> {
      return requester<SendEmailAllAttendeeEventMutation, SendEmailAllAttendeeEventMutationVariables>(SendEmailAllAttendeeEventDocument, variables, options) as Promise<SendEmailAllAttendeeEventMutation>;
    },
    SendEmailAttendeeEvent(variables: SendEmailAttendeeEventMutationVariables, options?: C): Promise<SendEmailAttendeeEventMutation> {
      return requester<SendEmailAttendeeEventMutation, SendEmailAttendeeEventMutationVariables>(SendEmailAttendeeEventDocument, variables, options) as Promise<SendEmailAttendeeEventMutation>;
    },
    UpdateAttendeeEmailAndSendEmail(variables: UpdateAttendeeEmailAndSendEmailMutationVariables, options?: C): Promise<UpdateAttendeeEmailAndSendEmailMutation> {
      return requester<UpdateAttendeeEmailAndSendEmailMutation, UpdateAttendeeEmailAndSendEmailMutationVariables>(UpdateAttendeeEmailAndSendEmailDocument, variables, options) as Promise<UpdateAttendeeEmailAndSendEmailMutation>;
    },
    ScanAttendee(variables: ScanAttendeeMutationVariables, options?: C): Promise<ScanAttendeeMutation> {
      return requester<ScanAttendeeMutation, ScanAttendeeMutationVariables>(ScanAttendeeDocument, variables, options) as Promise<ScanAttendeeMutation>;
    },
    ScanAttendeesOffline(variables: ScanAttendeesOfflineMutationVariables, options?: C): Promise<ScanAttendeesOfflineMutation> {
      return requester<ScanAttendeesOfflineMutation, ScanAttendeesOfflineMutationVariables>(ScanAttendeesOfflineDocument, variables, options) as Promise<ScanAttendeesOfflineMutation>;
    },
    RegisterCompleteAttendees(variables: RegisterCompleteAttendeesMutationVariables, options?: C): Promise<RegisterCompleteAttendeesMutation> {
      return requester<RegisterCompleteAttendeesMutation, RegisterCompleteAttendeesMutationVariables>(RegisterCompleteAttendeesDocument, variables, options) as Promise<RegisterCompleteAttendeesMutation>;
    },
    CreateEvent(variables: CreateEventMutationVariables, options?: C): Promise<CreateEventMutation> {
      return requester<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, variables, options) as Promise<CreateEventMutation>;
    },
    UpdateEvent(variables: UpdateEventMutationVariables, options?: C): Promise<UpdateEventMutation> {
      return requester<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, variables, options) as Promise<UpdateEventMutation>;
    },
    DeleteEvent(variables: DeleteEventMutationVariables, options?: C): Promise<DeleteEventMutation> {
      return requester<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, variables, options) as Promise<DeleteEventMutation>;
    },
    SendEmailConfirmDonationByEventId(variables: SendEmailConfirmDonationByEventIdMutationVariables, options?: C): Promise<SendEmailConfirmDonationByEventIdMutation> {
      return requester<SendEmailConfirmDonationByEventIdMutation, SendEmailConfirmDonationByEventIdMutationVariables>(SendEmailConfirmDonationByEventIdDocument, variables, options) as Promise<SendEmailConfirmDonationByEventIdMutation>;
    },
    CreateEventBranding(variables: CreateEventBrandingMutationVariables, options?: C): Promise<CreateEventBrandingMutation> {
      return requester<CreateEventBrandingMutation, CreateEventBrandingMutationVariables>(CreateEventBrandingDocument, variables, options) as Promise<CreateEventBrandingMutation>;
    },
    UpdateEventBranding(variables: UpdateEventBrandingMutationVariables, options?: C): Promise<UpdateEventBrandingMutation> {
      return requester<UpdateEventBrandingMutation, UpdateEventBrandingMutationVariables>(UpdateEventBrandingDocument, variables, options) as Promise<UpdateEventBrandingMutation>;
    },
    DeleteEventBranding(variables: DeleteEventBrandingMutationVariables, options?: C): Promise<DeleteEventBrandingMutation> {
      return requester<DeleteEventBrandingMutation, DeleteEventBrandingMutationVariables>(DeleteEventBrandingDocument, variables, options) as Promise<DeleteEventBrandingMutation>;
    },
    CreateFormField(variables: CreateFormFieldMutationVariables, options?: C): Promise<CreateFormFieldMutation> {
      return requester<CreateFormFieldMutation, CreateFormFieldMutationVariables>(CreateFormFieldDocument, variables, options) as Promise<CreateFormFieldMutation>;
    },
    UpdateFormField(variables: UpdateFormFieldMutationVariables, options?: C): Promise<UpdateFormFieldMutation> {
      return requester<UpdateFormFieldMutation, UpdateFormFieldMutationVariables>(UpdateFormFieldDocument, variables, options) as Promise<UpdateFormFieldMutation>;
    },
    DeleteFormField(variables: DeleteFormFieldMutationVariables, options?: C): Promise<DeleteFormFieldMutation> {
      return requester<DeleteFormFieldMutation, DeleteFormFieldMutationVariables>(DeleteFormFieldDocument, variables, options) as Promise<DeleteFormFieldMutation>;
    },
    GeneratePresignedPost(variables: GeneratePresignedPostMutationVariables, options?: C): Promise<GeneratePresignedPostMutation> {
      return requester<GeneratePresignedPostMutation, GeneratePresignedPostMutationVariables>(GeneratePresignedPostDocument, variables, options) as Promise<GeneratePresignedPostMutation>;
    },
    CreateOrganization(variables: CreateOrganizationMutationVariables, options?: C): Promise<CreateOrganizationMutation> {
      return requester<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, variables, options) as Promise<CreateOrganizationMutation>;
    },
    UpdateOrganization(variables: UpdateOrganizationMutationVariables, options?: C): Promise<UpdateOrganizationMutation> {
      return requester<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, variables, options) as Promise<UpdateOrganizationMutation>;
    },
    InviteUserToOrganization(variables: InviteUserToOrganizationMutationVariables, options?: C): Promise<InviteUserToOrganizationMutation> {
      return requester<InviteUserToOrganizationMutation, InviteUserToOrganizationMutationVariables>(InviteUserToOrganizationDocument, variables, options) as Promise<InviteUserToOrganizationMutation>;
    },
    RemoveUserFromOrganization(variables: RemoveUserFromOrganizationMutationVariables, options?: C): Promise<RemoveUserFromOrganizationMutation> {
      return requester<RemoveUserFromOrganizationMutation, RemoveUserFromOrganizationMutationVariables>(RemoveUserFromOrganizationDocument, variables, options) as Promise<RemoveUserFromOrganizationMutation>;
    },
    AcceptOrganizationInvitation(variables: AcceptOrganizationInvitationMutationVariables, options?: C): Promise<AcceptOrganizationInvitationMutation> {
      return requester<AcceptOrganizationInvitationMutation, AcceptOrganizationInvitationMutationVariables>(AcceptOrganizationInvitationDocument, variables, options) as Promise<AcceptOrganizationInvitationMutation>;
    },
    CancelInvitation(variables: CancelInvitationMutationVariables, options?: C): Promise<CancelInvitationMutation> {
      return requester<CancelInvitationMutation, CancelInvitationMutationVariables>(CancelInvitationDocument, variables, options) as Promise<CancelInvitationMutation>;
    },
    ChangeMembershipRole(variables: ChangeMembershipRoleMutationVariables, options?: C): Promise<ChangeMembershipRoleMutation> {
      return requester<ChangeMembershipRoleMutation, ChangeMembershipRoleMutationVariables>(ChangeMembershipRoleDocument, variables, options) as Promise<ChangeMembershipRoleMutation>;
    },
    CreateRegistration(variables: CreateRegistrationMutationVariables, options?: C): Promise<CreateRegistrationMutation> {
      return requester<CreateRegistrationMutation, CreateRegistrationMutationVariables>(CreateRegistrationDocument, variables, options) as Promise<CreateRegistrationMutation>;
    },
    RegisterAttendeesCsv(variables: RegisterAttendeesCsvMutationVariables, options?: C): Promise<RegisterAttendeesCsvMutation> {
      return requester<RegisterAttendeesCsvMutation, RegisterAttendeesCsvMutationVariables>(RegisterAttendeesCsvDocument, variables, options) as Promise<RegisterAttendeesCsvMutation>;
    },
    RegisterCompleteAttendeesCsv(variables: RegisterCompleteAttendeesCsvMutationVariables, options?: C): Promise<RegisterCompleteAttendeesCsvMutation> {
      return requester<RegisterCompleteAttendeesCsvMutation, RegisterCompleteAttendeesCsvMutationVariables>(RegisterCompleteAttendeesCsvDocument, variables, options) as Promise<RegisterCompleteAttendeesCsvMutation>;
    },
    DeleteRegistration(variables: DeleteRegistrationMutationVariables, options?: C): Promise<DeleteRegistrationMutation> {
      return requester<DeleteRegistrationMutation, DeleteRegistrationMutationVariables>(DeleteRegistrationDocument, variables, options) as Promise<DeleteRegistrationMutation>;
    },
    UpdateUser(variables: UpdateUserMutationVariables, options?: C): Promise<UpdateUserMutation> {
      return requester<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables, options) as Promise<UpdateUserMutation>;
    },
    ForgotPassword(variables: ForgotPasswordMutationVariables, options?: C): Promise<ForgotPasswordMutation> {
      return requester<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, variables, options) as Promise<ForgotPasswordMutation>;
    },
    Login(variables: LoginMutationVariables, options?: C): Promise<LoginMutation> {
      return requester<LoginMutation, LoginMutationVariables>(LoginDocument, variables, options) as Promise<LoginMutation>;
    },
    Logout(variables?: LogoutMutationVariables, options?: C): Promise<LogoutMutation> {
      return requester<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables, options) as Promise<LogoutMutation>;
    },
    RegisterUser(variables: RegisterUserMutationVariables, options?: C): Promise<RegisterUserMutation> {
      return requester<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, variables, options) as Promise<RegisterUserMutation>;
    },
    ResetPassword(variables: ResetPasswordMutationVariables, options?: C): Promise<ResetPasswordMutation> {
      return requester<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables, options) as Promise<ResetPasswordMutation>;
    },
    GetAttendeeById(variables: GetAttendeeByIdQueryVariables, options?: C): Promise<GetAttendeeByIdQuery> {
      return requester<GetAttendeeByIdQuery, GetAttendeeByIdQueryVariables>(GetAttendeeByIdDocument, variables, options) as Promise<GetAttendeeByIdQuery>;
    },
    GetAttendeesWithoutMailByRegistrationId(variables: GetAttendeesWithoutMailByRegistrationIdQueryVariables, options?: C): Promise<GetAttendeesWithoutMailByRegistrationIdQuery> {
      return requester<GetAttendeesWithoutMailByRegistrationIdQuery, GetAttendeesWithoutMailByRegistrationIdQueryVariables>(GetAttendeesWithoutMailByRegistrationIdDocument, variables, options) as Promise<GetAttendeesWithoutMailByRegistrationIdQuery>;
    },
    GetAttendeeByTicketNumber(variables: GetAttendeeByTicketNumberQueryVariables, options?: C): Promise<GetAttendeeByTicketNumberQuery> {
      return requester<GetAttendeeByTicketNumberQuery, GetAttendeeByTicketNumberQueryVariables>(GetAttendeeByTicketNumberDocument, variables, options) as Promise<GetAttendeeByTicketNumberQuery>;
    },
    SearchAttendee(variables: SearchAttendeeQueryVariables, options?: C): Promise<SearchAttendeeQuery> {
      return requester<SearchAttendeeQuery, SearchAttendeeQueryVariables>(SearchAttendeeDocument, variables, options) as Promise<SearchAttendeeQuery>;
    },
    GetAllEvents(variables?: GetAllEventsQueryVariables, options?: C): Promise<GetAllEventsQuery> {
      return requester<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, variables, options) as Promise<GetAllEventsQuery>;
    },
    GetAllEventsByOrganizationId(variables: GetAllEventsByOrganizationIdQueryVariables, options?: C): Promise<GetAllEventsByOrganizationIdQuery> {
      return requester<GetAllEventsByOrganizationIdQuery, GetAllEventsByOrganizationIdQueryVariables>(GetAllEventsByOrganizationIdDocument, variables, options) as Promise<GetAllEventsByOrganizationIdQuery>;
    },
    GetAllEventsByOrganizationSlug(variables: GetAllEventsByOrganizationSlugQueryVariables, options?: C): Promise<GetAllEventsByOrganizationSlugQuery> {
      return requester<GetAllEventsByOrganizationSlugQuery, GetAllEventsByOrganizationSlugQueryVariables>(GetAllEventsByOrganizationSlugDocument, variables, options) as Promise<GetAllEventsByOrganizationSlugQuery>;
    },
    GetEventById(variables: GetEventByIdQueryVariables, options?: C): Promise<GetEventByIdQuery> {
      return requester<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, variables, options) as Promise<GetEventByIdQuery>;
    },
    GetEventBySlug(variables: GetEventBySlugQueryVariables, options?: C): Promise<GetEventBySlugQuery> {
      return requester<GetEventBySlugQuery, GetEventBySlugQueryVariables>(GetEventBySlugDocument, variables, options) as Promise<GetEventBySlugQuery>;
    },
    GetEventByEventSlug(variables: GetEventByEventSlugQueryVariables, options?: C): Promise<GetEventByEventSlugQuery> {
      return requester<GetEventByEventSlugQuery, GetEventByEventSlugQueryVariables>(GetEventByEventSlugDocument, variables, options) as Promise<GetEventByEventSlugQuery>;
    },
    GetEventLogsBySlug(variables: GetEventLogsBySlugQueryVariables, options?: C): Promise<GetEventLogsBySlugQuery> {
      return requester<GetEventLogsBySlugQuery, GetEventLogsBySlugQueryVariables>(GetEventLogsBySlugDocument, variables, options) as Promise<GetEventLogsBySlugQuery>;
    },
    GetCurrentUserEvents(variables?: GetCurrentUserEventsQueryVariables, options?: C): Promise<GetCurrentUserEventsQuery> {
      return requester<GetCurrentUserEventsQuery, GetCurrentUserEventsQueryVariables>(GetCurrentUserEventsDocument, variables, options) as Promise<GetCurrentUserEventsQuery>;
    },
    GetEventBrandingById(variables: GetEventBrandingByIdQueryVariables, options?: C): Promise<GetEventBrandingByIdQuery> {
      return requester<GetEventBrandingByIdQuery, GetEventBrandingByIdQueryVariables>(GetEventBrandingByIdDocument, variables, options) as Promise<GetEventBrandingByIdQuery>;
    },
    GetAllOrganization(variables?: GetAllOrganizationQueryVariables, options?: C): Promise<GetAllOrganizationQuery> {
      return requester<GetAllOrganizationQuery, GetAllOrganizationQueryVariables>(GetAllOrganizationDocument, variables, options) as Promise<GetAllOrganizationQuery>;
    },
    GetOrganizationById(variables: GetOrganizationByIdQueryVariables, options?: C): Promise<GetOrganizationByIdQuery> {
      return requester<GetOrganizationByIdQuery, GetOrganizationByIdQueryVariables>(GetOrganizationByIdDocument, variables, options) as Promise<GetOrganizationByIdQuery>;
    },
    GetOrganizationBySlug(variables: GetOrganizationBySlugQueryVariables, options?: C): Promise<GetOrganizationBySlugQuery> {
      return requester<GetOrganizationBySlugQuery, GetOrganizationBySlugQueryVariables>(GetOrganizationBySlugDocument, variables, options) as Promise<GetOrganizationBySlugQuery>;
    },
    OrganizationForInvitation(variables: OrganizationForInvitationQueryVariables, options?: C): Promise<OrganizationForInvitationQuery> {
      return requester<OrganizationForInvitationQuery, OrganizationForInvitationQueryVariables>(OrganizationForInvitationDocument, variables, options) as Promise<OrganizationForInvitationQuery>;
    },
    GetAllUsers(variables?: GetAllUsersQueryVariables, options?: C): Promise<GetAllUsersQuery> {
      return requester<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, variables, options) as Promise<GetAllUsersQuery>;
    },
    GetUserById(variables: GetUserByIdQueryVariables, options?: C): Promise<GetUserByIdQuery> {
      return requester<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, variables, options) as Promise<GetUserByIdQuery>;
    },
    GetCurrentUser(variables?: GetCurrentUserQueryVariables, options?: C): Promise<GetCurrentUserQuery> {
      return requester<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, variables, options) as Promise<GetCurrentUserQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
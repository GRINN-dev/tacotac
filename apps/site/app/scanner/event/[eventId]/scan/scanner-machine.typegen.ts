// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.Scanner.fetching-attendee:invocation[0]": {
      type: "done.invoke.Scanner.fetching-attendee:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Scanner.submitting:invocation[0]": {
      type: "done.invoke.Scanner.submitting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.Scanner.verifying-tiket:invocation[0]": {
      type: "done.invoke.Scanner.verifying-tiket:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Scanner.submitting:invocation[0]": {
      type: "error.platform.Scanner.submitting:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchAttendee: "done.invoke.Scanner.fetching-attendee:invocation[0]";
    submitScanPayload: "done.invoke.Scanner.submitting:invocation[0]";
    verifyTicket: "done.invoke.Scanner.verifying-tiket:invocation[0]";
  };
  missingImplementations: {
    actions: "refresh" | "saveOffline";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignAttendee: "done.invoke.Scanner.fetching-attendee:invocation[0]";
    assignAttendeeAndTicket: "SELECT_ATTENDEE";
    assignEmail: "ENTER_EMAIL";
    assignError: "done.invoke.Scanner.verifying-tiket:invocation[0]";
    assignPanelNumber: "ENTER_PANEL_NUMBER" | "SCAN_PANEL";
    assignTicket: "SCAN_TICKET";
    assignTicketNumber: "ENTER_TICKET_NUMBER";
    refresh: "done.invoke.Scanner.submitting:invocation[0]";
    saveOffline: "SAVE_OFFLINE" | "error.platform.Scanner.submitting:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    attendeeIsFetched: "ENTER_PANEL_NUMBER" | "SCAN_PANEL";
    qrCodeDetected: "SCAN_TICKET";
    submissionIsSuccessful: "done.invoke.Scanner.submitting:invocation[0]";
    ticketIsValid: "done.invoke.Scanner.verifying-tiket:invocation[0]";
  };
  eventsCausingServices: {
    fetchAttendee: "ENTER_PANEL_NUMBER" | "SCAN_PANEL";
    submitScanPayload: "SUBMIT";
    verifyTicket: "ENTER_TICKET_NUMBER" | "SCAN_TICKET";
  };
  matchesStates:
    | "display-fetched-attendee-and-panel"
    | "display-scanned-ticket-and-panel"
    | "error"
    | "fetching-attendee"
    | "idle"
    | "scanning-panel"
    | "scanning-ticket"
    | "submitting"
    | "verifying-tiket";
  tags: never;
}

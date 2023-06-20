import { GetAttendeeByTicketNumberQuery, ScanAttendeeMutation, SearchAttendeeQuery } from "@tacotacIO/codegen";
import { actions, assign, createMachine } from "xstate";

import { sdk } from "@/lib/sdk";

export const scannerMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUDGBDAdpsAnAdAJYQA2YAxMgCoCCASlQPrIDCNAcuwJLsDiA2gAYAuolAAHAPaxCAF0KTMYkAA9EAWgBMmgIz5NAdgMAOAJw7T50wFYALDoA0IAJ6IAbIL2GzOwaYPWOjp2AL4hTmhYOATEZJQAogAy8SxMNFRU8ewAIvHxQqJIIFIy8orKagjWgvi2ggDM9dZGho22xtZOrgiGpvqCBm7GhsENHgZhERjYePiw05iEmFDq8qgA1mCy5FmZdIxUXCwA0vFM7ACqALIAQvF0BcolcgpKRZWa9fiNbi2eBoI3LY2l1EPYDPhTIJrDZrEMPMZbJMQJEZgR5lElis1pttmx2Cwko8is8ym9QJUdO18Do3NZ6nTBJpLBZbKZQQgAX0mXCDN4DMFTMjUdE5gssatCBstpR8QcjqcqMSJNIXuV3ogdB1atVPs16iZGtCOYEvppbLpdMYDdb-MKFrMMdgJeIsGASOR8YTEsriqqyRVEJogTSBcZfm5aUEmm4OcY9GzLCzbDDTON7VFHeLlupXTgPbt7owAAocJKMS63e6+0mvQOc4w1LWaDqNRG2IaOFxBvz4YwBOkMlqaGHGDNosWYnN5907dh7EtlxIV653B46Qoq0p1jVVUy2fQC+rM3yfNzaDn1LU64xmAb1Wz2azW8eip2Laduj2sDiL9hEkQnn9HcKUQAVNEhdp2jMAxGnpeoOTpCFb2GNln2BAY3FfLMpxWGdvzlUt-x9DcgO3dVQIQIIdC+QY-H8epTGtAJEPDfQWW0c8U2BCZwhRB0CDwXBJFwcg6Hiah6CVQCSWAijVA0eo2KggYeIFfx2W7BBwy+a0YU0QEn0EMc+JFWYIEIWBxBIdBnHUAAzLZUAAC0gdR0FkWQwEwCAwDAdyfNzL9KAuG4ri4aTNz9cjyQUqjH2sfQ6VpOxPkBc0TUGJKAnNUxLQ7epsIICyrJsuzHNkFy3I8ryfL8gKICC-NPQ4b0azk2LKUaCCI3jXUtUfDl9y+aFRusZ8dD1HQivwErrNshynNcxqau83z-KwRr8LnBd4iuGguB9GStzVTrNXNCFRuhJimINTotOqLwgXjXQjTQwrTIE-AKpciVVrqigIEUMAiEwAA3SRNnwMyCB+5y-s8ta-IQJYIYwMkCnamL62tNx8EBAxLGMpTUK7bpLAhcbzFg4zYKUma4YR2r1vIISRPwebZHskSAFtoa+xmc3+9aUfByR0deTHjui076xp2pIyYjwr2GYYOWovR4w7exfABNw7U+zNiss+a7PfNycS2BqmtnQt9j2g6jqi2t5MpCwetpFN6T5IFxqGtN8ZhHQaf7NsZrmsr1HNxrLdka3tuQGgADV4kYAB5AAxDPEh4fJpZds6qIsRLmRbNlESZEdNHVxo+hTQwYXAyN9fDk3I+jyVpTjzabY9L0AOdjr618NwvgfJjCcCYMHwMdWDK+CwjAaCa8sRGbYAAVwAIx5uR5GWcggZwUGIahmG5m33fPKxUW0Y8yWRCx2Xd1pOl8HpapzEROm-a0joIOBB0UwD4zCfF0OvS+e8sSH2BifSGINz6bx3lA5Yt9xb30UJjUislsa7kEByQQEDkHXwPmzAgnNua4D5ogyBJCoBoIlpgx++ch4vwMLYCE7CDSV0YiOWw6tDL42DLTfWMJrDgMNhOMGeBCD2WcBKeQuIYHH1RvA-mRt8DSNwLI+ROZFFbAYRgzAUtB64MouIg8TRxEGXGnyEws8tKRggsmOEnhjzNCFJI0UWidEKMIEoshHMbJc15uoqRMi5F+NxIYjGzDTHP0oseBejE8p5SjMeYwNdYJ9gCOwuokZYJAjCHxTAkhfLwCKDDMiCS4rqGBAeFSXCjCL00t0dQ-Zaj9kegEIIwxzwzViGAapAZdzqHqMZd+VMtSgJsOwxCzR8DwmDGmJoiI15eJws6PRUpcTDJArUqk+MqTxk8MAlsRgEKOM8IeHwfgenBCRBs9E2Y8Jfj2a7RAQDvgAkRM9P4DjugeAPCOQQTJfCeGCHyGaZD3mF3UJNRKTFPCAkEAlQpsYtKTSYrUdoaZIWPl+NNJ5s024LThtVRGAN45vJwTUykfgILxiCKCxox5oSXMBUEWo5h2ieypFqTxUwNGCxWMLPysK5bAPxueQYHQGjHiCByIweNHz8nsA+c0mhW6lQWh3WO1L8wSpfpNGogwoLmmDrBQY6tmXfCpDCYyqKaJ5SIVffeUAjWUWDqi9+xMOHBg4fSE0HSXEeBoiOQmM0fGRO2bs2lIzKIcLxo2JkYLlXNw5O0CEo9tBKV0MEA0ARikhCAA */
    id: "Scanner",
    initial: "idle",
    tsTypes: {} as import("./scanner-machine.typegen").Typegen0,
    states: {
      idle: {
        on: {
          START_SCANNING: {
            target: "scanning-ticket",
          },

          SELECT_ATTENDEE: {
            target: "scanning-panel",
            actions: "assignAttendeeAndTicket",
          },
        },
      },

      "scanning-ticket": {
        on: {
          ENTER_TICKET_NUMBER: {
            target: "verifying-tiket",
            actions: "assignTicketNumber",
          },

          CANCEL: {
            target: "idle",
          },

          SCAN_TICKET: {
            target: "verifying-tiket",
            cond: "qrCodeDetected",
            actions: "assignTicket",
          },
        },
      },

      "scanning-panel": {
        on: {
          CANCEL: {
            target: "idle",
          },

          ENTER_PANEL_NUMBER: [
            {
              target: "display-fetched-attendee-and-panel",
              cond: "attendeeIsFetched",
              actions: "assignPanelNumber",
            },
            {
              target: "fetching-attendee",
              actions: "assignPanelNumber",
            },
          ],

          SCAN_PANEL: [
            {
              target: "display-fetched-attendee-and-panel",
              cond: "attendeeIsFetched",
              actions: "assignPanelNumber",
            },
            {
              target: "fetching-attendee",
              actions: "assignPanelNumber",
            },
          ],
        },
      },

      error: {
        on: {
          RESTART: {
            target: "idle",
          },
        },
      },

      "display-fetched-attendee-and-panel": {
        on: {
          SUBMIT: "submitting",

          CANCEL: {
            target: "idle",
          },

          ENTER_EMAIL: {
            target: "display-fetched-attendee-and-panel",
            internal: true,
            actions: "assignEmail",
          },
        },
      },

      "fetching-attendee": {
        invoke: {
          src: "fetchAttendee",

          onDone: {
            target: "display-fetched-attendee-and-panel",
            actions: "assignAttendee",
          },

          onError: "display-scanned-ticket-and-panel",
        },
      },

      "display-scanned-ticket-and-panel": {
        on: {
          ENTER_EMAIL: {
            actions: "assignEmail",
          },
          SAVE_OFFLINE: {
            target: "idle",
            actions: "saveOffline",
          },
          CANCEL: {
            target: "idle",
          },
        },
      },

      submitting: {
        invoke: {
          src: "submitScanPayload",

          onDone: [
            {
              target: "idle",
              actions: "refresh",
              cond: "submissionIsSuccessful",
            },
            {
              target: "error",
              actions: assign({ error: " nous n'arrivons pas à vous scanner" }),
            },
          ],

          onError: [
            {
              target: "idle",
              actions: "saveOffline",
            },
          ],
        },
      },

      "verifying-tiket": {
        invoke: {
          src: "verifyTicket",

          onDone: "scanning-panel",

          onError: {
            target: "error",
            actions: "assignError",
          },
        },
      },
    },
    schema: {
      context: {} as {
        ticket: {
          number: string;
          isMissingEmail: boolean;
          isVIP: boolean;
          fullName: string;
          event: string;
        };
        email: string;
        panel: number;
        attendee: GetAttendeeByTicketNumberQuery["attendeeByTicketNumber"];
        error: string;
        eventId: string;
      },
      events: {} as
        | { type: "START_SCANNING" }
        | { type: "ENTER_TICKET_NUMBER"; payload: string }
        | { type: "RESTART" }
        | { type: "CANCEL" }
        | { type: "ENTER_EMAIL"; payload: string }
        | { type: "SAVE_OFFLINE" }
        | { type: "SUBMIT" }
        | { type: "ENTER_PANEL_NUMBER"; payload: string }
        | {
            type: "SCAN_TICKET";
            payload: {
              number: string;
              isMissingEmail: boolean;
              isVIP: boolean;
              fullName: string;
              event: string;
            };
          }
        | { type: "SCAN_PANEL"; payload: string }
        | { type: "START_SEARCHING" }
        | { type: "SELECT_ATTENDEE"; payload: SearchAttendeeQuery["attendees"]["nodes"][number] },
      services: {} as {
        fetchAttendee: { data: GetAttendeeByTicketNumberQuery; error: any };
        submitScanPayload: { data: ScanAttendeeMutation; error: any };
        verifyTicket: { data: boolean; error: any };
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    guards: {
      attendeeIsFetched: ({ attendee }) => {
        console.log("attendee is fetched", !!attendee?.id);
        return !!attendee?.id;
      },
      submissionIsSuccessful: (_, event) => {
        console.log("submission", event);
        return event.data?.scanAttendee?.boolean;
      },
      qrCodeDetected: (_, event) => event.payload !== null,
    },
    actions: {
      assignTicketNumber: assign({
        ticket: (context, event) => ({
          ...context.ticket,
          number: event.payload,
        }),
      }),
      assignAttendee: assign({
        attendee: (context, event) => event.data.attendeeByTicketNumber,
      }),
      assignPanelNumber: assign({
        panel: (_, event) => Number(event.payload),
      }),
      assignTicket: assign({
        ticket: (context, event) => ({
          ...context.ticket,
          number: event.payload.number,
          isMissingEmail: event.payload.isMissingEmail,
          isVIP: event.payload.isVIP,
          fullName: event.payload.fullName,
          event: event.payload.event,
        }),
      }),
      assignEmail: assign({
        email: (_, event) => event.payload,
      }),
      assignError: assign({
        error: (_, event) =>
          event.type === "error.platform.Scanner.verifying-tiket:invocation[0]" ? "ticket non valide" : "erreur",
      }),
      assignAttendeeAndTicket: assign({
        attendee: (_, event) => event.payload,
        ticket: (_, event) => ({
          number: event.payload.ticketNumber,
          isMissingEmail: !event.payload.email,
          isVIP: event.payload.isVip,
          fullName: event.payload.firstname + " " + event.payload.lastname,
          event: event.payload.eventId,
        }),
      }),
    },
    services: {
      fetchAttendee: (context: { ticket: { number: string } }) => {
        return sdk().GetAttendeeByTicketNumber({
          ticketNumber: context.ticket.number,
        });
      },
      submitScanPayload: (context) => {
        return sdk().ScanAttendee({
          scanAttendeeInput: {
            payload: {
              ticketNumber: context.ticket.number,
              panelNumber: context.panel,
              metadata: context,
            },
          },
        });
      },
      verifyTicket: async (context, event) => {
        console.log("verifyTicket", event);
        console.log(context);
        const { attendeeByTicketNumber } = await sdk().GetAttendeeByTicketNumber({
          ticketNumber: context.ticket.number,
        });
        // do something with eventId
        console.log("attendeeByTicketNumber", attendeeByTicketNumber);

        if (attendeeByTicketNumber?.registration?.eventId !== context.eventId) {
          throw new Error("ticket non valide");
        }
        return true;
      },
    },
  }
);

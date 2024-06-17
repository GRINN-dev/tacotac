import { GetAttendeeByTicketNumberQuery, ScanAttendeeMutation, SearchAttendeeQuery } from "@tacotacIO/codegen";
import { actions, assign, createMachine } from "xstate";

import { sdk } from "@/lib/sdk";

export const scannerMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUDGBDAdpsAnAdAJYQA2YAxMgCoCCASlQPrIDCNAcuwJLsDiA2gAYAuolAAHAPaxCAF0KTMYkAA9EAWgBMmgIz5NAdgMAOAJw7T50wFYALDoA0IAJ6IAbIL2GzOwaYPWOjp2AL4hTmhYOATEZJQAogAy8SxMNFRU8ewAIvHxQqJIIFIy8orKagjWgvi2ggDM9dZGho22xtZOrgiGpvqCBm7GhsENHgZhERjYePiw05iEmFDq8qgA1mCy5FmZdIxUXCwA0vFM7ACqALIAQvF0BcolcgpKRZWa9fiNbi2eBoI3LY2l1EPYDPhTIJrDZrEMPMZbJMQJEZgR5lElis1pttmx2Cwko8is8ym9QJUdO18Do3NZ6nTBJpLBZbKZQQgAX0mXCDN4DMFTMjUdE5gssatCBstpR8QcjqcqMSJNIXuV3ogdB1atVPs16iZGtCOYEvppbLpdMYDdb-MKFrMMdgJeIsGASOR8YTEsriqqyRVEJogTSBcZfm5aUEmm4OcY9GzLCzbDDTON7VFHeLlupXTgPbt7owAAocJKMS63e6+0mvQOc4w1LWaDqNRG2IaOFxBvz4YwBOkMlqaGHGDNosWYnN5907dh7EtlxIV653B46Qoq0p1jUNr71EZBUz9gUmDnqPTVUwM7RAwH2bRC8Ioh3o7MrGce1gcRfsIkiJ5-R3ClEAFTRIXadozAMRp6XqDk6QhYxkPNGxEXqAY3HHUUnUWac3S-OVSz-H0N0A7d1RAhAgh0L5Bj8fx6mPA1Om7BB4X0Flb3NOwDWw2Y8FwSRcHIOh4moeglQAkkgMo1QNHqcNakRAZgSMCwDHZNjwy+a0YU0e9RjHZ8RVmCBCFgcQSHQZx1AAMy2VAAAtIHUdBZFkMBMAgMAwDc7zcwIygLhuK4uCkzc-Qo8l5Oo2wU30OlaTsT5AXNE1BkSgJUMtDt6n4ghzMs6zbIc2RnNc9zPO83z-IgQL809DhvRrWSYspRpwIjeNdS1eKOVMYF8GhEbrGseM9R0Ar8CKqybPsxyXPqqqvJ8vysHqz85wXeIrhoLgfWkrc1XazVzQhEboWPZiAhNTxEvaHRdCNNl6WmsrnIlFaaooCBFDAIhMAAN0kTZ8FMggPqcr6PNW3yECWEGMDJApWui+trTcYbfksQRrRQ+wBv8fAxvMGC8ZgxT3sWmHqrW8hBOE-A5tkOzhIAW3B198Ch2m4bABHgckZHXlRo6opO+tydqSNjw8epm2GDkaL0eMO3sXwATcO0TO52aSvUXDXJxLY6oa2dC32Xb9sOyLazkykLC62kU3pPkgTGomsaunRyf7Ntpv1+ajfqk3ZDNrbkBoAA1eJGAAeQAMUTxIeHycX7dO6iLGsTiWzZFTtGsTRlcaPoU0MGEwMjbXA4subbJDyVpXDjbzY9L1-zttr618Nx9wLzTAmDepbAMZWDK+DSASaeNTHz6bYAAVwAI3ZuR5GWcg-pwQGQbBiG5lX9ePKxQWkfc0WRDRyXd1pOkSaaPw+spz3tOL2pFJhUezE+XRF+PhvLE29-p71BgDQ+y815AOWOfYWl9FCozIjJdGu5BAckEAA6Bp8t6MwICzNmuBOaQMATgqAcCRaIOvhnHud8DBj3wPQg0TJPjzzsMre8w1gwU21jCYuU1daZgIEDPAhA7LOAlPIXEIDd6I3AVzIR+ARG4DERInMUitgUIQZgMW3dUFUWLrYb4Y1tDQmaPyBCT1ITmBTB4WiI5NLTWUaoyRhBpF4OZtZVmHMFETmceI1xuItEo2oXo2+VEDxTyYvPeeUYDzGFLjBPsAR6F1EjDBIEYRnyYEkD5eARQIbkXCbFdQwIjGQVUgaAU-gtLdHUMTJ6-cjD0njB0CYgiJyxDAEUgMu51AYWMCTUmWpf42HoQhZo+B4TBjTLPSCi93zN1xD04CJSqTDSpPGTw14WxGHgmxOx+gTDmD8AEIIoQOk4UWZ+FZDtEAdD6MwxEQITwGXHgcwQRiRyCCZL4TwwQ+TTTwbcrOF4RyQkbH3T5KYMmxjYk9Y8tR2hpgBfFX4AipiKKDqVRalVYY-QjgREFvc-DgXjEEH5jQDzQn2d0SMCYbHxiBFSLUT5MUTl5jmb6a1iW7k0l8NKgwOgNAPEEDkRgsbxX5PYUe5pNB12KsHB0ocpS4kJfmXlVEggGUYS8i04IYKDGVhS74VIYR40+bReeWCT6bygJq2KvtPkkzxqPd2Y96Qmn7NYs1diDzNDZS+RR-i1HYjcVsB1lQx5Y0bEyX5Eqa4cnaBCfu2hFK6GCFU6wWSQhAA */
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
            actions: "refresh",
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
            actions: "refresh",
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
            actions: "refresh",
          },
        },
      },

      "display-fetched-attendee-and-panel": {
        on: {
          SUBMIT: "submitting",

          CANCEL: {
            target: "idle",
            actions: "refresh",
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
            actions: ["saveOffline", "refresh"],
          },
          CANCEL: {
            target: "idle",
            actions: "refresh",
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
              actions: ["saveOffline", "refresh"],
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
        return !!attendee?.id;
      },
      submissionIsSuccessful: (_, event) => {
        return event.data?.scanAttendee?.boolean;
      },
      qrCodeDetected: (_, event) => event.payload !== null,
    },
    actions: {
      assignTicketNumber: assign({
        ticket: (context, event) => {
          console.log(event.payload);
          return {
            ...context.ticket,
            number: event.payload,
          };
        },
      }),
      assignAttendee: assign({
        attendee: (context, event) => {
          console.log(event.data.attendeeByTicketNumber);
          return event.data.attendeeByTicketNumber;
        },
      }),
      assignPanelNumber: assign({
        panel: (_, event) => Number(event.payload),
      }),
      assignTicket: assign({
        ticket: (context, event) => {
          console.log(event.payload);
          return {
            ...context.ticket,
            number: event.payload.number,
            isMissingEmail: event.payload.isMissingEmail,
            isVIP: event.payload.isVIP,
            fullName: event.payload.fullName,
            event: event.payload.event,
          };
        },
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
      refresh: assign({
        ticket: {
          number: "",
          isMissingEmail: false,
          isVIP: false,
          fullName: "",
          event: "",
        },
        panel: null,
        attendee: null,
        email: "",
        error: "null",
      }),
    },
    services: {
      fetchAttendee: (context) => {
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
              email: context.email,
            },
          },
        });
      },
      verifyTicket: async (context, event) => {
        const { attendeeByTicketNumber } = await sdk().GetAttendeeByTicketNumber({
          ticketNumber: context.ticket.number,
        });
        // do something with eventId

        if (attendeeByTicketNumber?.registration?.eventId !== context.eventId) {
          throw new Error("ticket non valide");
        }

        if (attendeeByTicketNumber?.panelNumber) {
          const confirm = window.confirm(
            `Ce ticket a déjà été scanné sur le panneau ${attendeeByTicketNumber?.panelNumber}. Voulez-vous le scanner à nouveau ?`
          );
          if (!confirm) {
            throw new Error("ticket déjà scanné");
          }
        }

        return true;
      },
    },
  }
);

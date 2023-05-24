import { GetAttendeeByTicketNumberQuery, ScanAttendeeMutation } from "@/../../@tacotacIO/codegen/dist";
import { actions, assign, createMachine } from "xstate";

import { sdk } from "@/lib/sdk";

export const scannerMachine = ({ eventId }: { eventId: string }) =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QGUDGBDAdpsAnAdAJYQA2YAxMgCoCCASlQPrIDCNAcuwJLsDiA2gAYAuolAAHAPaxCAF0KTMYkAA9EAWgBMmgIz5NAdgMAOAJw7T50wFYALDoA0IAJ6IAbIL2GzOwaYPWOjp2AL4hTmhYOASwGNiEmFDq8qgA1mCy5ACi7FRZdIxUXCwA0llM7ACqALIAQvlCokggUjLyispqCJoAzPg9PW5Gmp4Ggm62A7ZOrgj2BvimgtY21m7GHsa2YRFx0fixUQlJKemZbOwsWQAyjcqtcgpKzV06tsb4Om7Wg9aCmpYLLZTDNEGNTPh-msDN4DMFTDsQJFsHh8AA3PCEABmzmOyUIZ3IEEUYCImDRknS+GR+wxuGxuMS+LOCASFIw7UwjTuzQenM6iGsmls-WsQpGYphJgMoIQbh0mkW5lsa08PU01gMCPCSL2qLpDLx8kJxJwZIpVJp+sxOKNBIyrPJkg5T25OiaEmkjw6L0FCs+PTe3yGtlsbgmsqMHzhbm0wJ0PVsws0iKtMT2ePEWDAJHIFyutxE9y9-N93QmnzhGwM8vlCbWsuMemBlkBKssHgMqb16aOTKzOFzOTyBQAChwbowqnUGkXeSWngKECZBJ9jJpjD8elsw03ZSMIcYAt9BsMNaZjN2oqjDvF+9mh7l8oxx+xJ9P6nR+O7i21F2WVhFQwEwBXxeljTRZUDD4VWMMxBAMRN7GsYweivFFezvJIBxzSgLhfCdCw9FoFx9UAunWD5VTDGtbDhHpBGmFx3FjfADDDfxBlsQRUMQ9D9lvTBMwfPCOAIt9bh-ec-zI1RECCBM2I8SxEIvHoAlldY3H0QFtFjFVJi7HU03wPBcEkXByDoLJqHoKgeU9GTnnIjRt2095uPY9S4X8EFmIQDY+lQlYRgmYIeP41EIEIWBxBIdBnHULEMlQAALSB1HQWRZDATAIDAMBMry9QcNzZBKlqaouHsudHO9Zy5IQN4VX0b4vjsXpxmFWVNW0zQhiFYFdGFNw0OMnt8Gi2L4sS5LZDSjKspyvKCqKiASpE-MbgckinKXBN1XwIZ1nC3Qd1lUxJkhP4bpQhUekCSKCDmtK8SW3L8ooU1STZSlSRMl7Ure7KPoKx12Sy10RB2vl-xcgKHs+XR1NjQYHtMHpZV8VjYy1P4YQ3cZtnG69npSoGmXelaKDMiz8DirKsQsgBbakJsB4Hls+8HnUhxRuVq3b6qXRDVzDCwNkEaCN0g-yFL0Jsw3sXwxjcfwnsmmKGcSwSMtODI1o2wdsifAosmqGguCI39hbLIJTEVWsVR+GEJjFC7TG05ZzFFo8BkvEmMM16aEvUXX1v12RDdKygaAANSyRgAHkADEU+uHgshh0iGteCxrB0jdgS2f4NVl2YDohFVDBWOF+q+bVdlJ4PtbDvUI8INIDawdaY6263pNt+Hsb6RMLzxhVRrorGRj6CwjClu6Ha2DXYAAVwAI2ZuR5ESIkSXNP62eb9et5344eZdfnocF2HZNecMC5+P5zC2RCHusRshXwSZNwx94Hbqh0KvTe29srHHILTAgDNZBM1wKzEyp8wG7ygJfPmXJoZSTqqWYe6N8BwV0DxDwhgeh+QrmdT4OgtQaibEKYw4wQFn3AXvKB9N4qwJZsfIOSDz6JDQZyAWxE7653kuxBYXkxjaFIRqJiFciaQn6jxGsNgbC6FXhmJkkdRLsEKMUMoNUhE532puH+fxeianUqhBin9-KBD6MmBUOheKoXVoHWkNpGQnHtJkVhMC4EIImgaW0mjvH8KhsIbOe0yzqjnqQh2DsvggWMFjdSQUAjsW4vKRCEwNZTVboDRaINqbRxEsOZ85tLYD2wXDRqCo6LXUEN7MwvEbGzD+F4CYTZkYMWBD8MIOpMCSHyvAZoaYbY4MauoSYIoPIIUMj5LUsp1Be0aaszc3EpbxI1sQMg4yaldHUAxKiYpX5mABJqWR7hNRHQ2P1T2D0tgrzcTeDRXiu6yD2ffDQbxIRvCbJ4DGG4jCY38h4LwJhzB+ACEEUIzzMJCXvIOT5IiAorH6GMLYnThgIU0oxfQfx-i+E8MEGEGsoHIqXOoBUBcLyeHGIxFU2S3AzwvD-AB8oLk0WAXCluM0krk0KVzVaPcjY5gpXbPwiomxBEaQMdUywQWzDrD-ZUTYwr2DMBrDmlMimfXFfDLUfQuo1k3FLIBjh-JGHckmaU9hEzJlyVrPl4d8TvJKUiweEy84jCUh5YUVDEI1ixjK-obwVg8UYgmB2jDkHHH1bUsYIo-ioTov1OiPwepHiVGGsF6pNSN11M3IJnjmQZHjV0Oi2l6H-EJVa2ssp3gLFGlI9cMLvLWH6SEIAA */
      id: "Scanner",
      initial: "idle",
      tsTypes: {} as import("./scanner-machine.typegen").Typegen0,
      states: {
        idle: {
          on: {
            START_SCANNING: {
              target: "scanning-ticket",
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
                target: "fetching-attendee",
                cond: "attendeeIsFetched",
                actions: "assignPanelNumber",
              },
              {
                target: "display-fetched-attendee-and-panel",
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

            onDone: [
              {
                target: "scanning-panel",
                cond: "ticketIsValid",
              },
              {
                target: "error",
                actions: "assignError",
              },
            ],

            onError: "error",
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
            isValid: boolean;
          };
          email: string;
          panel: number;
          attendee: GetAttendeeByTicketNumberQuery["attendeeByTicketNumber"];
          error: string;
        },
        events: {} as
          | { type: "START_SCANNING" }
          | { type: "ENTER_TICKET_NUMBER"; payload: string }
          | { type: "RESTART" }
          | { type: "CANCEL" }
          | { type: "ENTER_EMAIL"; payload: string }
          | { type: "SAVE_OFFLINE"; payload: { ticketNumber: string; panelNumber: number } }
          | { type: "SUBMIT"; payload: { ticketNumber: string; panelNumber: number } }
          | { type: "ENTER_PANEL_NUMBER"; payload: number }
          | {
              type: "SCAN_TICKET";
              payload: {
                number: string;
                isMissingEmail: boolean;
                isVIP: boolean;
                fullName: string;
                isValid: boolean;
              };
            }
          | { type: "SCAN_PANEL"; payload: string },
        services: {} as {
          fetchAttendee: { data: GetAttendeeByTicketNumberQuery; error: any };
          submitScanPayload: { data: ScanAttendeeMutation; error: any };
          verifyTicket: { data: boolean; error: any };
        },
      },
      context: {
        ticket: {
          number: "",
          isMissingEmail: false,
          isVIP: false,
          fullName: "",
          isValid: false,
        },
        panel: null,
        attendee: null,
        email: "",
        error: "null",
      },
      predictableActionArguments: true,
      preserveActionOrder: true,
    },
    {
      guards: {
        ticketIsValid: ({ ticket }) => ticket.isValid,
        attendeeIsFetched: ({ attendee }) => attendee !== null,
        submissionIsSuccessful: (_, event) => {
          console.log(event);
          return event.data?.scanAttendee?.attendee?.id !== null;
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
          attendee: (_, event) => event.data.attendeeByTicketNumber,
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
          }),
        }),
        assignEmail: assign({
          email: (_, event) => event.payload,
        }),
        assignError: assign({
          error: (_, event) =>
            event.type === "done.invoke.Scanner.verifying-tiket:invocation[0]" ? "ticket non valide" : "erreur",
        }),
      },
      services: {
        fetchAttendee: (context: { ticket: { number: string } }) => {
          return sdk().GetAttendeeByTicketNumber({
            ticketNumber: context.ticket.number,
          });
        },
        submitScanPayload: (context: { ticket: { number: string }; panel: number }) => {
          return sdk().ScanAttendee({
            scanAttendeeInput: {
              ticketPayload: {
                ticketNumber: context.ticket.number,
                panelNumber: context.panel,
              },
            },
          });
        },
        verifyTicket: async (context: { ticket: { number: string } }, event) => {
          if (event.type === "ENTER_TICKET_NUMBER") {
            const { attendeeByTicketNumber } = await sdk().GetAttendeeByTicketNumber({
              ticketNumber: context.ticket.number,
            });
            // do something with eventId

            return attendeeByTicketNumber?.registration?.eventId === eventId;
          }
          return true;
        },

        // services à inclure côté react: verifyTicket
      },
    }
  );

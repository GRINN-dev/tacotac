import { GetAttendeeByTicketNumberQuery, ScanAttendeeMutation } from "@/../../@tacotacIO/codegen/dist";
import { actions, assign, createMachine } from "xstate";

import { sdk } from "@/lib/sdk";

export const scannerMachine = ({ eventId }: { eventId: string }) =>
  createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QGUDGBDAdpsAnAdAJYQA2YAxMgCoCCASlQPrIDCNAcuwJLsDiA2gAYAuolAAHAPaxCAF0KTMYkAA9EAWgBMmgIz5NAdgMAOAJw7T50wFYALDoA0IAJ6IAbIL2GzOwaYPWOjp2AL4hTmhYOASwGNiEmFDq8qgA1mCy5ACi7FRZdIxUXCwA0llM7ACqALIAQvlCokggUjLyispqCJoAzPg9PW5Gmp4Ggm62A7ZOrgj2BvimgtY21m7GHsa2YRFx0fixUQlJKemZbOwsWQAyjcqtcgpKzV06tsb4Om7Wg9aCmpYLLZTDNEGNTPh-msDN4DMFTDsQJFsHgDntjslCGkMpQLoVimUqHdmg92s9QK9jNZ8LY-r1rAYeiYBstQQhAn1NLZdLpjEy+f5Ecj9od4ol1OIsGASOQLldbiJ7tJHh0XohNBNPnCNgY3F8gj01mzjHpgZZAbTLB4DEK9qjRZgMZKcDKcnkCgAFDg3RhVOoNRUk5Vkzpg4yCT7GTRUgZbWzrRwudV+fDGALfQbDTQrYy2qL29Hi53S7K5fKML3sH1++p0fg6JoSYNPUPs0y2fRwnoA3y9NzaNk9HQfWnGMyCRm2ezWPl5lExQtJYsy1gcCvehWNlrN1UUsE6TSLd7vMyMw0DNnfBZjqPAmeTCduOcixcSqUrvGVm71rekltqhAgh0PpdT8fwelMPkAkvDZ9EBbR+1pSYbXCJE7QIPBcEkXByDoLJqHoIlAybNp-z3BB1B6WDjwnZC4X8EEkwQDY+j5FYRgmYJBFzVDhVRCBCFgcQSHQZx1AAMwyVAAAtIHUdBZFkMBMAgMAwHklS3xdShKlqaouCI38d3JVREDeWl9G+L47F6cYuTZBk3EsgIuVMHl4x6Z9+ME4TRIkqTZIgeTFOU1T1KwILl1lDh5WJEiVRM14BkPIYEzpYcpzZds+mWXLrBnA9DR0LyCAEoSRLEyTZBkuSFKUlS1I0yL31Ld1GCyaoaC4TclVI3dTMArkFly5ZIMgplrAczxLPeA9gJ6QQ7083j0PwKqZIxOrQrU8gIEUMAiEwAA3SR0nwPiCHW6TNpChqwAQBITowMlGji7c+sSxA+Sc8YDEsbiqNvRNZksBZ8vMRluLPHjdnzS6Apu+qwvITDsPwXzZHE7CAFtztWq7Ee2+7HskZ6nle4j3oS1tIZpPVII8IcoyjNkgL0E143sXwxjcQUVrh-Ayt8sSHTk04MiarSSzdcsOq6nqgw+1sgjc-A9QmfKmQ1WlJqYq1IRWHRIbTWMSsFnyKvUUWgvF2RJai5AaAANSyRgAHkADEPeuHgsjev9+teCxqQBaNgS2f5s00VmBghWlDBWOENS+BF+fnc3yr863MWxO2IqlmU5W-SmA8+wDxj6Hpw7+wINSrgxWZGPoLCMQRDRNNytjN2AAFcACNsbkeREl2-bDpOs6LoOfvB8U44HuO0mFPJkR-eM5W3G+fAfj+cwtjPfLjWsQ9JipUwq7MXpdG7meh+OUecHH06Dqn3uB7vxIF6e5fFFehteupgBQQbJBA33fnPEeqMCAYyxrgXGr9b4QKgF-JeL1V4l3XgBI2tgFgGGQpHCC2ZphMV8Jqf4mxdQ2BsNfNO+wjp4EIOJZwGJ5BnAfgdEmk9Vr0NwIw5h4pWEZBQWTX+6CjJKwAsfDshpj4jHyjCEwDcmJ6kPBaNYnhuwMlTrDdOPC+EsMIGwvaj9OEv24QwphBizjCJ-pgP+4jAHkVrp8Ic8ZoRTk3sQ2YRgPhwn7K5YC3JuRmz0ZYgRhicRQPRiJTGOM8YC1Cfwk4ETZA2LQcINeEjyLdmbhBNybl9TdmMDHRkqYAh4NsOMI2gxtiIkwJIVS8BmgXQASGAC6hJgdhongpk9E-psnUGmbeZtiBkFaWRAalFuLb3BsOS+Ng8GXgZGrDYGpTBuHbsebur5bbjMDhoN4kI3gmk8OfaMRgeiXmmt4cwfgAhBFCLQgsRwizvj2WXM+-QxhbAmGmGEE4rkdmzIIf4vhPDBBhGbKB7zWzqAPNSSCnhxiLVpIyTejdII0neOsiFHi4RmyFpbK6tVbphXtm8xWjiBq+FViaIIIKBjdmWJc5RQQaTmFmpxewZgzYE3FFtO6MKAJ-Ryv2XUVI27diCGyIwTkpywnsFXLkmgCUWyznaG2WIzjkpdEK8iQQRj4F1MeLkRtGS6lZvS-obwVjcUWsBNyYDZ7DygHq6lYwOx-D5Dg7WAQWWzBnAsNRHhgLZj+iEixSTMRnDdV0HBTlwz-FBbK9WbJ3gLA2doKiuhgi9OsGEMIQA */
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
            event: string;
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
          event: "",
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
        ticketIsValid: ({ ticket }) => {
          console.log("ticket ", ticket);
          return true;
        },
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
            event.type === "done.invoke.Scanner.verifying-tiket:invocation[0]" ? "ticket non valide" : "erreur",
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
          if (event.type === "ENTER_TICKET_NUMBER") {
            const { attendeeByTicketNumber } = await sdk().GetAttendeeByTicketNumber({
              ticketNumber: context.ticket.number,
            });
            // do something with eventId

            return attendeeByTicketNumber?.registration?.eventId === eventId;
          }
          return context.ticket?.event === eventId;
        },

        // services à inclure côté react: verifyTicket
      },
    }
  );

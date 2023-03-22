import { LogsStatus } from "@tacotacIO/codegen/dist";
import dayjs from "dayjs";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

import { sdk } from "@/lib/sdk";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const LogsPage = async ({ params: { eventId } }) => {
  const { event } = await sdk().GetEventById({
    eventId: eventId,
  });

  const IconStatus = ({ status }) => {
    switch (status) {
      case LogsStatus.Ok:
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case LogsStatus.Warning:
      case LogsStatus.WarningEmail:
      // De cette façon, si status correspond à l'un des trois cas de LogsStatus.Warning, le code exécutera la ligne de code suivante pour afficher l'icône AlertTriangle.
      case LogsStatus.WarningPanel:
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case LogsStatus.Error:
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        break;
    }
  };

  const valueStatus = (status: LogsStatus) => {
    switch (status) {
      case LogsStatus.Ok:
        return "Inscription ok";
      case LogsStatus.Warning:
        return "Vérifier les logs";
      case LogsStatus.WarningEmail:
        return <p>{"L'email ne semble pas avoir était renseigné."}</p>;
      case LogsStatus.WarningPanel:
        return <p>{"aucun numéro de panneau associé."}</p>;
      case LogsStatus.Error:
        return "Une erreur est survenu. Contacter l'équipe technique.";
      default:
        break;
    }
  };

  const SheetPayload = ({ payload }) => {
    return (
      <Sheet>
        <SheetTrigger>
          <Button>Payload</Button>
        </SheetTrigger>
        <SheetContent size="lg">
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-base font-semibold leading-6 ">Détail du payload</h3>
            </div>
            <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium ">Email</dt>
                  <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{payload?.ticket_payload?.email || "manquant"}</dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium ">Numéro de panneau</dt>
                  <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                    {payload?.ticket_payload?.panelNumber || "manquant"}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium ">N° de ticket</dt>
                  <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{payload?.ticket_payload?.ticketNumber}</dd>
                </div>
                <div className="flex items-center py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium ">Problème de réseau sur cette inscription</dt>
                  <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                    {payload?.is_coming_from_offline_mode ? "oui" : "non"}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium ">{"Id de l'event"}</dt>
                  <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{payload?.ticket_payload?.eventId}</dd>
                </div>
              </dl>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Logs de {event.name}
      </h1>

      <div className="flex items-baseline w-full max-w-3xl gap-2 mx-auto">
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {event?.logsList?.map((log, logId) => (
              <li key={log.id}>
                <div className="relative pb-8">
                  {logId !== event?.logsList.length - 1 ? (
                    <span className="absolute top-10 left-4 -ml-px h-4 w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex space-x-3 ">
                    <div>
                      <span className={"flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-transparent"}>
                        <IconStatus status={log.status} />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div className="flex items-center justify-center space-x-2">
                        <p className="text-sm ">{log.status}</p>
                        <p> - </p>
                        <p className="text-sm ">{valueStatus(log.status)} </p>
                      </div>
                      <div className="text-sm text-right whitespace-nowrap ">
                        <time dateTime={log.updatedAt}>{dayjs(log.updatedAt).format("DD/MM/YYYY - HH:mm:ss")}</time>
                      </div>
                    </div>
                    <SheetPayload payload={log.payload} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LogsPage;

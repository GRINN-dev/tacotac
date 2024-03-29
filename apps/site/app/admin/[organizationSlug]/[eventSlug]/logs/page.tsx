import { LogsStatus } from "@tacotacIO/codegen";
import dayjs from "dayjs";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";



import { sdk } from "@/lib/sdk";
import { serverSdk } from "@/lib/server-sdk";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


const LogsPage = async ({
  params: { organizationSlug, eventSlug },
}: {
  params: { eventSlug: string; organizationSlug: string };
}) => {
  const { eventBySlug: eventLogsBySlug } = await serverSdk().GetEventLogsBySlug({
    eventSlug: eventSlug,
    organizationSlug: organizationSlug,
  });

  const IconStatus = ({ status }) => {
    switch (status) {
      case LogsStatus.Ok:
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case LogsStatus.Warning:
      case LogsStatus.WarningEmail:
      case LogsStatus.WarningSignCode:
      // De cette façon, si status correspond à l'un des trois cas de LogsStatus.Warning, le code exécutera la ligne de code suivante pour afficher l'icône AlertTriangle.
      case LogsStatus.WarningPanel:
        return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      case LogsStatus.Error:
        return <XCircle className="h-5 w-5 text-red-400" />;
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
        return <p>{"Aucun numéro de panneau associé."}</p>;
      case LogsStatus.WarningSignCode:
        return <p>{"Probleme de QR Code"}</p>;
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
          <span>
            <div className={buttonVariants({ size: "lg" }) + " shadow hover:shadow-lg"}>Payload</div>
          </span>
        </SheetTrigger>
        <SheetContent size="lg">
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-base font-semibold leading-6 ">Détail du payload</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-medium ">Email</dt>
                  <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{payload?.ticket_payload?.email || "manquant"}</dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-medium ">Numéro de panneau</dt>
                  <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                    {payload?.ticket_payload?.panel_number || "manquant"}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-medium ">N° de ticket</dt>
                  <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{payload?.ticket_payload?.ticket_number}</dd>
                </div>
                <div className="flex items-center py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                  <dt className="text-sm font-medium ">Problème de réseau sur cette inscription</dt>
                  <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                    {payload?.is_coming_from_offline_mode ? "oui" : "non"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <section className="container pb-8 pt-6 md:py-10">
      <h1 className="admin-h1">
        Journal pour l&apos;événement <span className="text-accent">{eventLogsBySlug.name}</span>
      </h1>

      <div className="mx-auto flex max-w-3xl items-baseline gap-2">
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {eventLogsBySlug?.logsList?.map((log, logId) => (
              <li key={log.id}>
                <div className="relative pb-8">
                  {logId !== eventLogsBySlug?.logsList.length - 1 ? (
                    <span className="absolute left-4 top-10 -ml-px h-4 w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex items-center justify-center space-x-3 ">
                    <div>
                      <span className={"flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-transparent"}>
                        <IconStatus status={log.status} />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 items-center justify-between space-x-4 ">
                      <div className="flex items-center justify-center space-x-2">
                        <p className="text-sm ">
                          {" "}
                          <span>{valueStatus(log.status)} </span>
                        </p>
                        <p> - </p>
                        <p className="text-sm ">{log?.payload?.ticket_payload?.email}</p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm ">
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
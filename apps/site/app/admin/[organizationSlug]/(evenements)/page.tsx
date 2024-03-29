import { toast } from "@/hooks/use-toast";

import { serverSdk } from "@/lib/server-sdk";
import { MyDataTable } from "./_components/data-table";

const EventsPage = async ({ params: { organizationSlug = "all" } }) => {
  const events =
    organizationSlug === "all"
      ? (await serverSdk().GetCurrentUserEvents()).userEvents?.nodes
      : (
          await serverSdk().GetOrganizationBySlug({
            slug: organizationSlug,
          })
        ).organizationBySlug?.events?.nodes;

  return (
    <section className="container pb-8 pt-6 md:py-10">
      <h1 className="admin-h1">Tous les évènements</h1>

      {events?.length > 0 ? (
        <div className="mt-8 ">
          <MyDataTable data={events} />
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-start gap-4 ">
          <p>
            Vous n&apos;avez pas encore créé d&apos;évènements <u>ou</u> aucun ne correspondant a votre recherche.
          </p>
        </div>
      )}
    </section>
  );
};

export default EventsPage;

import { GetCurrentUserQuery } from "@tacotacIO/codegen";
import { Calendar, HeartHandshake, PartyPopper, ShieldCheck, Store } from "lucide-react";

export const entries = (user?: GetCurrentUserQuery["currentUser"]) => [
  {
    href: "/",
    label: "Nos cafés",
    icon: Store,
  },
  ...(user?.isAdmin
    ? [
        {
          href: "/admin",
          label: "Dashboard admin",
          icon: ShieldCheck,
        },
      ]
    : []),

  ...(user
    ? [
        {
          href: "/propositions",
          label: "Propositions",
          icon: PartyPopper,
        },
        {
          href: "/inscriptions",
          label: "Inscriptions",
          icon: Calendar,
        },
      ]
    : []),
];

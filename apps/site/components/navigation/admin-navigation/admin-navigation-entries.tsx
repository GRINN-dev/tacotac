import {
  Calendar,
  ClipboardEdit,
  HeartHandshake,
  Home,
  Palmtree,
  Sprout,
  User,
} from "lucide-react"

export const sections = [
  {
    name: "Dashboard",
    pages: [{ href: "/admin", icon: Home, name: "Dashboard" }],
  },
  {
    name: "Utilisateurs",
    pages: [
      { href: "/admin/adherents", icon: User, name: "Adhérents" },
      { href: "/admin/benevoles", icon: HeartHandshake, name: "Bénévoles" },
    ],
  },
  {
    name: "Café",
    pages: [
      {
        href: "/admin/infos-cafe",
        icon: ClipboardEdit,
        name: "Infos générales",
        notAll: true,
      },
      { href: "/admin/activites", icon: Sprout, name: "Activités" },
      {
        href: "/admin/ouvertures",
        icon: Calendar,
        name: "Ouvertures",
        notAll: true,
      },
      /*   {
        href: "/fermetures",
        icon: Palmtree,
        name: "Fermetures",
        notAll: true,
      }, */
    ],
  },
]

import { NavItem } from "@/types/nav";

interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {
    twitter: string;
    github: string;
    docs: string;
    dashboard: string;
    scanner: string;
    inscription: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Next.js",
  description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Organisations",
      href: "/dashboard/organisations",
    },
    {
      title: "Inscription",
      href: "/inscription",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
    dashboard: "/dashboard/organisations",
    scanner: "/scanner",
    inscription: "/inscription",
  },
};

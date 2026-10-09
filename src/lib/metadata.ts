import type { Metadata } from "next";

export const publicPageMetadata = {
  complaints: {
    title: "Complaints",
    description:
      "Explore public complaints, review reported city issues, and track complaint updates on the City Service platform.",
  },

  services: {
    title: "Services",
    description:
      "Explore available city services, find the services you need, and submit requests through the City Service platform.",
  },

  about: {
    title: "About",
    description:
      "Learn how City Service connects citizens with city services, helps report community issues, and supports better service delivery.",
  },

  contact: {
    title: "Contact",
    description:
      "Contact the City Service team for assistance with city complaints, public services, and platform-related questions.",
  },
} satisfies Record<"complaints" | "services" | "about" | "contact", Metadata>;

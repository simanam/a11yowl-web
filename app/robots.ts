import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/scan/"],
      },
    ],
    sitemap: "https://a11yowl.ai/sitemap.xml",
  };
}

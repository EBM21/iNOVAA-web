import type { MetadataRoute } from "next";
import { routes, type RoutePath } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return (Object.keys(routes) as RoutePath[])
    .filter((path) => !("noindex" in routes[path] && routes[path].noindex))
    .map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: routes[path].changeFrequency,
      priority: routes[path].priority,
    }));
}

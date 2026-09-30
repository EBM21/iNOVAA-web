import { Zap, Building2, Truck, Factory, HardHat, Stethoscope, ConciergeBell, Store, Wrench, Landmark } from "lucide-react";
import type { IndustryCard } from "@/components/IndustryCards";

// The industries iNOVAA is built for — flip cards on the homepage and Industries page, and the
// "See it in action" strip under the Portal showcase.
// `href`: the category's detailed industry page. `demo`: the interactive Portal demo on that page.
const page = (slug: string) => ({ href: `/industries/${slug}`, demo: `/industries/${slug}#portal-dashboard` });

export const industries: IndustryCard[] = [
  { icon: <Zap className="h-6 w-6" strokeWidth={1.75} />, label: "Energy & Utilities", sub: ["Solar", "Power", "Water", "Telecom"], ...page("solar") },
  { icon: <Building2 className="h-6 w-6" strokeWidth={1.75} />, label: "Facility Services", sub: ["Cleaning", "Maintenance", "Security"], ...page("facility-services") },
  { icon: <Truck className="h-6 w-6" strokeWidth={1.75} />, label: "Logistics", sub: ["Warehousing", "Delivery", "Transport"], ...page("logistics") },
  { icon: <Factory className="h-6 w-6" strokeWidth={1.75} />, label: "Manufacturing", sub: ["Factories", "Production", "Plant operations"], ...page("manufacturing") },
  { icon: <HardHat className="h-6 w-6" strokeWidth={1.75} />, label: "Construction", sub: ["Site crews", "Contractors", "Installations"], ...page("construction") },
  { icon: <Stethoscope className="h-6 w-6" strokeWidth={1.75} />, label: "Healthcare", sub: ["Hospitals", "Clinics", "Home care"], ...page("healthcare") },
  { icon: <ConciergeBell className="h-6 w-6" strokeWidth={1.75} />, label: "Hospitality", sub: ["Hotels", "Restaurants", "Catering"], ...page("hospitality") },
  { icon: <Store className="h-6 w-6" strokeWidth={1.75} />, label: "Retail", sub: ["Stores", "Merchandising", "Branch operations"], ...page("retail") },
  {
    icon: <Wrench className="h-6 w-6" strokeWidth={1.75} />,
    label: "Home & Commercial Services",
    sub: ["IT support", "Landscaping", "Locksmiths", "Handyman services", "Duct cleaning", "Pest control"],
    ...page("home-services"),
  },
  { icon: <Landmark className="h-6 w-6" strokeWidth={1.75} />, label: "Public Sector", sub: ["Municipal services", "Campuses", "Government sites"], ...page("public-sector") },
];

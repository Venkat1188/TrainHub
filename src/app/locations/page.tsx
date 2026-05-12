import PageHeader from "@/components/PageHeader";
import { Section } from "@/components/Section";

export const metadata = { title: "Locations" };

const LOCATIONS: { city: string; venue: string }[] = [
  { city: "Nairobi, Kenya", venue: "Westlands training centre" },
  { city: "Kigali, Rwanda", venue: "Kimihurura conference suite" },
  { city: "Kampala, Uganda", venue: "Nakasero business hub" },
  { city: "Addis Ababa, Ethiopia", venue: "Bole training rooms" },
  { city: "Cape Town, South Africa", venue: "V&A Waterfront venue" },
  { city: "Dubai, UAE", venue: "Business Bay training centre" },
  { city: "Doha, Qatar", venue: "West Bay conference rooms" },
  { city: "Online (Live)", venue: "Instructor-led via Zoom / Teams" },
];

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        title="Our Locations"
        subtitle="Classroom training is delivered at established business venues across Africa and the Gulf, with a fully online option for every course."
        crumbs={[{ href: "/locations", label: "Locations" }]}
      />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.city}
              className="rounded-xl border border-border bg-white p-5 hover:border-brand/40 hover:shadow-md transition-all"
            >
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <h3 className="font-semibold">{loc.city}</h3>
              <p className="text-xs text-muted mt-1">{loc.venue}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

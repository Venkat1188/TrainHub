import Placeholder from "@/components/Placeholder";
import { Section, SectionHeading } from "@/components/Section";

const LOGOS = [
  { slug: "ministry-of-health", name: "Ministry of Health" },
  { slug: "regional-development-bank", name: "Regional Development Bank" },
  { slug: "international-ngo-network", name: "International NGO Network" },
  { slug: "national-statistics-office", name: "National Statistics Office" },
  { slug: "energy-sector-group", name: "Energy Sector Group" },
  { slug: "higher-education-council", name: "Higher Education Council" },
];

export default function TrustedBy() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Partners"
        title="Trusted by Leading Organisations"
        subtitle="A small selection of the public-sector, NGO and private-sector teams we&rsquo;ve trained."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {LOGOS.map((l) => (
          <Placeholder
            key={l.slug}
            variant="logo"
            label={l.name}
            src={`/images/logos/${l.slug}.svg`}
          />
        ))}
      </div>
    </Section>
  );
}

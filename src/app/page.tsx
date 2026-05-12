import Hero from "@/components/home/Hero";
import WhyChoose from "@/components/home/WhyChoose";
import Stats from "@/components/home/Stats";
import AboutBlurb from "@/components/home/AboutBlurb";
import CoursesGrid from "@/components/home/CoursesGrid";
import Corporate from "@/components/home/Corporate";
import LeadMagnet from "@/components/home/LeadMagnet";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";
import TrustedBy from "@/components/home/TrustedBy";
import FAQ from "@/components/home/FAQ";
import { COURSES } from "@/lib/courses";

export default function Home() {
  const featured = COURSES.filter((c) => c.featured).slice(0, 6);
  const latest = COURSES.filter((c) => c.latest).slice(0, 6);

  return (
    <>
      <Hero />
      <WhyChoose />
      <Stats />
      <AboutBlurb />
      <CoursesGrid
        eyebrow="Featured"
        title="Featured Courses"
        subtitle="A selection of our most-requested programmes across data, project management, M&E and finance."
        courses={featured}
        bg="soft"
      />
      <CoursesGrid
        eyebrow="Latest"
        title="Latest Courses"
        subtitle="Recently added or refreshed programmes, including new online cohorts."
        courses={latest}
      />
      <Corporate />
      <LeadMagnet />
      <Newsletter />
      <Testimonials />
      <TrustedBy />
      <FAQ />
    </>
  );
}

import UnifiedHero from "../components/UnifiedHero";
import { getSettings } from "../../../sanity/sanity-utils";
import ServiceSection from "./components/ServiceSection";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const settings = await getSettings(locale);

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-gray-900 font-sans">
      {/* Hero */}
      <UnifiedHero
        title="Our Services"
        subtitle="Explore our services and specialized investments at KSHC."
        heroMediaType={settings?.heroMediaType}
        videoSource={settings?.videoSource}
        heroImage={settings?.heroImage}
        heroVideoFile={settings?.heroVideoFile}
        heroVideoUrl={settings?.heroVideoUrl}
        height="medium"
      />

      {/* Our Services (general overview) */}
      <ServiceSection
        heading="Our Services"
        subtext="We operate across a diverse set of sectors with innovative strategies and a commitment to excellence."
        cards={[
          {
            title: "Telecommunications",
            desc: "Advancing networks and communication technologies in Sudan.",
            image: "/telecom.jpg",
          },
          {
            title: "Real Estate",
            desc: "Developing modern spaces and managing real estate portfolios.",
            image: "/realestate.jpg",
          },
          {
            title: "Logistics",
            desc: "Integrated supply chain services including transport & storage.",
            image: "/logistics.jpg",
          },
          {
            title: "Facility Management",
            desc: "Modern and efficient systems for property and infrastructure.",
            image: "/facility.jpg",
          },
        ]}
      />

      {/* QAST Technology */}
      <ServiceSection
        heading="Technology Services"
        subtext="QAST manages the full spectrum of technology needs: infrastructure, systems, and service management."
        bgColor="#020202"
        accentColor="#AC2E5D"
        textColor="#FFFFFF"
        cards={[
          {
            title: "Technology",
            desc: "Reliable network connectivity and robust data center infrastructure.",
            image: "/qast1.jpg",
          },
          {
            title: "Telecom",
            desc: "Cutting-edge telecom services, seamless voice and data transmission.",
            image: "/qast2.jpg",
          },
          {
            title: "Managed Services",
            desc: "Professional and Managed Services designed to ease operations.",
            image: "/qast3.jpg",
          },
          {
            title: "Cloud & Hosting",
            desc: "Secure cloud and hosting solutions for enterprises.",
            image: "/qast4.jpg",
          },
        ]}
        cta={{ label: "More About QAST", href: "/subsidiaries/qast" }}
      />

      {/* TAD Facility Management */}
      <ServiceSection
        heading="Facility Management Services"
        subtext="TAD focuses on delivering a complete suite of both hard and soft offerings to companies across North and East Africa."
        bgColor="#222153"
        accentColor="#F29FC5"
        textColor="#E7EAEF"
        cards={[
          {
            title: "Hard Services",
            desc: "Complete facility management covering air conditioners, plumbing, pumps, pools, generators…",
            image: "/tad1.jpg",
          },
          {
            title: "Soft Services",
            desc: "Efficient cleaning, German-standard systems, staff training, safe supervision.",
            image: "/tad2.jpg",
          },
          {
            title: "Specialized Services",
            desc: "Fire alarm, CCTV, elevators, diesel generators, rope access, landscaping, pest control.",
            image: "/tad3.jpg",
          },
        ]}
        cta={{ label: "More About TAD", href: "/subsidiaries/tad" }}
      />

      {/* Cubes Construction */}
      <ServiceSection
        heading="Construction Services"
        subtext="CUBES specializes in infrastructure, construction, and property development."
        bgColor="#075869"
        accentColor="#A84A11"
        textColor="#FFFFFF"
        cards={[
          {
            title: "Residential Construction",
            desc: "Modern residential buildings and housing developments.",
            image: "/cubes1.jpg",
          },
          {
            title: "Commercial Projects",
            desc: "Office buildings, retail spaces, and commercial complexes.",
            image: "/cubes2.jpg",
          },
          {
            title: "Infrastructure Development",
            desc: "Roads, bridges, and essential infrastructure projects.",
            image: "/cubes3.jpg",
          },
          {
            title: "Property Development",
            desc: "Comprehensive property development and management services.",
            image: "/cubes4.jpg",
          },
        ]}
        cta={{ label: "More About CUBES", href: "/subsidiaries/cubes" }}
      />

      {/* Q Supply Chain */}
      <ServiceSection
        heading="Supply Chain Services"
        subtext="Quality provides integrated logistics, procurement, and supply chain solutions."
        bgColor="#5F2C9B"
        accentColor="#FFD700"
        textColor="#FFFFFF"
        cards={[
          {
            title: "Procurement Services",
            desc: "Strategic sourcing and procurement management solutions.",
            image: "/q1.jpg",
          },
          {
            title: "Logistics Management",
            desc: "End-to-end logistics and transportation services.",
            image: "/q2.jpg",
          },
          {
            title: "Warehouse Solutions",
            desc: "Modern warehousing and inventory management systems.",
            image: "/q3.jpg",
          },
          {
            title: "Supply Chain Optimization",
            desc: "Data-driven supply chain analysis and optimization.",
            image: "/q4.jpg",
          },
        ]}
        cta={{ label: "More About Q Supply Chain", href: "/subsidiaries/q" }}
      />
    </main>
  );
}

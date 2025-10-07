import Image from "next/image";
import { Globe, ShieldCheck, Award, TrendingUp, Users, Target, Layers } from "lucide-react";
import BackToTopButton from "../components/BackToTopButton";
import UnifiedHero from "../components/UnifiedHero";
import { getSettings } from "../../sanity/sanity-utils";

export default async function AboutPage() {
  // Fetch settings from Sanity or any other source
  const settings = await getSettings();

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-gray-900 font-sans">
      {/* Hero Section */}
      <UnifiedHero
        title="Rooted in Vision, Driven by Legacy"
        subtitle="Explore our journey, leadership, and vision for building a better future for Sudan and the region."
        heroMediaType={settings.heroMediaType}
        videoSource={settings.videoSource}
        heroImage={settings.heroImage}
        heroVideoFile={settings.heroVideoFile}
        heroVideoUrl={settings.heroVideoUrl}
        height="medium"
      />
      {/* Company Journey */}
      <section className="bg-[#e7ebf0] px-6 sm:px-20 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-primary">Our Story</h2>
            <span className="block w-20 h-1 bg-[#B49C5B] rounded" />
            <p className="text-gray-700 leading-relaxed">
              Established in [Year] under the Sudanese Companies Law, the Kuwaiti Sudanese Holding Company (KSHC) emerged as a foreign-capital investment leader committed to economic growth, innovation, and Sudan’s prosperity. Our ventures span across strategic sectors, driven by a unified goal of building a sustainable legacy for future generations.
            </p>
          </div>
          <Image
            src="/undraw_profile.svg"
            alt="KSHC Vision"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Fields of Operation */}
      <section className="bg-white px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary">Fields of Operation</h2>
          <span className="block w-24 h-1 bg-[#B49C5B] rounded mx-auto my-6" />
        </div>

        {/* General Investment */}
        <div className="grid sm:grid-cols-2 gap-10 text-left mt-16 max-w-5xl mx-auto">
          <div className="flex items-start gap-5">
            <div className="bg-[#f3e8d1] p-4 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-[#B49C5B]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-2">General Investment</h3>
              <p className="text-gray-700">
                We focus on projects and companies that enhance productivity and create tangible positive impacts on society. Our aim is to improve quality of life through sustainable investments.
              </p>
            </div>
          </div>
        </div>

        {/* Specialized Investments */}
        <section className="bg-white px-6 sm:px-20 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4">
                Specialized Investments
              </h3>
              <span className="block w-24 h-1 bg-[#B49C5B] rounded mx-auto mb-6" />
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                We operate across a diverse set of sectors with innovative strategies and a commitment to excellence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Telecommunications",
                  image: "/telecom.jpg",
                  desc: "Advancing networks and communication technologies in Sudan.",
                },
                {
                  title: "Real Estate",
                  image: "/realestate.jpg",
                  desc: "Developing modern spaces and managing real estate portfolios.",
                },
                {
                  title: "Logistics",
                  image: "/logistics.jpg",
                  desc: "Integrated supply chain services including transport & storage.",
                },
                {
                  title: "Facility Management",
                  image: "/facility.jpg",
                  desc: "Modern and efficient systems for property and infrastructure.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative h-72 rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  {/* الخلفية مع بلور وتظليل */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-700 blur-0 group-hover:blur-0 brightness-75 group-hover:brightness-100 scale-100 group-hover:scale-110"
                  />

                  {/* المحتوى فوق الصورة */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 bg-black/30 group-hover:bg-black/10  rounded-xl">
                    <h3 className="text-xl font-bold text-[#B49C5B] underline underline-offset-4 decoration-[#B49C5B] drop-shadow-md mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-100 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

{/* Objectives */}
      <section id="objectives" className="py-16 px-6 sm:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-primary mb-4">General Objectives</h2>
            <span className="block mx-auto w-24 h-1 bg-[#B49C5B] rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Kuwait–Sudan Ties",
                description: "Introducing a unique model of foreign investment in Sudan.",
                icon: <Globe className="text-primary w-7 h-7 mx-auto" />,
              },
              {
                title: "Post-conflict Reconstruction",
                description:
                  "Establishing profitable institutions that contribute to development in areas like technology, services, and reconstruction.",
                icon: <Award className="text-primary w-7 h-7 mx-auto" />,
              },
              {
                title: "Smart Investments",
                description: "Expanding and supporting effective initiatives through smart partnerships.",
                icon: <TrendingUp className="text-primary w-7 h-7 mx-auto" />,
              },
              {
                title: "Talent Development",
                description: "Nurturing exceptional talent and supporting innovative ideas and projects.",
                icon: <Users className="text-primary w-7 h-7 mx-auto" />,
              },
              {
                title: "Social Responsibility",
                description: "Focusing on social responsibility and fostering intergenerational connections.",
                icon: <Target className="text-primary w-7 h-7 mx-auto" />,
              },
              {
                title: "Smart Partnerships",
                description: "Managing corporate assets efficiently.",
                icon: <Layers className="text-primary w-7 h-7 mx-auto" />,
              },
            ].map((obj, idx) => (
              <div key={idx} className="text-center space-y-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="bg-primary/10 p-4 rounded-full mb-4 flex items-center justify-center w-fit mx-auto">
                  {obj.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{obj.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{obj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      </section>

      {/* Board of Directors */}
      <section className="bg-white px-6 sm:px-20 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary mb-4">Board of Directors</h2>
          <span className="block w-24 h-1 bg-[#B49C5B] rounded mx-auto mb-10" />
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              { name: "Hisham Mustafa Allam", title: "Chairman", nationality: "Sudanese" },
              { name: "Shaji", title: "Board Member", nationality: "Sudanese" },
              { name: "Osama Michel Matta", title: "Board Member", nationality: "Lebanese" },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6 border border-[#d8c99b]">
                <h3 className="font-bold text-[#0a1f44]">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.title}</p>
                <p className="text-xs text-gray-500">{member.nationality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Management Structure */}
      <section className="bg-white px-6 sm:px-20 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary mb-4">Management Structure</h2>
          <span className="block w-24 h-1 bg-[#B49C5B] rounded mx-auto mb-10" />

          {/* Top Manager */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl shadow p-6 border border-[#d8c99b] w-64">
              <h3 className="font-bold text-[#0a1f44]">Name</h3>
              <p className="text-sm text-gray-600">Position</p>
              <p className="text-xs text-gray-500">Sudanese</p>
            </div>
          </div>

          {/* Sub Managers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Name", title: "Position", dept: "Nationality/Department" },
              { name: "Name", title: "Position", dept: "Nationality/Department" },
              { name: "Name", title: "Position", dept: "Nationality/Department" },
              { name: "Name", title: "Position", dept: "Nationality/Department" },
            ].map((m, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-6 border border-[#d8c99b]"
              >
                <h3 className="font-bold text-[#0a1f44]">{m.name}</h3>
                <p className="text-sm text-gray-600">{m.title}</p>
                <p className="text-xs text-gray-500">{m.dept}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Future Vision */}
      <section className="bg-white px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-primary mb-4">Looking Ahead</h2>
            <p className="text-gray-700 leading-relaxed">
              Over the next five years, KSHC is on a mission to become a regional investment powerhouse. By uniting our companies under one umbrella and driving strategic innovation, we aim to create a diversified investment ecosystem that builds a better future for Sudan and beyond.
            </p>
          </div>
          <Image
            src="/road.svg"
            alt="Future Vision"
            width={500}
            height={400}
            className="rounded-xl shadow"
          />
        </div>
      </section>

      {/* CEO Message */}
      <section className="bg-[#f7f9fc] px-6 sm:px-20 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary mb-6">General Manager Message</h2>
          <span className="block w-20 h-1 bg-[#B49C5B] rounded mx-auto mb-6" />
          <p className="text-lg text-gray-700 leading-loose text-justify">
            The Kuwaiti Sudanese Holding Company takes pride in being a Kuwaiti company with foreign capital, dedicated to economic development in Sudan.
            Our mission is grounded in integrity, progress, and long-term success.
            As we continue this journey, we remain committed to our principles, our people, and our purpose — to build a prosperous future for our communities.
          </p>
        </div>
      </section>
      <BackToTopButton />
    </main>
  );
}

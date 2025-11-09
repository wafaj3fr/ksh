import Image from "next/image";
import {
  Globe,
  ShieldCheck,
  Award,
  TrendingUp,
  Users,
  Target,
  Layers,
} from "lucide-react";
import BackToTopButton from "../components/BackToTopButton";
import UnifiedHero from "../components/UnifiedHero";
import { getSettings } from "../../../sanity/sanity-utils";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const settings = await getSettings(locale);
  const t = await getTranslations("about");

  const boardMembers = [
    {
      name: t("board.member1.name"),
      title: t("board.member1.title"),
      nationality: t("board.member1.nationality"),
    },
    {
      name: t("board.member2.name"),
      title: t("board.member2.title"),
      nationality: t("board.member2.nationality"),
    },
    {
      name: t("board.member3.name"),
      title: t("board.member3.title"),
      nationality: t("board.member3.nationality"),
    },
  ];

  const subManagers = [
    {
      name: t("management.subManager1.name"),
      title: t("management.subManager1.title"),
      dept: t("management.subManager1.dept"),
    },
    {
      name: t("management.subManager2.name"),
      title: t("management.subManager2.title"),
      dept: t("management.subManager2.dept"),
    },
    {
      name: t("management.subManager3.name"),
      title: t("management.subManager3.title"),
      dept: t("management.subManager3.dept"),
    },
    {
      name: t("management.subManager4.name"),
      title: t("management.subManager4.title"),
      dept: t("management.subManager4.dept"),
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-gray-900 font-sans">
      {/* Hero Section */}
      <UnifiedHero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
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
            <h2 className="text-3xl font-extrabold text-primary">
              {t("companyStory.title")}
            </h2>
            <span className="block w-20 h-1 bg-[#B49C5B] rounded" />
            <p className="text-gray-700 leading-relaxed">
              {t("companyStory.desc")}
            </p>
          </div>
          <Image
            src="/undraw_profile.svg"
            alt={t("companyStory.alt")}
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Fields of Operation */}
      <section className="bg-white px-6 sm:px-20 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary">
            {t("fields.title")}
          </h2>
          <span className="block w-24 h-1 bg-[#B49C5B] rounded mx-auto my-6" />
        </div>

        {/* General Investment */}
        <div className="grid sm:grid-cols-2 gap-10 text-start mt-16 max-w-5xl mx-auto">
          <div className="flex items-start gap-5">
            <div className="bg-[#f3e8d1] p-4 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-[#B49C5B]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-2">
                {t("fields.generalInvestment.title")}
              </h3>
              <p className="text-gray-700">
                {t("fields.generalInvestment.desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Specialized Investments */}
        <section className="bg-white px-6 sm:px-20 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4">
                {t("fields.specialized.title")}
              </h3>
              <span className="block w-24 h-1 bg-[#B49C5B] rounded mx-auto mb-6" />
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                {t("fields.specialized.desc")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: t("fields.specialized.items.telecom.title"),
                  image: "/telecom.jpg",
                  desc: t("fields.specialized.items.telecom.desc"),
                },
                {
                  title: t("fields.specialized.items.realEstate.title"),
                  image: "/realestate.jpg",
                  desc: t("fields.specialized.items.realEstate.desc"),
                },
                {
                  title: t("fields.specialized.items.logistics.title"),
                  image: "/logistics.jpg",
                  desc: t("fields.specialized.items.logistics.desc"),
                },
                {
                  title: t("fields.specialized.items.facility.title"),
                  image: "/facility.jpg",
                  desc: t("fields.specialized.items.facility.desc"),
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative h-72 rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-700 blur-0 group-hover:blur-0 brightness-75 group-hover:brightness-100 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 bg-black/30 group-hover:bg-black/10 rounded-xl">
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
              <h2 className="text-3xl font-extrabold text-primary mb-4">
                {t("objectives.title")}
              </h2>
              <span className="block mx-auto w-24 h-1 bg-[#B49C5B] rounded" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: t("objectives.items.ties.title"),
                  description: t("objectives.items.ties.desc"),
                  icon: <Globe className="text-primary w-7 h-7 mx-auto" />,
                },
                {
                  title: t("objectives.items.reconstruction.title"),
                  description: t("objectives.items.reconstruction.desc"),
                  icon: <Award className="text-primary w-7 h-7 mx-auto" />,
                },
                {
                  title: t("objectives.items.smartInvestments.title"),
                  description: t("objectives.items.smartInvestments.desc"),
                  icon: <TrendingUp className="text-primary w-7 h-7 mx-auto" />,
                },
                {
                  title: t("objectives.items.talent.title"),
                  description: t("objectives.items.talent.desc"),
                  icon: <Users className="text-primary w-7 h-7 mx-auto" />,
                },
                {
                  title: t("objectives.items.socialResponsibility.title"),
                  description: t("objectives.items.socialResponsibility.desc"),
                  icon: <Target className="text-primary w-7 h-7 mx-auto" />,
                },
                {
                  title: t("objectives.items.smartPartnerships.title"),
                  description: t("objectives.items.smartPartnerships.desc"),
                  icon: <Layers className="text-primary w-7 h-7 mx-auto" />,
                },
              ].map((obj, idx) => (
                <div
                  key={idx}
                  className="text-center space-y-4 p-6 bg-white rounded-xl shadow-sm"
                >
                  <div className="bg-primary/10 p-4 rounded-full mb-4 flex items-center justify-center w-fit mx-auto">
                    {obj.icon}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {obj.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* Board of Directors */}
      <section className="bg-white px-6 sm:px-20 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary mb-4">
            {t("board.title")}
          </h2>
          <span className="block w-24 h-1 bg-[#B49C5B] rounded mx-auto mb-10" />
          <div className="grid sm:grid-cols-3 gap-10">
            {boardMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-6 border border-[#d8c99b]"
              >
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
          <h2 className="text-3xl font-extrabold text-primary mb-4">
            {t("management.title")}
          </h2>
          <span className="block w-24 h-1 bg-[#B49C5B] rounded mx-auto mb-10" />

          {/* Top Manager */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl shadow p-6 border border-[#d8c99b] w-64">
              <h3 className="font-bold text-[#0a1f44]">
                {t("management.topManager.name")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("management.topManager.position")}
              </p>
              <p className="text-xs text-gray-500">
                {t("management.topManager.nationality")}
              </p>
            </div>
          </div>

          {/* Sub Managers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subManagers.map((m: any, idx: number) => (
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
            <h2 className="text-3xl font-extrabold text-primary mb-4">
              {t("future.title")}
            </h2>
            <p className="text-gray-700 leading-relaxed">{t("future.desc")}</p>
          </div>
          <Image
            src="/road.svg"
            alt={t("future.alt")}
            width={500}
            height={400}
            className="rounded-xl shadow"
          />
        </div>
      </section>

      {/* CEO Message */}
      <section className="bg-[#f7f9fc] px-6 sm:px-20 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary mb-6">
            {t("ceo.title")}
          </h2>
          <span className="block w-20 h-1 bg-[#B49C5B] rounded mx-auto mb-6" />
          <p className="text-lg text-gray-700 leading-loose text-justify">
            {t("ceo.message")}
          </p>
        </div>
      </section>

      <BackToTopButton />
    </main>
  );
}

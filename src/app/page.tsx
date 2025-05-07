import { getProjects } from "../sanity/sanity-utils";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

export const revalidate = 3600;

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="space-y-12">
      {projects?.map((project) => (
        <section key={project._id} className="border-b pb-12 last:border-b-0">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                {project.logo?.asset?.url && (
                  <div className="relative w-40 h-40 mb-6">
                    <Image
                      src={project.logo.asset.url}
                      alt={project.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                <p className="text-xl text-gray-600 mb-6">{project.tagline}</p>
                <p className="text-lg mb-8">{project.description}</p>
                
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Discover More
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition">
                    Contact Us
                  </button>
                </div>
              </div>

              <div className="md:w-1/2">
                {project.heroImage?.asset?.url && (
                  <div className="relative aspect-video">
                    <Image
                      src={project.heroImage.asset.url}
                      alt={project.heroImage.alt || project.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {project.aboutSection && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">{project.aboutSection.heading}</h2>
                <div className="prose max-w-3xl">
                  <PortableText value={project.aboutSection.content} />
                </div>
              </div>
            )}

            {project.subsidiaries?.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-6">Our Subsidiaries</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.subsidiaries.map((subsidiary) => (
                    <div key={subsidiary._id} className="border rounded-lg p-4 flex items-center gap-3">
                      {subsidiary.logo?.asset?.url && (
                        <div className="relative w-12 h-12">
                          <Image
                            src={subsidiary.logo.asset.url}
                            alt={subsidiary.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium">{subsidiary.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
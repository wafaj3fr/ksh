import { getProjects } from "../sanity/sanity-utils";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanity/lib/image";

export default async function Home() {

    const projects = await getProjects();
    
    return(

        <div>
        {projects?.map((project) => (
          <div key={project._id}>
            <h2>{project.name}</h2>
            <PortableText value={project.content} />
            {project.image && (
              <img 
                src={urlFor(project.image).width(400).url()} 
                alt={project.name} 
              />
            )}
          </div>
        ))}
      </div>
    );
}
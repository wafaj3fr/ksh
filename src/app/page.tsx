import { getProjects } from "../sanity/sanity-utils";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

export default async function Home() {

    const projects = await getProjects();
    
    return(

         <div>
        {projects.map((project) => (
            <div key={project._id}>
                <h2>{project.name}</h2>
                <PortableText value={project.content} />
                <Image
                    src={project.image}
                    alt={project.name}
                    width={500}
                    height={500}
                />
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                    View Project
                </a>
            </div>
        ))}
    </div>
    )
}
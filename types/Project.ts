import { PortableTextBlock } from "next-sanity";

export type Project = {
    _id: string;
    
    name: string;
    
    _createdAt: string;
    
    slug: string;
    
    image: string;
    
    url: string;

    content: PortableTextBlock[];

};
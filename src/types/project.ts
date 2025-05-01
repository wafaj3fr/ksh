import { PortableTextBlock } from "sanity";

export type Project = {
    _id: string;
    name: string;
    createdAt: string;
    slug: { current: string };
    technologies?: Array<{ name: string }>;
    content: PortableTextBlock[];
    image: string
    url: string;
    about: string;
    description: string;
    aboutSection: {
        heading: string;
        content: PortableTextBlock[];
    };
    tagline: string;
    title: string;
    subsidiaries: Array<{
        name: string;
        slug: { current: string };
    }>;
}
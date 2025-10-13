import { PortableTextBlock } from "sanity";
export type Project = {
    _id: string;
    name: string;
    createdAt: string;
    slug: {
        current: string;
    };
    technologies?: Array<{
        name: string;
    }>;
    content: PortableTextBlock[];
    image: string;
    url: string;
    about: string;
    description: string;
    aboutSection: {
        heading: string;
        content: PortableTextBlock[];
    };
    ceoMessage?: CeoMessage;
    visionSection?: VisionSection;
    whyUs?: WhyUs;
    tagline: string;
    title: string;
    subsidiaries: Array<{
        name: string;
        slug: {
            current: string;
        };
    }>;
};
export type CeoMessage = {
    _id: string;
    heading: string;
    message: PortableTextBlock[];
};
export type VisionSection = {
    _id: string;
    title: string;
    content: any;
};
export type WhyUs = {
    _id: string;
    title: string;
    points: string[];
};
//# sourceMappingURL=project.d.ts.map
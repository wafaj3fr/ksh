export type Job = {
    _id: string;
    id?: string;
    title: string;
    category?: string;
    department?: string;
    location?: string;
    type?: string;
    deadline?: string;
    slug?: string | {
        current: string;
    };
    intro?: string;
    description?: unknown;
    requirements?: unknown;
};
//# sourceMappingURL=job.d.ts.map
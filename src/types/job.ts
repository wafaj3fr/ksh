export type Job = {
  _id: string;
  id?: string; // أحيانًا نعمل alias في GROQ: 'id': _id
  title: string;
  category?: string;
  department?: string;
  location?: string;
  type?: string;
  deadline?: string; // ISO
  slug?: string | { current: string };
  intro?: string;
  description?: unknown;
  requirements?: unknown;
};

import { type SchemaTypeDefinition } from 'sanity';
import setting from '../schemas/setting';
import subsidiary from '../schemas/subsidiary';
import news from '../schemas/news';
import careersPage from '../schemas/careersPage';
import job from '../schemas/job';
import jobApplication from '../schemas/jobApplication';
import ceoMessage from '../schemas/ceoMessage';
import contactForm from '../schemas/contactForm';

const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    setting,
    subsidiary,
    news,
    ceoMessage,
    careersPage,
    job,
    jobApplication,
    contactForm,
  ],
};

export default schema;

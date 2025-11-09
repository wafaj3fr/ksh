/**
 * This configuration is used for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { documentInternationalization } from '@sanity/document-internationalization'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { structure } from './src/sanity/structure'
import schema from './src/sanity/schemaTypes'   // ✅ استخدم {} عشان انت مصدّر schema كـ const

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'ar', title: 'العربية' },
      ],
      schemaTypes: ['job', 'news', 'careersPage', 'subsidiary', 'ceoMessage', 'settings'],
      defaultLanguages: ['en'],
      languageField: 'language',
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema,  
})

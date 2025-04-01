import { buildConfig, type SanitizedConfig, type Config } from 'payload';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { NewsAndAnnouncements } from './collections/NewsAndAnnouncements';

import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// WARNING: i get the following error when trying to access a document's edit screen
// through the admin ui.
//
// [21:26:16] ERROR: column 9043944f_3e95_42f4_a29c_ec5a74731d83.payload_locked_documents_id does not exist
//     err: {
//       "type": "DatabaseError",
//       "message": "column 9043944f_3e95_42f4_a29c_ec5a74731d83.payload_locked_documents_id does not exist",
//       "stack":
//           error: column 9043944f_3e95_42f4_a29c_ec5a74731d83.payload_locked_documents_id does not exist
//               at eval (webpack-internal:///(rsc)/../../node_modules/.pnpm/pg-pool@3.8.0_pg@8.11.3/node_modules/pg-pool/index.js:45:11)
//               at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
//               at async eval (webpack-internal:///(rsc)/../../node_modules/.pnpm/drizzle-orm@0.36.1_@libsql+client@0.14.0_@types+pg@8.10.2_@types+react@19.0.12_pg@8.11.3_react@19.0.0/node_modules/drizzle-orm/node-postgres/session.js:96:22)
//               at async find (webpack-internal:///(rsc)/../../node_modules/.pnpm/@payloadcms+drizzle@3.31.0_@libsql+client@0.14.0_@types+pg@8.10.2_@types+react@19.0.12_payloa_gnqfmxy726ywdcl2qfmt3uteni/node_modules/@payloadcms/drizzle/dist/find/findMany.js:73:34)
//               at async findOperation (file:///Users/giorgos/Code/freelance/apps/dojopatras.gr/node_modules/.pnpm/payload@3.31.0_graphql@16.10.0_typescript@5.7.3/node_modules/payload/dist/collections/operations/find.js:111:22)
//               at async getIsLocked (webpack-internal:///(rsc)/../../node_modules/.pnpm/@payloadcms+next@3.31.0_@types+react@19.0.12_graphql@16.10.0_monaco-editor@0.52.2_next@15.2.3_rvplvfxx2zlsebsxjvfczf3q6y/node_modules/@payloadcms/next/dist/views/Document/getIsLocked.js:46:7)
//               at async Promise.all (index 2)
//               at async renderDocument (webpack-internal:///(rsc)/../../node_modules/.pnpm/@payloadcms+next@3.31.0_@types+react@19.0.12_graphql@16.10.0_monaco-editor@0.52.2_next@15.2.3_rvplvfxx2zlsebsxjvfczf3q6y/node_modules/@payloadcms/next/dist/views/Document/index.js:125:8)
//               at async Document (webpack-internal:///(rsc)/../../node_modules/.pnpm/@payloadcms+next@3.31.0_@types+react@19.0.12_graphql@16.10.0_monaco-editor@0.52.2_next@15.2.3_rvplvfxx2zlsebsxjvfczf3q6y/node_modules/@payloadcms/next/dist/views/Document/index.js:359:9)
//       "length": 163,
//       "name": "error",
//       "severity": "ERROR",
//       "code": "42703",
//       "position": "867",
//       "file": "parse_relation.c",
//       "line": "3722",
//       "routine": "errorMissingColumn"
//     }
//
//     disabling document locking seems to fix the issue
const collections = [Users, Media, NewsAndAnnouncements].map((collectionConfig) => {
  return {
    ...collectionConfig,
    lockDocuments: false as false // lmao
  };
});

export const config: Config = {
  serverURL: process.env.PAYLOAD_PUBLIC_BACKEND_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname
    }
  },
  collections: collections,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: [dirname, 'payload-types.ts'].join('/')
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || ''
    },
    // prodMigrations: migrations, // this will cause turbo build to stall
    push: false
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()]
  }),
  plugins: [
    // storage-adapter-placeholder
  ],
  graphQL: { disablePlaygroundInProduction: true, disable: true }
};

/*
 * A default SanitizedConfig export is needed when running payload commands (e.g. payload migrate:status)
 * , but when another application needs to build the config we get an error because payload tries to run
 * SQL code that redifines table relations etc. . So, during runtime the default export is undefined, but
 * during scripts it's a SanitizedConfig.
 *
 * NOTE: maybe this could be avoided by somehow setting automatic run of migrations to false
 */
let sanitizedConfig: SanitizedConfig | undefined;

try {
  sanitizedConfig = await buildConfig(config);
} catch (e) {
  console.error(e);
  process.exit(1);
}

export default sanitizedConfig;

import { buildConfig, type SanitizedConfig, type Config } from 'payload';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { NewsAndAnnouncements } from './collections/NewsAndAnnouncements';
import { Coaches } from './collections/Coaches';

import { Website } from './globals/Website';

import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const collections = [Users, Media, NewsAndAnnouncements, Coaches].map((collectionConfig) => {
  return {
    ...collectionConfig,
    lockDocuments: false as false // lmao
  };
});

const globals = [Website].map((globalConfig) => ({
  ...globalConfig,
  lockDocuments: false as false
}));

export const config: Config = {
  serverURL: process.env.PAYLOAD_PUBLIC_BACKEND_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname
    }
  },
  collections: collections,
  globals: globals,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: [dirname, 'payload-types.ts'].join('/')
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || ''
    }
    // prodMigrations: migrations, // this will cause turbo build to stall
    // push: false
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
  console.error(JSON.stringify(e));
  process.exit(1);
}

export default sanitizedConfig;

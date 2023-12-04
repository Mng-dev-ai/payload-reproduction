import { buildConfig } from 'payload/config';
import path from 'path';
import Posts from './collections/Posts';
import Users from './collections/Users';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
}),
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),

  },
  collections: [
    Posts,
    Users,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});

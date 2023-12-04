import { CollectionConfig } from 'payload/types';
import { FootnoteFeature } from '../plugins/footnotes'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'richText', 
      type: 'richText',
      editor: lexicalEditor({
        features: [FootnoteFeature({})],
      }),
    },
  ],
}

export default Posts;
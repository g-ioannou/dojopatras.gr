import type { CollectionConfig } from 'payload';
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

export const Coaches: CollectionConfig = {
  slug: 'coaches',
  labels: { plural: 'Coaches', singular: 'Coach' },
  access: {
    admin: () => true
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'surname', type: 'text' },
    {
      name: 'picture',
      label: 'Profile Picture',
      type: 'upload',
      relationTo: 'media',
      admin: {
        disableListColumn: true
      }
    },
    {
      name: 'bio',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()]
      })
    }
  ]
};

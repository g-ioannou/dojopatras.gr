import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  lockDocuments: false,
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      defaultValue: 'image'
    }
  ],
  upload: {
    staticDir: process.env.MEDIA_LOCATION
  }
};

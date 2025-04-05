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
    },
    {
      name: 'masonry',
      admin: { description: 'Show this image in background masonry. Default is false.' },
      type: 'checkbox',
      required: false,
      defaultValue: false
    }
  ],
  upload: {
    staticDir: process.env.MEDIA_LOCATION
  }
};

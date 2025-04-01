import type { CollectionConfig } from 'payload';
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

export const NewsAndAnnouncements: CollectionConfig = {
  slug: 'news-and-announcements',
  labels: { plural: 'News and Announcements', singular: 'Article or Announcement' },
  access: {
    admin: () => true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true
    },
    {
      name: 'draft',
      type: 'checkbox',
      admin: {
        description: 'Drafts will not be displayed on the website.'
      }
    },
    {
      name: 'pinned',
      type: 'checkbox',
      admin: {
        description:
          'Pinned articles are always shown first. If an article is "Draft", pinning it will have no effect.'
      }
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      hasMany: false
    },
    {
      name: 'contents',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()]
      })
    },
    {
      name: 'media',
      label: 'Photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        disableListColumn: true,
        description: 'Extra media to include with this article'
      }
    }
  ]
};

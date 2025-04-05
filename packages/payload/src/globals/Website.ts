import { GlobalConfig } from 'payload';

export const Website: GlobalConfig = {
  slug: 'website-info',
  fields: [
    {
      name: 'hero',
      type: 'richText',
      required: false
    },
    {
      name: 'email',
      type: 'email',
      required: false
    },
    {
      name: 'address',
      type: 'text',
      required: false
    },
    {
      name: 'contact-numbers',
      type: 'array',
      fields: [
        {
          name: 'phone-number',
          type: 'text',
          required: false
        }
      ]
    },
    { name: 'facebook', type: 'text', required: false },
    { name: 'instagram', type: 'text', required: false }
  ]
};

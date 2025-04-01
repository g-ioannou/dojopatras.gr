import { buildConfig } from 'payload'

import sharp from 'sharp'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { config } from '@repo/payload/config'

config.sharp = sharp
config.editor = lexicalEditor({
  features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
})

export default buildConfig(config)

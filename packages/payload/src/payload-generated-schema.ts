/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:db-schema` to regenerate this file.
 */

import {
  pgTable,
  index,
  uniqueIndex,
  foreignKey,
  serial,
  timestamp,
  varchar,
  numeric,
  boolean,
  integer,
  jsonb
} from '@payloadcms/db-postgres/drizzle/pg-core';
import { sql, relations } from '@payloadcms/db-postgres/drizzle';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    email: varchar('email').notNull(),
    resetPasswordToken: varchar('reset_password_token'),
    resetPasswordExpiration: timestamp('reset_password_expiration', {
      mode: 'string',
      withTimezone: true,
      precision: 3
    }),
    salt: varchar('salt'),
    hash: varchar('hash'),
    loginAttempts: numeric('login_attempts').default('0'),
    lockUntil: timestamp('lock_until', { mode: 'string', withTimezone: true, precision: 3 })
  },
  (columns) => ({
    users_updated_at_idx: index('users_updated_at_idx').on(columns.updatedAt),
    users_created_at_idx: index('users_created_at_idx').on(columns.createdAt),
    users_email_idx: uniqueIndex('users_email_idx').on(columns.email)
  })
);

export const media = pgTable(
  'media',
  {
    id: serial('id').primaryKey(),
    alt: varchar('alt').default('image'),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    url: varchar('url'),
    thumbnailURL: varchar('thumbnail_u_r_l'),
    filename: varchar('filename'),
    mimeType: varchar('mime_type'),
    filesize: numeric('filesize'),
    width: numeric('width'),
    height: numeric('height'),
    focalX: numeric('focal_x'),
    focalY: numeric('focal_y')
  },
  (columns) => ({
    media_updated_at_idx: index('media_updated_at_idx').on(columns.updatedAt),
    media_created_at_idx: index('media_created_at_idx').on(columns.createdAt),
    media_filename_idx: uniqueIndex('media_filename_idx').on(columns.filename)
  })
);

export const news_and_announcements = pgTable(
  'news_and_announcements',
  {
    id: serial('id').primaryKey(),
    title: varchar('title').notNull(),
    draft: boolean('draft'),
    pinned: boolean('pinned'),
    thumbnail: integer('thumbnail_id').references(() => media.id, {
      onDelete: 'set null'
    }),
    contents: jsonb('contents'),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull()
  },
  (columns) => ({
    news_and_announcements_title_idx: uniqueIndex('news_and_announcements_title_idx').on(
      columns.title
    ),
    news_and_announcements_thumbnail_idx: index('news_and_announcements_thumbnail_idx').on(
      columns.thumbnail
    ),
    news_and_announcements_updated_at_idx: index('news_and_announcements_updated_at_idx').on(
      columns.updatedAt
    ),
    news_and_announcements_created_at_idx: index('news_and_announcements_created_at_idx').on(
      columns.createdAt
    )
  })
);

export const news_and_announcements_rels = pgTable(
  'news_and_announcements_rels',
  {
    id: serial('id').primaryKey(),
    order: integer('order'),
    parent: integer('parent_id').notNull(),
    path: varchar('path').notNull(),
    mediaID: integer('media_id')
  },
  (columns) => ({
    order: index('news_and_announcements_rels_order_idx').on(columns.order),
    parentIdx: index('news_and_announcements_rels_parent_idx').on(columns.parent),
    pathIdx: index('news_and_announcements_rels_path_idx').on(columns.path),
    news_and_announcements_rels_media_id_idx: index('news_and_announcements_rels_media_id_idx').on(
      columns.mediaID
    ),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [news_and_announcements.id],
      name: 'news_and_announcements_rels_parent_fk'
    }).onDelete('cascade'),
    mediaIdFk: foreignKey({
      columns: [columns['mediaID']],
      foreignColumns: [media.id],
      name: 'news_and_announcements_rels_media_fk'
    }).onDelete('cascade')
  })
);

export const payload_locked_documents = pgTable(
  'payload_locked_documents',
  {
    id: serial('id').primaryKey(),
    globalSlug: varchar('global_slug'),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull()
  },
  (columns) => ({
    payload_locked_documents_global_slug_idx: index('payload_locked_documents_global_slug_idx').on(
      columns.globalSlug
    ),
    payload_locked_documents_updated_at_idx: index('payload_locked_documents_updated_at_idx').on(
      columns.updatedAt
    ),
    payload_locked_documents_created_at_idx: index('payload_locked_documents_created_at_idx').on(
      columns.createdAt
    )
  })
);

export const payload_locked_documents_rels = pgTable(
  'payload_locked_documents_rels',
  {
    id: serial('id').primaryKey(),
    order: integer('order'),
    parent: integer('parent_id').notNull(),
    path: varchar('path').notNull(),
    usersID: integer('users_id'),
    mediaID: integer('media_id'),
    'news-and-announcementsID': integer('news_and_announcements_id')
  },
  (columns) => ({
    order: index('payload_locked_documents_rels_order_idx').on(columns.order),
    parentIdx: index('payload_locked_documents_rels_parent_idx').on(columns.parent),
    pathIdx: index('payload_locked_documents_rels_path_idx').on(columns.path),
    payload_locked_documents_rels_users_id_idx: index(
      'payload_locked_documents_rels_users_id_idx'
    ).on(columns.usersID),
    payload_locked_documents_rels_media_id_idx: index(
      'payload_locked_documents_rels_media_id_idx'
    ).on(columns.mediaID),
    payload_locked_documents_rels_news_and_announcements_id_idx: index(
      'payload_locked_documents_rels_news_and_announcements_id_idx'
    ).on(columns['news-and-announcementsID']),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [payload_locked_documents.id],
      name: 'payload_locked_documents_rels_parent_fk'
    }).onDelete('cascade'),
    usersIdFk: foreignKey({
      columns: [columns['usersID']],
      foreignColumns: [users.id],
      name: 'payload_locked_documents_rels_users_fk'
    }).onDelete('cascade'),
    mediaIdFk: foreignKey({
      columns: [columns['mediaID']],
      foreignColumns: [media.id],
      name: 'payload_locked_documents_rels_media_fk'
    }).onDelete('cascade'),
    'news-and-announcementsIdFk': foreignKey({
      columns: [columns['news-and-announcementsID']],
      foreignColumns: [news_and_announcements.id],
      name: 'payload_locked_documents_rels_news_and_announcements_fk'
    }).onDelete('cascade')
  })
);

export const payload_preferences = pgTable(
  'payload_preferences',
  {
    id: serial('id').primaryKey(),
    key: varchar('key'),
    value: jsonb('value'),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull()
  },
  (columns) => ({
    payload_preferences_key_idx: index('payload_preferences_key_idx').on(columns.key),
    payload_preferences_updated_at_idx: index('payload_preferences_updated_at_idx').on(
      columns.updatedAt
    ),
    payload_preferences_created_at_idx: index('payload_preferences_created_at_idx').on(
      columns.createdAt
    )
  })
);

export const payload_preferences_rels = pgTable(
  'payload_preferences_rels',
  {
    id: serial('id').primaryKey(),
    order: integer('order'),
    parent: integer('parent_id').notNull(),
    path: varchar('path').notNull(),
    usersID: integer('users_id')
  },
  (columns) => ({
    order: index('payload_preferences_rels_order_idx').on(columns.order),
    parentIdx: index('payload_preferences_rels_parent_idx').on(columns.parent),
    pathIdx: index('payload_preferences_rels_path_idx').on(columns.path),
    payload_preferences_rels_users_id_idx: index('payload_preferences_rels_users_id_idx').on(
      columns.usersID
    ),
    parentFk: foreignKey({
      columns: [columns['parent']],
      foreignColumns: [payload_preferences.id],
      name: 'payload_preferences_rels_parent_fk'
    }).onDelete('cascade'),
    usersIdFk: foreignKey({
      columns: [columns['usersID']],
      foreignColumns: [users.id],
      name: 'payload_preferences_rels_users_fk'
    }).onDelete('cascade')
  })
);

export const payload_migrations = pgTable(
  'payload_migrations',
  {
    id: serial('id').primaryKey(),
    name: varchar('name'),
    batch: numeric('batch'),
    updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string', withTimezone: true, precision: 3 })
      .defaultNow()
      .notNull()
  },
  (columns) => ({
    payload_migrations_updated_at_idx: index('payload_migrations_updated_at_idx').on(
      columns.updatedAt
    ),
    payload_migrations_created_at_idx: index('payload_migrations_created_at_idx').on(
      columns.createdAt
    )
  })
);

export const relations_users = relations(users, () => ({}));
export const relations_media = relations(media, () => ({}));
export const relations_news_and_announcements_rels = relations(
  news_and_announcements_rels,
  ({ one }) => ({
    parent: one(news_and_announcements, {
      fields: [news_and_announcements_rels.parent],
      references: [news_and_announcements.id],
      relationName: '_rels'
    }),
    mediaID: one(media, {
      fields: [news_and_announcements_rels.mediaID],
      references: [media.id],
      relationName: 'media'
    })
  })
);
export const relations_news_and_announcements = relations(
  news_and_announcements,
  ({ one, many }) => ({
    thumbnail: one(media, {
      fields: [news_and_announcements.thumbnail],
      references: [media.id],
      relationName: 'thumbnail'
    }),
    _rels: many(news_and_announcements_rels, {
      relationName: '_rels'
    })
  })
);
export const relations_payload_locked_documents_rels = relations(
  payload_locked_documents_rels,
  ({ one }) => ({
    parent: one(payload_locked_documents, {
      fields: [payload_locked_documents_rels.parent],
      references: [payload_locked_documents.id],
      relationName: '_rels'
    }),
    usersID: one(users, {
      fields: [payload_locked_documents_rels.usersID],
      references: [users.id],
      relationName: 'users'
    }),
    mediaID: one(media, {
      fields: [payload_locked_documents_rels.mediaID],
      references: [media.id],
      relationName: 'media'
    }),
    'news-and-announcementsID': one(news_and_announcements, {
      fields: [payload_locked_documents_rels['news-and-announcementsID']],
      references: [news_and_announcements.id],
      relationName: 'news-and-announcements'
    })
  })
);
export const relations_payload_locked_documents = relations(
  payload_locked_documents,
  ({ many }) => ({
    _rels: many(payload_locked_documents_rels, {
      relationName: '_rels'
    })
  })
);
export const relations_payload_preferences_rels = relations(
  payload_preferences_rels,
  ({ one }) => ({
    parent: one(payload_preferences, {
      fields: [payload_preferences_rels.parent],
      references: [payload_preferences.id],
      relationName: '_rels'
    }),
    usersID: one(users, {
      fields: [payload_preferences_rels.usersID],
      references: [users.id],
      relationName: 'users'
    })
  })
);
export const relations_payload_preferences = relations(payload_preferences, ({ many }) => ({
  _rels: many(payload_preferences_rels, {
    relationName: '_rels'
  })
}));
export const relations_payload_migrations = relations(payload_migrations, () => ({}));

type DatabaseSchema = {
  users: typeof users;
  media: typeof media;
  news_and_announcements: typeof news_and_announcements;
  news_and_announcements_rels: typeof news_and_announcements_rels;
  payload_locked_documents: typeof payload_locked_documents;
  payload_locked_documents_rels: typeof payload_locked_documents_rels;
  payload_preferences: typeof payload_preferences;
  payload_preferences_rels: typeof payload_preferences_rels;
  payload_migrations: typeof payload_migrations;
  relations_users: typeof relations_users;
  relations_media: typeof relations_media;
  relations_news_and_announcements_rels: typeof relations_news_and_announcements_rels;
  relations_news_and_announcements: typeof relations_news_and_announcements;
  relations_payload_locked_documents_rels: typeof relations_payload_locked_documents_rels;
  relations_payload_locked_documents: typeof relations_payload_locked_documents;
  relations_payload_preferences_rels: typeof relations_payload_preferences_rels;
  relations_payload_preferences: typeof relations_payload_preferences;
  relations_payload_migrations: typeof relations_payload_migrations;
};

declare module '@payloadcms/db-postgres/types' {
  export interface GeneratedDatabaseSchema {
    schema: DatabaseSchema;
  }
}

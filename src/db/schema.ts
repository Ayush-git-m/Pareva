import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';

export const collections = pgTable('collections', {
  id: serial('id').primaryKey(),
  firebaseId: varchar('firebase_id', { length: 255 }).unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  metal: text('metal'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const collectionsRelations = relations(collections, ({ many }) => ({
  jewelries: many(jewelries),
}));
export const jewelries = pgTable('jewelries', {
  id: serial('id').primaryKey(),
  firebaseId: varchar('firebase_id', { length: 255 }).unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  collectionId: integer('collection_id').references(() => collections.id).notNull(),
  imageUrl: text('image_url').notNull(),
  imageUrls: text('image_urls').array(),
  price: integer('price'), // Optional price
  weight: text('weight'), // Optional weight (e.g. "10g")
  carat: text('carat'), // Optional carat (e.g. "22k")
  createdAt: timestamp('created_at').defaultNow(),
});

export const heroBanners = pgTable('hero_banners', {
  id: serial('id').primaryKey(),
  firebaseId: varchar('firebase_id', { length: 255 }).unique(),
  title: text('title'),
  subtitle: text('subtitle'),
  buttonText: text('button_text'),
  buttonLink: text('button_link'),
  imageUrl: text('image_url').notNull(),
  enabled: boolean('enabled').default(true),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const jewelriesRelations = relations(jewelries, ({ one }) => ({
  collection: one(collections, {
    fields: [jewelries.collectionId],
    references: [collections.id],
  }),
}));

export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).unique().notNull(),
  value: text('value'),
});


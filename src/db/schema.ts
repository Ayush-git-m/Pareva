import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';

export const collections = pgTable('collections', {
  id: serial('id').primaryKey(),
  firebaseId: varchar('firebase_id', { length: 255 }).unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  imageUrls: text('image_urls').array(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const jewelries = pgTable('jewelries', {
  id: serial('id').primaryKey(),
  firebaseId: varchar('firebase_id', { length: 255 }).unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  collectionId: text('collection_id').notNull(),
  imageUrl: text('image_url').notNull(),
  imageUrls: text('image_urls').array(),
  price: integer('price'), // Optional price
  weightGrams: integer('weight_grams'),    
  weightCarats: integer('weight_carats'),  
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

export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).unique().notNull(),
  value: text('value'),
});


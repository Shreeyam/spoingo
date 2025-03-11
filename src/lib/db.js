// src/lib/db.js
import Database from 'better-sqlite3';
import path from 'path';

// Helper function to remove markdown syntax
function stripMarkdown(markdown) {
  if (!markdown) return '';
  // Remove code blocks
  let text = markdown.replace(/```[\s\S]*?```/g, '');
  // Remove inline code
  text = text.replace(/`([^`]+)`/g, '$1');
  // Remove images: ![alt](url)
  text = text.replace(/!\[.*?\]\(.*?\)/g, '');
  // Remove links but keep the link text: [text](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // Remove headings, blockquotes, emphasis markers, etc.
  text = text.replace(/[#>*_~]/g, '');
  return text;
}

// Returns a truncated preview of plain text from markdown content.
function getPreview(content, maxLength = 150) {
  const plain = stripMarkdown(content).trim();
  return plain.length > maxLength ? plain.slice(0, maxLength) + '...' : plain;
}

const dbPath = path.resolve(process.cwd(), 'data', 'blog.db');
const db = new Database(dbPath);

// Create posts table with thumbnail and draft mode.
// (If the table already exists, this script will not drop existing columns.)
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    preview TEXT NOT NULL,
    cover TEXT,
    draft INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    author TEXT,
    slug TEXT UNIQUE NOT NULL,
    tags TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_posts_created_at_desc ON posts (created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);
`);

export function getPosts() {
  const stmt = db.prepare('SELECT * FROM posts WHERE draft = 0 ORDER BY created_at DESC');
  return stmt.all();
}

export function getPostList(draft = 0) {
  const stmt = draft !== null
    ? db.prepare('SELECT id, title, preview, created_at, slug, draft FROM posts WHERE draft = ? ORDER BY created_at DESC')
    : db.prepare('SELECT id, title, preview, created_at, slug, draft FROM posts ORDER BY created_at DESC');

  if (draft === null) return stmt.all();
  return stmt.all(draft);
}

export function getPostsPaginated(offset = 0, limit = 10, draft = 0) {
  const stmt = draft !== null
    ? db.prepare('SELECT * FROM posts WHERE draft = ? ORDER BY created_at DESC LIMIT ? OFFSET ?')
    : db.prepare('SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?');
  return draft !== null ? stmt.all(draft, limit, offset) : stmt.all(limit, offset);
}

export function getPostById(id) {
  const stmt = db.prepare('SELECT * FROM posts WHERE id = ?');
  return stmt.get(id);
}

export function getPostMetadataByID(ID) {
  const stmt = db.prepare('SELECT id, title, slug, created_at, published_at, author, tags FROM posts WHERE id = ?');
  return stmt.get(ID);
}

export function getPostBySlug(slug) {
  const stmt = db.prepare('SELECT * FROM posts WHERE slug = ?');
  return stmt.get(slug);
}

export function getPostMetadataBySlug(slug) {
  const stmt = db.prepare('SELECT id, title, slug, created_at, published_at, author, tags FROM posts WHERE slug = ?');
  return stmt.get(slug);
}

export function getPostIDs(draft = 0) {
  const stmt = draft !== null
    ? db.prepare('SELECT id FROM posts WHERE draft = ? ORDER BY created_at')
    : db.prepare('SELECT id FROM posts ORDER BY created_at');

  return draft !== null ? stmt.all(draft).map(x => x.id) : stmt.all().map(x => x.id);
}


export function createPost({ title, slug, content, cover = null, draft = 0 }) {
  const stmt = db.prepare('INSERT INTO posts (title, content, cover, draft, slug, preview) VALUES (?, ?, ?, ?, ?, ?)');
  const info = stmt.run(title, content, cover, draft, slug, getPreview(content));
  return info.lastInsertRowid;
}

// src/lib/db.js
// Add these functions to your existing db.js file

// Image table creation
db.exec(`
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    thumbnailUrl TEXT,
    size INTEGER,
    width INTEGER,
    height INTEGER,
    mimeType TEXT,
    uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_images_uploadedAt_desc ON images (uploadedAt DESC);
`);

// Image CRUD operations
export function getImages() {
  const stmt = db.prepare('SELECT * FROM images ORDER BY uploadedAt DESC');
  return stmt.all();
}

export function getImageById(id) {
  const stmt = db.prepare('SELECT * FROM images WHERE id = ?');
  return stmt.get(id);
}

export function createImage({ name, url, thumbnailUrl = null, size = null, width = null, height = null, mimeType = null }) {
  const stmt = db.prepare(`
    INSERT INTO images (name, url, thumbnailUrl, size, width, height, mimeType)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(name, url, thumbnailUrl, size, width, height, mimeType);
  return info.lastInsertRowid;
}

export function updateImage(id, { name, url = null, thumbnailUrl = null }) {
  const updates = [];
  const params = [];

  if (name) {
    updates.push('name = ?');
    params.push(name);
  }

  if (url) {
    updates.push('url = ?');
    params.push(url);
  }

  if (thumbnailUrl) {
    updates.push('thumbnailUrl = ?');
    params.push(thumbnailUrl);
  }

  if (updates.length === 0) return false;

  params.push(id);

  const query = `UPDATE images SET ${updates.join(', ')} WHERE id = ?`;
  const stmt = db.prepare(query);
  const info = stmt.run(...params);

  return info.changes > 0;
}

export function deleteImage(id) {
  const stmt = db.prepare('DELETE FROM images WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

// Add these functions to src/lib/db.js

export function updatePost(id, { title, content, cover = null, draft = 0, slug, published_at = null, author = null, tags = null }) {
  if (published_at === null) {
    const stmt = db.prepare(`
      UPDATE posts 
      SET title = ?, content = ?, preview = ?, cover = ?, draft = ?, slug = ?
      WHERE id = ?
    `);
    const info = stmt.run(title, content, getPreview(content), cover, draft, slug, id);
    return info.changes > 0;
  } else {
    const stmt = db.prepare(`
    UPDATE posts 
    SET title = ?, content = ?, preview = ?, cover = ?, draft = ?, slug = ?, published_at = ?
    WHERE id = ?
  `);
    const info = stmt.run(title, content, getPreview(content), cover, draft, slug, published_at, id);
    return info.changes > 0;
  }

}

export function deletePost(id) {
  const stmt = db.prepare('DELETE FROM posts WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}

export function getDrafts() {
  const stmt = db.prepare('SELECT * FROM posts WHERE draft = 1 ORDER BY created_at DESC');
  return stmt.all();
}

export function searchPosts(term) {
  const stmt = db.prepare(`
    SELECT * FROM posts 
    WHERE title LIKE ? OR preview LIKE ? 
    ORDER BY created_at DESC
  `);
  const searchTerm = `%${term}%`;
  return stmt.all(searchTerm, searchTerm);
}
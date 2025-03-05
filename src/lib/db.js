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
    thumbnail TEXT,
    draft INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    slug TEXT UNIQUE NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_posts_created_at_desc ON posts (created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);
`);

export function getPosts() {
  const stmt = db.prepare('SELECT * FROM posts WHERE draft = 0 ORDER BY created_at DESC');
  return stmt.all();
}

export function getPostsPaginated({ offset = 0, limit = 10 }) {
  const stmt = db.prepare('SELECT * FROM posts WHERE draft = 0 ORDER BY created_at DESC LIMIT ? OFFSET ?');
  return stmt.all(limit, offset);
}

export function getPostById(id) {
  const stmt = db.prepare('SELECT * FROM posts WHERE id = ?');
  return stmt.get(id);
}

export function getPostBySlug(slug) {
  const stmt = db.prepare('SELECT * FROM posts WHERE slug = ?');
  return stmt.get(slug);
}


export function createPost({ title, slug, content, thumbnail = null, draft = 0 }) {
  const stmt = db.prepare('INSERT INTO posts (title, content, thumbnail, draft, slug, preview) VALUES (?, ?, ?, ?, ?, ?)');
  const info = stmt.run(title, content, thumbnail, draft, slug, getPreview(content));
  return info.lastInsertRowid;
}

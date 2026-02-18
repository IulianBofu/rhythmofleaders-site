# site-backend

Simple Node.js/Express backend for Rhythm of Leaders blog admin

## Features
- CRUD API for blog posts (file: `../site/public/blog/index/posts.json`)
- File import/export for posts.json
- Admin password protection (username: `admin`, password: `Panzer89$$$`)
- No database, just JSON file

## Usage

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. API runs at http://localhost:4000

## API Endpoints

- `GET    /api/posts`           – List all posts
- `GET    /api/posts/:id`       – Get post by id
- `POST   /api/posts`           – Create post (admin)
- `PUT    /api/posts/:id`       – Update post (admin)
- `DELETE /api/posts/:id`       – Delete post (admin)
- `GET    /api/posts-export`    – Download posts.json (admin)
- `POST   /api/posts-import`    – Upload posts.json (admin, form-data: file)

## Admin Auth
- Username: `admin`
- Password: `Panzer89$$$`

## Note
- The backend reads/writes `../site/public/blog/index/posts.json` (relative to backend folder)
- Make sure the file/folder exists and is writable

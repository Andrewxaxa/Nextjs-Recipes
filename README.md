# Next.js Recipes App

A full-stack recipe management application built with Next.js 14, HeroUI v2, Tailwind CSS, and TypeScript. Users can browse, add, edit, and favorite recipes. Authentication is handled via Clerk.

## Features

- Next.js 14 (App Router)
- HeroUI v2 components
- Tailwind CSS for styling
- TypeScript for type safety
- SQLite database via better-sqlite3
- Clerk authentication
- Cloudinary image uploads
- Favorite recipes functionality

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Andrewxaxa/Nextjs-Recipes.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory and add the following:

```
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `app/` - Next.js app directory (routes, pages, layouts)
- `components/` - Reusable React components
- `lib/` - Database and utility logic ([lib/recipes.ts](lib/recipes.ts))
- `interfaces/` - TypeScript interfaces
- `public/` - Static assets
- `styles/` - Global and component styles
- `config/` - App and theme configuration

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is licensed under the [MIT License](LICENSE).

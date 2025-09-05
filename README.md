# Melbourne Food Blog

A modern, responsive restaurant review website built with Astro, featuring a mobile-first design and centralized styling system.

## Features

- **Mobile-First Responsive Design**: Optimized for all device sizes
- **Centralized Styling**: CSS variables and SCSS for easy theme customization
- **Restaurant Reviews**: Browse and filter restaurant reviews
- **Category System**: Explore restaurants by cuisine type and location
- **Search Functionality**: Search restaurants with multiple filter options
- **Individual Review Pages**: Detailed review pages with markdown content
- **API Integration Ready**: Prepared for Notion database integration via Netlify functions

## Pages

- **Landing Page** (`/`): Hero section, top-rated reviews, cuisine cards, location cards, and latest reviews
- **Reviews** (`/reviews`): All reviews with filtering capabilities
- **Individual Review** (`/reviews/[slug]`): Detailed review pages
- **Search** (`/search`): Search restaurants with query parameters
- **Categories** (`/category`): Browse all cuisine types and locations
- **Category Pages** (`/category/[type]/[id]`): Individual category pages with stats

## Tech Stack

- **Astro**: Static site generator
- **SCSS**: Styling with CSS variables
- **TypeScript**: Type safety
- **Netlify Functions**: API integration (ready for Notion)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Styling System

The website uses a centralized styling system with CSS variables defined in `src/styles/main.scss`. Key features:

- **CSS Variables**: Easy theme customization
- **Mobile-First**: Responsive design starting from mobile
- **Utility Classes**: Reusable styling utilities
- **Component Styles**: Scoped component styling

### Customizing Colors

Update the CSS variables in `src/styles/main.scss`:

```scss
:root {
  --color-primary: #e74c3c;
  --color-secondary: #3498db;
  --color-accent: #f39c12;
  // ... more variables
}
```

## API Integration

The website is prepared for integration with Notion via Netlify functions. The API structure is defined in:

- `src/types/notion.ts`: TypeScript interfaces
- `src/utils/api.ts`: API utility functions

### Required Netlify Functions

1. **getAllReviews**: `/.netlify/functions/getAllReviews`
2. **getCategories**: `/.netlify/functions/getCategories`
3. **getMarkdownFromReview**: `/.netlify/functions/getMarkdownFromReview`

## Components

- **ReviewCard**: Displays restaurant information
- **CategoryCard**: Shows cuisine/location categories
- **FilterSection**: Filter controls for reviews
- **Layout**: Main layout with navigation

## Project Structure

```
src/
├── components/          # Reusable components
├── layouts/            # Page layouts
├── pages/              # Astro pages
├── styles/             # SCSS styles
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## Deployment

The website is ready for deployment on Netlify. Simply connect your repository and deploy.

## Future Enhancements

- Notion database integration
- User authentication
- Review submission system
- Image optimization
- SEO improvements
- Performance optimizations

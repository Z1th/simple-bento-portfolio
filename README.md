# 🎨 Astro Simple Bento Portfolio

A modern and responsive portfolio built with Astro, featuring a "bento box" layout design that perfectly adapts to any personal or professional information.

## ✨ Features

- 📱 **Fully Responsive** - Adapts to all devices
- 🎨 **Bento Box Design** - Modern and attractive layout with tab navigation
- 📝 **Integrated Blog** - Blog system with Content Collections and dynamic routing
- 🖼️ **Photo Carousel** - Swiper for displaying multiple images
- ⚡ **Optimized Performance** - Static generation with Astro
- 🎯 **TypeScript** - Strong typing for better development
- 🎨 **Tailwind CSS** - Utility-first and customizable styles
- 🔗 **Social Media Integration** - Dynamic social links from JSON data
- 🏷️ **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd simple-bento-portfolio

# Install dependencies
npm install

# Run in development
npm run dev
```

### Available Scripts

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run preview      # Preview the build
npm run astro        # Astro CLI
```

## 📁 Project Structure

```
src/
├── components/
│   ├── blog/                # Blog components
│   │   ├── ArticleInfo/     # Author information component
│   │   └── AuthorInfo.astro # Alternative author component
│   ├── layout/              # Layout components
│   │   ├── Bento.astro      # Main container with tab navigation
│   │   └── PhotoCarousel.astro # Image carousel with Swiper
│   ├── ui/                  # Reusable UI components
│   │   ├── PageHeader.astro # Page header with back navigation
│   │   ├── Subtitle.astro   # Subtitle component
│   │   └── ViewContainer.astro # Container wrapper
│   └── views/               # Main view components
│       ├── profile/         # Profile view with subcomponents
│       │   ├── About.astro
│       │   ├── education/
│       │   ├── experience/
│       │   ├── skills/
│       │   ├── social-media/
│       │   └── blog-latest/
│       ├── projects/        # Projects showcase
│       ├── blog/           # Blog listing
│       └── contact/        # Contact form
├── content/
│   ├── blog/               # Blog posts (.md files)
│   ├── profileInformation/ # Profile data (.json)
│   ├── projects/           # Projects data (.json)
│   └── config.ts           # Content Collections configuration
├── pages/
│   ├── blog/
│   │   └── [slug].astro    # Dynamic blog post pages
│   ├── index.astro         # Main portfolio page
│   └── 404.astro          # 404 error page
└── styles/
    └── global.css          # Global styles and utilities
```

## 🎯 Customization

### 1. Profile Information

Edit `src/content/profileInformation/profileInformation.json`:

```json
{
  "title": "Hello there!",
  "description": "Your description here...",
  "badge": {
    "alt": "Your Logo",
    "src": "/badge/logo.png"
  },
  "gallery": [
    {
      "alt": "Profile Photo",
      "src": "/profile/photo.jpg"
    }
  ],
  "education": [
    {
      "title": "Your Degree",
      "startDate": "2020",
      "endDate": "2024",
      "grade": "Your University"
    }
  ],
  "experience": [
    {
      "company": "Company Name",
      "startDate": "2022",
      "endDate": "Present",
      "position": "Your Position"
    }
  ],
  "stack": [
    {
      "name": "Technology",
      "src": "devicon:react"
    }
  ],
  "socialMedia": [
    {
      "nameIcon": "GitHub",
      "href": "https://github.com/username"
    }
  ]
}
```

### 2. Adding Blog Posts

Create `.md` files in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Post description"
date: 2024-01-20
author: "Your Name"
tag: "category"
image: "/blog/post-folder/banner.jpg"
draft: false
profileAuthorImage:
  - alt: "Author Profile"
    src: "/profile/author.jpg"
readTime: "5 min read"
keywords: ["keyword1", "keyword2", "keyword3"]
---

# Your post content here
```

### 3. Adding Projects

Create `.json` files in `src/content/projects/`:

```json
{
  "title": "Project Name",
  "technologies": [
    {
      "name": "React",
      "iconName": "react"
    }
  ],
  "category": "Web Development",
  "githubUrl": "https://github.com/username/repo",
  "gallery": [
    {
      "alt": "Project Screenshot",
      "routeImage": "/projects/project-name/screenshot.jpg"
    }
  ]
}
```

### 4. Font Configuration

The project uses self-hosted fonts via `@fontsource`:

```bash
# Fonts are already installed
npm install @fontsource-variable/baloo-2
npm install @fontsource/poppins
```

Import in your Astro files:

```astro
---
import "@fontsource-variable/baloo-2";
import "@fontsource/poppins";
---
```

## 🧩 Main Components

### Bento.astro
Main container that organizes the entire layout in bento box format with JavaScript-based tab switching functionality. Includes automatic scroll-to-top on tab change.

### ProfileView.astro
Main profile section containing:
- About information with badge
- Education timeline (automatically sorted by most recent)
- Experience timeline (automatically sorted by most recent)
- Skills carousel with Iconify icons
- Latest blog posts carousel
- Social media links

### ProjectsView.astro
Projects showcase with responsive grid layout displaying project cards with technologies and GitHub links.

### BlogView.astro
Blog listing page showing all published posts in a responsive grid with filtering capabilities.

### ContactView.astro
Contact form with social media links integration.

### PhotoCarousel.astro
Swiper-based image carousel for profile photos with navigation and pagination.

## 📝 Blog System

The blog uses **Astro Content Collections** for:

- ✅ Automatic frontmatter validation
- 🔍 Optimized queries with TypeScript support
- 📊 Automatic TypeScript type generation
- 🚀 Static rendering for optimal performance
- 🏷️ SEO optimization with meta tags and keywords

### Blog Features

- **Dynamic routing** with `/blog/[slug]` pages
- **Author information** with profile images
- **Social sharing** with Open Graph and Twitter Cards
- **Keywords support** for better SEO
- **Reading time** estimation
- **Draft system** for unpublished posts

### Content Collections Schema

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string(),
    tag: z.string(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    profileAuthorImage: z.array(
      z.object({
        alt: z.string(),
        src: z.string()
      })
    ),
    readTime: z.string(),
    keywords: z.array(z.string()),
  }),
});
```

## 🎨 Technologies Used

- **[Astro](https://astro.build)** - Modern web framework
- **[TypeScript](https://typescriptlang.org)** - Static typing
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Swiper.js](https://swiperjs.com)** - Touch-enabled carousels
- **[Astro Icon](https://github.com/natemoo-re/astro-icon)** - Icon system with Iconify
- **[@fontsource](https://fontsource.org/)** - Self-hosted fonts
- **[Iconify](https://iconify.design/)** - Icon framework with devicon support

## 🎨 Styling System

### Custom CSS Classes

```css
/* Font utilities */
.font-baloo { font-family: 'Baloo 2 Variable', sans-serif; }
.font-poppins { font-family: 'Poppins', sans-serif; }

/* Prose styling for blog content */
.prose h1 { @apply text-4xl font-bold font-baloo mb-6 mt-6; }
.prose h2 { @apply text-2xl font-semibold font-baloo mb-4 mt-6; }
.prose p { @apply text-base font-poppins leading-relaxed mb-4; }
.prose img { @apply rounded-md; }
```

### Icon System

The project uses Iconify with devicon for technology icons:

```astro
<!-- Technology icons -->
<Icon name="devicon:react" class="w-10 h-10" />
<Icon name="devicon:javascript" class="w-10 h-10" />
```

### Responsive Design

The portfolio uses Tailwind's responsive utilities:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

## 🔧 Development Features

### Tab Navigation System

JavaScript-based tab switching between different views with smooth scrolling:

```javascript
window.switchTab = function (tab: string) {
  // Toggle visibility logic
  // Automatic scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

### Content Sorting

Automatic sorting of education and experience by most recent date:

```typescript
const sortByEndDate = <T extends { endDate: string }>(items: T[]): T[] => {
  return items.sort((a, b) => {
    const yearA = a.endDate === "Present" ? new Date().getFullYear() : parseInt(a.endDate);
    const yearB = b.endDate === "Present" ? new Date().getFullYear() : parseInt(b.endDate);
    return yearB - yearA;
  });
};
```

### Social Media Integration

Dynamic social media links from JSON configuration:

```astro
<SocialMedia socialMedia={profile.data.socialMedia} />
```

## 📱 Responsive Behavior

- **Mobile**: Single column layout, stacked components, touch-friendly navigation
- **Tablet**: Two-column layout for some sections, optimized spacing
- **Desktop**: Full bento box layout with optimal spacing and hover effects

## 🚀 Performance Optimizations

- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Proper image sizing and formats
- **Font Loading**: Self-hosted fonts with `@fontsource` for better performance
- **CSS Purging**: Unused Tailwind classes removed in production
- **Component Islands**: Minimal JavaScript hydration
- **Icon Optimization**: SVG icons loaded on-demand via Iconify

## 🔍 SEO Features

- **Dynamic page titles** based on content
- **Meta descriptions** for all pages
- **Keywords support** for blog posts
- **Open Graph tags** for social sharing
- **Twitter Cards** for enhanced social previews
- **Proper heading hierarchy** (H1-H6)
- **Semantic HTML structure**
- **Alt text for images**

## 🎯 Key Features

### Content Management
- **JSON-based configuration** for easy content updates
- **Markdown support** for blog posts
- **Image galleries** with carousel functionality
- **Technology stack** with icon integration

### User Experience
- **Smooth animations** and transitions
- **Touch-friendly** mobile interface
- **Fast loading** with static generation
- **Accessible** design patterns

### Developer Experience
- **TypeScript support** throughout
- **Hot reloading** in development
- **Component-based architecture**
- **Easy customization** via JSON files

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for more details.

## 👨💻 Author

**Hermar López (Z1thCode)** - [GitHub](https://github.com/Z1th) - [LinkedIn](https://www.linkedin.com/in/hermar-lopez/)

---

*Go big or go home*
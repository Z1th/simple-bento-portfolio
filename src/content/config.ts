import { defineCollection, z } from 'astro:content';

const profileInformation = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    gallery: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
      })
    ),
    badge: z.object({
      alt: z.string(),
      src: z.string()
    }),
    education: z.array(
      z.object({
        title: z.string(),
        startDate: z.string(),
        endDate: z.string().or(z.literal("Present")),
        grade: z.string(),
      })
    ),
     experience: z.array(
      z.object({
        company: z.string(),
        startDate: z.string(),
        endDate: z.string().or(z.literal("Present")),
        position: z.string(),
      })
    ),
    stack: z.array(
      z.object({
        name: z.string(),
        src: z.string()
      })
    ),
    socialMedia: z.array(
      z.object({
        nameIcon: z.string(),
        href: z.string()
      })
    )
  })
});

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
        src: z.string(),
        alt: z.string(),
      })
    ),
    readTime: z.string(),
    keywords: z.array(z.string()),
  }),
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    technologies: z.array(
      z.object({
        name: z.string(),
        iconName: z.string()
      })
    ),
    category: z.string().optional(),
    githubUrl: z.string().url(),
    gallery: z.array(
      z.object({
        alt: z.string(),      
        routeImage: z.string() 
      })
    ).optional().default([]),
  })
});

export const collections = {
  profileInformation,
  blog,
  projects,
};
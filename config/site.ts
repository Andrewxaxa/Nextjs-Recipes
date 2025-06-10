export type SiteConfig = typeof siteConfig;

const commonItems = [
  {
    label: "Recipes",
    href: "/recipes",
  },
  {
    label: "Add recipe",
    href: "/add-recipe",
  },
  {
    label: "My recipes",
    href: "/my-recipes",
  },
  {
    label: "Favorite recipes",
    href: "/favorite-recipes",
  },
];

export const siteConfig = {
  name: "Recipes",
  description: "Training project build with Next.js, HeroUI and Sqlite",
  navItems: [...commonItems],
  navMenuItems: [...commonItems],
  links: {
    github: "https://github.com/Andrewxaxa/Nextjs-Recipes",
  },
};

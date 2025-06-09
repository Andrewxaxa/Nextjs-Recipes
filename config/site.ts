export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Recipes",
  description: "Training project build with Next.js, HeroUI and Sqlite",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
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
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Recipes",
      href: "/recipes",
    },
    {
      label: "Add recipe",
      href: "/add-recipe",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "My recipes",
      href: "/my-recipes",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
  },
};

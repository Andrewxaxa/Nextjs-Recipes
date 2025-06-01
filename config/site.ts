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
      label: "About",
      href: "/about",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
  },
};

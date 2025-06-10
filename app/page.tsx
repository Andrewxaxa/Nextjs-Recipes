import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/ui/primitives";
import { GithubIcon } from "@/components/ui/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Recipe app</span>
        <div className={subtitle({ class: "mt-10" })}>
          Training project build with NextJs and HeroUI.
        </div>
        <br />
        <div className={subtitle()}>
          You can add, view, edit, mark as favorites and search for recipes.
        </div>
        <br />
        <div className={subtitle()}>
          Data storage is set up with sqlite. Image upload with file storage
          service - Cloudinary. User authentication with Clerk.
        </div>
        <br />
        <div className={subtitle()}>
          Because sqlite is blazingly fast 2 sec delay is added to data
          operations to simulate potencial latency.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}

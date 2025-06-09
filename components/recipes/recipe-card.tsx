import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";

import { IRecipe } from "@/interfaces/recipe.interface";

interface RecipeCardProps {
  recipe: IRecipe;
  redirectUrl: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, redirectUrl }) => {
  return (
    <Link
      className="transition-shadow cursor-pointer rounded-xl hover:shadow-lg hover:shadow-gray-300"
      href={`/${redirectUrl}/${recipe.id}`}
      style={{ display: "block" }}
    >
      <Card className="rounded-xl">
        <div className="h-48 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden relative">
          {recipe.image ? (
            <Image
              fill
              alt={recipe.title}
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              src={recipe.image}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span className="text-gray-400">Brak zdjęcia</span>
          )}
        </div>
        <CardHeader>
          <h2 className="text-xl font-bold mb-2 text-foreground">
            {recipe.title}
          </h2>
        </CardHeader>
        <CardBody>
          <p className="mb-2 text-foreground/80">{recipe.description}</p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default RecipeCard;

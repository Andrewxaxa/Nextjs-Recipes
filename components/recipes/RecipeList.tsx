import { IRecipe } from "@/interfaces/recipe.interface";
import { Card, CardBody, CardHeader } from "@heroui/card";
import Link from "next/link";
import Image from "next/image";

type RecipeListProps = {
  recipes: IRecipe[];
};

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {recipes.map((recipe) => (
      <Link
        key={recipe.id}
        href={`/recipes/${recipe.id}`}
        className="transition-shadow cursor-pointer rounded-xl hover:shadow-lg hover:shadow-gray-300"
        style={{ display: "block" }}
      >
        <Card className="rounded-xl">
          <div className="h-48 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden relative">
            {recipe.image ? (
              <Image
                alt={recipe.title}
                src={recipe.image}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                style={{ objectFit: "cover" }}
                className="object-cover"
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
    ))}
  </div>
);

export default RecipeList;

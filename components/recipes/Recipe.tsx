import { Card, CardBody, CardHeader } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";

import { editIcon } from "../ui/icons";

import DeleteRecipe from "./delete-recipe";

import { IRecipe } from "@/interfaces/recipe.interface";

type RecipeDetailProps = {
  userId?: string;
  recipe: IRecipe;
  redirectUrl: string;
};

const RecipeDetails = ({ userId, recipe, redirectUrl }: RecipeDetailProps) => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="rounded-xl">
        <div className="h-64 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden relative">
          {userId && (
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Link
                className="bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
                href={`/${redirectUrl}/${recipe.id}/edit`}
                title="Edit recipe"
              >
                {editIcon}
              </Link>
              <DeleteRecipe id={recipe.id} />
            </div>
          )}
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
        <div className="p-6">
          <CardHeader>
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          </CardHeader>
          <CardBody>
            <p className="text-foreground mb-6">{recipe.description}</p>
            <h2 className="text-xl text-foreground/80 mb-2">Steps:</h2>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions
                .sort((a, b) => a.step - b.step)
                .map((instr) => (
                  <li key={instr.id} className="text-foreground/80">
                    {instr.text}
                  </li>
                ))}
            </ol>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

export default RecipeDetails;

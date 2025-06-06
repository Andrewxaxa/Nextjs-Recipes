import { Card, CardBody, CardHeader } from "@heroui/card";
import { IRecipe } from "@/interfaces/recipe.interface";
import { editIcon } from "../ui/icons";
import Image from "next/image";
import Link from "next/link";
import DeleteRecipe from "./delete-recipe";

type RecipeDetailProps = {
  recipe: IRecipe;
};

const RecipeDetails = ({ recipe }: RecipeDetailProps) => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="rounded-xl">
        <div className="h-64 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Link
              href={`/recipes/${recipe.id}/edit`}
              className="bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
              title="Edit recipe"
            >
              {editIcon}
            </Link>
            <DeleteRecipe id={recipe.id} />
          </div>
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

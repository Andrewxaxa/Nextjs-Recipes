import { IRecipe } from "@/interfaces/recipe.interface";
import { Card, CardBody, CardHeader } from "@heroui/card";

type RecipeDetailProps = {
  recipe: IRecipe;
};

const RecipeDetails = ({ recipe }: RecipeDetailProps) => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="rounded-xl">
        <div className="h-64 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-full"
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
            <h2 className="text-xl text-foreground/80">Steps:</h2>
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

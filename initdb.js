const sql = require("better-sqlite3");
const db = sql("app.db");

const dummyRecipes = [
  {
    id: "1",
    userId: "1",
    title: "Juicy Cheese Burger",
    description:
      "A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.",
    image: "/images/cheeseburger.jpg",
    imagePublicId: "123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "1",
    title: "Spicy Curry",
    description:
      "A rich and spicy curry, infused with exotic spices and creamy coconut milk.",
    image: "/images/curry.jpg",
    imagePublicId: "123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    userId: "1",
    title: "Homemade Dumplings",
    description:
      "Tender dumplings filled with savory meat and vegetables, steamed to perfection.",
    image: "/images/dumplings.jpg",
    imagePublicId: "123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const dummyInstructions = [
  {
    id: "1-1",
    step: 1,
    text: "Prepare the patty: Mix 200g of ground beef with salt and pepper. Form into a patty.",
    recipeId: "1",
  },
  {
    id: "1-2",
    step: 2,
    text: "Cook the patty: Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.",
    recipeId: "1",
  },
  {
    id: "1-3",
    step: 3,
    text: "Assemble the burger: Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.",
    recipeId: "1",
  },
  {
    id: "1-4",
    step: 4,
    text: "Serve: Complete the assembly with the top bun and serve hot.",
    recipeId: "1",
  },
  {
    id: "2-1",
    step: 1,
    text: "Chop vegetables: Cut your choice of vegetables into bite-sized pieces.",
    recipeId: "2",
  },
  {
    id: "2-2",
    step: 2,
    text: "Sauté vegetables: In a pan with oil, sauté the vegetables until they start to soften.",
    recipeId: "2",
  },
  {
    id: "2-3",
    step: 3,
    text: "Add curry paste: Stir in 2 tablespoons of curry paste and cook for another minute.",
    recipeId: "2",
  },
  {
    id: "2-4",
    step: 4,
    text: "Simmer with coconut milk: Pour in 500ml of coconut milk and bring to a simmer. Let it cook for about 15 minutes.",
    recipeId: "2",
  },
  {
    id: "2-5",
    step: 5,
    text: "Serve: Enjoy this creamy curry with rice or bread.",
    recipeId: "2",
  },
];

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      imagePublicId TEXT NOT NULL,
      createdAt TEXT,
      updatedAt TEXT
    );
  `,
).run();

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS instructions (
      id TEXT PRIMARY KEY,
      step INTEGER NOT NULL,
      text TEXT NOT NULL,
      recipeId TEXT NOT NULL,
      FOREIGN KEY(recipeId) REFERENCES recipes(id) ON DELETE CASCADE
    );
  `,
).run();

function initData() {
  const recipesData = db.prepare(
    `
      INSERT INTO recipes VALUES (
        @id,
        @userId,
        @title,
        @description,
        @image,
        @imagePublicId,
        @createdAt,
        @updatedAt
      )
    `,
  );

  const instructionsData = db.prepare(
    `
      INSERT INTO instructions VALUES (
        @id,
        @step,
        @text,
        @recipeId
      )
    `,
  );

  for (const recipe of dummyRecipes) {
    recipesData.run(recipe);
  }

  for (const instruction of dummyInstructions) {
    instructionsData.run(instruction);
  }
}

initData();

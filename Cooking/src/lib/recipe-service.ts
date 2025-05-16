// Types
export interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string;
  cookingTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  authorId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  categories: string[];
  ratings: Rating[];
}

export interface Rating {
  id: number;
  userId: number;
  userName: string;
  score: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface RecipeFormData {
  title: string;
  ingredients: string[];
  instructions: string;
  cookingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  categories: string[];
}

// Sample data
const sampleRecipes: Recipe[] = [
{
  id: 1,
  title: 'Spaghetti Carbonara',
  ingredients: [
  '400g spaghetti',
  '200g pancetta or guanciale, diced',
  '4 large eggs',
  '50g pecorino cheese, grated',
  '50g parmesan cheese, grated',
  'Freshly ground black pepper',
  'Salt'],

  instructions: `
      1. Bring a large pot of salted water to a boil and cook the spaghetti according to package instructions until al dente.
      2. While the pasta is cooking, heat a large skillet over medium heat. Add the pancetta and cook until crispy, about 5-7 minutes.
      3. In a bowl, whisk together the eggs, pecorino, parmesan, and a generous amount of black pepper.
      4. When the pasta is done, reserve 1 cup of the pasta water, then drain.
      5. Working quickly, add the hot pasta to the skillet with the pancetta, tossing to combine.
      6. Remove the skillet from the heat and pour in the egg and cheese mixture, tossing continuously until the sauce thickens and coats the pasta (but doesn't scramble).
      7. If needed, add a splash of the reserved pasta water to create a silky sauce.
      8. Serve immediately with extra grated cheese and black pepper on top.
    `,
  cookingTime: 25,
  difficulty: 'medium',
  imageUrl: 'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  authorId: 1,
  authorName: 'Chef Mario',
  createdAt: '2023-01-15T12:00:00Z',
  updatedAt: '2023-01-15T12:00:00Z',
  categories: ['Italian', 'Pasta', 'Quick Meals'],
  ratings: [
  {
    id: 1,
    userId: 2,
    userName: 'Pasta Lover',
    score: 5,
    comment: 'Perfect carbonara recipe! Simple and delicious.',
    createdAt: '2023-01-20T14:30:00Z'
  },
  {
    id: 2,
    userId: 3,
    userName: 'Home Cook',
    score: 4,
    comment: 'Great flavor, though I added a bit of cream.',
    createdAt: '2023-02-05T09:15:00Z'
  }]

},
{
  id: 2,
  title: 'Classic Beef Burger',
  ingredients: [
  '500g ground beef (80% lean)',
  '1 onion, finely diced',
  '2 cloves garlic, minced',
  '1 tbsp Worcestershire sauce',
  '1 egg',
  '1/2 cup breadcrumbs',
  'Salt and pepper to taste',
  '4 burger buns',
  'Lettuce, tomato, and condiments for serving'],

  instructions: `
      1. In a large bowl, combine the ground beef, onion, garlic, Worcestershire sauce, egg, breadcrumbs, salt, and pepper.
      2. Mix gently with your hands until just combined. Don't overwork the meat.
      3. Divide the mixture into 4 equal portions and shape into patties slightly larger than your buns, as they will shrink when cooking.
      4. Make a slight depression in the center of each patty with your thumb to prevent it from puffing up during cooking.
      5. Preheat a grill or skillet to medium-high heat.
      6. Cook the patties for 4-5 minutes on each side for medium doneness.
      7. During the last minute of cooking, place a slice of cheese on each patty if desired and toast the buns.
      8. Serve on toasted buns with lettuce, tomato, and your favorite condiments.
    `,
  cookingTime: 30,
  difficulty: 'easy',
  imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  authorId: 2,
  authorName: 'Grill Master',
  createdAt: '2023-02-10T15:30:00Z',
  updatedAt: '2023-02-10T15:30:00Z',
  categories: ['American', 'Burgers', 'BBQ'],
  ratings: [
  {
    id: 3,
    userId: 4,
    userName: 'Burger Enthusiast',
    score: 5,
    comment: 'Juicy and flavorful - best burger recipe I\'ve tried!',
    createdAt: '2023-02-12T18:45:00Z'
  }]

},
{
  id: 3,
  title: 'Thai Green Curry',
  ingredients: [
  '400ml coconut milk',
  '4 tbsp green curry paste',
  '500g chicken breast, sliced',
  '1 red bell pepper, sliced',
  '1 zucchini, sliced',
  '100g snap peas',
  '2 tbsp fish sauce',
  '1 tbsp palm sugar or brown sugar',
  'Handful of Thai basil leaves',
  '2 kaffir lime leaves',
  'Jasmine rice, for serving'],

  instructions: `
      1. Heat a large wok or skillet over medium heat. Add 2 tablespoons of coconut milk and the curry paste, stirring to combine.
      2. Cook for 2-3 minutes until fragrant, then add the chicken and stir to coat with the curry paste.
      3. Pour in the remaining coconut milk and bring to a simmer.
      4. Add the bell pepper, zucchini, fish sauce, and sugar. Stir well.
      5. Simmer for 10-15 minutes until the chicken is cooked through and the vegetables are tender but still have some bite.
      6. Add the snap peas and simmer for another 2 minutes.
      7. Remove from heat and stir in the Thai basil leaves.
      8. Serve hot over jasmine rice, garnished with additional basil if desired.
    `,
  cookingTime: 35,
  difficulty: 'medium',
  imageUrl: 'https://images.unsplash.com/photo-1577451581377-523b0a03bb6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwdmlicmFudCUyMGFuZCUyMGFwcGV0aXppbmclMjBkaXNoJTIwb2YlMjBUaGFpJTIwZ3JlZW4lMjBjdXJyeSUyMHNlcnZlZCUyMGluJTIwYSUyMGJvd2wlMkMlMjBnYXJuaXNoZWQlMjB3aXRoJTIwZnJlc2glMjBoZXJicyUyMGFuZCUyMGFjY29tcGFuaWVkJTIwYnklMjBhJTIwc2lkZSUyMG9mJTIwamFzbWluZSUyMHJpY2UufGVufDB8fHx8MTc0NzQxNzU3MXww&ixlib=rb-4.1.0&q=80&w=200$w=800',
  authorId: 3,
  authorName: 'Thai Cuisine Expert',
  createdAt: '2023-03-05T11:15:00Z',
  updatedAt: '2023-03-05T11:15:00Z',
  categories: ['Thai', 'Curry', 'Chicken'],
  ratings: [
  {
    id: 4,
    userId: 5,
    userName: 'Spice Lover',
    score: 5,
    comment: 'Perfectly balanced flavors and just the right amount of heat!',
    createdAt: '2023-03-07T20:15:00Z'
  },
  {
    id: 5,
    userId: 6,
    userName: 'Curry Fan',
    score: 4,
    comment: 'Delicious! I added some bamboo shoots as well.',
    createdAt: '2023-03-10T13:30:00Z'
  }]

}];


// Helper functions to simulate localStorage persistence
const getStoredRecipes = (): Recipe[] => {
  const storedRecipes = localStorage.getItem('recipes');
  if (storedRecipes) {
    return JSON.parse(storedRecipes);
  }

  // Initialize with sample recipes if storage is empty
  localStorage.setItem('recipes', JSON.stringify(sampleRecipes));
  return sampleRecipes;
};

const updateStoredRecipes = (recipes: Recipe[]): void => {
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

// API service functions
export const recipeService = {
  // Get all recipes with optional filtering
  getAllRecipes: async (filters?: {
    category?: string;
    difficulty?: string;
    authorId?: number;
    search?: string;
  }): Promise<Recipe[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let recipes = getStoredRecipes();

    // Apply filters if provided
    if (filters) {
      if (filters.category) {
        recipes = recipes.filter((recipe) =>
        recipe.categories.some((cat) =>
        cat.toLowerCase().includes(filters.category!.toLowerCase())
        )
        );
      }

      if (filters.difficulty && filters.difficulty !== 'all') {
        recipes = recipes.filter((recipe) =>
        recipe.difficulty === filters.difficulty
        );
      }

      if (filters.authorId) {
        recipes = recipes.filter((recipe) =>
        recipe.authorId === filters.authorId
        );
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        recipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchLower)) ||
        recipe.instructions.toLowerCase().includes(searchLower) ||
        recipe.categories.some((cat) => cat.toLowerCase().includes(searchLower))
        );
      }
    }

    return recipes;
  },

  // Get recipe by ID
  getRecipeById: async (id: number): Promise<Recipe | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const recipes = getStoredRecipes();
    return recipes.find((recipe) => recipe.id === id) || null;
  },

  // Create new recipe
  createRecipe: async (recipeData: RecipeFormData, authorId: number, authorName: string): Promise<Recipe> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const recipes = getStoredRecipes();
    const newId = Math.max(0, ...recipes.map((r) => r.id)) + 1;

    const now = new Date().toISOString();

    const newRecipe: Recipe = {
      id: newId,
      ...recipeData,
      authorId,
      authorName,
      createdAt: now,
      updatedAt: now,
      ratings: []
    };

    recipes.push(newRecipe);
    updateStoredRecipes(recipes);

    return newRecipe;
  },

  // Update existing recipe
  updateRecipe: async (id: number, recipeData: Partial<RecipeFormData>, authorId: number): Promise<Recipe | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const recipes = getStoredRecipes();
    const recipeIndex = recipes.findIndex((r) => r.id === id);

    if (recipeIndex === -1) return null;

    // Check authorization
    if (recipes[recipeIndex].authorId !== authorId) {
      throw new Error('Unauthorized: You can only edit your own recipes');
    }

    // Update the recipe
    recipes[recipeIndex] = {
      ...recipes[recipeIndex],
      ...recipeData,
      updatedAt: new Date().toISOString()
    };

    updateStoredRecipes(recipes);
    return recipes[recipeIndex];
  },

  // Delete recipe
  deleteRecipe: async (id: number, authorId: number): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const recipes = getStoredRecipes();
    const recipeIndex = recipes.findIndex((r) => r.id === id);

    if (recipeIndex === -1) return false;

    // Check authorization
    if (recipes[recipeIndex].authorId !== authorId) {
      throw new Error('Unauthorized: You can only delete your own recipes');
    }

    recipes.splice(recipeIndex, 1);
    updateStoredRecipes(recipes);

    return true;
  },

  // Add rating
  addRating: async (recipeId: number, userId: number, userName: string, score: number, comment: string): Promise<Recipe | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const recipes = getStoredRecipes();
    const recipeIndex = recipes.findIndex((r) => r.id === recipeId);

    if (recipeIndex === -1) return null;

    // Check if user already rated this recipe
    const existingRatingIndex = recipes[recipeIndex].ratings.findIndex((r) => r.userId === userId);

    const newRating: Rating = {
      id: existingRatingIndex >= 0 ?
      recipes[recipeIndex].ratings[existingRatingIndex].id :
      Math.max(0, ...recipes[recipeIndex].ratings.map((r) => r.id)) + 1,
      userId,
      userName,
      score,
      comment,
      createdAt: new Date().toISOString()
    };

    if (existingRatingIndex >= 0) {
      // Update existing rating
      recipes[recipeIndex].ratings[existingRatingIndex] = newRating;
    } else {
      // Add new rating
      recipes[recipeIndex].ratings.push(newRating);
    }

    updateStoredRecipes(recipes);
    return recipes[recipeIndex];
  }
};
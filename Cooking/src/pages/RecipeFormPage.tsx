import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { recipeService, RecipeFormData, Recipe } from '@/lib/recipe-service';
import MainLayout from '@/components/layout/MainLayout';

type FormData = {
  title: string;
  cookingTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  ingredients: {value: string;}[];
  instructions: string;
  category: string;
  categories: string[];
};

const RecipeFormPage = () => {
  const { id } = useParams<{id?: string;}>();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      cookingTime: '',
      difficulty: 'medium',
      imageUrl: '',
      ingredients: [{ value: '' }],
      instructions: '',
      category: '',
      categories: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  });

  // Fetch recipe data if in edit mode
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!isEditMode || !id || !user) return;

      try {
        setIsLoading(true);
        const recipe = await recipeService.getRecipeById(parseInt(id));

        if (!recipe) {
          toast({
            title: 'Error',
            description: 'Recipe not found',
            variant: 'destructive'
          });
          navigate('/recipes');
          return;
        }

        // Check if user is the author
        if (recipe.authorId !== user.id) {
          toast({
            title: 'Unauthorized',
            description: 'You can only edit your own recipes',
            variant: 'destructive'
          });
          navigate('/recipes');
          return;
        }

        // Set form values
        reset({
          title: recipe.title,
          cookingTime: recipe.cookingTime.toString(),
          difficulty: recipe.difficulty,
          imageUrl: recipe.imageUrl,
          ingredients: recipe.ingredients.map((ing) => ({ value: ing })),
          instructions: recipe.instructions,
          category: '',
          categories: []
        });

        setSelectedCategories(recipe.categories);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load recipe',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, isEditMode, navigate, reset, toast, user]);

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: 'Unauthorized',
        description: 'You must be logged in to create recipes',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    try {
      setIsSubmitting(true);

      // Combine form categories with selected ones
      const allCategories = [...selectedCategories];

      const recipeData: RecipeFormData = {
        title: data.title,
        ingredients: data.ingredients.map((ing) => ing.value.trim()).filter(Boolean),
        instructions: data.instructions,
        cookingTime: parseInt(data.cookingTime),
        difficulty: data.difficulty,
        imageUrl: data.imageUrl,
        categories: allCategories
      };

      if (isEditMode && id) {
        // Update existing recipe
        const updatedRecipe = await recipeService.updateRecipe(
          parseInt(id),
          recipeData,
          user.id
        );

        if (updatedRecipe) {
          toast({
            title: 'Success',
            description: 'Recipe updated successfully'
          });
          navigate(`/recipes/${updatedRecipe.id}`);
        }
      } else {
        // Create new recipe
        const newRecipe = await recipeService.createRecipe(
          recipeData,
          user.id,
          user.email // Using email as author name in this demo
        );

        toast({
          title: 'Success',
          description: 'Recipe created successfully'
        });
        navigate(`/recipes/${newRecipe.id}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save recipe',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = (value: string) => {
    if (value && !selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
      setValue('category', '');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto py-10" data-id="zr97kalpu" data-path="src/pages/RecipeFormPage.tsx">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p data-id="kaws7s8ch" data-path="src/pages/RecipeFormPage.tsx">You must be logged in to create or edit recipes.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/login')}>Login</Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>);

  }

  return (
    <MainLayout>
      <div className="container mx-auto py-10" data-id="plhixka51" data-path="src/pages/RecipeFormPage.tsx">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{isEditMode ? 'Edit Recipe' : 'Create New Recipe'}</CardTitle>
          </CardHeader>
          {isLoading ?
          <CardContent>
              <div className="animate-pulse space-y-4" data-id="j1zw9n9d2" data-path="src/pages/RecipeFormPage.tsx">
                <div className="h-4 w-1/3 bg-gray-200 rounded" data-id="rdkaezgxx" data-path="src/pages/RecipeFormPage.tsx"></div>
                <div className="h-8 bg-gray-200 rounded" data-id="5f2lmc4xh" data-path="src/pages/RecipeFormPage.tsx"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded" data-id="w291793ty" data-path="src/pages/RecipeFormPage.tsx"></div>
                <div className="h-8 bg-gray-200 rounded" data-id="djhgaplhq" data-path="src/pages/RecipeFormPage.tsx"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded" data-id="i3mzq0inj" data-path="src/pages/RecipeFormPage.tsx"></div>
                <div className="h-32 bg-gray-200 rounded" data-id="2jmxxsg7r" data-path="src/pages/RecipeFormPage.tsx"></div>
              </div>
            </CardContent> :

          <form onSubmit={handleSubmit(onSubmit)} data-id="hh1ww3d23" data-path="src/pages/RecipeFormPage.tsx">
              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2" data-id="4dn7it0cf" data-path="src/pages/RecipeFormPage.tsx">
                  <Label htmlFor="title" className="required">Recipe Title</Label>
                  <Input
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  className={errors.title ? 'border-red-500' : ''} />

                  {errors.title &&
                <p className="text-sm text-red-500" data-id="fwaqyjh1n" data-path="src/pages/RecipeFormPage.tsx">{errors.title.message}</p>
                }
                </div>

                {/* Image URL */}
                <div className="space-y-2" data-id="way4tn6bx" data-path="src/pages/RecipeFormPage.tsx">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  {...register('imageUrl')} />

                  <p className="text-xs text-muted-foreground" data-id="0ilvx1h3h" data-path="src/pages/RecipeFormPage.tsx">
                    Provide a URL to an image of your dish. Leave empty to use a placeholder.
                  </p>
                </div>

                {/* Cooking Time & Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="tuz4rfnxe" data-path="src/pages/RecipeFormPage.tsx">
                  <div className="space-y-2" data-id="6ejr715cc" data-path="src/pages/RecipeFormPage.tsx">
                    <Label htmlFor="cookingTime" className="required">Cooking Time (minutes)</Label>
                    <Input
                    id="cookingTime"
                    type="number"
                    min="1"
                    {...register('cookingTime', {
                      required: 'Cooking time is required',
                      min: { value: 1, message: 'Must be at least 1 minute' }
                    })}
                    className={errors.cookingTime ? 'border-red-500' : ''} />

                    {errors.cookingTime &&
                  <p className="text-sm text-red-500" data-id="86nn9eo89" data-path="src/pages/RecipeFormPage.tsx">{errors.cookingTime.message}</p>
                  }
                  </div>

                  <div className="space-y-2" data-id="jsokgwo30" data-path="src/pages/RecipeFormPage.tsx">
                    <Label htmlFor="difficulty" className="required">Difficulty</Label>
                    <Controller
                    control={control}
                    name="difficulty"
                    rules={{ required: 'Difficulty is required' }}
                    render={({ field }) =>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>

                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                    } />

                    {errors.difficulty &&
                  <p className="text-sm text-red-500" data-id="o51cipg4q" data-path="src/pages/RecipeFormPage.tsx">{errors.difficulty.message}</p>
                  }
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2" data-id="i8v5hlol1" data-path="src/pages/RecipeFormPage.tsx">
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2 mb-2" data-id="nspwzsr3y" data-path="src/pages/RecipeFormPage.tsx">
                    {selectedCategories.map((category) =>
                  <Badge key={category} variant="secondary">
                        {category}
                        <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-1 hover:text-destructive" data-id="ken4lcgb5" data-path="src/pages/RecipeFormPage.tsx">

                          <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4" data-id="g2icok8zv" data-path="src/pages/RecipeFormPage.tsx">

                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" data-id="qi667p4vs" data-path="src/pages/RecipeFormPage.tsx" />
                          </svg>
                        </button>
                      </Badge>
                  )}
                  </div>
                  <div className="flex gap-2" data-id="0u6197wjq" data-path="src/pages/RecipeFormPage.tsx">
                    <Controller
                    control={control}
                    name="category"
                    render={({ field }) =>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}>

                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                        'Italian',
                        'American',
                        'Mexican',
                        'Thai',
                        'Chinese',
                        'Japanese',
                        'Indian',
                        'French',
                        'Greek',
                        'Spanish',
                        'Vegetarian',
                        'Vegan',
                        'Dessert',
                        'Breakfast',
                        'Lunch',
                        'Dinner',
                        'Appetizer',
                        'Soup',
                        'Salad',
                        'Pasta',
                        'Rice',
                        'Seafood',
                        'Chicken',
                        'Beef',
                        'Pork',
                        'BBQ',
                        'Grill',
                        'Baking',
                        'Quick Meals',
                        'Slow Cooker',
                        'Healthy',
                        'Low Carb',
                        'Gluten Free',
                        'Dairy Free'].
                        map((cat) =>
                        <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                        )}
                          </SelectContent>
                        </Select>
                    } />

                    <Button
                    type="button"
                    onClick={() => handleAddCategory(control._formValues.category)}
                    disabled={!control._formValues.category}>

                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground" data-id="nxi9pe2ha" data-path="src/pages/RecipeFormPage.tsx">
                    Select from the list or type and add your own categories to help others find your recipe.
                  </p>
                </div>

                {/* Ingredients */}
                <div className="space-y-2" data-id="wnwa3ie27" data-path="src/pages/RecipeFormPage.tsx">
                  <Label className="required">Ingredients</Label>
                  {fields.map((field, index) =>
                <div key={field.id} className="flex gap-2 items-start" data-id="xkz24jou8" data-path="src/pages/RecipeFormPage.tsx">
                      <Input
                    {...register(`ingredients.${index}.value` as const, {
                      required: index === 0 ? 'At least one ingredient is required' : false
                    })}
                    placeholder={`Ingredient ${index + 1}`}
                    className={
                    errors.ingredients?.[index]?.value ? 'border-red-500' : ''
                    } />

                      <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={index === 0 && fields.length === 1}>

                        <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5" data-id="4w8gfoxhl" data-path="src/pages/RecipeFormPage.tsx">

                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" data-id="5wxz1n3op" data-path="src/pages/RecipeFormPage.tsx" />
                        </svg>
                      </Button>
                    </div>
                )}
                  {errors.ingredients?.[0]?.value &&
                <p className="text-sm text-red-500" data-id="117rt7xd0" data-path="src/pages/RecipeFormPage.tsx">
                      {errors.ingredients[0].value.message}
                    </p>
                }
                  <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ value: '' })}
                  className="mt-2">

                    Add Ingredient
                  </Button>
                </div>

                {/* Instructions */}
                <div className="space-y-2" data-id="4z4dfrnyf" data-path="src/pages/RecipeFormPage.tsx">
                  <Label htmlFor="instructions" className="required">Instructions</Label>
                  <Textarea
                  id="instructions"
                  {...register('instructions', {
                    required: 'Instructions are required',
                    minLength: {
                      value: 50,
                      message: 'Instructions should be at least 50 characters'
                    }
                  })}
                  rows={10}
                  placeholder="Provide detailed steps for your recipe..."
                  className={errors.instructions ? 'border-red-500' : ''} />

                  {errors.instructions &&
                <p className="text-sm text-red-500" data-id="cd94bvkls" data-path="src/pages/RecipeFormPage.tsx">{errors.instructions.message}</p>
                }
                  <p className="text-xs text-muted-foreground" data-id="e38x9s1m1" data-path="src/pages/RecipeFormPage.tsx">
                    Provide detailed steps for preparing your recipe. Number each step for clarity.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}>

                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ?
                isEditMode ?
                'Updating...' :
                'Creating...' :
                isEditMode ?
                'Update Recipe' :
                'Create Recipe'}
                </Button>
              </CardFooter>
            </form>
          }
        </Card>
      </div>
    </MainLayout>);

};

export default RecipeFormPage;
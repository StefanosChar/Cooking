import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { recipeService, Recipe } from '@/lib/recipe-service';
import MainLayout from '@/components/layout/MainLayout';

const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recipeToDelete, setRecipeToDelete] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadMyRecipes = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      setIsLoading(true);
      try {
        const fetchedRecipes = await recipeService.getAllRecipes({
          authorId: user.id
        });
        setRecipes(fetchedRecipes);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load your recipes',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMyRecipes();
  }, [navigate, toast, user]);

  const handleDeleteClick = (recipeId: number) => {
    setRecipeToDelete(recipeId);
  };

  const confirmDelete = async () => {
    if (!recipeToDelete || !user) return;

    try {
      const success = await recipeService.deleteRecipe(recipeToDelete, user.id);
      if (success) {
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeToDelete));
        toast({
          title: 'Success',
          description: 'Recipe deleted successfully'
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete recipe',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'You can only delete your own recipes',
        variant: 'destructive'
      });
    } finally {
      setRecipeToDelete(null);
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto py-10" data-id="2bqhmk2vm" data-path="src/pages/MyRecipesPage.tsx">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold" data-id="xmvoarjm9" data-path="src/pages/MyRecipesPage.tsx">Authentication Required</h2>
            </CardHeader>
            <CardContent>
              <p data-id="xiflw49yx" data-path="src/pages/MyRecipesPage.tsx">You must be logged in to view your recipes.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>);

  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8" data-id="4n77xm51x" data-path="src/pages/MyRecipesPage.tsx">
        <div className="flex justify-between items-center mb-6" data-id="6iix67sdf" data-path="src/pages/MyRecipesPage.tsx">
          <h1 className="text-3xl font-bold" data-id="td06tusri" data-path="src/pages/MyRecipesPage.tsx">My Recipes</h1>
          <Button asChild>
            <Link to="/new-recipe">Create New Recipe</Link>
          </Button>
        </div>

        {isLoading ?
        <div className="space-y-4" data-id="vaiqox4mq" data-path="src/pages/MyRecipesPage.tsx">
            {[1, 2, 3].map((i) =>
          <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-6 bg-muted rounded w-1/3" data-id="z2sx2gw4i" data-path="src/pages/MyRecipesPage.tsx"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-1/2 mb-2" data-id="nuohgv23s" data-path="src/pages/MyRecipesPage.tsx"></div>
                  <div className="h-4 bg-muted rounded w-1/4" data-id="lgo0dvwg2" data-path="src/pages/MyRecipesPage.tsx"></div>
                </CardContent>
              </Card>
          )}
          </div> :
        recipes.length > 0 ?
        <div className="space-y-4" data-id="rjv4tre9m" data-path="src/pages/MyRecipesPage.tsx">
            {recipes.map((recipe) =>
          <Card key={recipe.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row" data-id="y90n2he6q" data-path="src/pages/MyRecipesPage.tsx">
                  <div className="w-full md:w-48 h-48 md:h-auto" data-id="17bmrrd8w" data-path="src/pages/MyRecipesPage.tsx">
                    <img
                  src={recipe.imageUrl || '/placeholder.svg'}
                  alt={recipe.title}
                  className="h-full w-full object-cover" data-id="wc0c386i7" data-path="src/pages/MyRecipesPage.tsx" />

                  </div>
                  <div className="flex flex-col flex-1 p-4" data-id="3u05im2lv" data-path="src/pages/MyRecipesPage.tsx">
                    <CardHeader className="p-0 pb-2">
                      <h3 className="text-xl font-semibold" data-id="52bkh3s67" data-path="src/pages/MyRecipesPage.tsx">
                        <Link
                      to={`/recipes/${recipe.id}`}
                      className="hover:underline">

                          {recipe.title}
                        </Link>
                      </h3>
                    </CardHeader>
                    <CardContent className="p-0 text-sm space-y-3 flex-1">
                      <div className="flex items-center text-muted-foreground" data-id="dkq3uwedu" data-path="src/pages/MyRecipesPage.tsx">
                        <span data-id="rk463y5v5" data-path="src/pages/MyRecipesPage.tsx">{recipe.cookingTime} min</span>
                        <span className="mx-2" data-id="hyvv55339" data-path="src/pages/MyRecipesPage.tsx">•</span>
                        <span className="capitalize" data-id="2c6vss73f" data-path="src/pages/MyRecipesPage.tsx">{recipe.difficulty}</span>
                        <span className="mx-2" data-id="wehx0csn5" data-path="src/pages/MyRecipesPage.tsx">•</span>
                        <span data-id="5t7r6vapc" data-path="src/pages/MyRecipesPage.tsx">
                          {new Date(recipe.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2" data-id="3pax7x9t8" data-path="src/pages/MyRecipesPage.tsx">
                        {recipe.categories.map((category, index) =>
                    <Badge key={index} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                    )}
                      </div>
                      <div data-id="12gg9674m" data-path="src/pages/MyRecipesPage.tsx">
                        <span className="text-muted-foreground" data-id="qd3j957c2" data-path="src/pages/MyRecipesPage.tsx">
                          {recipe.ratings.length}{' '}
                          {recipe.ratings.length === 1 ? 'review' : 'reviews'}
                          {recipe.ratings.length > 0 &&
                      <>
                              {' • '}
                              <span className="flex items-center inline-flex" data-id="zj2n3w3zy" data-path="src/pages/MyRecipesPage.tsx">
                                <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 text-yellow-500 mr-1" data-id="6g9gsdnol" data-path="src/pages/MyRecipesPage.tsx">

                                  <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd" data-id="lyfj216am" data-path="src/pages/MyRecipesPage.tsx" />

                                </svg>
                                {(
                          recipe.ratings.reduce(
                            (sum, r) => sum + r.score,
                            0
                          ) / recipe.ratings.length).
                          toFixed(1)}
                              </span>
                            </>
                      }
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0 pt-3 flex justify-end gap-2">
                      <Button
                    variant="outline"
                    size="sm"
                    asChild>

                        <Link to={`/edit-recipe/${recipe.id}`}>Edit</Link>
                      </Button>
                      <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(recipe.id)}>

                        Delete
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
          )}
          </div> :

        <div className="text-center py-12" data-id="xid4nh7sb" data-path="src/pages/MyRecipesPage.tsx">
            <h3 className="text-xl font-semibold mb-2" data-id="v0jm0safx" data-path="src/pages/MyRecipesPage.tsx">You haven't created any recipes yet</h3>
            <p className="text-muted-foreground mb-6" data-id="mx1vij4z9" data-path="src/pages/MyRecipesPage.tsx">
              Share your favorite recipes with the CookBook community!
            </p>
            <Button asChild>
              <Link to="/new-recipe">Create Your First Recipe</Link>
            </Button>
          </div>
        }
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={recipeToDelete !== null}
        onOpenChange={(isOpen) => !isOpen && setRecipeToDelete(null)}>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              recipe and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground">

              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>);

};

export default MyRecipesPage;
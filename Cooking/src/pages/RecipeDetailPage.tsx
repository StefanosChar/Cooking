import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { recipeService, Recipe, Rating } from '@/lib/recipe-service';
import MainLayout from '@/components/layout/MainLayout';

const RecipeDetailPage = () => {
  const { id } = useParams<{id: string;}>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [userRating, setUserRating] = useState<Rating | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const recipeId = parseInt(id);
        const fetchedRecipe = await recipeService.getRecipeById(recipeId);

        if (!fetchedRecipe) {
          toast({
            title: 'Error',
            description: 'Recipe not found',
            variant: 'destructive'
          });
          navigate('/recipes');
          return;
        }

        setRecipe(fetchedRecipe);

        // Check if user has already rated this recipe
        if (user) {
          const existingRating = fetchedRecipe.ratings.find((r) => r.userId === user.id);
          if (existingRating) {
            setUserRating(existingRating);
            setRating(existingRating.score);
            setComment(existingRating.comment);
          }
        }
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
  }, [id, navigate, toast, user]);

  const handleDelete = async () => {
    if (!recipe || !user) return;

    try {
      const success = await recipeService.deleteRecipe(recipe.id, user.id);

      if (success) {
        toast({
          title: 'Success',
          description: 'Recipe deleted successfully'
        });
        navigate('/recipes');
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
    }
  };

  const handleRatingSubmit = async () => {
    if (!recipe || !user || rating === 0) return;

    setIsSubmittingRating(true);
    try {
      const updatedRecipe = await recipeService.addRating(
        recipe.id,
        user.id,
        user.email, // Using email as userName in this demo
        rating,
        comment
      );

      if (updatedRecipe) {
        setRecipe(updatedRecipe);
        setUserRating(updatedRecipe.ratings.find((r) => r.userId === user.id) || null);

        toast({
          title: 'Success',
          description: userRating ? 'Your rating has been updated' : 'Your rating has been added'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit rating',
        variant: 'destructive'
      });
    } finally {
      setIsSubmittingRating(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8" data-id="7xpki37mu" data-path="src/pages/RecipeDetailPage.tsx">
          <div className="animate-pulse space-y-4" data-id="hykq9peox" data-path="src/pages/RecipeDetailPage.tsx">
            <div className="h-8 w-2/3 bg-gray-200 rounded" data-id="34q016uu2" data-path="src/pages/RecipeDetailPage.tsx"></div>
            <div className="h-64 bg-gray-200 rounded" data-id="czomgvm7u" data-path="src/pages/RecipeDetailPage.tsx"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded" data-id="8y3dpep7j" data-path="src/pages/RecipeDetailPage.tsx"></div>
            <div className="space-y-2" data-id="auvo72u63" data-path="src/pages/RecipeDetailPage.tsx">
              <div className="h-4 bg-gray-200 rounded" data-id="3sf6w5uzo" data-path="src/pages/RecipeDetailPage.tsx"></div>
              <div className="h-4 bg-gray-200 rounded" data-id="t4dhyio1m" data-path="src/pages/RecipeDetailPage.tsx"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded" data-id="4c9ps6nom" data-path="src/pages/RecipeDetailPage.tsx"></div>
            </div>
          </div>
        </div>
      </MainLayout>);

  }

  if (!recipe) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 text-center" data-id="u1f35747n" data-path="src/pages/RecipeDetailPage.tsx">
          <h1 className="text-2xl font-bold mb-4" data-id="fv4ddcr41" data-path="src/pages/RecipeDetailPage.tsx">Recipe not found</h1>
          <p className="mb-6" data-id="xdrh3vp0m" data-path="src/pages/RecipeDetailPage.tsx">The recipe you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/recipes">Browse Recipes</Link>
          </Button>
        </div>
      </MainLayout>);

  }

  // Calculate average rating
  const averageRating = recipe.ratings.length > 0 ?
  recipe.ratings.reduce((sum, r) => sum + r.score, 0) / recipe.ratings.length :
  0;

  const isAuthor = user && recipe.authorId === user.id;

  return (
    <MainLayout>
      <div className="container mx-auto py-8" data-id="xhs1t8c68" data-path="src/pages/RecipeDetailPage.tsx">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-id="b6lsykci0" data-path="src/pages/RecipeDetailPage.tsx">
          <div className="md:col-span-2 space-y-6" data-id="ebfbkd36q" data-path="src/pages/RecipeDetailPage.tsx">
            {/* Recipe Header */}
            <div data-id="bbzno0ryt" data-path="src/pages/RecipeDetailPage.tsx">
              <div className="flex justify-between items-start mb-2" data-id="1o494ij7r" data-path="src/pages/RecipeDetailPage.tsx">
                <h1 className="text-3xl font-bold" data-id="ik405zln2" data-path="src/pages/RecipeDetailPage.tsx">{recipe.title}</h1>
                {isAuthor &&
                <div className="flex space-x-2" data-id="9v93ueeiy" data-path="src/pages/RecipeDetailPage.tsx">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/edit-recipe/${recipe.id}`}>Edit</Link>
                    </Button>
                    <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteDialog(true)}>

                      Delete
                    </Button>
                  </div>
                }
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-4" data-id="cjl882cny" data-path="src/pages/RecipeDetailPage.tsx">
                <span data-id="vgnq6uuax" data-path="src/pages/RecipeDetailPage.tsx">By {recipe.authorName}</span>
                <span className="mx-2" data-id="s0a1vqmyy" data-path="src/pages/RecipeDetailPage.tsx">•</span>
                <span data-id="9rvotqmsm" data-path="src/pages/RecipeDetailPage.tsx">{new Date(recipe.createdAt).toLocaleDateString()}</span>
                
                {recipe.updatedAt !== recipe.createdAt &&
                <>
                    <span className="mx-2" data-id="9h3axno0e" data-path="src/pages/RecipeDetailPage.tsx">•</span>
                    <span data-id="826ymt99m" data-path="src/pages/RecipeDetailPage.tsx">Updated {new Date(recipe.updatedAt).toLocaleDateString()}</span>
                  </>
                }
              </div>
            </div>
            
            {/* Recipe Image */}
            <div className="rounded-lg overflow-hidden" data-id="k9wz4dvxe" data-path="src/pages/RecipeDetailPage.tsx">
              <img
                src={recipe.imageUrl || '/placeholder.svg'}
                alt={recipe.title}
                className="w-full h-auto object-cover" data-id="jvyck40yx" data-path="src/pages/RecipeDetailPage.tsx" />

            </div>
            
            {/* Recipe Meta Info */}
            <div className="grid grid-cols-3 gap-4 py-4" data-id="qjne0yczu" data-path="src/pages/RecipeDetailPage.tsx">
              <div className="text-center" data-id="h7ep2dg7s" data-path="src/pages/RecipeDetailPage.tsx">
                <div className="text-muted-foreground text-sm" data-id="emm8iawu7" data-path="src/pages/RecipeDetailPage.tsx">Cooking Time</div>
                <div className="font-semibold" data-id="vn18jqs3l" data-path="src/pages/RecipeDetailPage.tsx">{recipe.cookingTime} min</div>
              </div>
              <div className="text-center" data-id="2kn5c8d9y" data-path="src/pages/RecipeDetailPage.tsx">
                <div className="text-muted-foreground text-sm" data-id="usp8nhme5" data-path="src/pages/RecipeDetailPage.tsx">Difficulty</div>
                <div className="font-semibold capitalize" data-id="w2asb32ny" data-path="src/pages/RecipeDetailPage.tsx">{recipe.difficulty}</div>
              </div>
              <div className="text-center" data-id="ryo2gyq3m" data-path="src/pages/RecipeDetailPage.tsx">
                <div className="text-muted-foreground text-sm" data-id="uspm134vd" data-path="src/pages/RecipeDetailPage.tsx">Rating</div>
                <div className="font-semibold flex justify-center items-center gap-1" data-id="uco9r0ytb" data-path="src/pages/RecipeDetailPage.tsx">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-yellow-500" data-id="u3pj9cf8v" data-path="src/pages/RecipeDetailPage.tsx">

                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd" data-id="k544tz4oa" data-path="src/pages/RecipeDetailPage.tsx" />

                  </svg>
                  {averageRating > 0 ? averageRating.toFixed(1) : 'No ratings'}
                </div>
              </div>
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2" data-id="7u8u1wex2" data-path="src/pages/RecipeDetailPage.tsx">
              {recipe.categories.map((category, index) =>
              <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              )}
            </div>
            
            <Separator />
            
            {/* Ingredients */}
            <div data-id="3blzrxb4f" data-path="src/pages/RecipeDetailPage.tsx">
              <h2 className="text-xl font-semibold mb-4" data-id="nie7wl9ta" data-path="src/pages/RecipeDetailPage.tsx">Ingredients</h2>
              <ul className="space-y-2 list-disc list-inside" data-id="1ora5prpf" data-path="src/pages/RecipeDetailPage.tsx">
                {recipe.ingredients.map((ingredient, index) =>
                <li key={index} data-id="ei52dy11v" data-path="src/pages/RecipeDetailPage.tsx">{ingredient}</li>
                )}
              </ul>
            </div>
            
            <Separator />
            
            {/* Instructions */}
            <div data-id="ly1wfop4v" data-path="src/pages/RecipeDetailPage.tsx">
              <h2 className="text-xl font-semibold mb-4" data-id="hexjpdixc" data-path="src/pages/RecipeDetailPage.tsx">Instructions</h2>
              <div className="prose max-w-none" data-id="x29eg58wn" data-path="src/pages/RecipeDetailPage.tsx">
                {recipe.instructions.split('\n').map((line, index) =>
                line.trim() && <p key={index} data-id="3prmu8z2y" data-path="src/pages/RecipeDetailPage.tsx">{line}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6" data-id="ao3fzm9bs" data-path="src/pages/RecipeDetailPage.tsx">
            {/* Rating Section */}
            <Card>
              <CardHeader>
                <CardTitle>Ratings & Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {user ?
                <div className="space-y-4" data-id="o9rt7ru2w" data-path="src/pages/RecipeDetailPage.tsx">
                    <div data-id="6wu2hw6d3" data-path="src/pages/RecipeDetailPage.tsx">
                      <p className="mb-2 text-sm font-medium" data-id="qe6tqyjts" data-path="src/pages/RecipeDetailPage.tsx">Your Rating</p>
                      <div className="flex gap-1" data-id="vdqxuoh9m" data-path="src/pages/RecipeDetailPage.tsx">
                        {[1, 2, 3, 4, 5].map((star) =>
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-primary`} data-id="rlv5oqedb" data-path="src/pages/RecipeDetailPage.tsx">

                            <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={star <= rating ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          className={`w-6 h-6 ${
                          star <= rating ? 'text-yellow-500' : 'text-gray-300'}`
                          } data-id="70rpbaitm" data-path="src/pages/RecipeDetailPage.tsx">

                              <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd" data-id="dlzvyj0s9" data-path="src/pages/RecipeDetailPage.tsx" />

                            </svg>
                          </button>
                      )}
                      </div>
                    </div>
                    
                    <div data-id="o3r2tac7z" data-path="src/pages/RecipeDetailPage.tsx">
                      <label htmlFor="comment" className="block text-sm font-medium mb-2" data-id="w5utwp92u" data-path="src/pages/RecipeDetailPage.tsx">
                        Your Review
                      </label>
                      <Textarea
                      id="comment"
                      placeholder="Share your thoughts about this recipe..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4} />

                    </div>
                    
                    <Button
                    onClick={handleRatingSubmit}
                    disabled={isSubmittingRating || rating === 0}
                    className="w-full">

                      {isSubmittingRating ?
                    'Submitting...' :
                    userRating ?
                    'Update Review' :
                    'Submit Review'}
                    </Button>
                  </div> :

                <div className="text-center py-4" data-id="qcfhjdqzl" data-path="src/pages/RecipeDetailPage.tsx">
                    <p className="text-muted-foreground mb-4" data-id="28pvsyr07" data-path="src/pages/RecipeDetailPage.tsx">
                      Please login to leave a review
                    </p>
                    <Button asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                  </div>
                }
                
                <Separator className="my-6" />
                
                <div className="space-y-4" data-id="zrmgrp87x" data-path="src/pages/RecipeDetailPage.tsx">
                  {recipe.ratings.length > 0 ?
                  recipe.ratings.map((r) =>
                  <div key={r.id} className="pb-4 border-b last:border-0" data-id="rsnf4bgsm" data-path="src/pages/RecipeDetailPage.tsx">
                        <div className="flex justify-between items-center mb-2" data-id="ky0chs90q" data-path="src/pages/RecipeDetailPage.tsx">
                          <div className="font-medium" data-id="pk7mvmvcp" data-path="src/pages/RecipeDetailPage.tsx">{r.userName}</div>
                          <div className="flex items-center" data-id="epdto8fbg" data-path="src/pages/RecipeDetailPage.tsx">
                            {[...Array(5)].map((_, i) =>
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`w-4 h-4 ${
                          i < r.score ? 'text-yellow-500' : 'text-gray-200'}`
                          } data-id="dqxde9grh" data-path="src/pages/RecipeDetailPage.tsx">

                                <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd" data-id="ez0ss4voy" data-path="src/pages/RecipeDetailPage.tsx" />

                              </svg>
                        )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground" data-id="57xvyeh1y" data-path="src/pages/RecipeDetailPage.tsx">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </p>
                        {r.comment && <p className="mt-2 text-sm" data-id="vivu89rav" data-path="src/pages/RecipeDetailPage.tsx">{r.comment}</p>}
                      </div>
                  ) :

                  <p className="text-center text-muted-foreground py-4" data-id="whk37aylk" data-path="src/pages/RecipeDetailPage.tsx">
                      No reviews yet. Be the first to review!
                    </p>
                  }
                </div>
              </CardContent>
            </Card>
            
            {/* Related Recipes - could be implemented in a real app */}
            <Card>
              <CardHeader>
                <CardTitle>More Recipes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4" data-id="uk5bhod8b" data-path="src/pages/RecipeDetailPage.tsx">
                  <li data-id="3r2m2gj9f" data-path="src/pages/RecipeDetailPage.tsx">
                    <Link
                      to="/recipes"
                      className="text-sm hover:underline block">

                      Explore all recipes
                    </Link>
                  </li>
                  {recipe.categories.map((category, index) =>
                  <li key={index} data-id="wdqjmcnrl" data-path="src/pages/RecipeDetailPage.tsx">
                      <Link
                      to={`/recipes?category=${category}`}
                      className="text-sm hover:underline block">

                        More {category} recipes
                      </Link>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>);

};

export default RecipeDetailPage;
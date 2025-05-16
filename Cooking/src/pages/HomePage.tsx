import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { recipeService, Recipe } from '@/lib/recipe-service';
import RecipeCard from '@/components/recipe/RecipeCard';
import MainLayout from '@/components/layout/MainLayout';

const HomePage = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        // Get all recipes
        const allRecipes = await recipeService.getAllRecipes();

        // Sort by rating for popular recipes
        const sortedByRating = [...allRecipes].sort((a, b) => {
          const aRating = a.ratings.reduce((sum, r) => sum + r.score, 0) / (a.ratings.length || 1);
          const bRating = b.ratings.reduce((sum, r) => sum + r.score, 0) / (b.ratings.length || 1);
          return bRating - aRating;
        });

        // Sort by date for recent recipes
        const sortedByDate = [...allRecipes].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // Set recipes
        setFeaturedRecipes(allRecipes.slice(0, 3));
        setPopularRecipes(sortedByRating.slice(0, 6));
        setRecentRecipes(sortedByDate.slice(0, 6));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white" data-id="3cn0xkv05" data-path="src/pages/HomePage.tsx">
        <div className="absolute inset-0 bg-black/30 z-10" data-id="d77w0s85v" data-path="src/pages/HomePage.tsx"></div>
        <div className="container mx-auto px-4 py-24 relative z-20" data-id="pv4e8usbb" data-path="src/pages/HomePage.tsx">
          <div className="max-w-3xl mx-auto text-center" data-id="m334ozv8k" data-path="src/pages/HomePage.tsx">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-id="v6dq7k0xh" data-path="src/pages/HomePage.tsx">
              Discover & Share Amazing Recipes
            </h1>
            <p className="text-xl mb-8" data-id="s2mgk9vub" data-path="src/pages/HomePage.tsx">
              Join our cooking community to find inspiration and share your culinary creations with passionate food lovers.
            </p>
            <div className="flex flex-wrap justify-center gap-4" data-id="gvumsf815" data-path="src/pages/HomePage.tsx">
              <Button size="lg" asChild className="bg-white text-indigo-600 hover:bg-gray-100">
                <Link to="/recipes">Browse Recipes</Link>
              </Button>
              {!user ?
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                  <Link to="/register">Join CookBook</Link>
                </Button> :

              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                  <Link to="/new-recipe">Share a Recipe</Link>
                </Button>
              }
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-muted/30" data-id="dxg0y61kc" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4" data-id="8mvuuxqdd" data-path="src/pages/HomePage.tsx">
          <h2 className="text-3xl font-bold text-center mb-8" data-id="futw19p2b" data-path="src/pages/HomePage.tsx">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4" data-id="3pukbi44p" data-path="src/pages/HomePage.tsx">
            {['Italian', 'American', 'Mexican', 'Thai', 'Chinese', 'Vegetarian', 'Desserts', 'Quick Meals'].map((category) =>
            <Link
              key={category}
              to={`/recipes?category=${category}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 text-center">

                <span className="font-medium" data-id="7bt8p1tew" data-path="src/pages/HomePage.tsx">{category}</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      {featuredRecipes.length > 0 &&
      <section className="py-16" data-id="vh5q5qw8h" data-path="src/pages/HomePage.tsx">
          <div className="container mx-auto px-4" data-id="g827uwtxl" data-path="src/pages/HomePage.tsx">
            <h2 className="text-3xl font-bold mb-8" data-id="fk1rlaclj" data-path="src/pages/HomePage.tsx">Featured Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-id="agnnmzyeb" data-path="src/pages/HomePage.tsx">
              {isLoading ?
            // Loading skeletons
            Array(3).fill(0).map((_, i) =>
            <div key={i} className="space-y-3" data-id="07cgrmyef" data-path="src/pages/HomePage.tsx">
                    <div className="aspect-video bg-muted rounded-md animate-pulse" data-id="34m7ad2pz" data-path="src/pages/HomePage.tsx" />
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" data-id="8aezu87xx" data-path="src/pages/HomePage.tsx" />
                    <div className="h-3 w-1/2 bg-muted rounded animate-pulse" data-id="yzxjn6h1o" data-path="src/pages/HomePage.tsx" />
                  </div>
            ) :

            featuredRecipes.map((recipe) =>
            <RecipeCard key={recipe.id} recipe={recipe} />
            )
            }
            </div>
          </div>
        </section>
      }

      {/* Tabbed Recipe Section */}
      <section className="py-16 bg-muted/30" data-id="k10k6sk4a" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4" data-id="obud0ll9t" data-path="src/pages/HomePage.tsx">
          <Tabs defaultValue="popular" className="space-y-8">
            <div className="flex justify-between items-center" data-id="2cgv3z1dm" data-path="src/pages/HomePage.tsx">
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              <Button variant="link" asChild>
                <Link to="/recipes">View All Recipes</Link>
              </Button>
            </div>
            
            <TabsContent value="popular" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-id="lyrcav7uw" data-path="src/pages/HomePage.tsx">
                {isLoading ?
                // Loading skeletons
                Array(6).fill(0).map((_, i) =>
                <div key={i} className="space-y-3" data-id="2ajfz1y8v" data-path="src/pages/HomePage.tsx">
                      <div className="aspect-video bg-muted rounded-md animate-pulse" data-id="4b4e26xjh" data-path="src/pages/HomePage.tsx" />
                      <div className="h-4 w-3/4 bg-muted rounded animate-pulse" data-id="scyyqkw9c" data-path="src/pages/HomePage.tsx" />
                      <div className="h-3 w-1/2 bg-muted rounded animate-pulse" data-id="ablh3ho5z" data-path="src/pages/HomePage.tsx" />
                    </div>
                ) :

                popularRecipes.map((recipe) =>
                <RecipeCard key={recipe.id} recipe={recipe} />
                )
                }
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-id="lys6byfps" data-path="src/pages/HomePage.tsx">
                {isLoading ?
                // Loading skeletons
                Array(6).fill(0).map((_, i) =>
                <div key={i} className="space-y-3" data-id="kcwacmaw5" data-path="src/pages/HomePage.tsx">
                      <div className="aspect-video bg-muted rounded-md animate-pulse" data-id="muabp2ige" data-path="src/pages/HomePage.tsx" />
                      <div className="h-4 w-3/4 bg-muted rounded animate-pulse" data-id="hrlpdw4sh" data-path="src/pages/HomePage.tsx" />
                      <div className="h-3 w-1/2 bg-muted rounded animate-pulse" data-id="80n43flu2" data-path="src/pages/HomePage.tsx" />
                    </div>
                ) :

                recentRecipes.map((recipe) =>
                <RecipeCard key={recipe.id} recipe={recipe} />
                )
                }
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground" data-id="kwqjj4jab" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4 text-center" data-id="5qbgupnqx" data-path="src/pages/HomePage.tsx">
          <h2 className="text-3xl font-bold mb-4" data-id="3tms41ue8" data-path="src/pages/HomePage.tsx">Ready to share your recipes?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-id="wavi6aw23" data-path="src/pages/HomePage.tsx">
            Join our growing community of food enthusiasts and share your favorite recipes with the world.
          </p>
          {!user ?
          <div className="flex flex-wrap justify-center gap-4" data-id="iwebunqlq" data-path="src/pages/HomePage.tsx">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link to="/register">Sign Up</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                <Link to="/login">Login</Link>
              </Button>
            </div> :

          <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
              <Link to="/new-recipe">Create New Recipe</Link>
            </Button>
          }
        </div>
      </section>
    </MainLayout>);

};

export default HomePage;
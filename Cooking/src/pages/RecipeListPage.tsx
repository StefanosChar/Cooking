import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import RecipeCard from '@/components/recipe/RecipeCard';
import { recipeService, Recipe } from '@/lib/recipe-service';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/hooks/use-toast';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  // Extracting search params
  const category = searchParams.get('category') || '';
  const difficulty = searchParams.get('difficulty') || 'all';
  const search = searchParams.get('search') || '';
  const activeTab = searchParams.get('tab') || 'all';

  const updateFilters = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('searchTerm') as string;
    updateFilters('search', searchTerm);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      try {
        const filters: Record<string, string | number> = {};
        if (category) filters.category = category;
        if (difficulty) filters.difficulty = difficulty;
        if (search) filters.search = search;

        let fetchedRecipes = await recipeService.getAllRecipes(filters);

        // If viewing "popular" tab, sort by highest average rating
        if (activeTab === 'popular') {
          fetchedRecipes = fetchedRecipes.sort((a, b) => {
            const aRating = a.ratings.reduce((sum, r) => sum + r.score, 0) / (a.ratings.length || 1);
            const bRating = b.ratings.reduce((sum, r) => sum + r.score, 0) / (b.ratings.length || 1);
            return bRating - aRating;
          });
        }

        // If viewing "recent" tab, sort by newest
        if (activeTab === 'recent') {
          fetchedRecipes = fetchedRecipes.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        setRecipes(fetchedRecipes);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load recipes',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, [category, difficulty, search, activeTab, toast]);

  const handleTabChange = (value: string) => {
    updateFilters('tab', value);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8" data-id="3wtn5juf2" data-path="src/pages/RecipeListPage.tsx">
        <div className="mb-8 text-center" data-id="20km8dle0" data-path="src/pages/RecipeListPage.tsx">
          <h1 className="text-3xl font-bold mb-2" data-id="6xr73q27r" data-path="src/pages/RecipeListPage.tsx">Discover Recipes</h1>
          <p className="text-muted-foreground" data-id="65jz9p78d" data-path="src/pages/RecipeListPage.tsx">
            Find delicious recipes for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8" data-id="o3v4x6odd" data-path="src/pages/RecipeListPage.tsx">
          {/* Filters Sidebar */}
          <div className="space-y-6" data-id="g5x7egr6g" data-path="src/pages/RecipeListPage.tsx">
            <div data-id="ghkdd7kvn" data-path="src/pages/RecipeListPage.tsx">
              <h3 className="font-medium mb-3" data-id="ldh6a1raw" data-path="src/pages/RecipeListPage.tsx">Search</h3>
              <form onSubmit={handleSearch} className="flex gap-2" data-id="8ftg9ukry" data-path="src/pages/RecipeListPage.tsx">
                <Input
                  name="searchTerm"
                  placeholder="Search recipes..."
                  defaultValue={search}
                  className="w-full" />

                <Button type="submit" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4" data-id="yoq7z34ph" data-path="src/pages/RecipeListPage.tsx">

                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd" data-id="iu8bg989m" data-path="src/pages/RecipeListPage.tsx" />

                  </svg>
                </Button>
              </form>
            </div>

            <div data-id="03xt1qfb0" data-path="src/pages/RecipeListPage.tsx">
              <h3 className="font-medium mb-3" data-id="xho01h0vw" data-path="src/pages/RecipeListPage.tsx">Difficulty</h3>
              <Select
                value={difficulty}
                onValueChange={(value) => updateFilters('difficulty', value)}>

                <SelectTrigger>
                  <SelectValue placeholder="All difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div data-id="rrzo5d0yp" data-path="src/pages/RecipeListPage.tsx">
              <h3 className="font-medium mb-3" data-id="tycs9emy1" data-path="src/pages/RecipeListPage.tsx">Categories</h3>
              <div className="flex flex-wrap gap-2" data-id="u19r2ticy" data-path="src/pages/RecipeListPage.tsx">
                {['Italian', 'American', 'Thai', 'Mexican', 'Chinese', 'Vegetarian', 'Dessert', 'BBQ', 'Pasta'].map((cat) =>
                <Badge
                  key={cat}
                  variant={category === cat ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => updateFilters('category', category === cat ? '' : cat)}>

                    {cat}
                  </Badge>
                )}
              </div>
            </div>

            {/* Active filters */}
            {(category || difficulty || search) &&
            <div data-id="rc1qrhy1g" data-path="src/pages/RecipeListPage.tsx">
                <div className="flex items-center justify-between mb-3" data-id="j2ggiyqpj" data-path="src/pages/RecipeListPage.tsx">
                  <h3 className="font-medium" data-id="ywxt1v28c" data-path="src/pages/RecipeListPage.tsx">Active Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2" data-id="o98jln5ip" data-path="src/pages/RecipeListPage.tsx">
                  {category &&
                <Badge className="gap-1 pl-2">
                      Category: {category}
                      <button onClick={() => updateFilters('category', '')} data-id="h642y75mk" data-path="src/pages/RecipeListPage.tsx">
                        <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4" data-id="7e8fqmkov" data-path="src/pages/RecipeListPage.tsx">

                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" data-id="49sw2wnsj" data-path="src/pages/RecipeListPage.tsx" />
                        </svg>
                      </button>
                    </Badge>
                }
                  {difficulty &&
                <Badge className="gap-1 pl-2">
                      Difficulty: {difficulty}
                      <button onClick={() => updateFilters('difficulty', '')} data-id="2dkcx2x6y" data-path="src/pages/RecipeListPage.tsx">
                        <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4" data-id="fdxfdcz3r" data-path="src/pages/RecipeListPage.tsx">

                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" data-id="2a88a4yfu" data-path="src/pages/RecipeListPage.tsx" />
                        </svg>
                      </button>
                    </Badge>
                }
                  {search &&
                <Badge className="gap-1 pl-2">
                      Search: {search}
                      <button onClick={() => updateFilters('search', '')} data-id="m979ilshe" data-path="src/pages/RecipeListPage.tsx">
                        <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4" data-id="m1zyfb02j" data-path="src/pages/RecipeListPage.tsx">

                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" data-id="ldu60j3xc" data-path="src/pages/RecipeListPage.tsx" />
                        </svg>
                      </button>
                    </Badge>
                }
                </div>
              </div>
            }
          </div>

          {/* Main Content */}
          <div data-id="nknn170la" data-path="src/pages/RecipeListPage.tsx">
            <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
              <div className="flex justify-between items-center mb-6" data-id="s08orowc3" data-path="src/pages/RecipeListPage.tsx">
                <TabsList>
                  <TabsTrigger value="all">All Recipes</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                </TabsList>
                <div className="text-sm text-muted-foreground" data-id="1xn9aejt7" data-path="src/pages/RecipeListPage.tsx">
                  {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
                </div>
              </div>

              <TabsContent value="all" className="m-0">
                {isLoading ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-id="yrsr1czsa" data-path="src/pages/RecipeListPage.tsx">
                    {[1, 2, 3, 4, 5, 6].map((i) =>
                  <div key={i} className="space-y-3" data-id="lm1fk668n" data-path="src/pages/RecipeListPage.tsx">
                        <div className="aspect-video bg-muted rounded-md animate-pulse" data-id="pl2741hha" data-path="src/pages/RecipeListPage.tsx" />
                        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" data-id="kaii5rddb" data-path="src/pages/RecipeListPage.tsx" />
                        <div className="h-3 w-1/2 bg-muted rounded animate-pulse" data-id="et0usnqhz" data-path="src/pages/RecipeListPage.tsx" />
                      </div>
                  )}
                  </div> :
                recipes.length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-id="hlcnovv7d" data-path="src/pages/RecipeListPage.tsx">
                    {recipes.map((recipe) =>
                  <RecipeCard key={recipe.id} recipe={recipe} />
                  )}
                  </div> :

                <div className="text-center py-12" data-id="dqtll5sr0" data-path="src/pages/RecipeListPage.tsx">
                    <p className="text-muted-foreground" data-id="xnpkz7f3p" data-path="src/pages/RecipeListPage.tsx">No recipes found matching your filters</p>
                    <Button variant="link" onClick={clearFilters}>
                      Clear all filters
                    </Button>
                  </div>
                }
              </TabsContent>

              <TabsContent value="popular" className="m-0">
                {isLoading ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-id="qukzfjer4" data-path="src/pages/RecipeListPage.tsx">
                    {[1, 2, 3, 4, 5, 6].map((i) =>
                  <div key={i} className="space-y-3" data-id="nynys2ifw" data-path="src/pages/RecipeListPage.tsx">
                        <div className="aspect-video bg-muted rounded-md animate-pulse" data-id="haz2b0gyn" data-path="src/pages/RecipeListPage.tsx" />
                        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" data-id="b2dbmtcbq" data-path="src/pages/RecipeListPage.tsx" />
                        <div className="h-3 w-1/2 bg-muted rounded animate-pulse" data-id="qpl0vpywb" data-path="src/pages/RecipeListPage.tsx" />
                      </div>
                  )}
                  </div> :
                recipes.length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-id="vi4n7bxaj" data-path="src/pages/RecipeListPage.tsx">
                    {recipes.map((recipe) =>
                  <RecipeCard key={recipe.id} recipe={recipe} />
                  )}
                  </div> :

                <div className="text-center py-12" data-id="n2vnwyh74" data-path="src/pages/RecipeListPage.tsx">
                    <p className="text-muted-foreground" data-id="8x4maralz" data-path="src/pages/RecipeListPage.tsx">No recipes found matching your filters</p>
                    <Button variant="link" onClick={clearFilters}>
                      Clear all filters
                    </Button>
                  </div>
                }
              </TabsContent>

              <TabsContent value="recent" className="m-0">
                {isLoading ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-id="inwmywve6" data-path="src/pages/RecipeListPage.tsx">
                    {[1, 2, 3, 4, 5, 6].map((i) =>
                  <div key={i} className="space-y-3" data-id="2imm7g2e7" data-path="src/pages/RecipeListPage.tsx">
                        <div className="aspect-video bg-muted rounded-md animate-pulse" data-id="3fito0qzg" data-path="src/pages/RecipeListPage.tsx" />
                        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" data-id="owmergl7e" data-path="src/pages/RecipeListPage.tsx" />
                        <div className="h-3 w-1/2 bg-muted rounded animate-pulse" data-id="3bcz0rygl" data-path="src/pages/RecipeListPage.tsx" />
                      </div>
                  )}
                  </div> :
                recipes.length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-id="7d3t86ufg" data-path="src/pages/RecipeListPage.tsx">
                    {recipes.map((recipe) =>
                  <RecipeCard key={recipe.id} recipe={recipe} />
                  )}
                  </div> :

                <div className="text-center py-12" data-id="tmke7w0rh" data-path="src/pages/RecipeListPage.tsx">
                    <p className="text-muted-foreground" data-id="0fd8fy318" data-path="src/pages/RecipeListPage.tsx">No recipes found matching your filters</p>
                    <Button variant="link" onClick={clearFilters}>
                      Clear all filters
                    </Button>
                  </div>
                }
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>);

};

export default RecipeListPage;
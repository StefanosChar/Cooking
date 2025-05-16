import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Recipe } from '@/lib/recipe-service';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  // Calculate average rating
  const averageRating = recipe.ratings.length > 0 ?
  recipe.ratings.reduce((sum, rating) => sum + rating.score, 0) / recipe.ratings.length :
  0;

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/recipes/${recipe.id}`}>
        <div className="aspect-video w-full overflow-hidden" data-id="20elua4xe" data-path="src/components/recipe/RecipeCard.tsx">
          <img
            src={recipe.imageUrl || '/placeholder.svg'}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" data-id="2bafhp8n6" data-path="src/components/recipe/RecipeCard.tsx" />

        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start" data-id="k4kbtvvow" data-path="src/components/recipe/RecipeCard.tsx">
            <h3 className="text-lg font-semibold line-clamp-1" data-id="ajge870n8" data-path="src/components/recipe/RecipeCard.tsx">{recipe.title}</h3>
            <div className="flex items-center gap-1" data-id="mbepfpkz2" data-path="src/components/recipe/RecipeCard.tsx">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-yellow-500" data-id="rr8kfelvx" data-path="src/components/recipe/RecipeCard.tsx">

                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd" data-id="ejxti5w9y" data-path="src/components/recipe/RecipeCard.tsx" />

              </svg>
              <span className="text-sm font-medium" data-id="wc5c4hnfx" data-path="src/components/recipe/RecipeCard.tsx">
                {averageRating > 0 ? averageRating.toFixed(1) : 'New'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 pb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground" data-id="xh8rtnlpx" data-path="src/components/recipe/RecipeCard.tsx">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4" data-id="24ptqruic" data-path="src/components/recipe/RecipeCard.tsx">

              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clipRule="evenodd" data-id="kl33ctyao" data-path="src/components/recipe/RecipeCard.tsx" />

            </svg>
            <span data-id="josla0exv" data-path="src/components/recipe/RecipeCard.tsx">{recipe.cookingTime} min</span>
            <span className="mx-1" data-id="or01jd7gc" data-path="src/components/recipe/RecipeCard.tsx">•</span>
            <span className="capitalize" data-id="f3f274z0y" data-path="src/components/recipe/RecipeCard.tsx">{recipe.difficulty}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
          {recipe.categories.slice(0, 3).map((category, index) =>
          <Badge key={index} variant="secondary" className="text-xs">
              {category}
            </Badge>
          )}
        </CardFooter>
      </Link>
    </Card>);

};

export default RecipeCard;
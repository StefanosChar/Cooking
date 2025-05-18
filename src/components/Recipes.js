import React, { useState } from 'react';
import NavBar from './NavBar'; // Adjust path if needed

// Example mock data (replace with API calls in production)
const mockCategories = [
  "Italian", "American", "Mexican", "Thai", "Chinese", "Vegetarian", "Desserts", "Quick Meals"
];

const mockRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    rating: 4.5,
    prep_time: 25,
    difficulty: "Medium",
    categories: ["Italian", "Pasta", "Quick Meals"]
  },
  {
    id: 2,
    title: "Classic Beef Burger",
    image_url: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    rating: 5.0,
    prep_time: 30,
    difficulty: "Easy",
    categories: ["American", "Burgers", "BBQ"]
  },
  {
    id: 3,
    title: "Thai Green Curry",
    image_url: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
    rating: 4.5,
    prep_time: 35,
    difficulty: "Medium",
    categories: ["Thai", "Curry", "Chicken"]
  }
];

const Recipes = ({ auth }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes] = useState(mockRecipes);

  const filteredRecipes = selectedCategory
    ? recipes.filter(recipe => recipe.categories.includes(selectedCategory))
    : recipes;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NavBar auth={auth} />

      <div className="container py-4 flex-grow-1">
        {/* Inline CSS for hover animation and category buttons */}
        <style>{`
          .recipe-card {
            transition: 
              transform 0.3s cubic-bezier(.25,.8,.25,1),
              box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
            cursor: pointer;
            z-index: 1;
          }
          .recipe-card:hover {
            transform: scale(1.04) translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 123, 255, 0.2), 0 1.5px 3px rgba(0,0,0,0.15);
            z-index: 2;
          }
          .recipe-card img {
            transition: opacity 0.3s;
          }
          .recipe-card:hover img {
            opacity: 0.85;
          }
          .category-btn {
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            border-radius: 20px;
            border: 1px solid #dee2e6;
            background: #fff;
            color: #333;
            padding: 0.4em 1.2em;
            transition: background 0.2s, color 0.2s, box-shadow 0.2s;
            cursor: pointer;
          }
          .category-btn.selected, .category-btn:hover {
            background: #0d6efd;
            color: #fff;
            box-shadow: 0 2px 8px rgba(13,110,253,0.08);
          }
        `}</style>

        <h2 className="fw-bold mb-4">Popular Categories</h2>
        <div className="d-flex gap-2 flex-wrap mb-4">
          {mockCategories.map(cat => (
            <button
              key={cat}
              className={`category-btn${selectedCategory === cat ? ' selected' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <h3 className="fw-bold mb-4">Featured Recipes</h3>
        <div className="row g-4">
          {filteredRecipes.map(recipe => (
            <div className="col-md-4" key={recipe.id}>
              <div className="card recipe-card h-100 shadow-sm">
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="card-img-top"
                  style={{ height: 180, objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <div className="mb-2">
                    <span className="me-3"><i className="bi bi-clock"></i> {recipe.prep_time} min</span>
                    <span className="me-3"><i className="bi bi-bar-chart"></i> {recipe.difficulty}</span>
                    <span><i className="bi bi-star-fill text-warning"></i> {recipe.rating}</span>
                  </div>
                  <div>
                    {recipe.categories.map(tag => (
                      <span key={tag} className="badge bg-light text-dark border me-1">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredRecipes.length === 0 && (
            <div className="col-12 text-center text-muted">
              <p>No recipes found for this category.</p>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-white text-center py-3 shadow-sm mt-auto">
        &copy; {new Date().getFullYear()} CookBook. All rights reserved.
      </footer>
    </div>
  );
};

export default Recipes;

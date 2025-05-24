import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

// Mock συνταγές στα Ελληνικά
const Recipe = [
  {
    id: 1,
    title: "Σπαγγέτι Καρμπονάρα",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    rating: 4.5,
    prep_time: 25,
    difficulty: "Μέτριο",
    categories: ["Ιταλική", "Ζυμαρικά", "Γρήγορα Γεύματα"]
  },
  {
    id: 2,
    title: "Κλασικό Μπέργκερ Μοσχαρίσιο",
    image_url: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    rating: 5.0,
    prep_time: 30,
    difficulty: "Εύκολο",
    categories: ["Αμερικάνικη", "Μπέργκερ", "BBQ"]
  },
  {
    id: 3,
    title: "Πράσινο Ταϊλανδέζικο Κάρυ",
    image_url: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
    rating: 4.5,
    prep_time: 35,
    difficulty: "Μέτριο",
    categories: ["Ταϊλανδέζικη", "Κάρυ", "Κοτόπουλο"]
  },
  {
    id: 4,
    title: "Μπάρες παγωτού Dubai chocolate",
    image_url: "/ScreenshotDubaiChocolate.webp",
    rating: 5.0,
    prep_time: 15,
    difficulty: "Εύκολο",
    categories: ["Γλυκά", "Φυστίκι", "Ψυγείου", "Γρήγορα Γεύματα"]
  },
  {
    id: 5,
    title: "Μιλφέιγ με παγωτό",
    image_url: "/MilfeigIcecream.webp",
    rating: 4.5,
    prep_time: 20,
    difficulty: "Εύκολο",
    categories: ["Γλυκά", "Γαλλική Κουζίνα", "Παγωτά", "Γρήγορα Γεύματα"]
  },
  {
    id: 6,
    title: "Καραμελωμένα chicken strips",
    image_url: "/ChickenStrips.webp",
    rating: 5.0,
    prep_time: 20,
    difficulty: "Εύκολο",
    categories: ["Μεξικάνικη", "Κοτόπουλο", "Γρήγορα Γεύματα"]
  },
  {
    id: 7,
    title: "Χοιρινά σουβλάκια BBQ από ψαρονέφρι με smashed potatoes",
    image_url: "/Soublakia.webp",
    rating: 5.0,
    prep_time: 45,
    difficulty: "Μέτριο",
    categories: ["Ελληνική Κουζίνα", "Κοτόπουλο", "Πατάτες" , "BBQ"]
  }
];

// Αυτόματα όλες οι κατηγορίες που υπάρχουν στις συνταγές (μοναδικές και ταξινομημένες)
const allCategories = Array.from(
  new Set(
    Recipe.flatMap(recipe => recipe.categories)
  )
).sort();

const Recipes = ({ auth }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes] = useState(Recipe);

  const filteredRecipes = selectedCategory
    ? recipes.filter(recipe => recipe.categories.includes(selectedCategory))
    : recipes;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NavBar auth={auth} />

      <div className="container py-4 flex-grow-1">
        <style>{`
          .recipe-card {
            transition: 
              transform 0.3s cubic-bezier(.25,.8,.25,1),
              box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
            cursor: pointer;
            z-index: 1;
            text-decoration: none;
            color: inherit;
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

        <h2 className="fw-bold mb-4">Δημοφιλείς Κατηγορίες</h2>
        <div className="d-flex gap-2 flex-wrap mb-4">
          {allCategories.map(cat => (
            <button
              key={cat}
              className={`category-btn${selectedCategory === cat ? ' selected' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <h3 className="fw-bold mb-4">Προτεινόμενες Συνταγές</h3>
        <div className="row g-4">
          {filteredRecipes.map(recipe => (
            <div className="col-md-4" key={recipe.id}>
              <Link
                to={`/recipes/${recipe.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
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
                      <span className="me-3"><i className="bi bi-clock"></i> {recipe.prep_time} λεπτά</span>
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
              </Link>
            </div>
          ))}
          {filteredRecipes.length === 0 && (
            <div className="col-12 text-center text-muted">
              <p>Δεν βρέθηκαν συνταγές για αυτή την κατηγορία.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipes;

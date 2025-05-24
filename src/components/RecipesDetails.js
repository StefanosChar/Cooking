import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from './NavBar';

// Greek mock data for all recipes
const mockRecipes = [
  {
    id: 1,
    title: "Σπαγγέτι Καρμπονάρα",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    rating: 4.5,
    prep_time: 25,
    difficulty: "Μέτριο",
    categories: ["Ιταλική", "Ζυμαρικά", "Γρήγορα Γεύματα"],
    description: "Κλασικό ιταλικό πιάτο ζυμαρικών με αυγά, τυρί, πανσέτα και πιπέρι.",
    ingredients: [
      "200γρ σπαγγέτι",
      "100γρ πανσέτα",
      "2 μεγάλα αυγά",
      "50γρ τυρί πεκορίνο",
      "50γρ παρμεζάνα",
      "Φρεσκοτριμμένο μαύρο πιπέρι",
      "Αλάτι"
    ],
    instructions: [
      "Βράζετε μια μεγάλη κατσαρόλα με νερό.",
      "Τηγανίζετε την πανσέτα μέχρι να γίνει τραγανή και χρυσαφένια.",
      "Χτυπάτε τα αυγά σε ένα μπολ, προσθέτετε αλάτι, πιπέρι και τα τυριά.",
      "Βράζετε τα σπαγγέτι, τα στραγγίζετε και τα προσθέτετε στην πανσέτα.",
      "Αποσύρετε από τη φωτιά, προσθέτετε το μείγμα αυγού-τυριού και ανακατεύετε γρήγορα.",
      "Σερβίρετε αμέσως με επιπλέον τυρί και πιπέρι."
    ]
  },
  {
    id: 2,
    title: "Κλασικό Μπέργκερ Μοσχαρίσιο",
    image_url: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    rating: 5.0,
    prep_time: 30,
    difficulty: "Εύκολο",
    categories: ["Αμερικάνικη", "Μπέργκερ", "BBQ"],
    description: "Ζουμερό μπιφτέκι μοσχαρίσιο με φρέσκα υλικά και αφράτο ψωμάκι.",
    ingredients: [
      "2 μπιφτέκια μοσχαρίσια",
      "2 ψωμάκια για μπέργκερ",
      "Μαρούλι",
      "Φέτες ντομάτας",
      "Τυρί τσένταρ",
      "Κρεμμύδι",
      "Κέτσαπ",
      "Μουστάρδα",
      "Αλάτι & πιπέρι"
    ],
    instructions: [
      "Αλατοπιπερώνετε τα μπιφτέκια.",
      "Ψήνετε τα μπιφτέκια στη σχάρα ή στο τηγάνι.",
      "Ψήνετε ελαφρώς τα ψωμάκια.",
      "Συναρμολογείτε το μπέργκερ με μαρούλι, ντομάτα, τυρί, κρεμμύδι και σάλτσες.",
      "Σερβίρετε ζεστό με πατάτες ή σαλάτα."
    ]
  },
  {
    id: 3,
    title: "Πράσινο Ταϊλανδέζικο Κάρυ",
    image_url: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
    rating: 4.5,
    prep_time: 35,
    difficulty: "Μέτριο",
    categories: ["Ταϊλανδέζικη", "Κάρυ", "Κοτόπουλο"],
    description: "Αρωματικό ταϊλανδέζικο κάρυ με γάλα καρύδας, κοτόπουλο και φρέσκα μυρωδικά.",
    ingredients: [
      "400γρ φιλέτο κοτόπουλο",
      "2 κ.σ. πράσινη πάστα κάρυ",
      "400ml γάλα καρύδας",
      "1 μελιτζάνα",
      "1 κόκκινη πιπεριά τσίλι",
      "Φρέσκος βασιλικός",
      "1 κ.σ. fish sauce",
      "1 κ.γ. ζάχαρη",
      "Λάδι"
    ],
    instructions: [
      "Ζεσταίνετε το λάδι και σοτάρετε την πάστα κάρυ μέχρι να βγάλει άρωμα.",
      "Προσθέτετε το κοτόπουλο και το σοτάρετε μέχρι να αλλάξει χρώμα.",
      "Ρίχνετε το γάλα καρύδας και αφήνετε να πάρει βράση.",
      "Προσθέτετε μελιτζάνα, πιπεριά, fish sauce και ζάχαρη.",
      "Σιγοβράζετε μέχρι να μαλακώσουν τα λαχανικά.",
      "Γαρνίρετε με βασιλικό και σερβίρετε με ρύζι."
    ]
  },
  {
    id: 4,
    title: "Μπάρες παγωτού Dubai chocolate",
    image_url: "/ScreenshotDubaiChocolate.webp",
    rating: 5.0,
    prep_time: 15,
    difficulty: "Εύκολο",
    categories: ["Γλυκά", "Φυστίκι", "Ψυγείου", "Γρήγορα Γεύματα"],
    description: "Παγωμένες μπάρες σοκολάτας με φυστίκι και τραγανή βάση. Ένα δροσερό, εντυπωσιακό γλυκό ψυγείου!",
    ingredients: [
      "200γρ φυστίκια Αιγίνης",
      "100γρ μπισκότα digestive",
      "80γρ βούτυρο λιωμένο",
      "250γρ κουβερτούρα σοκολάτα",
      "120ml κρέμα γάλακτος",
      "2 κ.σ. μέλι",
      "2 κ.σ. ψιλοκομμένα φυστίκια για γαρνίρισμα"
    ],
    instructions: [
      "Τρίψε τα μπισκότα και τα φυστίκια στο multi.",
      "Πρόσθεσε το λιωμένο βούτυρο και το μέλι, ανακάτεψε καλά.",
      "Άπλωσε το μείγμα σε φόρμα και βάλε στο ψυγείο.",
      "Λιώσε τη σοκολάτα με την κρέμα γάλακτος και άπλωσέ τη πάνω στη βάση.",
      "Γαρνίρισε με φυστίκια και άφησε στο ψυγείο να σφίξει.",
      "Κόψε σε μπάρες και απόλαυσε!"
    ]
  },
  {
    id: 5,
    title: "Μιλφέιγ με παγωτό",
    image_url: "/MilfeigIcecream.webp",
    rating: 4.5,
    prep_time: 20,
    difficulty: "Εύκολο",
    categories: ["Γλυκά", "Γαλλική Κουζίνα", "Παγωτά", "Γρήγορα Γεύματα"],
    description: "Δροσερό μιλφέιγ με παγωτό βανίλια και τραγανή σφολιάτα. Το τέλειο καλοκαιρινό επιδόρπιο!",
    ingredients: [
      "1 πακέτο φύλλο σφολιάτας",
      "500ml παγωτό βανίλια",
      "200ml κρέμα γάλακτος",
      "50γρ ζάχαρη άχνη",
      "Λίγη βανίλια",
      "Φρέσκα φρούτα για διακόσμηση"
    ],
    instructions: [
      "Ψήσε τα φύλλα σφολιάτας μέχρι να ροδίσουν.",
      "Χτύπα την κρέμα γάλακτος με τη ζάχαρη άχνη και τη βανίλια.",
      "Κόψε τη σφολιάτα σε κομμάτια.",
      "Στρώσε εναλλάξ σφολιάτα, παγωτό και σαντιγί.",
      "Διακόσμησε με φρούτα και σερβίρισε αμέσως."
    ]
  },
  {
    id: 6,
    title: "Καραμελωμένα chicken strips",
    image_url: "/ChickenStrips.webp",
    rating: 5.0,
    prep_time: 20,
    difficulty: "Εύκολο",
    categories: ["Μεξικάνικη", "Κοτόπουλο", "Γρήγορα Γεύματα"],
    description: "Τραγανά strips κοτόπουλου με γλυκιά καραμελωμένη σάλτσα. Τέλεια για σνακ ή κυρίως πιάτο!",
    ingredients: [
      "500γρ φιλέτο κοτόπουλο",
      "1 φλ. αλεύρι",
      "2 αυγά",
      "1 φλ. φρυγανιά",
      "2 κ.σ. μέλι",
      "2 κ.σ. σόγια σος",
      "Λάδι για τηγάνισμα",
      "Αλάτι, πιπέρι"
    ],
    instructions: [
      "Κόψε το κοτόπουλο σε λωρίδες.",
      "Πέρασέ το διαδοχικά από αλεύρι, αυγό και φρυγανιά.",
      "Τηγάνισε μέχρι να ροδίσει.",
      "Σε κατσαρολάκι ζέστανε το μέλι και τη σόγια σος.",
      "Ρίξε τα strips στη σάλτσα και ανακάτεψε.",
      "Σέρβιρε ζεστά."
    ]
  },
  {
    id: 7,
    title: "Χοιρινά σουβλάκια BBQ από ψαρονέφρι με smashed potatoes",
    image_url: "/Soublakia.webp",
    rating: 5.0,
    prep_time: 45,
    difficulty: "Μέτριο",
    categories: ["Ελληνική Κουζίνα", "Χοιρινό", "Πατάτες", "BBQ"],
    description: "Ζουμερά χοιρινά σουβλάκια από ψαρονέφρι στη σχάρα, με smashed potatoes και σπιτικές πίτες.",
    ingredients: [
      "500γρ ψαρονέφρι χοιρινό",
      "Ξυλάκια για σουβλάκι",
      "2 κ.σ. ελαιόλαδο",
      "1 κ.γ. πάπρικα",
      "1 κ.γ. ρίγανη",
      "Αλάτι, πιπέρι",
      "6 πατάτες μέτριες",
      "2 κ.σ. βούτυρο",
      "Σπιτικές πίτες για σερβίρισμα"
    ],
    instructions: [
      "Κόψε το ψαρονέφρι σε κύβους, μαρινάρισε με λάδι, πάπρικα, ρίγανη, αλάτι, πιπέρι.",
      "Πέρασε τα κομμάτια σε ξυλάκια και ψήσε σε δυνατή σχάρα.",
      "Βράσε τις πατάτες, σπάσ’ τες με πιρούνι, πρόσθεσε βούτυρο, αλάτι, πιπέρι.",
      "Σέρβιρε τα σουβλάκια με τις smashed potatoes και ζεστές πίτες."
    ]
  }
];

const RecipesDetails = ({ auth }) => {
  const { id } = useParams();
  const recipe = mockRecipes.find(r => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="bg-light min-vh-100">
        <NavBar auth={auth} />
        <div className="container py-5 text-center">
          <h2>Η συνταγή δεν βρέθηκε.</h2>
          <Link to="/recipes" className="btn btn-primary mt-3">Επιστροφή στις Συνταγές</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NavBar auth={auth} />
      <div className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="card-img-top"
                style={{ maxHeight: 350, objectFit: 'cover' }}
              />
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <h1 className="card-title mb-0 flex-grow-1 fw-bold">{recipe.title}</h1>
                  <span className="badge bg-warning text-dark ms-2 fs-6">
                    <i className="bi bi-star-fill"></i> {recipe.rating}
                  </span>
                </div>
                <div className="mb-2 text-muted">
                  <span className="me-3"><i className="bi bi-clock"></i> {recipe.prep_time} λεπτά</span>
                  <span className="me-3"><i className="bi bi-bar-chart"></i> {recipe.difficulty}</span>
                  {recipe.categories.map(tag => (
                    <span key={tag} className="badge bg-light text-dark border ms-1">{tag}</span>
                  ))}
                </div>
                <p className="lead mt-3">{recipe.description}</p>
                <hr />
                <h5 className="fw-bold">Υλικά</h5>
                <ul className="mb-4">
                  {recipe.ingredients.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <h5 className="fw-bold">Οδηγίες Εκτέλεσης</h5>
                <ol>
                  {recipe.instructions.map((step, idx) => (
                    <li key={idx} className="mb-2">{step}</li>
                  ))}
                </ol>
                <Link to="/recipes" className="btn btn-outline-primary mt-4">
                  &larr; Επιστροφή στις Συνταγές
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesDetails;

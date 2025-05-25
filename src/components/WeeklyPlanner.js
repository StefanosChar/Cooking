import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "./NavBar"; 

const WEEKDAYS = [
  "Δευτέρα",
  "Τρίτη",
  "Τετάρτη",
  "Πέμπτη",
  "Παρασκευή",
  "Σάββατο",
  "Κυριακή"
];
const MEALS = ["Μεσημεριανό", "Βραδινό"];

const WeeklyPlanner = ({ auth }) => {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes")
      .then((res) => setRecipes(res.data))
      .catch(() => setRecipes([]));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/weekly-plans", { withCredentials: true })
      .then((res) => setSelected(res.data.meals || {}))
      .catch(console.error);
  }, []);

  const handleChange = (day, meal, recipeId) => {
    setSelected((prev) => ({
      ...prev,
      [`${day}-${meal}`]: recipeId
    }));
  };

  const handleRemove = (day, meal) => {
    setSelected((prev) => {
      const newSelected = { ...prev };
      delete newSelected[`${day}-${meal}`];
      return newSelected;
    });
  };

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:3001/weekly-plans",
        { meals: selected },
        { withCredentials: true }
      );
      alert("Το πρόγραμμα αποθηκεύτηκε επιτυχώς!");
    } catch (error) {
      alert("Αποτυχία αποθήκευσης προγράμματος");
    }
  };

  const getRecipeName = (recipeId) => {
    const recipe = recipes.find((r) => r.id === parseInt(recipeId));
    return recipe ? recipe.title : "";
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NavBar auth={auth} />
      <div className="container py-4">
        <h2 className="mb-4">Εβδομαδιαίο Πρόγραμμα</h2>
        
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr>
                <th style={{ width: "120px" }}></th>
                {WEEKDAYS.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEALS.map((meal) => (
                <tr key={meal}>
                  <td className="fw-bold">{meal}</td>
                  {WEEKDAYS.map((day) => {
                    const key = `${day}-${meal}`;
                    const selectedRecipeId = selected[key];
                    return (
                      <td key={key} style={{ minWidth: "200px", height: "80px" }}>
                        {selectedRecipeId ? (
                          <div className="d-flex align-items-center justify-content-between p-2 bg-light rounded">
                            <Link
                              to={`/recipes/${selectedRecipeId}`}
                              className="text-truncate text-decoration-none"
                              title={getRecipeName(selectedRecipeId)}
                            >
                              {getRecipeName(selectedRecipeId)}
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger ms-2"
                              onClick={() => handleRemove(day, meal)}
                              style={{ minWidth: "30px" }}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <select
                            className="form-select"
                            value=""
                            onChange={(e) => handleChange(day, meal, e.target.value)}
                          >
                            <option value="">Επιλέξτε συνταγή...</option>
                            {recipes.map((r) => (
                              <option key={r.id} value={r.id}>{r.title}</option>
                            ))}
                          </select>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-end">
          <button 
            className="btn btn-primary"
            onClick={handleSave}
          >
            <i className="bi bi-save me-2"></i>
            Αποθήκευση Προγράμματος
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner;

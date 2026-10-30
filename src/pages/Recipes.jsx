
import { useState, useEffect } from 'react';

function Recipes({ onAddToPlan }) {
  const [searchQuery, setSearchQuery] = useState('chicken');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Monday');

  async function searchRecipes(query) {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Reseptien hakeminen epäonnistui.');
      }

      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (error) {
      setError(
        'Reseptejä ei voitu hakea. Tarkista internetyhteys ja yritä uudelleen.'
      );
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchRecipes('chicken');
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    searchRecipes(searchQuery.trim());
  }

  function handleAddToPlan() {
    if (!selectedRecipe || !onAddToPlan) return;

    onAddToPlan(selectedRecipe, selectedDay);
    setSelectedRecipe(null);
  }

  return (
    <div className="container py-4">
      <h1 className="mb-2">Recipe Finder</h1>

      <p className="text-muted mb-4">
        Find recipes for your everyday meals.
      </p>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !searchQuery.trim()}
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <p className="text-center">Loading recipes...</p>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <p>No recipes found. Try another search.</p>
      )}

      <div className="row g-4">
        {recipes.map((recipe) => (
          <div
            className="col-12 col-sm-6 col-lg-4"
            key={recipe.idMeal}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={recipe.strMealThumb}
                className="card-img-top"
                alt={recipe.strMeal}
                style={{ height: '220px', objectFit: 'cover' }}
              />

              <div className="card-body">
                <h5 className="card-title">
                  {recipe.strMeal}
                </h5>

                <p className="card-text text-muted">
                  {recipe.strCategory || 'Recipe'}
                  {recipe.strArea && ` • ${recipe.strArea}`}
                </p>

                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="recipe-modal-title"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">

              <div className="modal-header">
                <h2
                  className="modal-title fs-5"
                  id="recipe-modal-title"
                >
                  {selectedRecipe.strMeal}
                </h2>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedRecipe(null)}
                  aria-label="Close"
                />
              </div>

              <div className="modal-body">
                <img
                  src={selectedRecipe.strMealThumb}
                  alt={selectedRecipe.strMeal}
                  className="img-fluid rounded mb-3"
                  style={{
                    maxHeight: '300px',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />

                <p className="text-muted">
                  {selectedRecipe.strCategory || 'Recipe'}
                  {selectedRecipe.strArea &&
                    ` • ${selectedRecipe.strArea}`}
                </p>

                <h3 className="h5 mt-4">Ingredients</h3>

                <ul>
                  {Array.from({ length: 20 }, (_, i) => {
                    const ingredient =
                      selectedRecipe[`strIngredient${i + 1}`];
                    const measure =
                      selectedRecipe[`strMeasure${i + 1}`];

                    if (!ingredient || !ingredient.trim()) {
                      return null;
                    }

                    return (
                      <li key={i}>
                        {measure} {ingredient}
                      </li>
                    );
                  })}
                </ul>

                <div className="border rounded p-3 my-4">
                  <h3 className="h5">Add to Meal Planner</h3>

                  <label
                    htmlFor="meal-day"
                    className="form-label"
                  >
                    Select a day
                  </label>

                  <select
                    id="meal-day"
                    className="form-select mb-3"
                    value={selectedDay}
                    onChange={(event) =>
                      setSelectedDay(event.target.value)
                    }
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddToPlan}
                  >
                    Add to Meal Planner
                  </button>
                </div>

                <h3 className="h5 mt-4">Instructions</h3>

                <p style={{ whiteSpace: 'pre-line' }}>
                  {selectedRecipe.strInstructions ||
                    'Instructions are not available.'}
                </p>

                {selectedRecipe.strYoutube && (
                  <a
                    href={selectedRecipe.strYoutube}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-danger"
                  >
                    Watch on YouTube
                  </a>
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedRecipe(null)}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recipes;


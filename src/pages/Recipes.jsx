
import { useState, useEffect } from 'react';

function Recipes() {
  const [searchQuery, setSearchQuery] = useState('chicken');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
      setError('Reseptejä ei voitu hakea. Tarkista internetyhteys ja yritä uudelleen.');
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
          <div className="col-12 col-sm-6 col-lg-4" key={recipe.idMeal}>
            <div className="card h-100 shadow-sm">
              <img
                src={recipe.strMealThumb}
                className="card-img-top"
                alt={recipe.strMeal}
                style={{ height: '220px', objectFit: 'cover' }}
              />

              <div className="card-body">
                <h5 className="card-title">{recipe.strMeal}</h5>

                <p className="card-text text-muted">
                  {recipe.strCategory || 'Recipe'}
                  {recipe.strArea && ` • ${recipe.strArea}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;

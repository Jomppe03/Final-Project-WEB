
import { useState, useMemo, useEffect } from 'react';

function ShoppingList({ mealPlan }) {
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('checkedItems') || '[]');
    } catch {
      return [];
    }
  });

  const ingredients = useMemo(() => {
    const ingredientMap = new Map();

    mealPlan.forEach((meal) => {
      const recipe = meal.recipe;

      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`]?.trim();
        const measure = recipe[`strMeasure${i}`]?.trim();

        if (ingredient) {
          const key = ingredient.toLowerCase();

          if (!ingredientMap.has(key)) {
            ingredientMap.set(key, {
              id: key,
              name: ingredient,
              measures: [],
              recipes: [],
            });
          }

          const item = ingredientMap.get(key);

          if (measure) {
            item.measures.push(measure);
          }

          if (!item.recipes.includes(recipe.strMeal)) {
            item.recipes.push(recipe.strMeal);
          }
        }
      }
    });

    return Array.from(ingredientMap.values());
  }, [mealPlan]);

  function toggleItem(id) {
    setCheckedItems((previousItems) =>
      previousItems.includes(id)
        ? previousItems.filter((item) => item !== id)
        : [...previousItems, id]
    );
  }

  function clearCompleted() {
    setCheckedItems([]);
  }

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const completedCount = ingredients.filter((item) =>
    checkedItems.includes(item.id)
  ).length;

  return (
    <div className="container py-4">
      <h1 className="mb-2">Shopping List</h1>

      <p className="text-muted mb-4">
        Ingredients from your planned meals.
      </p>

      {ingredients.length === 0 ? (
        <div className="alert alert-info">
          Your shopping list is empty. Add recipes to your Meal Planner first!
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="mb-0">
              {completedCount} / {ingredients.length} ingredients collected
            </p>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={clearCompleted}
              disabled={completedCount === 0}
            >
              Clear completed
            </button>
          </div>

          <div className="list-group">
            {ingredients.map((item) => (
              <label
                key={item.id}
                className="list-group-item d-flex align-items-center gap-3"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                />

                <div className="flex-grow-1">
                  <strong
                    className={
                      checkedItems.includes(item.id)
                        ? 'text-decoration-line-through text-muted'
                        : ''
                    }
                  >
                    {item.name}
                  </strong>

                  {item.measures.length > 0 && (
                    <div>
                      <small className="text-muted">
                        Amounts: {item.measures.join(', ')}
                      </small>
                    </div>
                  )}

                  <div className="small text-muted">
                    Recipes: {item.recipes.join(', ')}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingList;

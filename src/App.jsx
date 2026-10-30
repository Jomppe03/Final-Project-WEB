
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Recipes from './pages/Recipes';
import MealPlanner from './pages/MealPlanner';
import ShoppingList from './pages/ShoppingList';

function App() {
  const [mealPlan, setMealPlan] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('mealPlan') || '[]'
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  function addToMealPlan(recipe, day) {
    const meal = {
      id: `${Date.now()}-${Math.random()}`,
      recipe: recipe,
      day: day,
    };

    setMealPlan((previousPlan) => [...previousPlan, meal]);
  }

  function removeFromMealPlan(id) {
    setMealPlan((previousPlan) =>
      previousPlan.filter((meal) => meal.id !== id)
    );
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Recipes onAddToPlan={addToMealPlan} />}
        />

        <Route
          path="/meal-planner"
          element={
            <MealPlanner
              mealPlan={mealPlan}
              onRemoveMeal={removeFromMealPlan}
            />
          }
        />

        <Route
          path="/shopping-list"
          element={<ShoppingList mealPlan={mealPlan} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


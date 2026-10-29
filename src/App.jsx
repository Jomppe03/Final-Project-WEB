import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Recipes from './pages/Recipes';
import MealPlanner from './pages/MealPlanner';
import ShoppingList from './pages/ShoppingList';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

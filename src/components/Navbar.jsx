
import { Link } from 'react-router-dom';
import { BookOpen, CalendarDays, ShoppingBasket } from 'lucide-react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <BookOpen size={22} />
          Recipe Finder
        </Link>

        <div className="navbar-nav flex-row gap-3">
          <Link
            className="nav-link d-flex align-items-center gap-2"
            to="/"
          >
            <BookOpen size={18} />
            Recipes
          </Link>

          <Link
            className="nav-link d-flex align-items-center gap-2"
            to="/meal-planner"
          >
            <CalendarDays size={18} />
            Meal Planner
          </Link>

          <Link
            className="nav-link d-flex align-items-center gap-2"
            to="/shopping-list"
          >
            <ShoppingBasket size={18} />
            Shopping List
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


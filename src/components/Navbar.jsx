
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Recipe Finder
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Recipes
          </Link>

          <Link className="nav-link" to="/meal-planner">
            Meal Planner
          </Link>

          <Link className="nav-link" to="/shopping-list">
            Shopping List
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

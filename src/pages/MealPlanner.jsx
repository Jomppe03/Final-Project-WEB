
function MealPlanner({ mealPlan, onRemoveMeal }) {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <div className="container py-4">
      <h1 className="mb-2">Meal Planner</h1>

      <p className="text-muted mb-4">
        Plan your meals for the week.
      </p>

      {mealPlan.length === 0 && (
        <div className="alert alert-info">
          Your meal plan is empty. Go to Recipes and add a meal!
        </div>
      )}

      <div className="row g-4">
        {days.map((day) => {
          const mealsForDay = mealPlan.filter(
            (meal) => meal.day === day
          );

          return (
            <div className="col-12 col-md-6 col-lg-4" key={day}>
              <div className="card h-100 shadow-sm">
                <div className="card-header fw-bold">
                  {day}
                </div>

                <div className="card-body">
                  {mealsForDay.length === 0 ? (
                    <p className="text-muted mb-0">
                      No meals planned.
                    </p>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {mealsForDay.map((meal) => (
                        <li
                          className="list-group-item px-0"
                          key={meal.id}
                        >
                          <div className="d-flex gap-2 align-items-start">
                            <img
                              src={meal.recipe.strMealThumb}
                              alt={meal.recipe.strMeal}
                              style={{
                                width: '65px',
                                height: '65px',
                                objectFit: 'cover',
                                borderRadius: '6px',
                              }}
                            />

                            <div className="flex-grow-1">
                              <div className="fw-semibold">
                                {meal.recipe.strMeal}
                              </div>

                              <button
                                className="btn btn-sm btn-outline-danger mt-2"
                                onClick={() =>
                                  onRemoveMeal(meal.id)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MealPlanner;

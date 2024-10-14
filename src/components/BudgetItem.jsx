import PropTypes from 'prop-types';

function BudgetItem({ budget, openBudget }) {
    return (
        <div className="budget-button" onClick={() => openBudget(budget)}>
            <div className="button-col-1">
                <p className="home-budget-name">{budget.name}</p>
            </div>
            <hr />
            <div className="button-col-2">
                <p className="home-salary-label">
                    Total Salary: <span className='home-salary-amt'>${(budget.s_total ?? 0).toFixed(2)}</span>
                </p>
            </div>
            <div className="button-col-3">
                <p className="home-expense-label">
                    Expenses: <span className='home-expense-amt'>${(budget.e_total ?? 0).toFixed(2)}</span>
                </p>
                <p className="home-money-left-label">
                    Money Left: <span className='home-money-left-amt'>${(budget.moneyRem ?? 0).toFixed(2)}</span>
                </p>
            </div>
        </div>
    );
}

BudgetItem.propTypes = {
    budget: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        s_total: PropTypes.number,  // Update to optional since it can be null
        e_total: PropTypes.number,  // Update to optional since it can be null
        moneyRem: PropTypes.number,  // Update to optional since it can be null
    }).isRequired,
    openBudget: PropTypes.func.isRequired,
};

export default BudgetItem;

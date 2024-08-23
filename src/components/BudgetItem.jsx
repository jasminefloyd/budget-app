import PropTypes from "prop-types";

function BudgetItem({ budget, openBudget }) {
    return (
        <div className="budget-button" onClick={() => openBudget(budget)}>
            <div className="button-col-1">
                <p className="home-budget-name">{budget.name}</p>
            </div>
            <div className="button-col-2">
                <p className="home-salary-label">Total Salary: ${budget.s_total}</p>
            </div>
            <div className="button-col-3">
                <p className="home-expense-label">Expenses: ${budget.e_total}</p>
                <p className="home-money-left-label">Money Left: ${budget.moneyRem}</p>
            </div>
        </div>
    );
}

BudgetItem.propTypes = {
    budget: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        s_total: PropTypes.number.isRequired,
        e_total: PropTypes.number.isRequired,
        moneyRem: PropTypes.number.isRequired,
    }).isRequired,
    openBudget: PropTypes.func.isRequired,
};

export default BudgetItem;

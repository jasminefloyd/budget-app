import { useState } from "react";
import PropTypes from 'prop-types';
import Popup from './Popup';

function BudgetDetails({ budget, budgets, setBudgets, goToHome }) {
    const [activeTab, setActiveTab] = useState("expenses");
    const [incomePopupOpen, setIncomePopupOpen] = useState(false);
    const [expensePopupOpen, setExpensePopupOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const [incomeType, setIncomeType] = useState("");
    const [incomeAmount, setIncomeAmount] = useState("");
    const [expenseType, setExpenseType] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");

    const addIncome = () => {
        if (incomeType && incomeAmount) {
            const incomeAmt = parseFloat(incomeAmount);
            const updatedBudget = {
                ...budget,
                salary: [...budget.salary, { type: incomeType, amount: incomeAmt }],
                s_total: budget.s_total + incomeAmt,
                moneyRem: budget.moneyRem + incomeAmt,
            };
            updateBudgets(updatedBudget);
            setIncomePopupOpen(false);
            setIncomeType("");
            setIncomeAmount("");
        }
    };

    const addExpense = () => {
        if (expenseType && expenseAmount) {
            const expenseAmt = parseFloat(expenseAmount);
            const updatedBudget = {
                ...budget,
                expenses: [...budget.expenses, { type: expenseType, amount: expenseAmt }],
                e_total: budget.e_total + expenseAmt,
                moneyRem: budget.moneyRem - expenseAmt,
            };
            updateBudgets(updatedBudget);
            setExpensePopupOpen(false);
            setExpenseType("");
            setExpenseAmount("");
        }
    };

    const updateBudgets = (updatedBudget) => {
        const updatedBudgets = budgets.map((b) =>
            b.id === updatedBudget.id ? updatedBudget : b
        );
        setBudgets(updatedBudgets);
    };

    const handleMenuClick = (option) => {
        if (option === 'income') {
            setIncomePopupOpen(true);
        } else if (option === 'expense') {
            setExpensePopupOpen(true);
        }
        setMenuOpen(false);
    };

    return (
        <div className="budget-details-page">
            <div className="details-header">
                <button className="home-btn" onClick={goToHome}>🏠 Back to Home</button>
                <h1 className="details-header-title">{budget.name}</h1>
            </div>

            <div className="top-section">
                <div className="widget">
                    <div id="money-left-area">
                        <p>Money Left</p>
                        <h2>${(budget.moneyRem ?? 0).toFixed(2)}</h2> {/* Fallback to 0 if moneyRem is null/undefined */}
                    </div>
                    <div id="total-income-area">
                        <p>Total Income</p>
                        <h2>${(budget.s_total ?? 0).toFixed(2)}</h2> {/* Fallback to 0 if s_total is null/undefined */}
                    </div>
                    <div id="total-expense-area">
                        <p>Total Expenses</p>
                        <h2>${(budget.e_total ?? 0).toFixed(2)}</h2> {/* Fallback to 0 if e_total is null/undefined */}
                    </div>
                </div>
            </div>

            <div className="middle-section">
                <div className="tabs">
                    <ul className="tab-list">
                        <li
                            className={`tab-link ${activeTab === "expenses" ? "active" : ""}`}
                            onClick={() => setActiveTab("expenses")}
                        >
                            Expenses
                        </li>
                        <li
                            className={`tab-link ${activeTab === "income" ? "active" : ""}`}
                            onClick={() => setActiveTab("income")}
                        >
                            Income
                        </li>
                    </ul>
                </div>

                <div className="tab-content">
                    {activeTab === "expenses" && (
                        <div>
                            <h3>Expenses</h3>
                            <ul>
                                {budget.expenses.map((expense, index) => (
                                    <li key={index}>
                                        {expense.type}: ${(expense.amount ?? 0).toFixed(2)} {/* Fallback to 0 if amount is null/undefined */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === "income" && (
                        <div>
                            <h3>Income</h3>
                            <ul>
                                {budget.salary.map((income, index) => (
                                    <li key={index}>
                                        {income.type}: ${(income.amount ?? 0).toFixed(2)} {/* Fallback to 0 if amount is null/undefined */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <button className="floating-button" onClick={() => setMenuOpen(!menuOpen)}>+</button>

            {menuOpen && (
                <div className="floating-menu">
                    <button onClick={() => handleMenuClick('income')}>Add Income</button>
                    <button onClick={() => handleMenuClick('expense')}>Add Expense</button>
                </div>
            )}

            {incomePopupOpen && (
                <Popup closePopup={() => setIncomePopupOpen(false)}>
                    <h2>Add New Income</h2>
                    <input
                        type="text"
                        value={incomeType}
                        onChange={(e) => setIncomeType(e.target.value)}
                        placeholder="Income Type"
                    />
                    <input
                        type="number"
                        value={incomeAmount}
                        onChange={(e) => setIncomeAmount(e.target.value)}
                        placeholder="$0"
                    />
                    <button onClick={addIncome}>Add Income</button>
                </Popup>
            )}

            {expensePopupOpen && (
                <Popup closePopup={() => setExpensePopupOpen(false)}>
                    <h2>Add New Expense</h2>
                    <input
                        type="text"
                        value={expenseType}
                        onChange={(e) => setExpenseType(e.target.value)}
                        placeholder="Expense Type"
                    />
                    <input
                        type="number"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        placeholder="$0"
                    />
                    <button onClick={addExpense}>Add Expense</button>
                </Popup>
            )}
        </div>
    );
}

BudgetDetails.propTypes = {
    budget: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        s_total: PropTypes.number.isRequired,
        e_total: PropTypes.number.isRequired,
        moneyRem: PropTypes.number.isRequired,
        salary: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                amount: PropTypes.number.isRequired,
            })
        ),
        expenses: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                amount: PropTypes.number.isRequired,
            })
        ),
    }).isRequired,
    budgets: PropTypes.array.isRequired,
    setBudgets: PropTypes.func.isRequired,
    goToHome: PropTypes.func.isRequired,
};

export default BudgetDetails;

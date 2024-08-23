import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";

function BudgetDetails({ budgetId, goToHome, setBudgets, budgets }) {
    const [budget, setBudget] = useState(() =>
        budgets.find((b) => b.id === budgetId)
    );
    const [activeTab, setActiveTab] = useState("expenses");
    const [incomePopupOpen, setIncomePopupOpen] = useState(false);
    const [expensePopupOpen, setExpensePopupOpen] = useState(false);
    const [incomeType, setIncomeType] = useState("");
    const [incomeAmount, setIncomeAmount] = useState("");
    const [expenseType, setExpenseType] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");

    useEffect(() => {
        const updatedBudget = budgets.find((b) => b.id === budgetId);
        setBudget(updatedBudget);
    }, [budgets, budgetId]);

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

    const handleIncomeClick = () => {
        setActiveTab("income");
        setIncomePopupOpen(true);
    };

    const handleExpenseClick = () => {
        setActiveTab("expenses");
        setExpensePopupOpen(true);
    };

    if (!budget) return null;

    return (
        <div className="budget-details-page">
            <div className="details-header">
                <button className="home-btn" onClick={goToHome}>🏠</button>
                <h1 className="details-header-title">{budget.name}</h1>
                <button className="new-income-btn" onClick={handleIncomeClick}>+ Income</button>
                <button className="new-expense-btn" onClick={handleExpenseClick}>+ Expense</button>
            </div>

            <div className="top-section">
                <div className="widget">
                    <div id="money-left-area">
                        <p>Money Left</p>
                        <h2>${budget.moneyRem.toFixed(2)}</h2>
                    </div>
                    <div id="total-income-area">
                        <p>Total Budget</p>
                        <h2>${budget.s_total.toFixed(2)}</h2>
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
                                        {expense.type}: ${expense.amount.toFixed(2)}
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
                                        {income.type}: ${income.amount.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {incomePopupOpen && (
                <Popup closePopup={() => setIncomePopupOpen(false)}>
                    <h2>New Income</h2>
                    <input
                        type="text"
                        value={incomeType}
                        onChange={(e) => setIncomeType(e.target.value)}
                        placeholder="Income Name"
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
                    <h2>New Expense</h2>
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
    budgetId: PropTypes.number.isRequired,
    goToHome: PropTypes.func.isRequired,
    setBudgets: PropTypes.func.isRequired,
    budgets: PropTypes.array.isRequired,
};

export default BudgetDetails;

import { useState } from "react";
import PropTypes from 'prop-types';
import Popup from "./Popup";
import BudgetItem from "./BudgetItem";

function Home({ budgets, createBudget, openBudget }) {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [budgetName, setBudgetName] = useState("");

    const handleCreateBudget = () => {
        if (budgetName.trim()) {
            createBudget(budgetName);
            setBudgetName("");
            setPopupOpen(false);
        }
    };

    return (
        <div className="home-page">
            <div className="header">
                <h1 className="header-title">Pocket Budget</h1>
                <button className="new-budget-btn" onClick={() => setPopupOpen(true)}>+ Add New</button>
                <button className="app-info-btn">?</button>
            </div>

            <div className="home-container">
                {budgets.map((budget) => (
                    <BudgetItem
                        key={budget.id}
                        budget={budget}
                        openBudget={openBudget}
                    />
                ))}
            </div>
            
            {isPopupOpen && (
                <Popup closePopup={() => setPopupOpen(false)}>
                    <h2>Create a New Budget</h2>
                    <input
                        type="text"
                        value={budgetName}
                        onChange={(e) => setBudgetName(e.target.value)}
                        placeholder="Budget Name"
                    />
                    <button onClick={handleCreateBudget}>Create</button>
                </Popup>
            )}
        </div>
    );
}

Home.propTypes = {
    budgets: PropTypes.array.isRequired,
    createBudget: PropTypes.func.isRequired,
    openBudget: PropTypes.func.isRequired,
};

export default Home;

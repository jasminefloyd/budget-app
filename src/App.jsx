import { useState } from "react";
import Home from './components/Home';
import BudgetDetails from "./components/BudgetDetails";

function App() {
    const [budgets, setBudgets] = useState([]);
    const [currentBudget, setCurrentBudget] = useState(null);
    const [view, setView] = useState("home");

    const createBudget = (name) => {
        const newBudget = {
            id: budgets.length + 1,
            name: name,
            salary: [],
            expenses: [],
            e_total: 0,
            s_total: 0,
            moneyRem: 0,
        };
        setBudgets([...budgets, newBudget]);
    };

    const openBudget = (budget) => {
        setCurrentBudget(budget);
        setView("details");
    };

    const goToHome = () => {
        setView("home");
    };

    return (
        <div className="app-content">
            {view === "home" && (
                <Home
                    budgets={budgets}
                    createBudget={createBudget}
                    openBudget={openBudget}
                />
            )}
            {view === "details" && currentBudget && (
                <BudgetDetails 
                    budgetId={currentBudget.id} 
                    goToHome={goToHome} 
                    setBudgets={setBudgets} 
                    budgets={budgets} 
                />
            )}
        </div>
    );
}

export default App;

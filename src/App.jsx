import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Home from './components/Home';
import BudgetDetails from './components/BudgetDetails';
import SplashScreen from './components/Splash'; 

function App() {
    
    const [budgets, setBudgets] = useState(() => {
        const savedBudgets = localStorage.getItem('budgets');
        return savedBudgets ? JSON.parse(savedBudgets) : [];
    });
    const [currentBudget, setCurrentBudget] = useState(null);
    const [view, setView] = useState("home");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem('budgets', JSON.stringify(budgets));
    }, [budgets]);

    const createBudget = (name) => {
        const newBudget = {
            id: budgets.length + 1,
            name,
            salary: [],
            expenses: [],
            s_total: 0,
            e_total: 0,
            moneyRem: 0,
        };
        setBudgets([...budgets, newBudget]);
    };

    const handleBudgetClick = (budget) => {
        setCurrentBudget(budget);
        setView("details");
    };

    const handleUpdateBudgets = (updatedBudget) => {
        const updatedBudgets = budgets.map(b =>
            b.id === updatedBudget.id ? updatedBudget : b
        );
        setBudgets(updatedBudgets);

        // Update current budget as well
        const updatedCurrentBudget = updatedBudgets.find(b => b.id === updatedBudget.id);
        setCurrentBudget(updatedCurrentBudget);  // Ensure this gets updated
    };

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <div className="app-content">
            {view === "home" && (
                <Home
                    budgets={budgets}
                    createBudget={createBudget}
                    openBudget={handleBudgetClick}
                />
            )}
            {view === "details" && currentBudget && (
                <BudgetDetails
                    budget={currentBudget}
                    budgets={budgets}
                    setBudgets={handleUpdateBudgets} 
                    goToHome={() => setView("home")}
                />
            )}
        </div>
    );
}

App.propTypes = {
    budgets: PropTypes.array,
    createBudget: PropTypes.func,
    openBudget: PropTypes.func,
    setBudgets: PropTypes.func,
};

export default App;

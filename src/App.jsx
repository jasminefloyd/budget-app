import { useState, useEffect } from "react";
import Home from './components/Home';
import BudgetDetails from "./components/BudgetDetails";
import SplashScreen from './components/Splash'; // Import SplashScreen

function App() {
    const [budgets, setBudgets] = useState([]);
    const [currentBudget, setCurrentBudget] = useState(null);
    const [view, setView] = useState("home"); // Default to "home" view
    const [loading, setLoading] = useState(true); // New state for splash screen

    // Create Budget function
    const createBudget = (name) => {
        const newBudget = {
            id: budgets.length + 1,
            name: name,
            salary: [],
            expenses: [],
            e_total: 0
        };
        setBudgets([...budgets, newBudget]); // Update the budget list
    };

    useEffect(() => {
        // Load budgets from local storage on initial render
        const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
        setBudgets(savedBudgets);
        setTimeout(() => setLoading(false), 3000); // Splash screen timeout
    }, []);

    useEffect(() => {
        // Save budgets to local storage whenever budgets state changes
        if (budgets.length > 0) {
            localStorage.setItem('budgets', JSON.stringify(budgets));
        }
    }, [budgets]);

    // Show the splash screen while loading
    if (loading) {
        return <SplashScreen />;
    }

    // Render the view based on the current state
    return (
        <div>
            {view === "home" && <Home createBudget={createBudget} budgets={budgets} setView={setView} />}
            {view === "details" && <BudgetDetails currentBudget={currentBudget} setView={setView} />}
            {/* Fallback view just in case */}
            {view !== "home" && view !== "details" && <p>Error: Unknown view</p>}
        </div>
    );
}

export default App;

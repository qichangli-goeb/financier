import financierLogo from "./assets/financier.svg";
import "./App.css";
import TransactionList from "./components/transaction-list/TransactionList.tsx";
import TransactionForm from "./components/transaction-form/TransactionForm.tsx";

function App() {
  return (
    <>
      <div>
        <a target="_blank">
          <img src={financierLogo} className="logo" alt="financier logo" />
        </a>
      </div>
      <h1>Financier</h1>
      <TransactionForm />

      <TransactionList />
    </>
  );
}

export default App;

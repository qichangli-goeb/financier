import financierLogo from "./assets/financier.svg";
import "./App.css";
import TransactionList from "./components/transaction-list/TransactionList.tsx";
import TransactionSaveForm from "./components/transaction-save-form/TransactionSaveForm.tsx";

function App() {
  return (
    <>
      <div>
        <a target="_blank">
          <img src={financierLogo} className="logo" alt="financier logo" />
        </a>
      </div>
      <h1>Financier</h1>
      <TransactionSaveForm />

      <TransactionList />
    </>
  );
}

export default App;

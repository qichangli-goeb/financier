import financierLogo from "./assets/financier.svg";
import "./App.css";
import TransactionList from "./components/transaction-list/TransactionList.tsx";

function App() {
  return (
    <>
      <div>
        <a target="_blank">
          <img src={financierLogo} className="logo" alt="financier logo" />
        </a>
      </div>
      <h1>Financier</h1>

      <TransactionList />
    </>
  );
}

export default App;

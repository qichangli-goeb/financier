import styles from "./TransactionListPage.module.css";
import TransactionList from "../../components/transaction-list/TransactionList.tsx";
import { NavLink } from "react-router";

export default function TransactionListPage() {
  return (
    <main>
      <div className={styles.header}>
        <h1>Transactions</h1>
        <NavLink className="navButton" to="new">
          Save New
        </NavLink>
      </div>

      <TransactionList />
    </main>
  );
}

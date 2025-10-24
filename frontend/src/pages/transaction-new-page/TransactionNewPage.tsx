import { Link, useNavigate } from "react-router";
import styles from "./TransactionNewPage.module.css";
import TransactionForm from "../../components/transaction-form/TransactionForm.tsx";
export default function TransactionNewPage() {
  const navigate = useNavigate();

  return (
    <main>
      <div className={styles.header}>
        <h1>New Transaction</h1>
        <Link
          className="navButton"
          to={".."}
          onClick={(evt) => {
            evt.preventDefault();
            navigate(-1);
          }}
        >
          Go Back
        </Link>
      </div>
      <TransactionForm />
    </main>
  );
}

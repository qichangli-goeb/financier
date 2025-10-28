import { Link, useNavigate } from "react-router";
import styles from "./TransactionNewPage.module.css";
import TransactionForm from "../../components/transaction-form/TransactionForm.tsx";
import type { Transaction } from "../../api/types.ts";

const emptyTransaction: Transaction = {
  id: 0,
  description: "",
  valueDate: "",
  otherPartyName: "",
  otherPartyIban: "",
  myIban: "",
  amount: 0,
  currency: "",
  balanceAfterTransaction: 0,
};

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
      <TransactionForm transaction={emptyTransaction} />
    </main>
  );
}

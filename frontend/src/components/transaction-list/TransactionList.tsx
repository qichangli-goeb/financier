import type { Transaction } from "../../api/types.ts";
import TransactionItem from "../transaction-item/TransactionItem.tsx";
import styles from "./TransactionList.module.css";
import { useState } from "react";

function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function getAllTransactions() {
    const response = await fetch("http://localhost:5173/api/transactions");
    const tr: Transaction[] = await response.json();
    setTransactions(tr);
  }

  return (
    <div className={styles.list}>
      <h3>Transactions</h3>
      {transactions.map((item) => (
        <TransactionItem transaction={item} />
      ))}
      <button onClick={getAllTransactions}>Update</button>
    </div>
  );
}

export default TransactionList;

import type { Transaction } from "../../api/types.ts";
import TransactionItem from "../transaction-item/TransactionItem.tsx";
import styles from "./TransactionList.module.css";
import { useEffect, useState } from "react";

function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:5173/api/transactions");
    const tr: Transaction[] = await response.json();
    setTransactions(tr);
  }

  async function deleteTransaction(id: number) {
    await fetch(`http://localhost:5173/api/transactions/${id}`, {
      method: "DELETE",
    });
    await loadTransactions();
  }

  useEffect(() => {
    loadTransactions();
  });

  return (
    <div className={styles.list}>
      <h3>Transactions</h3>
      {transactions.map((item) => (
        <TransactionItem transaction={item} onDelete={deleteTransaction} />
      ))}
    </div>
  );
}

export default TransactionList;

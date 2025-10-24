import type { Transaction } from "../../api/types.ts";
import TransactionItem from "../transaction-item/TransactionItem.tsx";
import styles from "./TransactionList.module.css";
import { useCallback, useEffect, useState } from "react";

function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Cache the function with useCallback to avoid rerunning the effect on every render.
  const loadTransactions = useCallback(async () => {
    console.log("getting all transactions");
    const response = await fetch("http://localhost:5173/api/transactions");
    const tr: Transaction[] = await response.json();
    setTransactions(tr);
  }, []);

  async function deleteTransaction(id: number) {
    console.log("deleting a transaction");
    await fetch(`http://localhost:5173/api/transactions/${id}`, {
      method: "DELETE",
    });
    await loadTransactions();
  }

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]); // Only re-run effect when loadTransactions changes (which is never)

  return (
    <div className={styles.list}>
      {transactions.map((item) => (
        <TransactionItem transaction={item} onDelete={deleteTransaction} />
      ))}
    </div>
  );
}

export default TransactionList;

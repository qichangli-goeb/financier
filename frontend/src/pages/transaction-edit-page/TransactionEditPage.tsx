import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Transaction } from "../../api/types.ts";
import TransactionForm from "../../components/transaction-form/TransactionForm.tsx";

export default function TransactionEditPage() {
  const { id } = useParams();

  const [transaction, setTransaction] = useState<Transaction>({
    id: 0,
    description: "",
    valueDate: "",

    otherPartyName: "",
    otherPartyIban: "",

    myIban: "",

    amount: 0,
    currency: "",
    balanceAfterTransaction: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTransaction() {
      try {
        const response = await fetch(`/api/transactions/${id}`);
        if (!response.ok) {
          throw new Error("loading unsuccessful");
        }
        const data = await response.json();
        setTransaction(data);
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    getTransaction();
  }, [id]);

  if (loading) {
    return <p> Loading.</p>;
  }

  return (
    <div>
      <>
        <h1>Edit Your Transaction #{id}</h1>
        <TransactionForm transaction={transaction}></TransactionForm>
      </>
    </div>
  );
}

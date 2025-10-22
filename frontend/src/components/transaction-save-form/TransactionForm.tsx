import styles from "./TransactionSaveForm.module.css";
import { useState } from "react";
import type { Transaction } from "../../api/types.ts";

interface TransactionFormState {
  description: string;
  valueDate: string;

  otherPartyName: string;
  otherPartyIban: string;

  myIban: string;

  amount: string;
  currency: string;
  balanceAfterTransaction: string;
}

const validCurrencies = ["EUR", "USD"];

function isValidCurrency(currency: string): boolean {
  return validCurrencies.includes(currency);
}

function isValidNumber(amount: string): boolean {
  return amount.trim().length > 0 && parseFloat(amount) >= 0;
}

function isValidDescription(description: string): boolean {
  return description.length > 0;
}

function isValidDate(date: string): boolean {
  return date.search(/^\d{4}-\d{2}-\d{2}$/) !== -1;
}

function isValidIban(iban: string): boolean {
  return iban.length >= 22 && iban.length <= 34;
}

export default function TransactionForm() {
  const [data, setData] = useState<TransactionFormState>({
    description: "",
    valueDate: "",
    otherPartyName: "",
    otherPartyIban: "",
    myIban: "",
    amount: "",
    currency: "",
    balanceAfterTransaction: "",
  });

  const [valid, setValid] = useState({
    description: isValidDescription(data.description),
    valueDate: isValidDate(data.valueDate),
    otherPartyName: true,
    otherPartyIban: isValidIban(data.otherPartyIban),
    myIban: isValidIban(data.myIban),
    amount: isValidNumber(data.amount),
    currency: isValidCurrency(data.currency),
    balanceAfterTransaction: isValidNumber(data.balanceAfterTransaction),
  });

  const [error, setError] = useState<string | null>(null);

  async function saveTransaction() {
    try {
      setError(null);
      const transaction: Transaction = {
        ...data,
        id: 0,
        amount: parseFloat(data.amount),
        balanceAfterTransaction: parseFloat(data.balanceAfterTransaction),
      };
      const response = await fetch(`http://localhost:5173/api/transactions`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        setError("Error: " + errorMessage);
      }
    } catch (e) {
      console.error(e);
      setError("This is a problem.");
    }
  }

  return (
    <div className={styles.card}>
      {error ? <div className={styles.error}>{error}</div> : null}
      <h3>Save Transaction</h3>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            placeholder="Description"
            value={data.description}
            onChange={(evt) => {
              setData({ ...data, description: evt.currentTarget.value });
              setValid({
                ...valid,
                description: isValidDescription(evt.currentTarget.value),
              });
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="valueDate">Date</label>
          {valid.valueDate ? null : <div>X</div>}
          <input
            id="valueDate"
            placeholder="Date"
            value={data.valueDate}
            onChange={(evt) => {
              setData({ ...data, valueDate: evt.currentTarget.value });
              setValid({
                ...valid,
                valueDate: isValidDate(evt.currentTarget.value),
              });
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="my-iban">My IBAN</label>
          {valid.myIban ? null : <div>X</div>}
          <input
            id="my-iban"
            placeholder="My IBAN"
            value={data.myIban}
            onChange={(evt) => {
              setData({ ...data, myIban: evt.currentTarget.value });
              setValid({
                ...valid,
                myIban: isValidIban(evt.currentTarget.value),
              });
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount</label>
          {valid.amount ? null : <div>X</div>}
          <input
            id="amount"
            placeholder="Amount"
            type="number"
            value={data.amount}
            onChange={(evt) => {
              setData({ ...data, amount: evt.currentTarget.value });
              setValid({
                ...valid,
                amount: isValidNumber(evt.currentTarget.value),
              });
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="currrency">Currrency</label>
          {valid.currency ? null : <div>X</div>}
          <input
            id="currrency"
            placeholder="Currrency"
            value={data.currency}
            onChange={(evt) => {
              setData({ ...data, currency: evt.currentTarget.value });
              setValid({
                ...valid,
                currency: isValidCurrency(evt.currentTarget.value),
              });
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="other-party-name">Other Party Name</label>
          <input
            id="other-party-name"
            placeholder="Other Party Name"
            value={data.otherPartyName}
            onChange={(evt) =>
              setData({ ...data, otherPartyName: evt.currentTarget.value })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="other-party-iban">Other Party IBAN</label>
          {valid.otherPartyIban ? null : <div>X</div>}
          <input
            id="other-party-iban"
            placeholder="Other Party IBAN"
            value={data.otherPartyIban}
            onChange={(evt) => {
              setData({ ...data, otherPartyIban: evt.currentTarget.value });

              const value = evt.currentTarget.value;
              setValid({
                ...valid,
                otherPartyIban: isValidIban(value),
              });
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="balance-after-transaction">
            Balance After Transaction
          </label>
          {valid.balanceAfterTransaction ? null : <div>X</div>}
          <input
            id="balance-after-transaction"
            placeholder="Balance After Transaction"
            value={data.balanceAfterTransaction}
            onChange={(evt) => {
              setData({
                ...data,
                balanceAfterTransaction: evt.currentTarget.value,
              });
              setValid({
                ...valid,
                balanceAfterTransaction: isValidNumber(evt.currentTarget.value),
              });
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <div></div>

          <button type="button" onClick={saveTransaction}>
            Save!
          </button>
        </div>
      </form>
    </div>
  );
}

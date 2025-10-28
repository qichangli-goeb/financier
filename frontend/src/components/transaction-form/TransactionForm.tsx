import styles from "./TransactionForm.module.css";
import { useState } from "react";
import type { Transaction } from "../../api/types.ts";
import { useNavigate } from "react-router";

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

export interface TransactionFormProps {
  transaction: Transaction;
}

export default function TransactionForm(props: TransactionFormProps) {
  const [formState, setFormState] = useState<TransactionFormState>({
    ...props.transaction,
    amount: String(props.transaction.amount),
    balanceAfterTransaction: String(props.transaction.balanceAfterTransaction),
  });

  const [valid, setValid] = useState({
    description: isValidDescription(formState.description),
    valueDate: isValidDate(formState.valueDate),
    otherPartyName: true,
    otherPartyIban: isValidIban(formState.otherPartyIban),
    myIban: isValidIban(formState.myIban),
    amount: isValidNumber(formState.amount),
    currency: isValidCurrency(formState.currency),
    balanceAfterTransaction: isValidNumber(formState.balanceAfterTransaction),
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function saveTransaction() {
    try {
      // first remove any error messages from last time
      setError(null);

      // prepare transaction infos to send to server
      const transaction: Transaction = {
        ...formState,
        id: 0,
        amount: parseFloat(formState.amount),
        balanceAfterTransaction: parseFloat(formState.balanceAfterTransaction),
      };
      // send the savetransaction request to server
      const response = await fetch(`http://localhost:5173/api/transactions`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        navigate(-1);
      } else {
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
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            placeholder="Description"
            value={formState.description}
            onChange={(evt) => {
              setFormState({
                ...formState,
                description: evt.currentTarget.value,
              });
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
            value={formState.valueDate}
            onChange={(evt) => {
              setFormState({
                ...formState,
                valueDate: evt.currentTarget.value,
              });
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
            value={formState.myIban}
            onChange={(evt) => {
              setFormState({ ...formState, myIban: evt.currentTarget.value });
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
            value={formState.amount}
            onChange={(evt) => {
              setFormState({ ...formState, amount: evt.currentTarget.value });
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
            value={formState.currency}
            onChange={(evt) => {
              setFormState({ ...formState, currency: evt.currentTarget.value });
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
            value={formState.otherPartyName}
            onChange={(evt) =>
              setFormState({
                ...formState,
                otherPartyName: evt.currentTarget.value,
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="other-party-iban">Other Party IBAN</label>
          {valid.otherPartyIban ? null : <div>X</div>}
          <input
            id="other-party-iban"
            placeholder="Other Party IBAN"
            value={formState.otherPartyIban}
            onChange={(evt) => {
              setFormState({
                ...formState,
                otherPartyIban: evt.currentTarget.value,
              });

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
            value={formState.balanceAfterTransaction}
            onChange={(evt) => {
              setFormState({
                ...formState,
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

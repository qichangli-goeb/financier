import styles from "./TransactionItem.module.css";
import type { Transaction } from "../../api/types.ts";

export interface TransactionItemProps {
  transaction: Transaction;
}

function TransactionItem(props: TransactionItemProps) {
  return (
    <>
      <p className={styles.item}>
        {props.transaction.id} / {props.transaction.description} /{" "}
        {props.transaction.amount}
      </p>
    </>
  );
}
export default TransactionItem;

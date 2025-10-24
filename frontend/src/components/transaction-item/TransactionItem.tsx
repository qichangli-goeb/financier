import styles from "./TransactionItem.module.css";
import type { Transaction } from "../../api/types.ts";
import { IconTrashOff } from "@tabler/icons-react";

export interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: number) => void;
}

function TransactionItem(props: TransactionItemProps) {
  return (
    <div className={styles.item}>
      <p>
        {props.transaction.id} / {props.transaction.description} /{" "}
        {props.transaction.amount}
      </p>
      <button onClick={() => props.onDelete(props.transaction.id)}>
        <IconTrashOff color="orangered" />
      </button>
    </div>
  );
}
export default TransactionItem;

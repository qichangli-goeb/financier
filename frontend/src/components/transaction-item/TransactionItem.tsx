import styles from "./TransactionItem.module.css";
import type { Transaction } from "../../api/types.ts";
import { IconEdit, IconTrashOff } from "@tabler/icons-react";
import { NavLink } from "react-router";

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

      <div className={styles.rightSide}>
        <NavLink className="navButton" to={`edit/${props.transaction.id}`}>
          <IconEdit />
        </NavLink>

        <button onClick={() => props.onDelete(props.transaction.id)}>
          <IconTrashOff color="orangered" />
        </button>
      </div>
    </div>
  );
}
export default TransactionItem;

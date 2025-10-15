export interface Transaction {
  id: number;
  description: string;
  valueDate: string;

  otherPartyName: string;
  otherPartyIban: string;

  myIban: string;

  amount: number;
  currency: string;
  balanceAfterTransaction: number;
}

package com.isla.financier.model;

import java.time.LocalDate;

public class TransactionEntity {
    public int id;
    public String description;
    public LocalDate valueDate;

    public String otherPartyName;
    public String otherPartyIban;

    public String myIban;

    public int amountCents;
    public String currency;
    public int balanceAfterTransactionCents;
}


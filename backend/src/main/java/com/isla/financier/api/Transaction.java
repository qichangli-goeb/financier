package com.isla.financier.api;

import java.time.LocalDate;

public class Transaction {
    public int id;
    public String description;
    public LocalDate valueDate;

    public String otherPartyName;
    public String otherPartyIban;

    public String myIban;

    public double amount;
    public String currency;
    public double balanceAfterTransaction;
}

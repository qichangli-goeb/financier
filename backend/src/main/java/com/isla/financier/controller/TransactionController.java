package com.isla.financier.controller;

import com.isla.financier.api.Transaction;
import com.isla.financier.model.TransactionEntity;
import com.isla.financier.service.TransactionService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Transaction createTransaction(@RequestBody Transaction transaction) {
        TransactionEntity entity = new TransactionEntity();
        entity.description = transaction.description;
        entity.valueDate = transaction.valueDate;
        entity.otherPartyName = transaction.otherPartyName;
        entity.otherPartyIban = transaction.otherPartyIban;
        entity.myIban = transaction.myIban;
        entity.amountCents = (int) Math.round(transaction.amount * 100);
        entity.currency = transaction.currency;
        entity.balanceAfterTransactionCents = (int) Math.round(transaction.balanceAfterTransaction * 100);

        TransactionEntity savedEntity = transactionService.save(entity);

        return mapToTransaction(savedEntity);
    }


    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<Transaction> getAll() {
        List<TransactionEntity> entities = transactionService.getAll();

        List<Transaction> transactions = new ArrayList<>();
        for (TransactionEntity entity : entities) {
            Transaction transaction = mapToTransaction(entity);
            transactions.add(transaction);
        }

        return transactions;
    }

    public Transaction mapToTransaction(TransactionEntity transactionEntity) {
        Transaction transaction = new Transaction();

        transaction.id = transactionEntity.id;
        transaction.description = transactionEntity.description;
        transaction.valueDate = transactionEntity.valueDate;
        transaction.otherPartyName = transactionEntity.otherPartyName;
        transaction.otherPartyIban = transactionEntity.otherPartyIban;
        transaction.myIban = transactionEntity.myIban;
        transaction.amount = transactionEntity.amountCents / 100.0;
        transaction.currency = transactionEntity.currency;
        transaction.balanceAfterTransaction = transactionEntity.balanceAfterTransactionCents / 100.0;

        return transaction;
    }
}

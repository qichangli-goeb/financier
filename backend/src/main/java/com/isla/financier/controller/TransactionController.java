package com.isla.financier.controller;

import com.isla.financier.api.Transaction;
import com.isla.financier.model.TransactionEntity;
import com.isla.financier.service.TransactionService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

        Transaction saved = new Transaction();
        saved.id = savedEntity.id;
        saved.description = savedEntity.description;
        saved.valueDate = savedEntity.valueDate;
        saved.otherPartyName = savedEntity.otherPartyName;
        saved.otherPartyIban = savedEntity.otherPartyIban;
        saved.myIban = savedEntity.myIban;
        saved.amount = savedEntity.amountCents / 100.0;
        saved.currency = savedEntity.currency;
        saved.balanceAfterTransaction = savedEntity.balanceAfterTransactionCents / 100.0;

        return saved;
    }
}

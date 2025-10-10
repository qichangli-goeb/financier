package com.isla.financier.service;

import com.isla.financier.model.TransactionEntity;
import com.isla.financier.repository.TransactionRepository;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public TransactionEntity save(TransactionEntity transactionEntity) {
        return transactionRepository.save(transactionEntity);
    }
}

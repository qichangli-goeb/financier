package com.isla.financier.service;

import com.isla.financier.model.TransactionEntity;
import com.isla.financier.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public TransactionEntity save(TransactionEntity transactionEntity) {
        return transactionRepository.save(transactionEntity);
    }

    public List<TransactionEntity> getAll() {
        return transactionRepository.findAll();
    }

    public TransactionEntity getById(int id) {
        return transactionRepository.findById(id);
    }

    public TransactionEntity deleteById(int id) {
        TransactionEntity result = transactionRepository.findById(id);
        if (result != null) {
            transactionRepository.deleteById(id);
            return result;
        } else {
            return null;
        }
    }


    public TransactionEntity editById(int id, TransactionEntity transactionEntity) {
       TransactionEntity result = transactionRepository.findById(id);
       if (result != null) {
           transactionEntity.id = id;
           transactionRepository.update(transactionEntity);
           return transactionEntity;
       } else{
           return null;
       }
    }
}

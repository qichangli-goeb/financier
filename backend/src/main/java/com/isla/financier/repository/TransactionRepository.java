package com.isla.financier.repository;

import com.isla.financier.model.TransactionEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class TransactionRepository {

    private static final Logger LOG = LoggerFactory.getLogger(TransactionRepository.class);

    private final JdbcTemplate jdbcTemplate;

    public TransactionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public TransactionEntity findById(int id) {
        String sql = """
                SELECT *
                FROM transaction
                WHERE id = ?
                """;
        List<TransactionEntity> result = jdbcTemplate.query(sql, (rs, rowNum) -> mapToEntity(rs), id);

        if (result.isEmpty()) {
            return null;
        } else {
            return result.getFirst();
        }
    }

    public TransactionEntity save(TransactionEntity transactionEntity) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("transaction")
                .usingGeneratedKeyColumns("id");

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("description", transactionEntity.description);
        parameters.put("valueDate", transactionEntity.valueDate);
        parameters.put("otherPartyName", transactionEntity.otherPartyName);
        parameters.put("otherPartyIban", transactionEntity.otherPartyIban);
        parameters.put("myIban", transactionEntity.myIban);
        parameters.put("amountcents", transactionEntity.amountCents);
        parameters.put("currency", transactionEntity.currency);
        parameters.put("balanceAfterTransactioncents", transactionEntity.balanceAfterTransactionCents);

        // Executes the insert and returns the generated key
        Number key = insert.executeAndReturnKey(parameters);
        int id = key.intValue();

        return findById(id);
    }
    
    public List<TransactionEntity> findAll() {
        String sql = """
                SELECT *
                FROM transaction
                """;
        List<TransactionEntity> result = jdbcTemplate.query(sql, (rs, rowNum) -> mapToEntity(rs));
        return result;
    }

    public TransactionEntity mapToEntity(ResultSet rs) throws SQLException {
        TransactionEntity transaction = new TransactionEntity();
        transaction.id = rs.getInt("id");
        transaction.description = rs.getString("description");
        transaction.valueDate = LocalDate.parse(rs.getString("valuedate"));
        transaction.otherPartyName = rs.getString("otherpartyname");
        transaction.otherPartyIban = rs.getString("otherpartyiban");
        transaction.myIban = rs.getString("myiban");
        transaction.amountCents = rs.getInt("amountcents");
        transaction.currency = rs.getString("currency");
        transaction.balanceAfterTransactionCents = rs.getInt("balanceaftertransactioncents");
        return transaction;
    }
}

package com.isla.financier.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class BookService {

    private final JdbcTemplate jdbcTemplate;

    public BookService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<String> getBookNames() {
        return jdbcTemplate.query("SELECT name FROM book", (rs, rowNum) -> rs.getString("name"));
    }

    public List<String> getBookAuthors() {
        List<String> authors = jdbcTemplate.query("SELECT author FROM book", (rs, rowNum) -> rs.getString("author"));
        Set<String> dedupAuthors = new HashSet<>(authors);
        return new ArrayList<>(dedupAuthors);
    }
}

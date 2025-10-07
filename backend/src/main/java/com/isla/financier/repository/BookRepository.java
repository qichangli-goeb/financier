package com.isla.financier.repository;

import com.isla.financier.api.Book;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookRepository {

    private final JdbcTemplate jdbcTemplate;

    public BookRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Book> getBooks() {
        return jdbcTemplate.query("SELECT * FROM book", (rs, rowNum) -> {
            Book book = new Book();

            book.name = rs.getString("name");
            book.id = rs.getInt("id");
            book.author = rs.getString("author");
            book.pages = rs.getInt("pages");
            book.isbn = rs.getString("isbn");

            return book;
        });
    }
}

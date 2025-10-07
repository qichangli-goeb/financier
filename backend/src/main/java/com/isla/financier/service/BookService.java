package com.isla.financier.service;

import com.isla.financier.api.Book;
import com.isla.financier.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<String> getBookNames() {
        List<Book> books = bookRepository.getBooks();
        List<String> bookNames = new ArrayList<>();
        for (Book book : books) {
            bookNames.add(book.name);
        }
        return bookNames;
    }

    public List<String> getBookAuthors() {
        List<Book> books = bookRepository.getBooks();
        List<String> authors = new ArrayList<>();
        for (Book book : books) {
            authors.add(book.author);
        }
        return authors;
    }

    public List<Book> getBooks() {
        return bookRepository.getBooks();
    }
}

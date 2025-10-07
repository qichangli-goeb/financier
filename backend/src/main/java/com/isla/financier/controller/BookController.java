package com.isla.financier.controller;


import com.isla.financier.service.BookService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/names")
    public @ResponseBody String getNames() {
        return bookService.getBookNames().toString();
    }

    @GetMapping("/authors")
    public @ResponseBody String getAuthors() {
        return bookService.getBookAuthors().toString();
    }

}

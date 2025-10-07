package com.isla.financier.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/hello")
public class HelloController {

    @GetMapping("/everyone")
    public @ResponseBody String helloEveryone() {
        return "Hello, Everyone!";
    }

    @GetMapping("/{name}")
    public @ResponseBody String helloByName(@PathVariable String name) {
        return "Hello, " + name + ". How are you?";
    }
}

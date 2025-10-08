package com.isla.financier.controller;


import com.isla.financier.service.TimeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/api/time")
public class TimeController {

    private final TimeService timeService;

    public TimeController(TimeService timeServiceParam) {
        this.timeService = timeServiceParam;
    }

    @GetMapping("/now")
    public @ResponseBody String timeNow() {
        return timeService.now().toString();
    }

    @GetMapping("/today")
    public @ResponseBody String timeToday() {
        return timeService.today().toString();
    }

    @GetMapping("/tomorrow")
    public @ResponseBody String timeTomorrow() {
        return timeService.tomorrow().toString();
    }

    @GetMapping("/yesterday")
    public @ResponseBody String timeYesterday() {
        return timeService.yesterday().toString();
    }
}

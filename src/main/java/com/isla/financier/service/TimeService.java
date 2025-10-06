package com.isla.financier.service;

import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.ChronoUnit;

@Service
public class TimeService {
    public OffsetDateTime now() {
        return OffsetDateTime.now().truncatedTo(ChronoUnit.SECONDS);
    }

    public LocalDate today() {
        return LocalDate.now();
    }

    public LocalDate tomorrow() {
        return LocalDate.now().plusDays(1);
    }

    public LocalDate yesterday() {
        return LocalDate.now().minusDays(1);
    }
}

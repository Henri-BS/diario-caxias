package com.pasifcode.caxias_diary.domain.enums;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {
    FINALIZADO("Finalizado"),
    PLANEJANDO("Planejando"),
    PROGRAMADO("Programado"),
    CANCELADO("Cancelado"),
    ADIADO("Adiado"),
    INDEFINIDO("Indefinido");

    private final String description;

    Status(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

    @JsonCreator
    public static Status value(String description) {
        return switch (description) {
            case "Finalizado" -> FINALIZADO;
            case "Planejando" -> PLANEJANDO;
            case "Programado" -> PROGRAMADO;
            case "Cancelado" -> CANCELADO;
            case "Adiado" -> ADIADO;
            case "Indefinido", "" -> INDEFINIDO;
            default -> null;
        };
    }
}

package com.pasifcode.caxias_diary.domain.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Season {
    PRIMAVERA("Primavera"),
    VERAO("Verão"),
    OUTONO("Outono"),
    INVERNO("Inverno"),
    INDEFINIDO("Indefinido");

    private final String description;

    Season(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

    @JsonCreator
    public static Season value(String description) {
        return switch (description) {
            case "Primavera" -> PRIMAVERA;
            case "Verão" -> VERAO;
            case "Outono" -> OUTONO;
            case "Inverno" -> INVERNO;
            case "Indefinido" -> INDEFINIDO;
            default -> null;
        };
    }
}

package com.pasifcode.caxias_diary.domain.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ItemType {
    OBJETIVOS("Objetivos"),
    ATIVIDADES("Atividades"),
    ETAPAS("Etapas"),
    IMPACTO("Impacto"),
    DESAFIOS("Desafios"),
    REFERENCIAS("Referências"),
    ADICIONAL("Adicional");

    private final String value;

    ItemType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static ItemType itemType(String type) {
        return switch (type) {
            case "Objetivos"   -> OBJETIVOS;
            case "Atividades"  -> ATIVIDADES;
            case "Etapas"      -> ETAPAS;
            case "Impacto"     -> IMPACTO;
            case "Desafios"    -> DESAFIOS;
            case "Referências" -> REFERENCIAS;
            case "Adicional", "" -> ADICIONAL;
            default -> null;
        };
    }
}



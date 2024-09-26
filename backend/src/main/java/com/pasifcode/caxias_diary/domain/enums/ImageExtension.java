package com.pasifcode.caxias_diary.domain.enums;

import org.springframework.http.MediaType;

import java.util.Arrays;

public enum ImageExtension {
    PNG(MediaType.IMAGE_PNG),
    GIF(MediaType.IMAGE_GIF),
    JPEG(MediaType.IMAGE_JPEG);

    private MediaType mediaType;

    ImageExtension(MediaType mediaType){
        this.mediaType = mediaType;
    }

    public static ImageExtension valueOf(MediaType mediaType){
        return Arrays.stream(values())
                .filter(x -> x.mediaType.equals(mediaType))
                .findFirst()
                .orElse(null);
    }

    public static ImageExtension ofName(String name){
        return Arrays.stream(values())
                .filter(x -> x.name().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
    }
}

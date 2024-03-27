package com.episteme.api.entity.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WebsiteInfo {
    private int success;
    private MetaInfo meta;

    @Getter
    @Setter
    public static class MetaInfo {
        private String title;
        private String description;
        private ImageInfo image;

        @Getter
        @Setter
        public static class ImageInfo {
            private String url;
        }
    }
}

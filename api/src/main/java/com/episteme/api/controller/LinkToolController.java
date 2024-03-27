package com.episteme.api.controller;

import com.episteme.api.entity.dto.WebsiteInfo;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/linktool")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LinkToolController {

    @GetMapping("/process")
    public WebsiteInfo processLinkToolData(@RequestParam("url") String url) {
        WebsiteInfo websiteInfo = new WebsiteInfo();

        try {
            Document doc = Jsoup.connect(url).get();
            String title = doc.title();
            System.out.println(title);
            String imageUrl = null;
            Elements metaTags = doc.select("meta");
            for (Element metaTag : metaTags) {
                if (metaTag.hasAttr("property") && metaTag.attr("property").equals("og:image")) {
                    imageUrl = metaTag.attr("content");
                    break;
                } else if (metaTag.hasAttr("name") && metaTag.attr("name").equals("twitter:image")) {
                    imageUrl = metaTag.attr("content");
                    break;
                }
            }
            System.out.println(imageUrl);
            Element descriptionMeta = doc.selectFirst("meta[name=description]");
            String description;
            if (descriptionMeta != null) {
                description = descriptionMeta.attr("content");
            } else {
                description = "Không tìm thấy miêu tả";
            }

            websiteInfo.setSuccess(1);
            WebsiteInfo.MetaInfo metaInfo = new WebsiteInfo.MetaInfo();
            metaInfo.setTitle(title);
            metaInfo.setDescription(description);

            WebsiteInfo.MetaInfo.ImageInfo imageInfo = new WebsiteInfo.MetaInfo.ImageInfo();
            imageInfo.setUrl(imageUrl);

            metaInfo.setImage(imageInfo);
            websiteInfo.setMeta(metaInfo);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return websiteInfo;
    }
}

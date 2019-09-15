package com.icfnext.aem.patterns.example.components.content;

import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Option;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Selection;
import com.citytechinc.cq.component.annotations.widgets.TextField;

import javax.inject.Inject;

public class CarouselSlide {

    @Inject
    @PathField(rootPath = "/content/dam")
    @DialogField(fieldLabel = "Image", required = true)
    private String imgSrc;

    @Inject
    @TextField
    @DialogField(fieldLabel = "Image Alt Text", required = true)
    private String imgAlt;

    @Inject
    @TextField
    @DialogField(fieldLabel = "Heading", required = true)
    private String headingText;

    @Inject
    @TextField
    @DialogField(fieldLabel = "Description", required = true)
    private String descriptionText;

    @Inject
    @Selection(type = Selection.SELECT, options = {
        @Option(value = "primary"),
        @Option(value = "secondary"),
        @Option(value = "info")
    })
    @DialogField(fieldLabel = "CTA Style", required = true)
    private String ctaStyle;

    @Inject
    @TextField
    @DialogField(fieldLabel = "CTA Text", required = true)
    private String ctaText;

    @Inject
    @TextField
    @DialogField(fieldLabel = "CTA Href", required = true)
    private String ctaHref;

    public String getImgSrc() {
        return imgSrc;
    }

    public String getImgAlt() {
        return imgAlt;
    }

    public String getHeadingText() {
        return headingText;
    }

    public String getDescriptionText() {
        return descriptionText;
    }

    public String getCtaStyle() {
        return ctaStyle;
    }

    public String getCtaText() {
        return ctaText;
    }

    public String getCtaHref() {
        return ctaHref;
    }

    public void setImgSrc(final String imgSrc) {
        this.imgSrc = imgSrc;
    }

    public void setImgAlt(final String imgAlt) {
        this.imgAlt = imgAlt;
    }

    public void setHeadingText(final String headingText) {
        this.headingText = headingText;
    }

    public void setDescriptionText(final String descriptionText) {
        this.descriptionText = descriptionText;
    }

    public void setCtaStyle(final String ctaStyle) {
        this.ctaStyle = ctaStyle;
    }

    public void setCtaText(final String ctaText) {
        this.ctaText = ctaText;
    }

    public void setCtaHref(final String ctaHref) {
        this.ctaHref = ctaHref;
    }
}

package com.icfnext.aem.patterns.example.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.google.common.base.CharMatcher;
import com.icfnext.aem.patterns.core.components.PlaceholderComponent;
import com.icfnext.aem.patterns.core.constants.BaseComponentTypes;
import com.icfnext.aem.patterns.core.constants.ExporterOptions;
import com.icfnext.aem.patterns.core.constants.ExporterTypes;
import com.icfnext.aem.patterns.example.constants.ResourceTypes;
import com.icfnext.aem.patterns.example.constants.TemplatePaths;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Component(value = "Carousel", resourceSuperType = BaseComponentTypes.PLACEHOLDER)
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
    resourceType = ResourceTypes.CAROUSEL, adapters = {Carousel.class, PlaceholderComponent.class})
@Exporter(name = ExporterTypes.PATTERN, extensions = "html",
    options = @ExporterOption(name = ExporterOptions.TEMPLATE_PATH, value = TemplatePaths.CAROUSEL))
public class Carousel implements PlaceholderComponent {

    @Inject
    @Self
    private Resource resource;

    @Inject
    @Switch
    @DialogField(fieldLabel = "Show Indicators")
    private boolean indicators;

    @Inject
    @Switch
    @DialogField(fieldLabel = "Show Controls")
    private boolean controls;

    //@Inject
    //@MultiField(composite = true)
    //@DialogField(fieldLabel = "Slides")
    private List<CarouselSlide> slides;

    @PostConstruct
    public void postConstruct() {
        // Since the multifield annotation is having issues, construct manually
        slides = new ArrayList<>();
        final CarouselSlide a = new CarouselSlide();
        final CarouselSlide b = new CarouselSlide();
        final CarouselSlide c = new CarouselSlide();

        a.setImgSrc("https://dummyimage.com/1200x400/000/fff&text=+");
        b.setImgSrc("https://dummyimage.com/1200x400/900/fff&text=+");
        c.setImgSrc("https://dummyimage.com/1200x400/009/fff&text=+");

        a.setImgAlt("alt");
        b.setImgAlt("alt");
        c.setImgAlt("alt");

        a.setHeadingText("Slide A");
        b.setHeadingText("Slide B");
        c.setHeadingText("Slide C");

        final String description = "This is example description text.";
        a.setDescriptionText(description);
        b.setDescriptionText(description);
        c.setDescriptionText(description);

        a.setCtaHref("https://www.google.com");
        b.setCtaHref("https://www.google.com");
        c.setCtaHref("https://www.google.com");

        a.setCtaText("Take me away.");
        b.setCtaText("Take me away!");
        c.setCtaText("Take me away?");

        a.setCtaStyle("info");
        a.setCtaStyle("success");
        a.setCtaStyle("dark");

        slides.add(a);
        slides.add(b);
        slides.add(c);
    }

    public String getId() throws NoSuchAlgorithmException {
        final String path = resource.getPath();
        final MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(path.getBytes());
        final String base64 = Base64.getEncoder().encodeToString(messageDigest.digest());
        final String filteredBase64 = CharMatcher.isNot('=').retainFrom(base64);
        // ID attributes must begin with a letter
        return "e" + filteredBase64;
    }

    public boolean isIndicators() {
        return indicators;
    }

    public boolean isControls() {
        return controls;
    }

    public List<CarouselSlide> getSlides() {
        return slides;
    }

    @Override
    public boolean isSkipPlaceholder() {
        return slides != null && !slides.isEmpty();
    }
}

package com.icfnext.aem.patterns.handlebars.pattern;

import com.github.jknack.handlebars.Handlebars;
import com.github.jknack.handlebars.Template;
import com.github.jknack.handlebars.helper.ConditionalHelpers;
import com.github.jknack.handlebars.helper.StringHelpers;
import com.google.common.collect.Sets;
import com.icfnext.aem.patterns.core.exception.PatternException;
import com.icfnext.aem.patterns.core.pattern.Pattern;
import com.icfnext.aem.patterns.core.pattern.PatternProvider;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;

import java.io.IOException;
import java.util.Set;

@Component(immediate = true)
public class HandebarsPatternProvider implements PatternProvider {

    private static final Set<String> EXTENSIONS = Sets.newHashSet("hbs");

    @Reference
    private HandlebarsTemplateLoader templateLoader;

    private Handlebars handlebars;

    @Override
    public Set<String> getSupportedExtensions() {
        return EXTENSIONS;
    }

    @Override
    public Pattern getPattern(final String path) throws PatternException {
        try {
            final Template template = handlebars.compile(path);
            return new HandlebarsPattern(template);
        } catch (IOException e) {
            throw new PatternException("Failed to load pattern", e);
        }
    }

    @Activate
    @Modified
    protected final void activate() {
        handlebars = new Handlebars()
            .with(templateLoader)
            .registerHelpers(ConditionalHelpers.class)
            .registerHelpers(StringHelpers.class);
    }

    @Deactivate
    protected final void deactivate() {
        handlebars = null;
    }

    private static class HandlebarsPattern implements Pattern {

        private final Template template;

        private HandlebarsPattern(final Template template) {
            this.template = template;
        }

        @Override
        public String render(final Object context) throws PatternException {
            try {
                return template.apply(context);
            } catch (IOException e) {
                throw new PatternException("Error rendering template", e);
            }
        }
    }
}

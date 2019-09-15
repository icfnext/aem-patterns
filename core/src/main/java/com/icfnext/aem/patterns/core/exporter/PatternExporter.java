package com.icfnext.aem.patterns.core.exporter;

import com.icfnext.aem.patterns.core.constants.ExporterOptions;
import com.icfnext.aem.patterns.core.constants.ExporterTypes;
import com.icfnext.aem.patterns.core.exception.PatternException;
import com.icfnext.aem.patterns.core.pattern.Pattern;
import com.icfnext.aem.patterns.core.pattern.PatternProvider;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.models.export.spi.ModelExporter;
import org.apache.sling.models.factory.ExportException;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class PatternExporter implements ModelExporter {

    private static final Logger LOG = LoggerFactory.getLogger(PatternExporter.class);

    @Reference(cardinality = ReferenceCardinality.MULTIPLE, policy = ReferencePolicy.DYNAMIC,
        service = PatternProvider.class, bind = "bindProvider", unbind = "unbindProvider")
    private List<PatternProvider> providers = new ArrayList<>();

    @Override
    public boolean isSupported(final Class<?> aClass) {
        return String.class.equals(aClass);
    }

    @Override
    public <T> T export(final Object o, final Class<T> aClass, final Map<String, String> map) throws ExportException {
        final String templatePath = map.get(ExporterOptions.TEMPLATE_PATH);
        if (templatePath != null) {
            final String extension = StringUtils.substringAfterLast(templatePath, ".");
            boolean found = false;
            for (final PatternProvider provider : providers) {
                final Set<String> supportedExtensions = provider.getSupportedExtensions();
                if (supportedExtensions != null && supportedExtensions.contains(extension)) {
                    found = true;
                    try {
                        final Pattern pattern = provider.getPattern(templatePath);
                        if (pattern != null) {
                            return (T) pattern.render(o);
                        }
                    } catch (PatternException e) {
                        LOG.error("Error loading/rendering pattern", e);
                    }
                }
            }
            if (found) {
                LOG.warn("No PatternProvider was able to load template path: {}", templatePath);
            } else {
                LOG.warn("No PatternProvider found supporting requested extension {}", extension);
            }
        } else {
            LOG.warn("Model type registered with pattern exporter without supplying template path: {}", o.getClass());
        }
        return null;
    }

    @Override
    public String getName() {
        return ExporterTypes.PATTERN;
    }

    protected void bindProvider(final PatternProvider provider) {
        providers.add(provider);
    }

    protected void unbindProvider(final PatternProvider provider) {
        providers.remove(provider);
    }
}

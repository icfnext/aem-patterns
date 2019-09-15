package com.icfnext.aem.patterns.handlebars.pattern;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.github.jknack.handlebars.io.AbstractTemplateLoader;
import com.github.jknack.handlebars.io.TemplateSource;
import com.icfnext.aem.patterns.handlebars.constants.SubServices;
import org.apache.commons.io.IOUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ResourceUtil;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Component(immediate = true, service = HandlebarsTemplateLoader.class)
public class HandlebarsTemplateLoader extends AbstractTemplateLoader {

    private static final Logger LOG = LoggerFactory.getLogger(HandlebarsTemplateLoader.class);

    @Reference
    private ResourceResolverFactory resolverFactory;

    private ThreadLocal<String> rootClientLibPath = new ThreadLocal<>();

    @Override
    public TemplateSource sourceAt(final String location) throws IOException {
        try (final ResourceResolver resolver = getServiceResolver()) {
            if (location.startsWith("@")) {
                final Resource resource = findLookupScriptResource(location, resolver);
                if (resource != null) {
                    final InputStream inputStream = resource.adaptTo(InputStream.class);
                    if (inputStream != null) {
                        final String content = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
                        final String filename = resource.getName();
                        return new StringSource(content, filename);
                    }
                }
            } else {
                final Resource resource = resolver.resolve(location);
                if (!ResourceUtil.isNonExistingResource(resource)) {
                    final InputStream inputStream = resource.adaptTo(InputStream.class);
                    if (inputStream != null) {
                        if (rootClientLibPath.get() == null) {
                            final Resource rootClientLibResource = findRootClientLibResource(resource);
                            rootClientLibPath.set(rootClientLibResource.getPath());
                        }
                        final String content = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
                        final String filename = resource.getName();
                        return new StringSource(content, filename);
                    }
                }
            }
        } catch (LoginException e) {
            LOG.error("Error loading template", e);
        }
        return null;
    }

    public void reset() {
        rootClientLibPath.remove();
    }

    private Resource findLookupScriptResource(final String token, final ResourceResolver resolver) {
        assert token.startsWith("@") && rootClientLibPath.get() != null;
        final String name = token.replaceFirst("@", "");

        final Map<String, String> map = new HashMap<>();
        map.put("path", rootClientLibPath.get());
        map.put("type", "nt:file");
        map.put("nodename", name + ".hbs");
        map.put("p.limit", "1");
        final PredicateGroup predicate = PredicateGroup.create(map);
        final QueryBuilder queryBuilder = resolver.adaptTo(QueryBuilder.class);
        final Query query = queryBuilder.createQuery(predicate, resolver.adaptTo(Session.class));
        final SearchResult result = query.getResult();
        final Iterator<Resource> resources = result.getResources();
        if (resources.hasNext()) {
            return resources.next();
        }
        return null;
    }

    private static Resource findRootClientLibResource(final Resource resource) {
        Resource r = resource;
        while (r != null) {
            final String type = r.getValueMap().get("jcr:primaryType", String.class);
            if ("cq:ClientLibraryFolder".equals(type)) {
                return r;
            }
            r = r.getParent();
        }
        return resource;
    }

    private ResourceResolver getServiceResolver() throws LoginException {
        final Map<String, Object> config = SubServices.TEMPLATE_READER.getConfig();
        return resolverFactory.getServiceResourceResolver(config);
    }

    private static class StringSource implements TemplateSource {

        private final String content;
        private final String filename;

        private StringSource(final String content, final String filename) {
            this.content = content;
            this.filename = filename;
        }

        @Override
        public String content(final Charset charset) throws IOException {
            return content;
        }

        @Override
        public String filename() {
            return filename;
        }

        @Override
        public long lastModified() {
            // TODO: use resource created/modified by date
            return System.currentTimeMillis();
        }
    }

}

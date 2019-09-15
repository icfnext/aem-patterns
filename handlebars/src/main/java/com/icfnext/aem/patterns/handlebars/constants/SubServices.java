package com.icfnext.aem.patterns.handlebars.constants;

import org.apache.sling.api.resource.ResourceResolverFactory;

import java.util.HashMap;
import java.util.Map;

public enum SubServices {

    TEMPLATE_READER("aem-patterns-template-reader");

    private final String systemUserId;

    SubServices(final String systemUserId) {
        this.systemUserId = systemUserId;
    }

    public Map<String, Object> getConfig() {
        final Map<String, Object> out = new HashMap<>();
        out.put(ResourceResolverFactory.SUBSERVICE, this.systemUserId);
        return out;
    }
}

package com.icfnext.aem.patterns.core.constants;

import com.icfnext.aem.patterns.core.components.PlaceholderComponent;

/**
 * Lists resource types corresponding to AEM-Patterns base components.  Base components wrap calls to to the frontend
 * templating engine, allowing an opportunity to provide authoring affordances, such as placeholders.
 */
public final class BaseComponentTypes {

    /**
     * A component which immediately calls the templating engine without any wrapping html
     */
    public static final String STANDARD = "aem-patterns/components/base/standard";

    /**
     * A component that optionally adds a placeholder.  The sling model can optionally implement the
     * {@link PlaceholderComponent} interface (and register the interface as an
     * adapter) to conditionally show the placeholder (e.g., when the component is not configured).
     */
    public static final String PLACEHOLDER = "aem-patterns/components/base/placeholder";

    private BaseComponentTypes() { }
}

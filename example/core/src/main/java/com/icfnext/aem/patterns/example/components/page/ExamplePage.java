package com.icfnext.aem.patterns.example.components.page;

import com.citytechinc.cq.component.annotations.Component;
import com.icfnext.aem.patterns.example.constants.ResourceTypes;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Component(value = "Example Page", resourceSuperType = "wcm/foundation/components/page", path = "page",
    group = ".hidden")
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
    resourceType = ResourceTypes.EXAMPLE_PAGE)
public class ExamplePage {


}

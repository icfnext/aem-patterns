package com.icfnext.aem.patterns.core.pattern;

import com.icfnext.aem.patterns.core.exception.PatternException;

public interface Pattern {

    String render(final Object context) throws PatternException;

}

package com.icfnext.aem.patterns.core.pattern;

import com.icfnext.aem.patterns.core.exception.PatternException;

import java.util.Set;

public interface PatternProvider {

    Set<String> getSupportedExtensions();

    Pattern getPattern(final String path) throws PatternException;

}

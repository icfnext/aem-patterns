package com.icfnext.aem.patterns.core.exception;

public class PatternException extends Exception {

    public PatternException(final String message) {
        super(message);
    }

    public PatternException(final String message, final Throwable cause) {
        super(message, cause);
    }
}

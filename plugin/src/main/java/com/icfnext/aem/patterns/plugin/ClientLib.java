package com.icfnext.aem.patterns.plugin;

import org.apache.maven.plugins.annotations.Parameter;

import java.util.List;

public class ClientLib {

    @Parameter(required = true)
    private String categories;

    @Parameter(required = true)
    private String jcrPath;

    @Parameter
    private List<String> cssFiles;

    @Parameter
    private List<String> jsFiles;

    @Parameter
    private List<String> staticFiles;

    @Parameter
    private List<String> templateFiles;

    @Parameter
    private String cssRelPath;

    @Parameter
    private String jsRelPath;

    @Parameter
    private String staticFilesRelPath;

    @Parameter
    private String templateFilesRelPath;

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public String getJcrPath() {
        return jcrPath;
    }

    public void setJcrPath(String jcrPath) {
        this.jcrPath = jcrPath;
    }

    public List<String> getCssFiles() {
        return cssFiles;
    }

    public void setCssFiles(List<String> cssFiles) {
        this.cssFiles = cssFiles;
    }

    public List<String> getJsFiles() {
        return jsFiles;
    }

    public void setJsFiles(List<String> jsFiles) {
        this.jsFiles = jsFiles;
    }

    public List<String> getStaticFiles() {
        return staticFiles;
    }

    public void setStaticFiles(List<String> staticFiles) {
        this.staticFiles = staticFiles;
    }

    public List<String> getTemplateFiles() {
        return templateFiles;
    }

    public void setTemplateFiles(final List<String> templateFiles) {
        this.templateFiles = templateFiles;
    }

    public String getCssRelPath() {
        return cssRelPath;
    }

    public void setCssRelPath(String cssRelPath) {
        this.cssRelPath = cssRelPath;
    }

    public String getJsRelPath() {
        return jsRelPath;
    }

    public void setJsRelPath(String jsRelPath) {
        this.jsRelPath = jsRelPath;
    }

    public String getStaticFilesRelPath() {
        return staticFilesRelPath;
    }

    public void setStaticFilesRelPath(String staticFilesRelPath) {
        this.staticFilesRelPath = staticFilesRelPath;
    }

    public String getTemplateFilesRelPath() {
        return templateFilesRelPath;
    }

    public void setTemplateFilesRelPath(final String templateFilesRelPath) {
        this.templateFilesRelPath = templateFilesRelPath;
    }
}

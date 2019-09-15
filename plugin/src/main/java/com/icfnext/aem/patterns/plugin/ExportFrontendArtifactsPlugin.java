package com.icfnext.aem.patterns.plugin;

import com.google.common.base.Charsets;
import com.google.common.io.CharStreams;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.project.MavenProject;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Mojo(name = "export-frontend-artifacts")
public class ExportFrontendArtifactsPlugin extends AbstractMojo {

    private static final String FRONTEND_EXPORT_DIR = "/frontend-export-work";

    @Parameter(required = true, readonly = true, defaultValue = "${project}")
    private MavenProject project;

    @Parameter(required = true)
    private String baseDir;

    @Parameter
    private List<ClientLib> clientLibs;

    private String contentTemplate;
    private String projectBase;
    private File jcrRoot;

    public void execute() throws MojoExecutionException {
        try {
            contentTemplate = loadFileContent("content-template.xml");
            final String filtersTemplate = loadFileContent("filters-template.xml");
            final String filterTemplate = loadFileContent("filter-template.xml");
            projectBase = project.getBasedir().getAbsolutePath();
            final String classesDir = project.getBuild().getOutputDirectory();

            final File classes = new File(classesDir);
            classes.mkdirs();
            final File target1 = classes.getParentFile();

            final String rootPath = target1.getPath() + FRONTEND_EXPORT_DIR + "/jcr_root";
            jcrRoot = new File(rootPath);
            if (!jcrRoot.exists()) {
                jcrRoot.mkdirs();
            }
            StringBuilder filters = new StringBuilder();
            if (clientLibs != null) {
                for (ClientLib clientLib : clientLibs) {
                    generateClientLib(clientLib);
                    filters.append(String.format(filterTemplate, clientLib.getJcrPath()));
                }
            }
            final File filtersFile = new File(target1.getAbsolutePath() + FRONTEND_EXPORT_DIR + "/filter.xml");
            final String filterFileContent = String.format(filtersTemplate, filters.toString());
            Files.write(filtersFile.toPath(), filterFileContent.getBytes(StandardCharsets.UTF_8));

            final File target = new File(classesDir);
            final Path src = jcrRoot.toPath();
            final Path dst = target.toPath();
            copyRecursiveFolder(src, dst);

        } catch (IOException e) {
            throw new MojoExecutionException("Failure while generating bundle", e);
        }
    }

    private void generateClientLib(ClientLib clientLib) throws IOException {
        final String jcrPath = clientLib.getJcrPath();
        final String directoryPath = jcrRoot.getAbsolutePath() + jcrPath;
        final File directory = new File(directoryPath);
        directory.mkdirs();

        final List<String> cssFiles = clientLib.getCssFiles();
        if (cssFiles != null && !cssFiles.isEmpty()) {
            final FileIndex cssIndex = copyClientLibFiles(directoryPath, clientLib.getCssRelPath(), cssFiles);
            final String cssTxt = formatFileIndex(cssIndex);
            final File file = new File(directoryPath + "/css.txt");
            file.createNewFile();
            try (FileWriter writer = new FileWriter(file)) {
                writer.append(cssTxt);
            }
        }
        final List<String> jsFiles = clientLib.getJsFiles();
        if (jsFiles != null && !jsFiles.isEmpty()) {
            final FileIndex jsIndex = copyClientLibFiles(directoryPath, clientLib.getJsRelPath(), jsFiles);
            final String jsTxt = formatFileIndex(jsIndex);
            final File file = new File(directoryPath + "/js.txt");
            file.createNewFile();
            try (FileWriter writer = new FileWriter(file)) {
                writer.append(jsTxt);
            }
        }
        final List<String> staticFiles = clientLib.getStaticFiles();
        if (staticFiles != null && !staticFiles.isEmpty()) {
            copyClientLibFiles(directoryPath, clientLib.getStaticFilesRelPath(), staticFiles);
        }
        final List<String> templateFiles = clientLib.getTemplateFiles();
        if (templateFiles != null && !templateFiles.isEmpty()) {
            copyClientLibFiles(directoryPath, clientLib.getTemplateFilesRelPath(), templateFiles);
        }
        final String directoryName = directory.getName();
        final String nodeContent = generateNodeContent(clientLib, directoryName);
        final File file = new File(directory.getAbsolutePath() + "/.content.xml");
        Files.write(file.toPath(), nodeContent.getBytes(StandardCharsets.UTF_8));
    }

    private FileIndex copyClientLibFiles(final String directoryPath, final String relPath, final List<String> files)
        throws IOException {
        final String rel = relPath != null && !relPath.trim().isEmpty() ? relPath : "";
        final String relSlash = !rel.isEmpty() ? relPath + "/" : "/";
        final String base = projectBase + "/" + baseDir +"/";
        final Set<String> filePaths = new LinkedHashSet<>();
        for (String filePath : files) {
            final String absolutePath = base + filePath;
            final File toCopy = new File(absolutePath);
            if (!toCopy.exists()) {
                throw new IllegalStateException("Missing declared clientlibrary file: " + absolutePath);
            }
            final String name = toCopy.getName();
            final String destinationPath = directoryPath + (!rel.isEmpty() ? "/" + relSlash : "/") + name;
            final List<String> paths = copyRecursive(toCopy.getAbsolutePath(), destinationPath);
            filePaths.addAll(paths);
        }
        return new FileIndex(rel, new ArrayList<>(filePaths));
    }

    private String formatFileIndex(final FileIndex fileIndex) {
        final StringBuilder out = new StringBuilder();
        out.append("#base=");
        out.append(fileIndex.relPath.isEmpty() ? "." : fileIndex.relPath);
        out.append("\n");
        for (String path : fileIndex.filePaths) {
            out.append(path).append('\n');
        }
        return out.toString();
    }

    private String generateNodeContent(final ClientLib clientLib, String directoryName) {
        return String.format(contentTemplate, clientLib.getCategories());
    }

    private String loadFileContent(final String name) throws IOException {
        final URL resource = getClass().getClassLoader().getResource(name);
        if (resource != null) {
            try (final InputStream inputStream = resource.openStream()) {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream, Charsets.UTF_8);
                return CharStreams.toString(inputStreamReader);
            }
        }
        throw new IllegalStateException(name + " file not found");
    }

    private static List<String> copyRecursive(final String src, final String dst) throws IOException {
        final List<String> out = new ArrayList<>();
        final FileSystem fileSystem = FileSystems.getDefault();
        final Path srcPath = fileSystem.getPath(src);
        final File srcFile = srcPath.toFile();
        final File baseFile = srcFile.isDirectory() ? srcFile : srcFile.getParentFile();
        final String base = baseFile.getAbsolutePath();
        copyRecursive(src, dst, out, base);
        return out;
    }

    private static void copyRecursive(final String src, final String dst, final List<String> names, final String base)
        throws IOException {
        final FileSystem fileSystem = FileSystems.getDefault();
        final Path srcPath = fileSystem.getPath(src);
        final Path dstPath = fileSystem.getPath(dst);
        final File srcFile = srcPath.toFile();
        final File dstFile = dstPath.toFile();
        if (!dstFile.exists()) {
            dstFile.getParentFile().mkdirs();
            Files.copy(srcPath, dstPath);
            if (!srcFile.isDirectory()) {
                final String relPath = src.substring(base.length() + 1);
                names.add(relPath);
            }
        }
        if (srcFile.isDirectory()) {
            final String[] fileNames = srcFile.list();
            if (fileNames != null) {
                for (String fileName : fileNames) {
                    copyRecursive(src + "/" + fileName, dst + "/" + fileName, names, base);
                }
            }
        }
    }

    public void copyRecursiveFolder(final Path src, final Path dest) throws IOException {
        Files.walk(src).forEach(source -> copy(source, dest.resolve(src.relativize(source))));
    }

    private void copy(final Path source, final Path dest) {
        try {
            Files.copy(source, dest);
        } catch (FileAlreadyExistsException e) {
            // skip
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    private static class FileIndex {

        private final String relPath;
        private final List<String> filePaths;

        private FileIndex(final String relPath, final List<String> filePaths) {
            this.relPath = relPath;
            this.filePaths = filePaths;
        }
    }

}

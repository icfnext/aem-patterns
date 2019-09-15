---
title: "Example Design Variables"
label: "Design Variables"
---

## {{colors.title}}
{{colors.description}}

| Key        | Value           | Color Swatch  |
| ------------- |-------------| -----:|
{{#each colors.defineVars}}
| <code class="docs__code-highlight">{{@key}}</code> | {{this}} | <div class="docs__color-swatch" style="background-color:{{this}}"></div> |
{{/each}}

## {{deviceSizes.title}}
{{deviceSizes.description}}

Key         | Value
------------|------------
{{#each deviceSizes.defineVars}}
<code class="docs__code-highlight">{{@key}}</code> | {{this}}
{{/each}}

## {{spacing.title}}
{{spacing.description}}

{{#eq fontSizes.defineVars.base-font-size "16"}}
| Key        | Value (rem)      | Value (px)  |
| ------------- |-------------| -----|
{{#each spacing.defineVars}}
| <code class="docs__code-highlight">{{@key}}</code> | {{this}}rem | {{multiply this 16}}px |
{{/each}}
{{else}}
Key         | Value (rem)
------------|------------
{{#each spacing.defineVars}}
<code class="docs__code-highlight">{{@key}}</code> | {{this}}rem
{{/each}}
{{/eq}}

## {{fontSizes.title}}
{{fontSizes.description}}

<code class="docs__code-highlight">base-font-size</code>: {{fontSizes.defineVars.base-font-size}}px

{{#eq fontSizes.defineVars.base-font-size "16"}}
| Key        | Value (rem)      | Value (px)  |
| ------------- |-------------| -----|
{{#each fontSizes.defineVars}}
{{#isnt @key "base-font-size"}}
|<code class="docs__code-highlight">{{@key}}</code> | {{this}}rem | {{multiply this 16}}px |
{{/isnt}}
{{/each}}
{{else}}
Key         | Value (rem)
------------|------------
{{#each fontSizes.defineVars}}
{{#isnt @key "base-font-size"}}
<code class="docs__code-highlight">{{@key}}</code> | {{this}}rem
{{/isnt}}
{{/each}}
{{/eq}}

## {{fontWeights.title}}
{{fontWeights.description}}

Key         | Value
------------|------------
{{#each fontWeights.defineVars}}
<code class="docs__code-highlight">{{@key}}</code> | {{this}}
{{/each}}

## {{lineHeights.title}}
{{lineHeights.description}}

Key         | Value
------------|------------
{{#each lineHeights.defineVars}}
<code class="docs__code-highlight">{{@key}}</code> | {{this}}
{{/each}}

## {{transitionLengths.title}}
{{transitionLengths.description}}

Key         | Value
------------|------------
{{#each transitionLengths.defineVars}}
<code class="docs__code-highlight">{{@key}}</code> | {{this}}
{{/each}}

## {{zIndexes.title}}
{{zIndexes.description}}

Key         | Value
------------|------------
{{#each zIndexes.defineVars}}
<code class="docs__code-highlight">{{@key}}</code> | {{this}}
{{/each}}

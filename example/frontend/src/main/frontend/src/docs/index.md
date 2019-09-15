---
title: Example Style Guide
---

## Component Status
|Color | Description | JSON Status Code | 
|------|-------------|------------------|
{{#each statuses}}
| <div class="docs__color-box" style="background-color:{{this.color}}"></div> | {{this.label}} | <code class="docs__code-highlight">{{@key}}</code> |
{{/each}}

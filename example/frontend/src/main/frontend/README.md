# Example Fractal FE Build & Pattern Library

### Installation 
1) Requires at least node v8.x and yarn v1.6.x
2) `yarn install`
3) `yarn start` to start dev server

### Front End Build Commands

**Dev instance:** `yarn start`  
Starts the Fractal styleguide instance on *localhost:3000* with *watch* enabled for convenient development.

**Build Fractal styleguide:** `yarn build-fractal`  
Builds the static deployable instance of the Fractal styleguide under *frontend/docs*.

:warning: Ensure the *styleguideRootPath* config field in package.json is set correctly before building.

**Build JS+CSS [+ export fonts & images] only:** `yarn build`  
Builds the JS+CSS under *frontend/dist*

### Fractal package.json Config Fields

`rootFolderName`: Name of the folder which contains the package.json

`styleguideRootPath`: Root path of where the production built Fractal will be placed.

`projectTitle`: User friendly project title which is used throughout the styleguide.

***

## Front End References

#### SCSS Mixins

Variable names/keys can be viewed from running Fractal, or by looking at the JSON files under *frontend/src/vars*

* **Colors:** Variables should already be defined and align with a color’s name/key value.  
	* `background-color: $blue;`
* **Breakpoints:** *breakAt()* and *upTo()* mixins can be used to responsively apply styles. *breakAt()* will apply to a minimum width, and *upTo()* will apply to a maximum width.
	* `@include breakAt(tablet) { [tablet styles] }`
	* `@include upTo(tablet) { [mobile styles] }`
* **Spacing:** Variables are used throughout the styleguide to normalize spacing values. The variables are directly exposed without mixin usage required.
	* `padding: $spacing—base $spacing—lg;`
* **Font Size:** *font-size()* mixin can be utilized to easily set font sizes.
	* `@include font-size(sm);`
* **Font Family** *font-family()* mixin can be utilized to set the font family, along with the font-weight and font-style.
	* `@include font-family(bold);`
* **Line Height:** *line-height()* mixin can be utilized to apply line-height.
	* `@include line-height(short);`
* **Transitions:** *transition(speed, properties)* can be utilized the apply transitions.
	* `@include transition(normal, all);`
* **Is-Active:** *is-active* can be utilized to easily target :active, :focus, :active, and :is-active pseudo elements.
	* `@include is-active { [active styles] }`
* **Z-Indexes:** *z-index()* mixin can be utilized to apply z-index.
	* `@include z-index(navigation);`

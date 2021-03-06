# NgxRowAccordionDemo
Accordion(s) integrated with your (Angular) routes.

![Ngx row accordion demo](https://user-images.githubusercontent.com/4950209/40909405-6371a3ea-67e1-11e8-8a31-f579390ca03c.png)
*Demo with 2 different accordion groups and primary + auxiliary routes*


## Install

Install the [npm package](https://www.npmjs.com/package/ngx-row-accordion):

`yarn add ngx-row-accordion`

## Setup
From `AppModule`:
```diff
+ import { NgxRowAccordionModule } from 'ngx-row-accordion';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
+   NgxRowAccordionModule.forRoot()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

From your `SharedModule`:
```diff
+ import { NgxRowAccordionModule } from 'ngx-row-accordion';

@NgModule({
  imports: [
    CommonModule,
+   NgxRowAccordionModule
  ],
})
export class SharedModule {}
```

Style the component the way you want (example):
```diff
+ngx-row-accordion {
+  .ngx-row-accordion {
+    display: inline-block;
+    height: 100%;
+
+    .title {
+      padding: 16px;
+      writing-mode: vertical-rl;
+      text-orientation: sideways;
+      background-color: #d8d8d8;
+      cursor: pointer;
+      user-select: none;
+    }
+
+    .body {
+      padding: 16px;
+      background-color: #f3f3f3;
+      overflow: auto;
+    }
+  }
+}
```

**Note**:  
If you want to style `ngx-row-accordion` globally, put those styles into `src/styles.scss`.

If you want to style accordions inside a given component, you should use `::ng-deep` like the following:

```diff
+ngx-row-accordion ::ng-deep {
+  ...
+}
```

*Learn more about view encapsulation [here](https://angular.io/guide/component-styles#view-encapsulation) and `::ng-deep` [here](https://angular.io/guide/component-styles#deprecated-deep--and-ng-deep).*

## Use
```html
<ngx-row-accordion title="Your title goes here" group="the-group-name">
  Your content goes here
</ngx-row-accordion>

```

The `group` attribute allows you to group some accordions.

Grouped accordions will have the following behaviours:
* When opening a new accordion, previous one will be collapsed
* Possibility to re-open one of the collapsed accordion


## Customize the design
Design is left to the consumers.

From a non encapsulated style sheet (*`src/styles.scss` for ex*):

```scss
.ngx-row-accordion {
  // custom the vertical title
  .title {
    // ...
  }

  // custom the body
  .body {
    // ...
  }
}
```


# DEV
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

Project is split into 2 parts:
* `src/app`: The demo of the library
* `projects/ngx-row-accordion`: The library itself


## Development server
Run `yarn run start` to start a dev server.  
Navigate to [http://localhost:4200](http://localhost:4200).  
The app will automatically reload if you change any of the source files.


## Build
### Demo app
`yarn run build:demo:prod`

### Library
`yarn run build:lib:prod`


## Running unit tests
Run `yarn run test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Running end-to-end tests
Run `yarn run cy` to execute the end-to-end tests via [Cypress](https://www.cypress.io).


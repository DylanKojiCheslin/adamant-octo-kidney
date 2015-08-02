# adamant-octo-kidney
Example of Easy Search in Meteor

This is an example app showing the use of the Easy Search Package.

It can be found at https://github.com/matteodem/meteor-easy-search

This Example app will aim to split all functionality into easy to copy and use
bite sized Examples.

This readme will cover the following:


-basic search
-sorting


Basic Search

This section describes the firstNames files.

Indexs are used to define how searches work and how you reffer to the data found
in you search.

You can search mini mongo, Mongo DB, or use elastic search. The default is MongoDB.


The .initEasySearch function is the easy way create search Indexs.

```javascript
//on client and server
FirstNames = new Mongo.Collection("firstNames");

//creates a index for the FirstName collection
FirstNames.initEasySearch('name');

```

Use the esInput Blaze Component to take the search.

```
{{> esInput index="firstNames" placeholder="Search first names..." }}
```

Use the #esEach Blaze Template to display the results

```html
<template name="listFirstNames">
  <ul>
    {{#esEach index="firstNames"}}
      <li>Name of the person: {{name}}</li>
    {{/esEach}}
  </ul>
</template>

```
Use the #ifEsHasNoResults to display if there are no results

```html
{{#ifEsHasNoResults index="firstNames"}}
    <div class="no-results">No results found!</div>
{{/ifEsHasNoResults}}
```
Use the esLoadMoreButton Blaze Template to Load more items.
The default number of items displayed is 20.

```html

  {{> esLoadMoreButton index="firstNames"}}

```


Sorting

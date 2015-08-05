# adamant-octo-kidney
Example of Easy Search in Meteor

This is an example app showing the use of the Easy Search Package.

It can be found at https://github.com/matteodem/meteor-easy-search

This Example app will aim to split all functionality into easy to copy and use
bite sized Examples. I will aim to have a unique name for every thing, with the
exception of the indexs having the same name as the collections they search.

This readme will cover the following:


-basic search
-sorting
-searching within a range


Basic Search

This section describes the firstNames files and the simplest search example.

Indexs are used to define how searches work and how you reffer to the data found
in you search.

You can use search engenes- mini mongo, Mongo DB, elastic search, or custom.
The default is mini-mongo. MongoDb Searchs the whole collection.
Mini mongo searches subscriptions.


The initEasySearch function is the easy way create search Indexs.

```javascript
//on client and server
FirstNames = new Mongo.Collection("firstNames");

//creates a index for the FirstName collection
FirstNames.initEasySearch('name');

```

Use the esInput to take the search.

```
{{> esInput index="firstNames" placeholder="Search first names..." }}
```

Use the #esEach to display the results

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
Use the esLoadMoreButton to Load more items.
The default number of items displayed is 20.

```html

  {{> esLoadMoreButton index="firstNames"}}

```


Sorting

This section describes the fullNames files and how to sort search results.

We will use EasySearch.createSearchIndex(name, options) to create our index.
name being the index name and options being how to configure the search index.

```javascript

EasySearch.createSearchIndex('fullNames', {
  'collection': FullNames, // instanceof Meteor.Collection
  'field': ['firstName', 'lastName'], // array of fields to be searched
  'limit': 10,
  'use' : 'mongo-db',
  'props': {
    'sortBy' : 'first-name'
  },
  'sort': function() {
    if (this.props.sortBy === 'first-name') {
      return { 'firstName': 1 };
    }  else if (this.props.sortBy === 'last-name') {
      return { 'lastName': 1 };
    }
    // default by first name
    return { 'score': -1 };
  }
});

```
The 'props' option is a place to save custom propertys to the index.
The 'sort' option decides how to order the search results.
The 'use' option is what kind of search engine you want to use:mongo-db,
minimongo, elastic search, or custom.

Searching within a range

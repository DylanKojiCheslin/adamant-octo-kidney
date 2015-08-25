# adamant-octo-kidney
Example of Easy Search in Meteor

This is an example app showing the use of the Easy Search Package.

It can be found at https://github.com/matteodem/meteor-easy-search

This Example app will aim to split all functionality into easy to copy and use
bite sized Examples. I will aim to have a unique name for every thing, includeing
search indexs. Each example will have its own collection and folder in the client.

This readme will cover the following:


-basic search
-sorting
-searching within a range


Basic Search

This section describes the firstNames files and the simplest search example.

Indexs are used to define how searches work and how you refine the data found
in you search.

You can use search engenes- mini mongo, Mongo DB, elastic search, or custom.
The default is mini-mongo. MongoDb Searches the whole collection.
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
  'collection': FullNames,
  'field': ['firstName', 'lastName'],
  'limit': 10,
  'use' : 'mongo-db',
  'props': {
    'sortBy' : 'first-name'
  },
  'sort': function() {
    //checks to see what props.sortBy is set to
    if (this.props.sortBy === 'first-name') {
      //change the Sort Specifier
      return { 'firstName': 1 };
    }  else if (this.props.sortBy === 'last-name') {
      return { 'lastName': 1 };
    }
    // default by first name
    return { 'firstName': 1 };
  }
});

```

The 'collection' option is what Meteor Collection will be indexed.

The 'field' option is an array of fields to be searched. You only need to include
fields that will be typed in by the user.

The 'limit' option defines how many results are in the returned array.

The 'props' option is a place to save custom properties to the index.

The 'use' option is what kind of search engine you want to use:mongo-db,
minimongo, elastic search, or custom.

The 'sort' option decides how to order the search results by defining the
Sort Specifiers that will be returned.

HTML
```html

<span>sort by first or last name</span>
  <select class="sort-select">
    <option data-sort="first-name">first name</option>
    <option data-sort="last-name">last name</option>
  </select>

```

Client side code to modify the props

```javascript

Template.searchFullNames.events({

  'change .sort-select': function(e) {
    e.preventDefault();
    //grab the index
    var instance = EasySearch.getComponentInstance({
      index: 'fullNames'
    });
    //change prop              index name   prop
    EasySearch.changeProperty('fullNames', 'sortBy',
    //new value for prop
    $(e.target).children(':selected').data('sort')
    );
    //paginate to start
    instance.paginate(1);
    //rerun search
    instance.triggerSearch();
  }
});

```


Searching within a range

This section describes the people files and how to have a ranged search.
The example shows search withing a number range.

```javascript

EasySearch.createSearchIndex('people', {
  'collection': People,
  'field': ['givenName', 'famlyName'],
  'limit': 10,
  'props': {
    'lowerLimit' : 0,
    'upperLimit' : 0
  },
  'query': function(searchString) {
    //grabs the default query
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    //falsey control logic
    if (this.props.lowerLimit) {
      // .feildname = selector object
      query.age = {$gt: this.props.lowerLimit};
    }
    if (this.props.upperLimit) {
      query.age = {$lt: this.props.upperLimit};
    }
    return query;
  }
});

```
The query option of a search index must return
a selector object.

HTML
```html
<form class="ageLimitFormArea" action="index.html" method="post">
  <div class="range-selection">
    <input class="lowerQuantity" type="number" name="lowerQuantity" min="1" max="125">
    <input class="upperQuantity" type="number" name="upperQuantity" min="1" max="125">
    <input type="reset" value="Clear Form" />
    <input type="submit" value="Add/Update range" />
  </div>
</form>
```

Client side js to change the props

```javascript
Template.searchPeople.events({

"submit .ageLimitFormArea": function(e){


  e.preventDefault();

    //default falsey vars
    var possibleLowerLimit = 0;
    var possibleUpperLimit = 0;

    //maybe set the defalut vars to something truthy
    possibleLowerLimit = parseInt(event.target.lowerQuantity.value);
    possibleUpperLimit = parseInt(event.target.upperQuantity.value);

  //change prop             index      prop name    what value to set prop to
  EasySearch.changeProperty('people', 'lowerLimit', possibleLowerLimit);
  EasySearch.changeProperty('people', 'upperLimit', possibleUpperLimit);

  //grab the index your editing
  var instance = EasySearch.getComponentInstance({
    index: 'people'
  });

  //set the pagination to the first page
  instance.paginate(1);

  //trigger the search again
  instance.triggerSearch();
  }
});

```

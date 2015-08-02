# adamant-octo-kidney
Example of Easy Search in Meteor

This is an example app showing the use of the Easy Search Package.

It can be found at https://github.com/matteodem/meteor-easy-search

You can use the initEasySearch to create search Indexs to search your documents.


'''
//on client and server
FirstNames = new Mongo.Collection("firstNames");

//creates a index for the FirstName collection
FirstNames.initEasySearch(['name'], {
    'limit' : 20,
    'use' : 'mongo-db'
});

'''

You can search mini mongo, Mongo DB, or use elastic search.

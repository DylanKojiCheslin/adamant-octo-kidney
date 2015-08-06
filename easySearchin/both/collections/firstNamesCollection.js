FirstNames = new Mongo.Collection("firstNames");

FirstNames.initEasySearch('firstNames');

//this is for the autoform package, and not relevent to easy search
FirstNames.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "First Name",
    max: 200
  }
}));

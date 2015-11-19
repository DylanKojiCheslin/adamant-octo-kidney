Pets = new Mongo.Collection("pets");

EasySearch.createSearchIndex('petsIndex', {
  'collection': Pets,
  'field': ['petName'],
  'limit': 10,
  'props': {
    'lowerPetAgeLimit' : 0,
    'upperPetAgeLimit' : 0,
    'typeFilter' : [],
    'genderFilter' : []
  },
  'query': function(searchString) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    console.log(
      this.props.lowerPetAgeLimit
    );
    if (this.props.lowerPetAgeLimit) {
      query.petAge = {$gt: this.props.lowerPetAgeLimit};
    }
    console.log(
      this.props.upperPetAgeLimit
    );
    if (this.props.upperPetAgeLimit) {
      query.petAge = {$lt: this.props.upperPetAgeLimit};
    }
    console.log(
      this.props.typeFilter
    );
    if (this.props.typeFilter) {
      query.petType = {$in: this.props.typeFilter}
    }
    console.log(
      this.props.genderFilter
    );
    if (this.props.genderFilter.lenght > 0) {
      query.petGender = {$in: this.props.genderFilter}
    }
    console.log(query);
    return query;
  }
});

//this is for the autoform package, and not relevent to easy search
Pets.attachSchema(new SimpleSchema({
  petName: {
    type: String,
    label: "Pets Name",
    max: 200
  },
  petType: {
    type: String,
    label: 'Type of pet',
    allowedValues: ['Dog', 'Cat', 'Fist', 'Turtle']
  },
  petGender: {
    type: String,
    allowedValues: ['Male', 'Female'],
  },
  petAge: {
    type: Number,
    label: 'age',
    min: 0,
    max: 125
  }
}));

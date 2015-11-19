Template.searchPets.events({
  "submit #petsAgeLimitFormArea": function(e){
    e.preventDefault();
    var possibleLowerLimit = 0;
    var possibleUpperLimit = 0;
    possibleLowerLimit = parseInt(event.target.lowerQuantity.value);
    possibleUpperLimit = parseInt(event.target.upperQuantity.value);
    EasySearch.changeProperty('petsIndex', 'lowerPetAgeLimit', possibleLowerLimit);
    EasySearch.changeProperty('petsIndex', 'upperPetAgeLimit', possibleUpperLimit);

    var instance = EasySearch.getComponentInstance({
      index: 'petsIndex'
    });

    instance.paginate(1);
    instance.triggerSearch();
  },
  "change .type-pick": function(e){
    e.preventDefault();
    var instance = EasySearch.getComponentInstance({
      index: 'petsIndex'
    });
    var newType = {petType : $(e.target).data('type')}
    var isChecked = ($(e.target).is(':checked'));
    if (isChecked) {
      var oldTypes = EasySearch.getIndex('petsIndex').props['typeFilter'];
      if (!_.findWhere(oldTypes, newType)) {
        oldTypes.push(newType);
        EasySearch.changeProperty('petsIndex', 'typeFilter', oldTypes);
        instance.paginate(1);
        instance.triggerSearch();
      }
    }else {
      //check if newType is in typeFilter
      var oldTypes = EasySearch.getIndex('petsIndex').props['typeFilter'];
      console.log(oldTypes);
      if (_.findWhere(oldTypes, newType)) {
      var typesOfPets = [];
      typesOfPets = _.difference(oldTypes, newType);
      typesOfPets = _.without(typesOfPets, _.findWhere(oldTypes, newType))

        console.log(typesOfPets);
      EasySearch.changeProperty('petsIndex', 'typeFilter', typesOfPets);
      instance.paginate(1);
      instance.triggerSearch();
      }
    }
  }
  // ,
  // charge
});
        // to Remove an item from array using UnderscoreJS
        // Using underscore.js, you could combine .findWhere with .without:
        // arr = _.without(arr, _.findWhere(arr, {id: 3}));
//
//         _.where_.where(list, properties)
// Looks through each value in the list,
//  returning an array of all the values that contain all of the key-value pairs listed in properties.
//
// .where(listOfPlays, {author: "Shakespeare", year: 1611});
// => [{title: "Cymbeline", author: "Shakespeare", year: 1611},
//     {title: "The Tempest", author: "Shakespeare", year: 1611}]11

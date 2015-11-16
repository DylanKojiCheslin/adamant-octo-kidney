Template.searchPeople.events({

"submit #peopleAgeLimitFormArea": function(e){

  e.preventDefault();

    var possibleLowerLimit = 0;
    var possibleUpperLimit = 0;

    possibleLowerLimit = parseInt(event.target.lowerQuantity.value);
    possibleUpperLimit = parseInt(event.target.upperQuantity.value);


  EasySearch.changeProperty('peopleIndex', 'lowerLimit', possibleLowerLimit);
  EasySearch.changeProperty('peopleIndex', 'upperLimit', possibleUpperLimit);

  var instance = EasySearch.getComponentInstance({
    index: 'peopleIndex'
  });

  instance.paginate(1);
  instance.triggerSearch();
  }
  ,
    "click #clear-people-age-form": function(e){
      EasySearch.changeProperty('peopleIndex', 'lowerLimit', 0);
      EasySearch.changeProperty('peopleIndex', 'upperLimit', 0);
      var instance = EasySearch.getComponentInstance({
        index: 'peopleIndex'
      });
      instance.triggerSearch();

    }
});

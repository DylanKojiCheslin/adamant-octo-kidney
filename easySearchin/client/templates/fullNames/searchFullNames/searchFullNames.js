Template.searchFullNames.events({

  'change .sort-select': function(e) {
    e.preventDefault();
    var instance = EasySearch.getComponentInstance({
      index: 'fullNames'
    });

    EasySearch.changeProperty('fullNames', 'sortBy', $(e.target).children(':selected').data('sort'));

    instance.paginate(1);
    instance.triggerSearch();
  }
});

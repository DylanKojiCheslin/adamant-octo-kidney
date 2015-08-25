Template.searchFullNames.events({

  'change .sort-select': function(e) {
    e.preventDefault();
    var instance = EasySearch.getComponentInstance({
      index: 'fullNamesIndex'
    });

    EasySearch.changeProperty('fullNamesIndex', 'sortBy', $(e.target).children(':selected').data('sort'));

    instance.paginate(1);
    instance.triggerSearch();
  }
});

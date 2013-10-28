
angular.module('myApp.services').service('$query', [
  '$kinvey', function($kinvey) {
    var applyOptions, initialEntityAggregator, makeSorted;
    initialEntityAggregator = function(type, result) {
      var agg;
      if (result == null) result = '[]';
      agg = new Kinvey.Group;
      agg.initial({
        result: result
      });
      return agg;
    };
    applyOptions = function(query, options) {
      var modifier, tags, _i, _j, _len, _len1, _ref, _ref1, _results;
      if (options == null) options = {};
      if (options.excludeDeleted) query.notEqualTo('state', 'deleted');
      if (options.after) query.greaterThan('_kmd.lmt', options.after);
      _ref = ['limit', 'skip'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        modifier = _ref[_i];
        if (options[modifier] != null) query[modifier](options[modifier]);
      }
      _ref1 = ['attags', 'hashtags'];
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        tags = _ref1[_j];
        if ((options[tags] != null) && options[tags].length) {
          _results.push(query.containsAll("entities." + tags, options[tags]));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    makeSorted = function() {
      var query;
      query = new Kinvey.Query();
      return query.descending('_kmd.lmt');
    };
    return {
      makeSorted: makeSorted,
      sortedQueryFrom: function(options) {
        var query;
        query = makeSorted();
        applyOptions(query, options);
        return query;
      },
      applyOptions: applyOptions,
      makeTagFilter: function(type, tags) {
        var agg, field;
        field = "entities." + type;
        agg = initialEntityAggregator(type);
        agg.reduce("function(note, output){" + ("var tags = " + (JSON.stringify(tags)) + ";") + "var matches = true;" + "for(var i = 0; i < tags.length; i++){" + ("if(note." + field + ".indexOf(tags[i]) === -1){") + "matches = false;" + "break;" + "}" + "}" + "if(matches){" + "output.result.push(note);" + "}" + "}");
        return agg;
      },
      makeTagGetter: function(type) {
        var agg, field;
        field = "entities." + type;
        agg = initialEntityAggregator(type, '{}');
        agg.reduce("function(note,output){" + ("var " + type + " = note." + field + ";") + "var tag = null;" + ("for(var i = 0; i < " + type + ".length; i++){") + ("tag = " + type + "[i].toLowerCase();") + "output.result[tag] = true;" + "}" + "}");
        return agg;
      }
    };
  }
]);

'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');


angular.module('myApp.services').service('$kinvey', [ function(){
    var LULZ_APP = {
        appKey: 'kid_ePfBz7N8xf',
        appSecret: 'e13392c82e8b4ba597ad8c043c991100'
    };

    var REAL = {
        appKey: 'kid_PVtSim6Wi5',
        appSecret: 'c429fbc2a46d4ac4930f67ef7e4f8a8e'
    };

    var APP = REAL;
    APP['sync'] = {
        enable: true,
        online: navigator.onLine
    };

    Kinvey.fnUserPromise = Kinvey.init(APP);
    Kinvey.Sync.online();

    Kinvey.fnUserPromise.then(function(){
        if(!Kinvey.getActiveUser())
            Kinvey.User.login("kdb","62cdb7020ff920e5aa642c3d4066950dd1f01f4d");
    })

    return Kinvey;
}]);

angular.module('myApp.services').service('$random', [function() {
    var tags = ["#read", "#todo", "yolo", "#groceries", "#five", "#seven", '#groceris',
    "#eat", '#e', '#why', '#yay', '#watch']
    function fromArray(array) {
        var index = Math.floor(Math.random() * array.length);
        return array[index];
    }

    function string(){
        return Math.random().toString(36).substring(7);
    }

    this.getNote = function () {
        var tag = fromArray(tags);
        var text = string() + tag;
        return {
            text: text,
            entities: {
                hashtags: [tag]
            }
        }
    }
}])

angular.module('myApp.services').service('$notes', [ '$kinvey', '$query', '$random', function ($kinvey, $query, $random) {
    this.get = function (options) {
        var blankQuery = $query.sortedQueryFrom(options);
        blankQuery.notEqualTo('state', 'deleted');
        var promise = Kinvey.DataStore.count('notes', blankQuery, {offline: true});
        return promise.then(function(count){
            var options = { };
            options.offline = !!count
            if(options.offline) blankQuery.limit(25);
            return Kinvey.DataStore.find('notes', blankQuery, options )
        });
    };

    var initialEntityAggregator = function(type, result) {
      var agg;
      if (result == null) result = [];
      agg = new Kinvey.Group;
      agg.initial({
        result: result
      });
      return agg;
    };


    var makeTagGetter = function(type){
        var field = "entities." + type;
        var agg = initialEntityAggregator(type, { });
        agg.reduce("function(doc,out){"+
            "var "+type+" = doc."+field+";"+
            "var tag = null;"+
            "for(var i = 0; i < "+type+".length; i++){"+
                "tag = "+type+"[i].toLowerCase();"+
                "if(out.result[tag]){"+
                    "out.result[tag]++;"+
                "}else{"+
                    "out.result[tag] = 1;"+
                "}"+
            "}"+
        "}");
        return agg;
    };

    this.getTags = function(options){
        var agg = makeTagGetter('hashtags');
        agg.query($query.sortedQueryFrom(options));
        return Kinvey.DataStore.group('notes', agg, {offline: true}).then(function (_arg) {
          var count, result, tag, _results;
          result = _arg[0].result;
          _results = [];
          for (tag in result) {
            count = result[tag];
            _results.push({
              name: tag,
              count: count
            });
          }
          return _results;
        });
    }

    // setTimeout(function () {
    //     var i;
    //     for (i = 0; i < 100; i++){
    //         Kinvey.DataStore.save('notes', $random.getNote());
    //     }
    // },1000)
}]);

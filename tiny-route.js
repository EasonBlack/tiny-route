define(function(){
   function tinyRoute(){
        var _this = this;
        this.routes = {};
        this.processHash = function(){
            var hash = location.hash || '#';
            _this.run(hash.slice(1));
        }
        this.initialize.apply(this, arguments);
   }

   tinyRoute.prototype = {

       initialize: function(){
          var self = this;
          window.addEventListener('hashchange', self.processHash);
       },

       start: function(){
           this.processHash();
       },

       add:  function(route, handler) {
        var pieces = route.toLowerCase().split('/')
            , name = pieces.length ? pieces[0] : ''
            ,  route;
        if(name) route = this.routes[name] = {
            params : [],
            callback: handler
        };
        for (var i = 1; i < pieces.length; ++i) {
            var piece = pieces[i];
            route.params.push(piece.slice(1));
        }

       },

       run: function(url){
           var pieces = url.split('/')
               ,params = {}
               ,name = pieces[0]
               ,route = this.routes[name];
           for (var i = 1; i < pieces.length && route.params; ++i) {
               var key = route['params'][i-1];
               params[key] =  pieces[i];
           }
           route && route.callback &&  route.callback({
               params: params
           })
       }
}
   return tinyRoute;
});

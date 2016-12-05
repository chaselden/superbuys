var ViewTemplateConstructor = Backbone.View.extend({
   el: '.content-area',

   _buildHTMLTemplate : function(){
      return ''
   },

   render : function(data){
      console.log(this)
      this.el.innerHTML = this._buildHTMLTemplate(data)
      return this
   },

   initialize: function(templateFn){
      this._buildHTMLTemplate = templateFn
   }

})

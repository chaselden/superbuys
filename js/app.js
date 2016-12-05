var categoryListings = [
    {catName: "Fiction" , subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
    {catName: "Nonfiction" ,   subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
    {catName: "Miscellaneous" ,   subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] },
    ]

      var appContainer = document.querySelector('#app-container')



      /***********************
      * MODEL
      ************************/
      var BookModel = Backbone.Model.extend({
        parse: function(serverRes){
          return serverRes.volumeInfo
        },

        url: "",

        initialize: function(serverRes){
          this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + bookType

        },

      })

      var contentSelector = document.querySelector('.content-area')

      var BookModel = Backbone.Model.extend({

         parse: function(jsonCollection){

          return jsonCollection.volumeInfo

         }

     })


      /***********************
      * COLLECTION
      ************************/
      var BookCollection = Backbone.Collection.extend({
        model: BookModel,
        parse: function(serverRes){
          return serverRes.items
        },

        url: "",

        initialize: function(serverRes){
          this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + serverRes
          // console.log(this.url);
        },
      })

      /***********************
      * ROUTER
      ************************/
      var AppRouter = Backbone.Router.extend({
        routes: {
          "category/general-category/:specificCat" : "showSubcategory",
          "category/:generalCat" : "showGeneralCategory",
          "" : "showHome"
        },

        showCategory: function(catName){
          var booksCollection = new BookCollection(catName)
          var catCollection = new BookCollection(specificCat)

            booksCollection.fetch().then(function(){
              var bookCover = BookCollection.models[0].get('title')
              catCollection.render(bookCover)
          })
        },


        showBook: function(bookName){
          var bookStr = ''
              bookStr += '<div class="row">'

             bookColl.models.forEach(function(modInstance){

            var titleObj = modInstance.get('title')
            var thumbNail = modInstance.get('imageLinks').thumbnail
            // modInstance.set('', false)
            bookStr +=  '<div class="col-sm-6 col-md-4 thumbsize">'
            bookStr +=      '<div class="">'
            bookStr +=         '<img src="'+ thumbNail +'" alt="...">'
            bookStr +=           '<div class="caption">'
            bookStr +=            '<h2>' + titleObj + '</h2>'
            bookStr +=         '</div>'
            bookStr +=      '</div>'
            bookStr +=   '</div>'

          })
            bookStr +=   '</div>'

             return bookStr

      },


          showHome:  function(bookInfo){
            var homeStr = " "

            categoryListings.forEach(function(objInArray){
                // build h3 tags for catName
                homeStr +=   '<div class="col-sm-4 class="text-left"">'
                homeStr +=    '<a href="#/category/'+ objInArray.catName +'">'
                homeStr +=       '<h2>'+objInArray.catName +'</h2>'
                homeStr +=    '</a>'
                homeStr +=   '</ul>'


            objInArray.subcatList.forEach(function(propInArray){

                homeStr +=   '<a href="#/category/general-category/'+ propInArray +'">'
                homeStr +=    '<li>' +propInArray + '</li>'
                homeStr +=   '</a>'

              })
                homeStr +=  '</ul>'
                homeStr += '</div>'

          })
            document.querySelector('.content-area').innerHTML = homeStr

          },


          initialize: function(){
           Backbone.history.start()

          },
    })


      var app = new AppRouter()

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
          return serverRes
        },

        url: "",

        initialize: function(serverRes){
          this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:" + serverRes

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

        showGeneralCategory: function(catName){
          var booksCollectionInstance = new BookCollection(catName)
          booksCollectionInstance.fetch().then(function(serverRes){
            // console.log(booksCollectionInstance);
            booksCollectionInstance.models.forEach(function(bbModl, i) {
            // console.log(bbModl);
            // appContainer.innerHTML += "<p>" + bbModl.get('title') + "</p>"

            })
          })
        },
        showSubcategory: function(generalCat, specificCat){
          var booksCollectionInstance = new BookCollection(specificCat)
          booksCollectionInstance.fetch().then(function(serverRes){

            booksCollectionInstance.models.forEach(function(bbModl, i) {
            // console.log(bbModl);
            appContainer.innerHTML += "<p>" + bbModl.get('title') + "</p>"

            })
          })
        },

        showBook: function(bookName){
          appContainer.innerHTML = "<h1 class 'bg-info'> lkjhlkjh</h1>"

          var modInstance = new BookModel(bookName)
          modInstance.fetch().then(function(serverRes){

            var theCategory = modInstance.get('catName')
            var theSubCategory = modInstance.get('subcatList')
            modInstance.set('', false)
            // console.log(modInstance);

          })



      },


          showHome:  function(){
            var homeStr = " "

            categoryListings.forEach(function(objInArray){
                // build h3 tags for catName
                homeStr +=   '<div class="col-sm-4">'
                homeStr +=    '<div class="content-area">'
                homeStr +=       '<a href="#/category/'+ objInArray.catName +'"><h3>'+objInArray.catName +'</h3></a>'
                homeStr +=    '</div>'
                homeStr +=   '</div>'


            objInArray.subcatList.forEach(function(propInArray){

                homeStr +=   '<div class="col-sm-4">'
                homeStr +=    '<div class="content-area">'
                homeStr +=       '<a href="#/category/general-category/'+ propInArray +'"><h3>'+propInArray +'</h3></a>'
                homeStr +=    '</div>'
                homeStr +=   '</div>'


              })


          })
            document.querySelector('.content-area').innerHTML = homeStr

          },




        showGenCat: function(genCat){
          var listStr = "<div class='col-sm-10'>";
              listStr += "<div class='row'>";
              listStr += "<h1>" + genCat + "</h1>";


          var subBookRequest = new BookCollection(genCat)

            subBookRequest.fetch().then(function(){

            subBookRequest.models.forEach(function(mdlObj){
              console.log(mdlObj)
          var bookTitle = mdlObj.get('title')

          var bookImgLinks = mdlObj.get('imageLinks')
          if(typeof bookImgLinks === "undefined"){

             var bookImage = './images/file-not-found.png'
          }else{ var bookImage = bookImgLinks.thumbnail}

             listStr += '<div class="col-sm-3 text-center book-cont">'
             listStr += '<div class="thumbnail book-thumb">'
             listStr += '<img src="'+ bookImage +'">'
             listStr += '<p>' + bookTitle + '</p>'
             listStr += '</div>'
             listStr += '</div>'

       })
             listStr += '</div>'
             listStr += '</div>'
             contentSelector.innerHTML = listStr

    })

 },



 showSubCat: function(subCat){
      var listStr = "<div class='col-sm-10'>";
          listStr += "<div class='row'>";
          listStr += "<h1>" + subCat + "</h1>";

      contentSelector.innerHTML = "<h1>" + subCat + '</h1>'

      var subBookRequest = new BookCollection(subCat)

      subBookRequest.fetch().then(function(){

         subBookRequest.models.forEach(function(mdlObj){
               console.log(mdlObj)
            var bookTitle = mdlObj.get('title')

            // IMAGE BUILDER
            var bookImgLinks = mdlObj.get('imageLinks')
            if(typeof bookImgLinks === "undefined"){

               var bookImage = './images/file-not-found.png'
            }else{ var bookImage = bookImgLinks.thumbnail}

               listStr += '<div class="col-xs-3 text-center book-cont">'
               listStr += '<div class="thumbnail book-thumb">'
               listStr += '<img src="'+ bookImage +'">'
               listStr += '<p>' + bookTitle + '</p>'
               listStr += '</div>'
               listStr += '</div>'

         })
         listStr += '</div>'
         listStr += '</div>'
         contentSelector.innerHTML = listStr
         sideMenuFun();
      })
   },
          initialize: function(){
           Backbone.history.start()

          },
    })


      var app = new AppRouter()

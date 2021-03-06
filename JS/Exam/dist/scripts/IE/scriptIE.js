
window.onload = function() {
   var anchors = document.querySelectorAll('a');
   for (var i = 0; i < anchors.length; i++) {
      anchors[i].attachEvent('onclick', function() {
         return false;
      });
   }

   /*          Placeholders         */

   var input = document.getElementsByTagName('input'); // get all text fields
   var cls = "placehold"; // set name of the class

   if (input) { // if fields found
      for (var i=0; i < input.length; i++) {
         var t = input[i];
         var txt = t.getAttribute("placeholder") || 0;

         if (txt.length > 0) { // if placeholder found
            t.className = t.value.length == 0 ? t.className + " " + cls : t.className; // add class
            t.value = t.value.length > 0 ? t.value : txt; // if no value found

            t.onfocus = function() { // on focus
               this.className = this.className.replace(cls);
               this.value = this.value == this.getAttribute("placeholder") ? "" : this.value;
            }

            t.onblur = function() { // on focus out
               if (this.value.length == 0) {
                  this.value = this.getAttribute("placeholder");
                  this.className = this.className+" "+cls; // add class
               }
            }
         }
      }
   }

   /*          LogIn window         */

   (function() {
      document.querySelector('.header__logIn').attachEvent('onclick', function(e) {
         document.querySelector('.header-window--logIn').style.display = 'block';
         document.querySelector('body').attachEvent('onkeydown', function(e) {
            e = e || window.event;
            cancelHandler(e);
         });
         document.querySelector('.header-window--logIn').attachEvent('onclick', function(e) {
            e = e || window.event;
            var logInWindow = document.querySelector('.header-window__content--logIn');
            if (!e.srcElement.className.indexOf('header-window__mask')) {
               hideLogIn();
            }
         });
      });

      document.querySelector('.header-window__signUp').attachEvent('onclick', function() {
         hideLogIn();
         document.querySelector('.header__signUp').click();
      });

      document.querySelector('.header-window__logInBtn').attachEvent('onclick', function() {
         return false;
      });

      document.querySelector('.header-window__cancelBtn--logIn').attachEvent('onclick', function() {
         hideLogIn();
         document.querySelector('body').detachEvent('onkeydown', cancelHandler);
      });

      var cancelHandler = function(event) {
         if (event.keyCode == 27) {
            hideLogIn();
            return false;
         }
      };

      var hideLogIn = function() {
         document.querySelector('.header-window--logIn').style.display = 'none';
      };
   })();

   /*          SignUp window         */

   (function() {
      document.querySelector('.header__signUp').attachEvent('onclick', function(e) {
         document.querySelector('.header-window--signUp').style.display = 'block';
         document.querySelector('body').attachEvent('onkeydown', function(e) {
            e = e || window.event;
            cancelHandler(e);
         });
         document.querySelector('.header-window--signUp').attachEvent('onclick', function(e) {
            e = e || window.event;
            var logInWindow = document.querySelector('.header-window__content--signUp');
            if (!e.srcElement.className.indexOf('header-window__mask')) {
               hideSignUp();
            }
         });
      });

      document.querySelector('.header-window__signUpBtn--signUp').attachEvent('onclick', function() {
         return false;
      });

      document.querySelector('.header-window__cancelBtn--signUp').attachEvent('onclick', function() {
         hideSignUp();
         document.querySelector('body').detachEvent('onkeydown', cancelHandler);
      });

      var cancelHandler = function(event) {
         if (event.keyCode == 27) {
            hideSignUp();
            return false;
         }
      };

      var hideSignUp = function() {
         document.querySelector('.header-window--signUp').style.display = 'none';
      };
   })();

   /*          Scroll         */

   document.querySelector('.header__findBtn').attachEvent('onclick', function(e) {
      var xPos = 0;
      var yPos = 0;

      var targetElem = document.querySelector('.partners');

      while (targetElem != null) {
         xPos += targetElem.offsetLeft;
         yPos += targetElem.offsetTop;
         targetElem = targetElem.offsetParent;
      }
      window.scrollTo(xPos, yPos);
   });

   var sliders = document.querySelectorAll('.slider');

   for (var i = 0; i < sliders.length; i++) {
      var arrowR = document.createElement('p')
      var arrowL = document.createElement('p')
      sliders[i].appendChild(arrowL);
      sliders[i].appendChild(arrowR);

      arrowR.className += ' slider__arrowR';
      arrowL.className += ' slider__arrowL';

      new Slider(sliders[i], i+1);
   }

   function Slider(sliderObj, folderNum) {
      var self = this;
      this.currentValue = 1;
      this.list = sliderObj.querySelector('.slider__list');
      this.sliderLength = sliderObj.querySelectorAll('.slider__item').length;
      this.itemWidth = 300;
      this.currentPos = 0;

      calculateWidth();
      initImages();
      leftBtn();
      rightBtn();

      function initImages() {
         var dist = 'images/sliders/slider' + folderNum + '/';

         var items = self.list.querySelectorAll('.slider__item');
         for (var i = 0; i < items.length; i++) {
            var imgPath = dist + 'howIt' + folderNum + '.' + (i + 1) + '.png';
            items[i].src = imgPath;
         }
      }

      function calculateWidth() {
         var listWidth = self.sliderLength * self.itemWidth;
         self.list.style.width = listWidth + 'px';
      }

      function leftBtn() {
         var leftArr = sliderObj.querySelector('.slider__arrowL');
         leftArr.attachEvent('onclick', function() {
            if(self.currentValue == 1) {
               self.currentValue = self.sliderLength;

               self.currentPos -= self.itemWidth * (self.sliderLength - 1);

               self.list.style.left = self.currentPos + 'px';

               return this;
            }

            self.currentPos += self.itemWidth;

            self.list.style.left = self.currentPos + 'px';
            self.currentValue--;
         });
      }

      function rightBtn() {
         var rightArr = sliderObj.querySelector('.slider__arrowR');
         rightArr.attachEvent('onclick', function() {
            if(self.currentValue == self.sliderLength) {
               self.currentValue = 1;

               self.currentPos += self.itemWidth * (self.sliderLength - 1);

               self.list.style.left = self.currentPos + 'px';

               return this;
            }

            self.currentPos -= self.itemWidth;

            self.list.style.left = self.currentPos + 'px';
            self.currentValue++;
         });
      }
   }

   /*          Images bar & Masonry        */

   (function() {
      var sections = ['Sport and Activity', 'Wellnes and Health', 'Extreme  Sports and Expeditions', 'Games', 'Culture and Edution', 'Les Paul', 'Relaxation', 'Travelling'];
      var inputText = sections[Math.floor( Math.random() * sections.length )]; // рандомный выбор раздела

      searching(inputText);
   })();

   document.querySelector('.activity-search__btn').attachEvent('onclick', searchImgHandler);
   document.querySelector('.activity-search__input').attachEvent('onkeydown', function(event) {
      event = event || window.event;
      if (event.keyCode == 13) {
         searchImgHandler();
         return false;
      }
   });

   function searchImgHandler() {
      var input = document.querySelector('.activity-search__input');

      if (input.value) {
         searching(input.value);
      }
   }

   function searching(query) {
      var xmlhttp = getXmlHttp();
      var perPage = 7; // quantity of results

      xmlhttp.open('POST',
      'https://pixabay.com/api/?key=4845683-933d895de826e8c128c7c84b3&per_page=' + perPage + '&q=' + query,
      true);
      xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
               update(JSON.parse(xmlhttp.responseText));
            } else {
               console.log('No access bla bla. Slow down please');
            }
         }
      };
      xmlhttp.send(null);
   }

   function getXmlHttp() {
      var xmlhttp;
      try {
         xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
         try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
         } catch (E) {
            xmlhttp = false;
         }
      }
      if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
         xmlhttp = new XMLHttpRequest();
      }
      return xmlhttp;
   }

   function update(data) {
      if (!ResultsCheck(data)) {
         return false;
      }

      var links = [];

      for (var i = 0; i < data.hits.length; i++) {
         var omg = {
            link: data.hits[i].webformatURL,
            word: data.hits[i].user
         };
         links[i] = omg;
      }

      var grid = document.querySelector('.grid');
      var html = document.getElementById('grid').innerHTML;
      grid.innerHTML = tmpl(html, { data: links });

      var msnry = new Masonry( grid, {
         itemSelector: '.grid__img',
         columnWidth: 300,
         gutter: 20
      });
      gridHover();
   }

   function ResultsCheck(data) {

      function addNoResult(grid) {
         var noResults = document.createElement('p');
         noResults.className += ' noResults';
         noResults.innerText = 'Sorry, no results found';

         grid.appendChild(noResults);

         return true;
      }

      function removeNoResult(grid) {
         if (grid.childNodes.length) {
            var item = grid.lastChild;
            do {
               grid.removeChild(item);
               item = grid.lastChild;
            }
            while (item);

            return true;
         } else {
            return false;
         }
      }

      function checking(data) {
         var grid = document.querySelector('.grid');
         if (!data.total) {

            if (grid.childNodes.length > 1) {
               removeNoResult(grid);
               addNoResult(grid);
               var msnry = new Masonry( grid, {
                  itemSelector: '.grid__img',
                  columnWidth: 300,
                  gutter: 20
               });
            } else {
               if (grid.childNodes.length != 1) {
                  addNoResult(grid);
               }
            }

            return false;
         } else {
            removeNoResult(grid);

            return true;
         }
      }
      return checking(data);
   }

   /*          Fancy box         */

   function gridHover() {
      var gridImages = document.querySelectorAll('.grid__mask');
      for (var i = 0; i < gridImages.length; i++) {
         gridImages[i].parentNode.attachEvent('onmouseenter', function(e) {
            e.srcElement.querySelector('.grid__mask').style.display = 'none';
            e.srcElement.querySelector('.grid__info').style.display = 'none';
         });

         gridImages[i].parentNode.attachEvent('onmouseleave', function(e) {
            e.srcElement.querySelector('.grid__mask').style.display = 'inline-block';
            e.srcElement.querySelector('.grid__info').style.display = 'inline-block';
         });

         gridImages[i].parentNode.attachEvent('onclick', function(e) {
            var imgSrc = e.srcElement.getAttribute('data-src');
            var html = document.getElementById('mask').innerHTML;
            var page = document.getElementById('pagewrap');

            var maskWrapper = document.createElement('div');
            maskWrapper.className += 'mask-wrapper';

            var compiled = tmpl(html, { data: imgSrc });
            maskWrapper.innerHTML = compiled;

            page.appendChild(maskWrapper);

            maskWrapper.attachEvent('onclick', function(e) {
               if (e.srcElement.tagName == 'IMG') {
                  return false;
               } else {
                  var rem = document.getElementById('pagewrap');
                  rem.removeChild( document.querySelector('.mask-wrapper') );
               }
            });
         });
      }
   }
};

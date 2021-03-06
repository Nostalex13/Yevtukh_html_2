
window.onload = function() {

   let anchors = document.querySelectorAll('a');
   for (let i = 0; i < anchors.length; i++) {
      anchors[i].onclick = function() {
         return false;
      };
   }

   /*          LogIn window         */

   (function() {
      document.querySelector('.header__logIn').addEventListener('click', function(e) {
         document.querySelector('.header-window--logIn').style.display = 'block';
         window.addEventListener('keydown', cancelHandler);

         document.querySelector('.header-window--logIn').addEventListener('click', function(e) {
            if (e.target.classList.contains('header-window__mask')) {
               hideLogIn();
            }
         });
      });

      document.querySelector('.header-window__signUp').addEventListener('click', function() {
         hideLogIn();
         document.querySelector('.header__signUp').click();
      });

      document.querySelector('.header-window__logInBtn').addEventListener('click', function(e) {
         e.preventDefault();
      });

      document.querySelector('.header-window__cancelBtn--logIn').addEventListener('click', function(e) {
         hideLogIn();
         window.removeEventListener('keydown', cancelHandler);
      });

      let cancelHandler = function(e) {
         if (e.keyCode == 27) {
            e.preventDefault();
            hideLogIn();
         }
      }

      let hideLogIn = function() {
         document.querySelector('.header-window--logIn').style.display = 'none';
      };
   })();

   /*          SignUp window         */

   (function() {
      document.querySelector('.header__signUp').addEventListener('click', function(e) {
         document.querySelector('.header-window--signUp').style.display = 'block';
         window.addEventListener('keydown', cancelHandler);

         document.querySelector('.header-window--signUp').addEventListener('click', function(e) {
            if (e.target.classList.contains('header-window__mask--signUp')) {
               hideSignUp();
            }
         });
      });

      document.querySelector('.header-window__signUpBtn--signUp').addEventListener('click', function(e) {
         e.preventDefault();
      });

      document.querySelector('.header-window__cancelBtn--signUp').addEventListener('click', function(e) {
         hideSignUp();
         window.removeEventListener('keydown', cancelHandler);
      });

      let cancelHandler = function(e) {
         if (e.keyCode == 27) {
            e.preventDefault();
            hideSignUp();
         }
      }

      let hideSignUp = function() {
         document.querySelector('.header-window--signUp').style.display = 'none';
      };
   })();

   /*          Button scroll          */

   document.querySelector('.header__findBtn').addEventListener('click', function(e) {
      let xPos = 0;
      let yPos = 0;

      let targetElem = document.querySelector('.partners');

      while (targetElem != null) {
         xPos += targetElem.offsetLeft;
         yPos += targetElem.offsetTop;
         targetElem = targetElem.offsetParent;
      }
      window.scrollTo(xPos, yPos);
   });

   /*          Slider         */

   (function() {
      let sliders = document.querySelectorAll('.slider');

      for (let i = 0; i < sliders.length; i++) {
         let arrowR = document.createElement('p')
         let arrowL = document.createElement('p')
         arrowR.classList.add('slider__arrowR');
         arrowL.classList.add('slider__arrowL');

         sliders[i].appendChild(arrowL);
         sliders[i].appendChild(arrowR);

         new Slider(sliders[i], i+1);
      }

      function Slider(sliderObj, folderNum) {
         let self = this;
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
            let dist = `images/sliders/slider${folderNum}/`;

            let items = self.list.querySelectorAll('.slider__item');
            for (let i = 0; i < items.length; i++) {
               let imgPath = dist + `howIt${folderNum}.${i + 1}.png`;
               items[i].src = imgPath;
            }
         }

         function calculateWidth() {
            let listWidth = self.sliderLength * self.itemWidth;
            self.list.style.width = listWidth + 'px';
         }

         function leftBtn() {
            let leftArr = sliderObj.querySelector('.slider__arrowL');
            leftArr.addEventListener('click', function() {
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
            let rightArr = sliderObj.querySelector('.slider__arrowR');
            rightArr.addEventListener('click', function() {
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
   })();

   /*          Images bar & Masonry        */

   (function() {
      let sections = ['Marshal', 'Wellnes and Health', 'Extreme  Sports and Expeditions', 'Fender', 'Culture and Edution', 'Les Paul', 'Relaxation', 'Travelling'];
      let inputText = sections[ Math.floor( Math.random()*sections.length ) ]; // magic

      searching(inputText);

      document.querySelector('.activity-search__btn').addEventListener('click', searchImgHandler);
      document.querySelector('.activity-search__input').addEventListener('keydown', function(e) {
         if (e.keyCode == 13) {
            e.preventDefault();
            searchImgHandler();
         }
      });

      function searchImgHandler() {
         let input = document.querySelector('.activity-search__input');

         if (input.value) {
            searching(input.value);
         }
      }

      function searching(query) {
         let xmlhttp = getXmlHttp();
         let perPage = 7; // quantity of results

         xmlhttp.open('POST',
         `https://pixabay.com/api/?key=4845683-933d895de826e8c128c7c84b3&per_page=${perPage}&q=${query}`,
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

      function update(data) {
         if (!ResultsCheck(data)) {
            return false;
         }

         let grid = document.querySelector('.grid');
         let html = document.getElementById('grid').innerHTML;

         let links = data.hits.map(function(item) {
            return {
               link: item.webformatURL,
               word: item.user
            };
         });

         let compiled = tmpl(html, { data: links });
         grid.innerHTML = compiled;

         let msnry = new Masonry( grid, {
            itemSelector: '.grid__img',
            columnWidth: '.columnWidth',
            gutter: 20,
            percentPosition: true
         });
         gridHover();
      }

      function ResultsCheck(data) {

         function addNoResult(grid) {
            let noResults = document.createElement('p');
            noResults.classList.add('noResults');
            noResults.innerText = 'Sorry, no results found';

            grid.appendChild(noResults);

            return true;
         }

         function removeNoResult(grid) {
            if (grid.childNodes.length) {
               let item = grid.lastChild;
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
            let grid = document.querySelector('.grid');
            if (!data.total) {

               if (grid.childNodes.length > 1) {
                  removeNoResult(grid);
                  addNoResult(grid);
                  let msnry = new Masonry( grid, {
                     itemSelector: '.grid__img',
                     columnWidth: '.columnWidth',
                     gutter: 20,
                     percentPosition: true
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

      function getXmlHttp() {
         let xmlhttp;
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

      function gridHover() {
         let gridImages = document.querySelectorAll('.grid__mask');
         for (let i = 0; i < gridImages.length; i++) {
            gridImages[i].parentNode.addEventListener('mouseenter', function() {
               this.querySelector('.grid__mask').style.display = 'none';
               this.querySelector('.grid__info').style.display = 'none';
            });

            gridImages[i].parentNode.addEventListener('mouseleave', function() {
               this.querySelector('.grid__mask').style.display = 'inline-block';
               this.querySelector('.grid__info').style.display = 'inline-block';
            });

            /*       Fancy box (kinda)    */

            gridImages[i].parentNode.addEventListener('click', function() {
               let imgSrc = this.getAttribute('data-src');
               let html = document.getElementById('mask').innerHTML;
               let page = document.getElementById('pagewrap');

               let maskWrapper = document.createElement('div');
               maskWrapper.classList.add('mask-wrapper');

               let compiled = tmpl(html, { data: imgSrc });
               maskWrapper.innerHTML = compiled;

               page.appendChild(maskWrapper);

               maskWrapper.addEventListener('click', function(e) {
                  if (e.target.tagName == 'IMG') {
                     return false;
                  } else {
                     page.removeChild(this);
                  }
               });
            });
         }
      }
   })();

};

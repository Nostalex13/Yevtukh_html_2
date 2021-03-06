// <div class="wrapper">
//
//     <p class="header"> Тест по программированию </p>
//
//     <ol>
//         <li>
//             <span> Вопрос №1 </span>
//             <ul>
//                 <li> <input type="checkbox" name="" value=""> Вариант ответа №1 </li>
//                 <li> <input type="checkbox" name="" value=""> Вариант ответа №2 </li>
//                 <li> <input type="checkbox" name="" value=""> Вариант ответа №3 </li>
//             </ul>
//         </li>
//         <li>
//             <span> Вопрос №2 </span>
//             <ul>
//                 <li> <input type="checkbox" name="" value=""> Вариант ответа №1 </li>
//                 <li> <input type="checkbox" name="" value=""> Вариант ответа №2 </li>
//                 <li> <input type="checkbox" name="" value=""> Вариант ответа №3 </li>
//             </ul>
//         </li>
//         <li>
//             <span> Вопрос №3 </span>
//             <ul>
//                 <li> <input type="checkbox" name="" value=""> Вариант ответа №1 </li>
//                 <li> <input type="checkbox" name="" value=""> Вариант ответа №2 </li>
//                 <li> <input type="checkbox" name="" value=""> Вариант ответа №3 </li>
//             </ul>
//         </li>
//     </ol>
//
//     <input type="button" name="" value="Проверить мои результаты">
// </div>

let page = {

    Generate() {
        this.wrapperGen();
        this.headerGen();
        this.menuGen();
        this.buttonGen();
    },

    wrapperGen() {
        let wrapperObj = document.createElement('div');
        wrapperObj.classList.add('wrapper');

        let bodyObj = document.body;

        // wrapperObj.style.width = '600px';
        // wrapperObj.style.margin = '20px auto';
        // wrapperObj.style.border = '1px solid black';
        // wrapperObj.style.fontSize = '16px';
        // wrapperObj.style.fontFamily = '"Tahoma", sans-serif';
        // wrapperObj.style.textAlign = 'center';

        bodyObj.appendChild(wrapperObj);
    },

    headerGen() {
        let header = document.createElement('p');
        header.classList.add('header');
        header.innerHTML = 'Тест по программированию';

        let wrapperObj = document.querySelector('.wrapper');
        wrapperObj.appendChild(header);
    },

    menuGen() {
        let menuObj = document.createElement('ol');

        // menuObj.style.textAlign = 'left';

        let wrapperObj = document.querySelector('.wrapper');
        wrapperObj.appendChild(menuObj);

        /*          ol li           */

        for (let i = 0; i < 3; i++) {
            let liObj = document.createElement('li');
            liObj.innerHTML = 'Вопрос №' + (i + 1);

            menuObj.appendChild(liObj);
        }

        /*          ol li       */

        let liObjs = document.querySelectorAll('li');

        for (let i = 0; i < liObjs.length; i++) {
            let ulObj = document.createElement('ul');

            // ulObj.style.padding = '5px 0';

            liObjs[i].appendChild(ulObj);
        }

        /*          ... ul          */

        let ulObjs = document.querySelectorAll('ul');

        for (let i = 0; i < ulObjs.length; i++) {

            for (let k = 0; k < 3; k++) {
                let liObj = document.createElement('li');

                // liObj.style.listStyle = 'none';
                // liObj.style.fontSize = '14px';

                let inputObj = document.createElement('input');
                inputObj.setAttribute('type', 'checkbox');

                liObj.appendChild(inputObj);

                let spanObj = document.createElement('span');
                spanObj.innerHTML = 'Вариант ответа №' + (k + 1);

                liObj.appendChild(spanObj);

                ulObjs[i].appendChild(liObj);
            }
        }

    },

    buttonGen() {
        let buttonObj = document.createElement('input');
        buttonObj.setAttribute('type', 'button');
        buttonObj.setAttribute('value', 'Проверить мои результаты');

        // buttonObj.style.padding = '5px 25px';
        // buttonObj.style.border = '2px solid grey';
        // buttonObj.style.margin = '20px 0';

        let wrapperObj = document.querySelector('.wrapper');
        wrapperObj.appendChild(buttonObj);
    }

}

page.Generate();

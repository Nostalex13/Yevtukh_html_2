"use strict";$(function(){var e={questions:[{title:"1+1=X. X=?",answers:["yes","X=2.0","X=2"],correct:1},{title:"Any question?",answers:["yes","Les Paul","_"],correct:2},{title:"Lorem?",answers:["dorem","morem","yes"],correct:2}]};localStorage.setItem("testQuestions",JSON.stringify(e))}),window.onload=function(){function e(){if(t()){for(var e=[],n=[],o=0;o<a.length;o++)for(var c=a[o].querySelectorAll("[type=checkbox]"),s=0;s<c.length;s++)if(1==c[s].checked&&(e[o]=c[s].parentNode.innerText,n[o]=!1,s==l.questions[o].correct)){n[o]=!0;break}for(var i=[],u=0;u<e.length;u++){var d={answer:e[u],correct:n[u]};i[u]=d}r(i)}}function t(){var e=0,t=!0,r=!1,n=void 0;try{for(var o,c=s[Symbol.iterator]();!(t=(o=c.next()).done);t=!0){1==o.value.checked&&e++}}catch(e){r=!0,n=e}finally{try{!t&&c.return&&c.return()}finally{if(r)throw n}}return e==a.length||(alert("Please, answer all questions"),!1)}function r(e){document.querySelector(".modal").style.display="block",$(".modal-header").css("line-height",$(".modal-header").css("height"));for(var t=document.querySelector("#answers").innerHTML,r=[],n=0,o=0;o<e.length;o++){var c=void 0;0==e[o].correct?c="answ-false":1==e[o].correct?(n++,c="answ-true"):alert("smth went wrong");var s={question:o+1+". "+l.questions[o].title+" : ",correct:c,answer:e[o].answer};r[o]=s}var a={result:n},i=tmpl(t,{testItem:r,result:a});document.querySelector(".modal-content").innerHTML=i}function n(){document.querySelector(".modal").style.display="none"}function o(){location.reload()}var c=document.querySelector("#test").innerHTML,l=JSON.parse(localStorage.getItem("testQuestions"));document.querySelector(".testMenu").innerHTML=tmpl(c,{content:l.questions});var s=document.querySelectorAll("[type=checkbox]"),a=document.querySelectorAll(".submenu");try{document.querySelector(".check").addEventListener("click",e)}catch(e){console.log("some error here:",e)}for(var i=0;i<s.length;i++)s[i].addEventListener("click",function(){for(var e=this.parentNode;!e.classList.contains("submenu");)e=e.parentNode;for(var t=e.querySelectorAll("[type=checkbox]"),r=0;r<t.length;r++)t[r].checked=!1;this.checked=!0});document.querySelector(".closeBtn").addEventListener("click",function(){n(),document.querySelector(".check").setAttribute("disabled","true"),document.querySelector(".check").removeEventListener("click",e);var t=!0,r=!1,o=void 0;try{for(var c,l=s[Symbol.iterator]();!(t=(c=l.next()).done);t=!0){c.value.setAttribute("disabled","true")}}catch(e){r=!0,o=e}finally{try{!t&&l.return&&l.return()}finally{if(r)throw o}}}),document.querySelector(".refreshBtn").addEventListener("click",function(){n(),o()})};
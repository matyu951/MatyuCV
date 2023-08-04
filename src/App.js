import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './Part/Header/Header';
import Road from './Part/Road/Road';
import Gear from './Part/Gear/Gear';
import Hobbies from './Part/Hobbies/Hobbies';

function App() {
  const [scrollTop, setScrollTop] = useState(0);
  const [menuActive, setMenuActive] = useState(false);

  const prevScrollTopRef = useRef(scrollTop);

  useEffect(() => {
    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // use effect du parallax des boules au scroll ==========> WIP
  // useEffect(() => {

  //   var layerOne = document.querySelectorAll('#layer-1'),
  //       layerTwo = document.querySelectorAll('#layer-2'),
  //       layerThree = document.querySelectorAll('#layer-3');
    
  //       const scrollDiff = scrollTop - prevScrollTopRef.current;

  //     // console.log(scrollTop)
  //         // let bubleTop = 0
  //     for(let layer of layerOne) {
  //       for(let buble of layer.children){
  //         let bubleTop = parseFloat(window.getComputedStyle(buble).getPropertyValue('top'))
  //         console.log((bubleTop + (scrollTop+1)/10) + "px")
  //         buble.style.top = (scrollDiff/100) + "%"
  //       }
  //     }
  //     for(let layer of layerTwo) {
  //       for(let buble of layer.children){
  //         let bubleTop = parseFloat(window.getComputedStyle(buble).getPropertyValue('top'))
  //         buble.style.top = (scrollDiff/100) + "%"
  //       }
  //     }
  //     for(let layer of layerThree) {
  //       for(let buble of layer.children){
  //         let bubleTop = parseFloat(window.getComputedStyle(buble).getPropertyValue('top'))
  //         buble.style.top = (scrollDiff/100) + "%"
  //       }
  //     }

  // }, [scrollTop]);


  const mouseParallaxEffect = (e) => {

      var layerOne = document.querySelectorAll('#layer-1'),
          layerTwo = document.querySelectorAll('#layer-2'),
          layerThree = document.querySelectorAll('#layer-3');
      
      
      var pageX = e.clientX - window.innerWidth/2,
      pageY = e.clientY - window.innerHeight/2;

      for(let layer of layerOne) {
        layer.style.transform = `translateX(${pageX/200}%) translateY(${pageY/200}%)`;
      }
      for(let layer of layerTwo) {
        layer.style.transform = `translateX(${pageX/500}%) translateY(${pageY/500}%)`;
      }
      for(let layer of layerThree) {
        layer.style.transform = `translateX(${pageX/1000}%) translateY(${pageY/1000}%)`;
      }

      pupilleMove(e)

  }

  const pupilleMove = (e) => {
    
    var objects = document.querySelectorAll('#pupille')
    
    for(let ob of objects) {
      var coords = ob.getBoundingClientRect()
      
      // ( (position de la souris) - (coordoné de l'objet) ) + ( (moitié de la hauteur ou largeur de l'objet) / ajustement pour accélérerle mouvement)
      var shadowX = (e.clientX - (coords.x + ob.clientWidth/2)) / ((ob.clientWidth/2)/3.5),
      shadowY = (e.clientY - (coords.y + ob.clientHeight/2)) / ((ob.clientHeight/2)/3.5);

      ob.style.boxShadow = `inset white ${shadowX}px ${shadowY}px 10px 19px`;
    }
  }

  const coordToScrollTo = (selector) => {
    setMenuActive(!menuActive)
    let coord = document.querySelector(selector).getBoundingClientRect();
    return coord.top + window.scrollY
  }

  return (
    <div className="App" onMouseMove={(e) => mouseParallaxEffect(e)} >
      <div className='menu'>
        <button style={menuActive ? {bottom: "-10vh", opacity: 1} : {}} className='item' onClick={() => window.scroll({top: coordToScrollTo(".App"), behavior: 'smooth'})}></button>
        <button style={menuActive ? {bottom: "-18vh", opacity: 1} : {}} className='item' onClick={() => window.scroll({top: coordToScrollTo(".Road")-100, behavior: 'smooth'})}></button>
        <button style={menuActive ? {bottom: "-26vh", opacity: 1} : {}} className='item' onClick={() => window.scroll({top: coordToScrollTo(".Gear"), behavior: 'smooth'})}></button>
        <button style={menuActive ? {bottom: "-34vh", opacity: 1} : {}} className='item' onClick={() => window.scroll({top: coordToScrollTo(".Hobbies"), behavior: 'smooth'})}></button>
      </div>
      <Header scrolling={scrollTop} setMenu={() => setMenuActive(!menuActive)} />
      <Road scrolling={scrollTop} />
      <Gear scrolling={scrollTop} />
      <Hobbies scrolling={scrollTop} />
      <div className='WIP'> WIP </div>
    </div>
  );
}

export default App;

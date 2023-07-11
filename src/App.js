import './App.css';
import Header from './Part/Header/Header';

function App() {


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
      
      // ( (position de la souris) - ((coordoné de l'objet) + (moitié de la hauteur ou largeur de l'objet) )
      var shadowX = (e.clientX - (coords.x + ob.clientWidth/2)) / (ob.clientWidth/20),
      shadowY = (e.clientY - (coords.y + ob.clientHeight/2)) / (ob.clientHeight/20);


      ob.style.boxShadow = `inset white ${shadowX}px ${shadowY}px 10px 19px`;
    }
  }

  return (
    <div className="App" onMouseMove={(e) => mouseParallaxEffect(e)} >
      <Header />
    </div>
  );
}

export default App;

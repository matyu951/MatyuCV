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
        layer.style.transform = 'translateX(' + (pageX/200) + '%) translateY(' + (pageY/200) + '%)';
      }
      for(let layer of layerTwo) {
        layer.style.transform = 'translateX(' + (pageX/500) + '%) translateY(' + (pageY/500) +  '%)';
      }
      for(let layer of layerThree) {
        layer.style.transform = 'translateX(' + (pageX/1000) + '%) translateY(' + (pageY/1000) +  '%)';
      }


  }

  return (
    <div className="App" onMouseMove={(e) => mouseParallaxEffect(e)} >
      <Header />
    </div>
  );
}

export default App;

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
        layer.style.transform = 'translateX(-' + (50 + pageX/200) + '%) translateY(-' + (50 + pageY/200) + '%)';
      }
      for(let layer of layerTwo) {
        layer.style.transform = 'translateX(-' + (50 + pageX/500) + '%) translateY(-' + (50 + pageY/500) +  '%)';
      }
      for(let layer of layerThree) {
        layer.style.transform = 'translateX(-' + (50 + pageX/1000) + '%) translateY(-' + (50 + pageY/1000) +  '%)';
      }


  }

  return (
    <div className="App" onMouseMove={(e) => mouseParallaxEffect(e)} >
      <Header />
    </div>
  );
}

export default App;

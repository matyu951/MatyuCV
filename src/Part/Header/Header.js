import { useEffect, useState } from 'react';
import './Header.css';

function Header(props) {

    const [active, setActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            // You'd want an exit condition here
            setActive(true)
          }, 700);
          console.log('now')
    }, [])

    const [cligne, setCligne] = useState(true);

    useEffect(() => {
            var popiere = document.querySelector(".popiere")
            popiere.style.animation = "cligne .4s"
            
            var delanim = setInterval(() => {
                popiere.style.animation = "none"
            }, 410);

            var rand = Math.floor(Math.random() * 5000);
            var actu = setInterval(() => {
                setCligne(!cligne)
            }, rand + 410);

            return () => {clearInterval(delanim); clearInterval(actu)}
    }, [cligne])


  return (
    <>
        <div className='oeuil'style={window.scrollY!==0 ? {top: window.scrollY+(window.innerHeight/100*7), right: "9vh"} : {} } onClick={() => props.setMenu()}>
            <div className='popiere'>
                <div className='pupille' id='pupille' />
            </div>
        </div>
        <div className={active ? "Header active" : "Header"} >
            <div id="layer-1" >
                <div className='bubble m' />
                <div className='bubble s' />
            </div>
            <div id="layer-2" >
                <div className='bubble m'/>
            </div>
            <div id="layer-3" >
                <div className='bubble s' />
                <div className='bubble m' />
                <div className='name'>Berruer Mathis</div>
            </div>
        </div>
    </>
  );
}

export default Header;

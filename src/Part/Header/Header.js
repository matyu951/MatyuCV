import { useEffect, useState } from 'react';
import './Header.css';

function Header() {

    const [active, setActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            // You'd want an exit condition here
            setActive(true)
          }, 700);
    }, [])

  return (
    <div className={active ? "Header active" : "Header"} >
        <div id="layer-1" >
            <div className='bubble m' />
            <div className='bubble s' />
        </div>
        <div id="layer-2" >
            <div className='bubble g' />
            <div className='bubble m' />
        </div>
        <div id="layer-3" >
            <div className='bubble s' />
            <div className='bubble m' />
            <div className='name'>Berruer Mathis</div>
        </div>
    </div>
  );
}

export default Header;

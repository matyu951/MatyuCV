import { useEffect, useState } from 'react';
import './Hobbies.css';

function Hobbies(props) {
    
    const trigger = window.screen.height*0.80
    
    const [actualIndex, setActualIndex] = useState(0);
    const [isTogglable, setIsTogglable] = useState(true);

    const hobbies = [
        {
            title: "Escalade", 
            text: <>Découvert par hazard, j'ai essayé une fois et c'est devenu LE sport que je pratique maintenant.<br />Je trouve toujours autant de plaisir à grimper des parcours nouveaux comme anciens</>, 
            color: "darkgrey",
            border: "50%",
            image: require(`../../Ressources/pictures/Escaladepicture.jpg`)
        },
        {
            title: "Velo", 
            text: <>Plus qu'un sport, c'est un moyen de locomotion plus rapide qu'un bolide de 200 chevaux quand on habite en ville<br />Il est autant utile que gratifiant physiquement</>, 
            color: "steelblue",
            border: "50% 50px",
            image: require(`../../Ressources/pictures/Velopicture.jpg`)
        },
        {
            title: "Flechette", 
            text: <>J'ai un niveau plutôt moyen à ce jeu et 90% de mes parties sont soldé par une défaite, mais on passe toujours un très bon moment devant une cible de fléchettes</>, 
            color: "green",
            border: "50px 50px 50% 50%",
            image: require(`../../Ressources/pictures/Flechettepicture.jpg`)
        },
        {
            title: "Design", 
            text: <>Je dessine depuis tout petit et adore tout type de design, mais mes domaines préférés sont la création de logos et le créative coding</>, 
            color: "darksalmon",
            border: "50px 50% 50% 50px",
            image: require(`../../Ressources/pictures/Designpicture.jpg`)
        },
        {
            title: "Developpement", 
            text: <>Je suis tombé dedans suite à un bac professionnel de gestion et d'administration qui ne me plaisait pas, mais j'ai bien trouvé ma vois.<br />Fait maintenant partie intégrante de mes temps libres, et j'aime ça</>, 
            color: "khaki",
            border: "500% 50% 50% 50%",
            image: require(`../../Ressources/pictures/Developpementpicture.jpg`)
        },
    ]
    
    const [actualTitle, setActualTitle] = useState(hobbies[actualIndex].title);
    const [actualText, setActualText] = useState(hobbies[actualIndex].text);
    const [actualColor, setActualColor] = useState(hobbies[actualIndex].color);
    const [actualBorder, setActualBorder] = useState(hobbies[actualIndex].border);
    const [actualPicture, setActualPicture] = useState(hobbies[actualIndex].image);

    useEffect(() => {

        document.querySelector('.content').classList.add('transitionLeft')
        document.querySelector('.picturezone').classList.add('transitionbounce')
        document.querySelector('.picturezone .back').style.animation = "backImageAnim 1s cubic-bezier(.47,1.5,.41,.8)"

        const interval = setInterval(() => {
            setActualTitle(hobbies[actualIndex].title)
            setActualText(hobbies[actualIndex].text)
            setActualColor(hobbies[actualIndex].color)
            setActualBorder(hobbies[actualIndex].border)
            setActualPicture(hobbies[actualIndex].image)
        }, 400);

        setIsTogglable(false)
        const intervalD = setInterval(() => {
            document.querySelector('.content').classList.remove('transitionLeft')
            document.querySelector('.picturezone').classList.remove('transitionbounce')
            document.querySelector('.picturezone .back').style.animation = "none"
            setIsTogglable(true)
        }, 1000);
      
        return () => {clearInterval(interval);clearInterval(intervalD)}
      }, [actualIndex]);

        useEffect(() => {
            var contener = document.querySelector('.cardcontener'),
            title = document.querySelector('.Hobbies > .title h2')

            if(contener.getBoundingClientRect().top < trigger) {
                contener.classList.add("active")
                title.classList.add("active")
            }
            if(contener.getBoundingClientRect().top > trigger) {
                contener.classList.remove("active")
                title.classList.remove("active")
            }

        }, [props.scrolling]);


  return (
    <div className="Hobbies" >
        <div className='title'>
            <h2>Hobbies</h2>
        </div>
        <div className='cardcontener'>
            <div className='card'>
                <div className='content'>
                    <div className='title'>
                        <h2>
                            {actualTitle}
                        </h2>
                    </div>
                    <div className='text'>
                        {actualText}
                    </div>
                </div>
                <div className='picturezone'>
                    <div className='blocpicture front' style={{borderRadius: actualBorder}}>
                        <img src={actualPicture} />
                    </div>
                    <div className='blocpicture back' style={{backgroundColor: actualColor, borderRadius: actualBorder}}/>
                </div>
            </div>
            <div className='togglezone'>
                {
                    hobbies.map((hob, index) => {
                        return (
                            <div key={index} className={`toggle${index === actualIndex ? " active" : ""}${isTogglable ? "" : " unTogglable"}`} onClick={() => {isTogglable && setActualIndex(index)}} />
                        )
                    })
                }
            </div>
        </div>
    </div>
  );
}

export default Hobbies;

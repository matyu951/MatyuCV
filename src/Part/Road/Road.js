import { useEffect, useRef, useState } from 'react';
import './Road.css';

function Road(props) {

    const [update, setUpdate] = useState(false)

    const trigger = window.screen.height*0.80

    var steps = [
        {date: "2018 - 2020", title: "BTS", txt: "BTS SIO (Service Informatique aux Organisation)"},
        {date: "2020 - 2021", title: "Licence en alternance", txt: "Licence TQL (Test et Qualité Logiciel) réalisé en alternance dans l'entreprise Hipay"},
        {date: "2021 - mntn", title: "embauche CDI Hipay", txt: "signature d'un CDI à Hipay SAS suite à ma formation en alternance"},
    ]

    //changement du text en span par lettre + attribution d'un délai de transition
    let hunderText = document.querySelectorAll('.bodyStep'),
    hunderTextLetters = document.querySelectorAll('.bodyStep .letter')
    if(hunderTextLetters.length === 0) {
        for(let textanim of hunderText) {
            textanim.innerHTML = textanim.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        }
    } else {
        if(!update){
            for(let body of hunderText) {
                let delay = 0.01
                for(let letter of body.children) {
                    letter.style.transitionDelay = `${delay}s`
                    delay = delay + 0.01
                }
            }
            for(let i=0; i < hunderTextLetters.length; i++) {
            }
            setUpdate(true)
        }
    }

    useEffect(() => {
        let stepsObject = document.querySelectorAll('#appear')

        // gestion de l'apparition des lettre du texte

        for(let e of stepsObject) {

            // gestion de l'apparition des steps
            if(e.getBoundingClientRect().bottom < trigger) {
                e.classList.add("active");
            } else {
                e.classList.remove("active");
            }
        }
        
        // gestion de la linge des steps
        let progressLine = document.querySelector('#progressLine'),
            ligne = document.querySelector('.ligne'),
            topPoint = document.querySelector('.point.start'),
            botPoint = document.querySelector('.point.end');

        if(ligne.getBoundingClientRect().top > trigger){
            topPoint.classList.remove("active")
            progressLine.style.height = `0%`
        }
        if(ligne.getBoundingClientRect().top <= trigger){
            topPoint.classList.add("active")
            botPoint.classList.remove("active")
            progressLine.style.height = `${trigger - ligne.getBoundingClientRect().top }px`
        }
        if(ligne.getBoundingClientRect().bottom <= trigger){
            botPoint.classList.add("active")
            progressLine.style.height = "100%"
        }

    }, [props.scrolling])

  return (
    <div className="Road" style={{height: `${25*(steps.length+1)}vh`}} >
        <div className='ligne'>
            <div className='progressLine' id='progressLine' />
            <div className='point start' />
            <div className='point end' />
        </div>
        {
            steps.map((step, index) => {
                let top = `${25 * (index+1)}vh`
                return (
                    <div key={index} className='step' id='appear' style={{top: top}} >
                        <div className='headStep' >
                            <div className='left' >
                                <div className='date'>
                                    {step.date}
                                </div>
                            </div>
                            <div className='right'>
                                <div className='pointStep' >
                                    <div className='point' />
                                </div>
                                <div className='title' >
                                    {step.title}
                                </div>
                            </div>
                        </div>
                        <div className='bodyStep' >
                            {step.txt}
                        </div>
                    </div>
                )
            })
        }
    </div>
  );
}

export default Road;

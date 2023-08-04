import { useEffect, useState } from 'react';
import './Gear.css';


function Gear(props) {

  const [update, setUpdate] = useState(0)
  
  const trigger = window.screen.height*0.75

    var steps = {
        languages: [
          {pourcentage: 96, nom: "JS", comm: "Utilisé dans tous mes projets web"},
          {pourcentage: 95, nom: "CSS", comm: "Je ne jure que par le CSS"},
          {pourcentage: 90, nom: "HTML", comm: "Qui ne connaît pas ?"},
          {pourcentage: 80, nom: "SQL", comm: "Basique et efficace pour initier un projet"},
          {pourcentage: 60, nom: "Java", comm: "Appris et utilisé en cours mais jamais personnellement"},
          {pourcentage: 30, nom: "CSharp", comm: "Appris et utilisé en BTS, ça remonte un peu !"},
          {pourcentage: 30, nom: "Python", comm: "Appris et utilisé en BTS, ça remonte un peu !"},
          {pourcentage: 10, nom: "Kotlin", comm: "rapidement utilisé sur des tentatives sous android"},
          {pourcentage: 10, nom: "PHP", comm: "Désolé, peu pour moi !"},
        ],
        techno: [
          {pourcentage: 95, nom: "React", comm: "Utilisé dans tous mes projets web"},
          {pourcentage: 90, nom: "CodeceptJS", comm: "Utilisé en entreprise (Hipay), pour les automatisations"},
          {pourcentage: 55, nom: "TypeScript", comm: "Utilisé dans des projets avec des amis, pas seul !"},
          {pourcentage: 60, nom: "Linux", comm: "Utilisé en entreprise (Hipay)"},
          {pourcentage: 20, nom: "Playwright", comm: "Solution connue mais pas encore utilisée (à explorer)"},
          {pourcentage: 5, nom: "Symfony", comm: "Appris et utilisé en BTS, ça remonte un peu !"},
          {pourcentage: 8, nom: "Bootstrap", comm: "Je ne suis pas fan des libs de styles !"},
          {pourcentage: 5, nom: "Tailwind", comm: "Connu mais jamais utilisé"},
        ],
        outil: [
          {pourcentage: 95, nom: "Visual Studio", comm: "Quotidiennement utilisé"},
          {pourcentage: 85, nom: "PHPStorm", comm: "Utilisé en entreprise (Hipay)"},
          {pourcentage: 95, nom: "Photoshop", comm: "Utilisé pour faire des Logos et du photomontage"},
          {pourcentage: 70, nom: "Jira", comm: "Utilisé en entreprise (Hipay)"},
          {pourcentage: 70, nom: "Gitlab", comm: "Nécessairement nécessaire (outil git en général)"},
          {pourcentage: 45, nom: "Xray", comm: "Utilisé en entreprise (Hipay)"},
          {pourcentage: 60, nom: "Squash", comm: "Utilisé en entreprise (Hipay)"},
          {pourcentage: 50, nom: "MySQL", comm: "Pour mes BDD"},
        ],
    }

    useEffect(() => {
      
      let categorie = document.querySelectorAll('.categorie')

      for(let e of categorie) {

        // gestion de l'apparition des catégorie
        if(e.getBoundingClientRect().top <= trigger){
          e.classList.add("active")
          if(!e.children[1].classList[1]) e.children[1].style.height = `calc(40vh + 3vw)`; //réinitialiser la taille de jaugesContener à l'apparition
          

          // gestion de l'animation des jauges au scroll orizontale
          let jaugesContener = e.children[1].getBoundingClientRect()
          let contenerJauge = document.querySelectorAll(`.${e.classList[1]}.active .contener`)
          
          for(let cont = 0; cont <= contenerJauge.length-1; cont++){
            var JaugeLeft = contenerJauge[cont].getBoundingClientRect().left + jaugesContener.left,
            JaugeRight = contenerJauge[cont].getBoundingClientRect().right + jaugesContener.left,
            OnePercentTrigger = window.innerWidth / 100

            // console.log(jaugesContener.right + ' right')
            // console.log(jaugesContener.left + ' left')

            if(JaugeRight > OnePercentTrigger*50+jaugesContener.left && JaugeLeft < OnePercentTrigger*50+jaugesContener.left) {
              contenerJauge[cont].classList.remove('back')
              contenerJauge[cont].classList.add('front')
            }
            if(JaugeRight < OnePercentTrigger*50+jaugesContener.left || JaugeLeft > OnePercentTrigger*50+jaugesContener.left) {
              contenerJauge[cont].classList.remove('front')
              contenerJauge[cont].classList.add('back')
            }
          }

        }
        if(e.getBoundingClientRect().top > trigger){
            e.classList.remove("active")
            e.children[1].style.height = "0px"
        }
      }

      


    }, [props.scrolling, update])
    
    // composant de la jauge
    const Jauge = (categorie, info, index) => {

      return (
        <div key={index} className={`contener index${index}`} >
          <div className='nom'>{info.nom}</div>
          <div className='jauge'>
            <div className='back'>
              <div className='backgroundGradient'>
                <div className='toanim' style={{transform: `rotate(${document.querySelector(`.${categorie}.active .contener.index${index}.front`) ? -180 + (180*info.pourcentage/100) : "-180"}deg)`}}/>
              </div>
            </div>
            <div className='front'>
              <div className='logo'>
                <img src={require(`../../Ressources/pictures/${info.nom}logo.png`)} />
              </div>
              <div className='aiguille' style={{transform: `translate(-100%, -100%) rotate(${document.querySelector(`.${categorie}.active .contener.index${index}.front`) ? -45 + (180*info.pourcentage/100) : "-45"}deg)`}}/>
            </div>
          </div>
          <div className='info'>{info.comm}</div>
        </div>
      )
    }

    // composant de la catégorie
    const Categorie = (categorie, titre) => {
      return (
        <div className={'categorie ' + categorie}>
          <div className='title'><h2>{titre}</h2></div>
          <div className='jaugesContener' onScroll={e => setUpdate(e.currentTarget.children[0].getBoundingClientRect().left)}>
            <div className="jaugesList">
              {
                steps[categorie].map((info, index) => {
                  return Jauge(categorie, info, index)
                })
              }
            </div>
          </div>
        </div>
      )
    }

  return (
    <div className="Gear" style={{height: `${65*Object.keys(steps).length}vh`}}>
      {Categorie("languages", "languages")}
      {Categorie("techno", "techno/Libs")}
      {Categorie("outil", "outil/Logiciel")}
    </div>
  );
}

export default Gear;

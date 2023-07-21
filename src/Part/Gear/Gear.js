import { useEffect, useState } from 'react';
import './Gear.css';


function Gear(props) {

  
  const trigger = window.screen.height*0.50

  // const [jaugeContenerHeightRemember, setJaugeContenerHeightRemember] = useState("0px")

    var steps = {
        languages: [
          {pourcentage: 96, nom: "JS", comm: "Utilisé dans tous mes projets web"},
          {pourcentage: 95, nom: "CSS", comm: "Je ne jure que par le CSS"},
          {pourcentage: 90, nom: "HTML", comm: "Qui ne connais pas ?"},
          {pourcentage: 80, nom: "SQL", comm: "Basique et efficace pour initier un projet"},
          {pourcentage: 60, nom: "Java", comm: "Appris et utilisé en cours mais jamais personellement"},
          {pourcentage: 30, nom: "CSharp", comm: "Appris et utilisé en BTS, ça remonte un peut !"},
          {pourcentage: 30, nom: "Python", comm: "Appris et utilisé en BTS, ça remonte un peut !"},
          {pourcentage: 10, nom: "Kotlin", comm: "rapidement itilisé sur des tentatives sous android"},
          {pourcentage: 10, nom: "PHP", comm: "Désolé, peut pour moi !"},
        ],
        techno: [
          {pourcentage: 95, nom: "React", comm: "Utilisé dans tous mes projets web"},
          {pourcentage: 90, nom: "CodeceptJS", comm: "utilisé en entreprise (Hipay), pour les automatisations"},
          {pourcentage: 55, nom: "TypeScript", comm: "utilisé dans des projets avec des amis, pas seul !"},
          {pourcentage: 60, nom: "Linux", comm: "utilisé en entreprise (Hipay)"},
          {pourcentage: 20, nom: "Playwright", comm: "solution connu mais pas encore utilisé (à explorer)"},
          {pourcentage: 5, nom: "Symfony", comm: "Appris et utilisé en BTS, ça remonte un peut !"},
          {pourcentage: 8, nom: "Bootstrap", comm: "je ne suis pas fan des libs de styles !"},
          {pourcentage: 5, nom: "Tailwind", comm: "connu mais jamais utilisé"},
        ],
        outil: [
          {pourcentage: 95, nom: "Visual Studio", comm: "quotidiennement utilisé"},
          {pourcentage: 85, nom: "PHPStorm", comm: "utilisé en entreprise (Hipay)"},
          {pourcentage: 95, nom: "Photoshop", comm: "utilisé pour faire des Logos et du photomontage"},
          {pourcentage: 70, nom: "Jira", comm: "utilisé en entreprise (Hipay)"},
          {pourcentage: 70, nom: "Gitlab", comm: "nécécairement nécessaire (outil git en général)"},
          {pourcentage: 45, nom: "Xray", comm: "utilisé en entreprise (Hipay)"},
          {pourcentage: 60, nom: "Squash", comm: "utilisé en entreprise (Hipay)"},
          {pourcentage: 50, nom: "MySQL", comm: "pour mes BDD"},
        ],
    }

    useEffect(() => {
      
      let categorie = document.querySelectorAll('.categorie')

      // console.log(`${categorie[0].getBoundingClientRect().top} < ${trigger}`)
// console.log(jaugeContenerHeightRemember)
      for(let e of categorie) {

        // gestion de l'apparition des catégorie
        if(e.getBoundingClientRect().top <= trigger){
          e.classList.add("active")
          if(!e.children[1].classList[1]) e.children[1].style.height = `calc(35vh + 3vw)`; //réinitialiser la taille de jaugesContener
          e.children[2].children[0].classList.remove("up") //réinitialiser la direction de arrow
          e.children[2].children[0].classList.add("down")
          
        }
        if(e.getBoundingClientRect().top > trigger){
            e.classList.remove("active")
            e.children[1].classList.remove("collapsed")
            e.children[1].style.height = "0px"
        }
      }



    }, [props.scrolling])

    const Jauge = (categorie, info, index) => {
      return (
        <div key={index} className='contener'>
          <div className='nom'>{info.nom}</div>
          <div className='jauge'>
            <div className='back'>
              <div className='backgroundGradient'>
                <div className='toanim' style={{transform: `rotate(${document.querySelector(`.${categorie}.active`) ? -180 + (180*info.pourcentage/100) : "-180"}deg)`}}/>
              </div>
            </div>
            <div className='front'>
              <div className='logo'>
                <img src={require(`../../Ressources/pictures/${info.nom}logo.png`)} />
              </div>
              <div className='aiguille' style={{transform: `translate(-100%, -100%) rotate(${document.querySelector(`.${categorie}.active`) ? -45 + (180*info.pourcentage/100) : "-45"}deg)`}}/>
            </div>
          </div>
          <div className='info'>{info.comm}</div>
        </div>
      )
    }

    const Collapse = (categorie) => {
      var jaugesListHeight = document.querySelector(`.${categorie} .jaugesList`).clientHeight;
      var jaugesContener = document.querySelector(`.${categorie} .jaugesContener`);
      var arrow = document.querySelector(`.${categorie} .arrow`);

      if(jaugesContener.classList[1] === "collapsed"){
        arrow.classList.remove("up")
        arrow.classList.add("down")
        jaugesContener.classList.remove("collapsed")
        return jaugesContener.style.height = `calc(35vh + 3vw)`;
      }
      arrow.classList.remove("down")
      arrow.classList.add("up")
      jaugesContener.classList.add("collapsed")
      jaugesContener.style.height = `calc(${jaugesListHeight}px + 2vw)`;
    }

    const Categorie = (categorie, titre) => {
      return (
        <div className={'categorie ' + categorie}>
          <div className='title'><h2>{titre}</h2></div>
          <div className='jaugesContener'>
            <div className="jaugesList">
              {
                steps[categorie].map((info, index) => {
                  return Jauge(categorie, info, index)
                })
              }
            </div>
          </div>
          <div className='collapse' onClick={() => Collapse(categorie)}>
            <i className="arrow down" />
          </div>
        </div>
      )
    }

  return (
    <div className="Gear">
      {Categorie("languages", "languages")}
      {Categorie("techno", "techno/Libs")}
      {Categorie("outil", "outil/Logiciel")}
    </div>
  );
}

export default Gear;

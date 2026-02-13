import { useState } from 'react'
import { FaGithub, FaInstagram, FaYoutube} from 'react-icons/fa'
import './App.css'
import data_ from '../public/data.json'

function App() {
  const data = data_.q
  const [index, updateIndex] = useState(0)

  const flowers = data_.f
  const choiceScores = data_.s


  const [scores, setScores] = useState({
    rose:0,
    sunflower:0,
    orchid: 0,
    daisy: 0,
    tulip:0,
    sakura:0
  })

  const imgmap = {"rose":"rose.jpg", "sunflower":"sunflower.jpg", "orchid":"orchid.jpg", "daisy":"daisy.jpg", "tulip":"tulip.jpg", "sakura":"sakura.jpg"}
  const colormap = {"rose":"#F87171", "sunflower":"#FACC15", "orchid":"#38BDF8", "daisy":"#4ADE80", "tulip":"#C084FC", "sakura":"#F9A8D4"}

  const [flower, setFlower] = useState('')

  function calculateFlower() {
    const maxScoreFlower = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a: b)
    console.log(maxScoreFlower);
    //setFlower(maxScoreFlower)
    return maxScoreFlower
  }

  function handleClick(i) {
    console.log(i)
    if (index === data.length - 1) {
      return
    } else {
      updateIndex(index+1)
      
      let newScores = {...scores}
      const chosenFlowers = choiceScores[index][i+1]
      for (const element_ of chosenFlowers) {
        newScores[element_] += 1
      }
      setScores(newScores)
      //console.log(newScores);
    }
  }

  const data_x = data[index]
  return (
    <div className='main' style={{backgroundImage:`url(${(index===data.length-1)?'flowers3.jpg':'flowers2.jpg'})`}}>
      <h1 style={{color:(index===data.length-1)?"white":"#9d50bb"}}>Bloom</h1>
      <div>
        {
          index === data.length-1
          ? <div className='container' style={{backgroundColor:colormap[calculateFlower()]}}>        
                <div className='flower-img' style={{ backgroundImage:`url(${imgmap[calculateFlower()]})`}}></div>
                <h2>You're like a <div className="flowername">{calculateFlower()}</div></h2>
                <div>{flowers[calculateFlower()]}</div>
            </div>
          : <>
              <div className='container'>
                <h2>{data_x.question}</h2>
                <div className="choices">
                  {
                    data_x.choices.map((choice, i) => {
                      return(<div key={i} onClick={() => handleClick(i)}>{i+1}. {choice}</div>)
                    })
                  }
                </div>
              </div>
            </>
        }
      </div>
      <FaGithub onClick={()=> window.open("https://github.com/DerekZZhu", "_blank")}/>
    </div>
  )
}

export default App

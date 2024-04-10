import { useState, useEffect } from 'react'

const options = [
  {id:0, name:"Piedra", emoji:"🪨️", loser:[2]},
  {id:1, name:"Papel", emoji:"🧻️", loser:[0]},
  {id:2, name:"Tijeras", emoji:"✂️", loser:[1]}
];

const getResult = (userChoice, computerChoice) =>{
  if(userChoice == computerChoice){
    return 0
  }

  if(options[userChoice].loser.includes(computerChoice)){
    return 1
  }

  return 2

}

function OptionButton({option, handlePlay, disabled}){
  return(
    <>
      <button 
          key={option.id} 
          disabled={disabled} 
          onClick={()=>handlePlay(option.id)} 
          title={option.name}
        >
              {option.emoji}
        </button>
    </>
  )
}

function useChoices(){
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [userMessage, setUserMessage] = useState(null)
  const [computerMessage, setComputerMessage] = useState(null)
  const [result, setResult] = useState(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() =>{
    
    if(userChoice !== null){
      setUserMessage(`Has elegido ${options[userChoice]?.emoji} - ${options[userChoice]?.name}`)
    }

  },[userChoice])

  useEffect(() =>{

    if(computerChoice !== null){
      setComputerMessage(`Has elegido ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name}`)
    }

  },[computerChoice])


  const reset = () =>{
    setUserChoice(null)
    setComputerChoice(null)
    setUserMessage(null)
    setComputerMessage(null)
    setResult(null)
    setDisabled(false)
    
  }

  const handlePlay = id => {
    setUserChoice(id)
    setDisabled(true)
    const randomChoice = Math.floor(Math.random()*3)

    setTimeout(() => {
      setComputerChoice(randomChoice)
    }, 1500);

    setTimeout(()=>{
      setResult(getResult(id, randomChoice))
    }, 3000)

    clearTimeout()
  };

  return{
    useChoices,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset

  }

}

function Game() {
  
  const {
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset
  } = useChoices()


  return (
    <div>
      <h1>A jugar</h1>
      {options.map(option => (
        <OptionButton key={option.id} option={option} handlePlay={handlePlay} disabled={disabled} />
      ))}
      {userChoice !== null && (
        <p>{userMessage}</p>
      )
      }
      {computerChoice !== null && (
        <p>{computerMessage}</p>
      )
      }
      {
        result !== null &&<div>
            {result == 0 && <p>Empate</p>}
            {result == 1 && <p>Has ganado</p>}
            {result == 2 && <p>Has perdido</p>} 

            <button onClick={reset}>Resetear</button>
          </div>
        
      }

    </div>
  )
}

export default Game

import { MouseEvent, useCallback, useRef, useState } from 'react'
import './App.scss'

function App() {
    const [round, setRound] = useState(0)
    const [queue, setQueue] = useState<number[]>([])
    const [level, setLevel] = useState('1500')
    const [isActive, setIsActive] = useState(false)
    const [clicksAmount, setClicksAmount] = useState(0)

    const onStartGame = () => {
        setRound(0)
        setQueue([])
        setIsActive(false)
        onRoundStart()
    }

    const onRoundStart = () => {
        setClicksAmount(0)
        pushToQueue()
        animate()
    }
    
    const pushToQueue = () => setQueue(prev => [...prev, generateRandomNumber()])
    
    const generateRandomNumber = () => Math.floor((Math.random() * 4) + 1)

    const animate = useCallback(() => {
        setRound(prev => ++prev)
        setIsActive(true)
        console.log(queue)

        // setTimeout(() => {
        //     let i = 0

        //     let interval = setInterval(() => {
        //         lightUp(queue[i])
        //         playSound(queue[i])
    
        //         i++
        //         if (i >= queue.length) {
        //             clearInterval(interval)
        //             setIsActive(false)
        //         }
        //     }, +level)
        // }, 500)
    }, [queue])
    
    const lightUp = (e: number) => {
        const btn = document.getElementById(e.toString())
        btn?.classList.add('active')
        setTimeout(() => {
            btn?.classList.remove('active')
        }, 250)
    }

    const playSound = (e: number) => {
        (new Audio(`src/sounds/${e}.mp3`)).play()
    }
 





    // const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    //     e.currentTarget.classList.add('active')
    // }

    // const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    //     e.currentTarget.classList.remove('active')
    // }

    return (
        <div className="App">
            <div className='Circle'>
                <div 
                    className='Red'
                    // onMouseDown={handleMouseDown}
                    // onMouseUp={handleMouseUp}  
                    data-tile={1}
                    id='1'
                />
                <div 
                    className='Blue'
                    // onMouseDown={handleMouseDown}
                    // onMouseUp={handleMouseUp}  
                    data-tile={2}
                    id='2'
                />
                <div 
                    className='Yellow'
                    // onMouseDown={handleMouseDown}
                    // onMouseUp={handleMouseUp}  
                    data-tile={3}
                    id='3'
                />
                <div 
                    className='Green'
                    // onMouseDown={handleMouseDown}
                    // onMouseUp={handleMouseUp}  
                    data-tile={4}
                    id='4'
                />
            </div>
            <div className='Data'>
                <div>
                    <h1>Round: {round}</h1>
                    <div>
                        {queue}
                    </div>
                    <button onClick={onStartGame}>Start</button>
                </div>
                <div className='Options'>
                    <h2>Game Options</h2>
                    <div className='Option'>
                        <input type="radio" name="game" id="normal" />
                        <label htmlFor="normal">Normal</label>
                    </div>
                    <div className='Option'>
                        <input type="radio" name="game" id="sound-only" />
                        <label htmlFor="sound-only">Sound Only</label>
                    </div>
                    <div className='Option'>
                        <input type="radio" name="game" id="light-only" />
                        <label htmlFor="light-only">Light Only</label>
                    </div>
                </div>
                <div className='Lose' />
            </div>
            <div className='Audio' />
        </div>
    )
}

export default App

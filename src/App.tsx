import { MouseEvent, useRef, useState } from 'react'
import './App.scss'
import Game from './game/Game'

function App() {
    const circleRef = useRef<HTMLDivElement>(null)
    const redRef = useRef<HTMLDivElement>(null)
    const blueRef = useRef<HTMLDivElement>(null)
    const yellowRef = useRef<HTMLDivElement>(null)
    const greenRef = useRef<HTMLDivElement>(null)
    const roundRef = useRef<HTMLDivElement>(null)
    const loseRef = useRef<HTMLDivElement>(null)
    const audioRef = useRef<HTMLDivElement>(null)

    const handleStartGame = () => {
        new Game(
            circleRef.current,
            redRef.current, 
            blueRef.current, 
            yellowRef.current, 
            greenRef.current,
            roundRef.current,
            loseRef.current,
            audioRef.current
        ).init()
    }

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add('active')
    }

    const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('active')
    }

    return (
        <div className="App">
            <div className='Circle' ref={circleRef}>
                <div 
                    className='Red'
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}  
                    ref={redRef}
                    data-tile={1}
                    />
                <div 
                    className='Blue'
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}  
                    ref={blueRef}
                    data-tile={2}
                />
                <div 
                    className='Yellow'
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}  
                    ref={yellowRef}
                    data-tile={3}
                />
                <div 
                    className='Green'
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}  
                    ref={greenRef}
                    data-tile={4}
                />
            </div>
            <div className='Data'>
                <div>
                    <h1 ref={roundRef}>Round: 0</h1>
                    <button onClick={handleStartGame}>Start</button>
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
                <div className='Lose' ref={loseRef} />
            </div>
            <div className='Audio' ref={audioRef} />
        </div>
    )
}

export default App

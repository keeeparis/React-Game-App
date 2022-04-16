import { MouseEvent, useEffect, useRef, useState } from 'react'

import Game, { GameClassType } from './game/Game'
import './App.scss'

function App() {
    const circleRef = useRef<HTMLDivElement>(null)
    const roundRef = useRef<HTMLDivElement>(null)
    const loseRef = useRef<HTMLDivElement>(null)
    const todoRef = useRef<HTMLDivElement>(null)

    let gameRef = useRef<GameClassType>(undefined!)

    const handleStartGame = () => {
        gameRef.current.init()
    }

    const handleLevelChange = (e: any) => {
        gameRef.current.setLevel = e.target.value
    }

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add('active')
    }

    const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('active')
    }

    useEffect(() => {
        gameRef.current = new Game(
            circleRef.current,
            roundRef.current,
            loseRef.current,
            todoRef.current
        )
    }, [])

    return (
        <div className="App">
            <div className='Circle' ref={circleRef}>
                <div 
                    className='Red Tile'
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}  
                    data-tile={1}
                    id='1'
                />
                <div 
                    className='Blue Tile'
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}  
                    data-tile={2}
                    id='2'
                />
                <div 
                    className='Yellow Tile'
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}  
                    data-tile={3}
                    id='3'
                />
                <div 
                    className='Green Tile'
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}  
                    data-tile={4}
                    id='4'
                />
            </div>
            <div className='Data'>
                <div>
                    <h1 ref={roundRef}>Round: 0</h1>
                    <button onClick={handleStartGame}>Start</button>
                </div>
                <div className='Options' onChange={handleLevelChange}>
                    <h2>Game Options</h2>
                    <div className='Option'>
                        <input type="radio" name="game" id="normal" value='1500' defaultChecked  />
                        <label htmlFor="normal">Normal</label>
                    </div>
                    <div className='Option'>
                        <input type="radio" name="game" id="Hard" value='1000' />
                        <label htmlFor="sound-only">Hard</label>
                    </div>
                    <div className='Option'>
                        <input type="radio" name="game" id="Insane" value='400' />
                        <label htmlFor="light-only">Insane</label>
                    </div>
                </div>
                <div className='Lose' ref={loseRef} />
                <p className='Todo' ref={todoRef} />
            </div>
        </div>
    )
}

export default App

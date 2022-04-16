class Game {
    constructor(
        circle: any, 
        red: any, 
        blue: any, 
        yellow: any, 
        green: any, 
        round: any,
        lose: any,
        audio: any
    ) {
        this.circle = circle
        this.red = red
        this.blue = blue
        this.yellow = yellow
        this.green = green
        this.roundDiv = round
        this.loseDiv = lose
        this.audioDiv = audio
    }
    
    circle: HTMLDivElement
    red: HTMLDivElement
    blue: HTMLDivElement
    yellow: HTMLDivElement
    green: HTMLDivElement
    roundDiv: HTMLDivElement
    loseDiv: HTMLDivElement
    audioDiv: HTMLDivElement

    round: number = 0
    active: boolean = true
    sequence: number[] = []
    copySequence: number[] = []
    tileArray: HTMLDivElement[] = []

    init() {
        this.loseDiv.classList.remove('visible')
        this.startGame()
    }
    
    startGame() {
        this.tileArray = [this.red, this.blue, this.yellow, this.green]
        this.round = 0
        this.sequence = []
        this.copySequence = []
        this.newRound()
    }

    newRound() {
        this.round += 1
        this.roundDiv.innerText = `Round: ${this.round}`
        this.sequence.push(this.randomNumber())
        this.copySequence = this.sequence.slice(0)
        this.animate(this.sequence)
    }

    activateBoard() {
        this.circle.classList.remove('deactivated')
        this.tileArray.forEach(tile => {
            tile.onclick = this.registerClick(tile.dataset.tile)
            // @ts-ignore
            tile.onmousedown = () => this.playSound(+tile.dataset.tile)
        })
    }

    deactivateBoard() {
        this.circle.classList.add('deactivated')
    }

    registerClick(e: any) {
        return () => {
            const trueResponse = this.copySequence.shift()
            const actualResponse = +e
            this.active = (trueResponse === actualResponse)
            this.checkLose()
        }
    }

    checkLose() {
        if (this.copySequence.length === 0 && this.active) {
            this.deactivateBoard()
            this.newRound()
        } else if (!this.active) {
            this.deactivateBoard()
            this.endGame() 
        }
    }

    endGame() {
        this.round = 0
        this.roundDiv.innerText = `Round: ${this.round}`
        this.loseDiv.innerText = `
            Wow! Your result is ${this.round}. 
            Don't Stop and Keep Playing!
        `
        this.loseDiv.classList.add('visible')
    }

    /* HELPER FUNCTIONS */

    randomNumber() {
        return Math.floor((Math.random() * 4) + 1)
    }

    animate(sequence: number[]) {
        let i = 0
        let interval = setInterval(() => {
            this.lightUp(sequence[i])
            this.playSound(sequence[i])

            i++
            if (i >= sequence.length) {
                clearInterval(interval)
                this.activateBoard()
            }
        }, 600)
    }

    lightUp(tile: number) {
        this.tileArray.forEach(element => {
            if (element.dataset.tile && tile === +element.dataset.tile) {
                element.classList.add('active')
                setTimeout(() => {
                    element.classList.remove('active')
                }, 250)
            }
        })
    }

    playSound(tile: number) {
        while (this.audioDiv.firstChild) {
            this.audioDiv.removeChild(this.audioDiv.firstChild)
        }

        const audio = document.createElement('audio')
        audio.autoplay = true

        const source1 = document.createElement('source')
        source1.src = `src/sounds/${tile}.ogg`
        source1.type = 'audio/ogg'
        const source2 = document.createElement('source')
        source2.src = `src/sounds/${tile}.mp3`
        source2.type = 'audio/mp3'
        
        audio.appendChild(source1)
        audio.appendChild(source2)

        this.audioDiv.appendChild(audio)
    }

    /* GETTERS */

    get getRound() {
        return this.round
    }
}

export default Game
class Game {
    circle: HTMLDivElement
    roundDiv: HTMLDivElement
    loseDiv: HTMLDivElement
    todoDiv: HTMLDivElement

    constructor(
        circle: any, 
        round: any,
        lose: any,
        todo: any
    ) {
        this.circle = circle
        this.roundDiv = round
        this.loseDiv = lose
        this.todoDiv = todo
    }
    
    #level: string = '1500'  /* 1500 / 1000 / 400 */
    #round: number = 0
    #active: boolean = true
    #sequence: number[] = []
    copySequence: number[] = []

    set setLevel(lvl: string) {
        this.#level = lvl
    }

    get getRound() {
        return this.#round
    }

    init() {
        this.loseDiv.classList.remove('visible')
        this.startGame()
    }
    
    startGame() {
        this.#round = 0
        this.#sequence = []
        this.copySequence = []
        this.newRound()
    }

    newRound() {
        this.#round += 1
        this.roundDiv.innerText = `Round: ${this.#round}`
        this.todoDiv.innerText = 'Listen...'

        this.#sequence.push(this.randomNumber())
        this.copySequence = this.#sequence.slice(0)
        this.animate(this.#sequence)
    }

    activateBoard() {
        this.circle.classList.remove('deactivated')
        this.todoDiv.innerText = 'Play!'

        const tiles = document.querySelectorAll('.Tile')
        tiles.forEach(tile => {
            // @ts-ignore
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
            this.#active = (trueResponse === actualResponse)
            this.checkLose()
        }
    }

    checkLose() {
        if (this.copySequence.length === 0 && this.#active) {
            this.deactivateBoard()
            this.newRound()
        } else if (!this.#active) {
            this.deactivateBoard()
            this.endGame() 
        }
    }

    endGame() {
        this.loseDiv.innerText = `
            Wow! Your result is ${this.#round}. 
            Don't Stop and Keep Playing!
        `
        this.todoDiv.innerText = ''
        this.#round = 0
        this.roundDiv.innerText = `Round: ${this.#round}`
        this.loseDiv.classList.add('visible')
    }

    /* HELPER FUNCTIONS */

    randomNumber() {
        return Math.floor((Math.random() * 4) + 1)
    }

    animate(sequence: number[]) {
        // Задаержка перед каждым раундом
        setTimeout(() => {
            let i = 0
            let interval = setInterval(() => {
                this.lightUp(sequence[i])
                this.playSound(sequence[i])
    
                i++
                if (i >= sequence.length) {
                    clearInterval(interval)
                    this.activateBoard()
                }
            }, +this.#level)
        }, 400)
    }

    lightUp(tile: number) {
        const btn = document.getElementById(tile.toString())!
        
        btn.classList.add('active')
        setTimeout(() => {
            btn.classList.remove('active')
        }, 250)
    }

    playSound(tile: number) {
        const audio = new Audio()
        audio.src = `./sounds/${tile}.mp3`
        audio.oncanplaythrough = () => audio.play()
        // audio.play()
        // (new Audio(`./sounds/${tile}.mp3`)).play()
    }
}

export default Game

export type GameClassType = InstanceType<typeof Game>
import { useState } from 'react'

const useWordle = (solution: string) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState<string[]>([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})

    const formatGuess = () => {
        const solutionArray = [...solution]
        const formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' }
        })

        formattedGuess.forEach((l, i) => {
            if (solution[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = ''
            }
        })

        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = ''
            }
        })

        return formattedGuess
    }

    const addNewGuess = (formattedGuess: { key: string; color: string }[]) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses(prevGuesses => {
            const newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory(prevHistory => {
            return [...prevHistory, currentGuess]
        })
        setTurn(prevTurn => {
            return prevTurn + 1
        })
        setUsedKeys((prevUsedKeys: { [key: string]: string }) => {
            formattedGuess.forEach(l => {
                const currentColor = prevUsedKeys[l.key]

                if (l.color === 'green') {
                    prevUsedKeys[l.key] = 'green'
                    return
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    prevUsedKeys[l.key] = 'yellow'
                    return
                }
                if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    prevUsedKeys[l.key] = 'grey'
                    return
                }
            })

            return prevUsedKeys
        })
        setCurrentGuess('')
    }

    const handleKeyup = ({ key }: { key: string }) => {
        if (key === 'Enter') {

            if (turn > 5) {
                console.log('you used all your guesses!')
                return
            }

            if (history.includes(currentGuess)) {
                console.log('you already tried that word.')
                return
            }

            if (currentGuess.length !== 5) {
                console.log('word must be 5 chars.')
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }
        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1))
            return
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key)
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup }
}

export default useWordle
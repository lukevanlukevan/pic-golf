"use client"
import { useState } from "react"

function Page() {
  const [players, setPlayers] = useState([])
  const [preplay, setPreplay] = useState(true)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [attempts, setAttempts] = useState({})
  const [finishedPlayers, setFinishedPlayers] = useState([])

  const handlePlayerInput = (e) => {
    const playerList = e.target.value
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0)
    setPlayers(playerList)
  }

  const startGame = () => {
    if (players.length > 0) {
      setPreplay(false)
      setAttempts(
        players.reduce((acc, player) => ({ ...acc, [player]: 0 }), {}),
      )
    }
  }

  const recordAttempt = () => {
    setAttempts((prev) => ({
      ...prev,
      [players[currentPlayerIndex]]: prev[players[currentPlayerIndex]] + 1,
    }))
    setCurrentPlayerIndex((prev) => {
      let nextIndex = (prev + 1) % players.length
      while (
        finishedPlayers.includes(players[nextIndex]) &&
        finishedPlayers.length < players.length
      ) {
        nextIndex = (nextIndex + 1) % players.length
      }
      return nextIndex
    })
  }

  const markPlayerFinished = () => {
    const currentPlayer = players[currentPlayerIndex]
    if (!finishedPlayers.includes(currentPlayer)) {
      setFinishedPlayers((prev) => [...prev, currentPlayer])
      setCurrentPlayerIndex((prev) => {
        let nextIndex = (prev + 1) % players.length
        while (
          finishedPlayers.includes(players[nextIndex]) &&
          finishedPlayers.length < players.length - 1
        ) {
          nextIndex = (nextIndex + 1) % players.length
        }
        return nextIndex
      })
    }
  }

  return (
    <div className="bg-background-100 flex min-h-screen flex-col items-center font-mono">
      <div className="flex w-full max-w-md flex-col items-center gap-4 p-4">
        <h1 className="font-mono text-3xl font-bold">PIC Golf</h1>
        {preplay ? (
          <>
            <h2 className="text-lg">Enter player names (one per line):</h2>
            <textarea
              className="w-full rounded border border-r-foreground p-2 outline-none focus:border-blue-500"
              rows="5"
              placeholder="Player 1"
              onChange={handlePlayerInput}
            />
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
              onClick={startGame}
              disabled={players.length === 0}
            >
              Start Game
            </button>
          </>
        ) : (
          <>
            {finishedPlayers.length < players.length ? (
              <>
                <h2 className="text-lg">
                  Current Player: {players[currentPlayerIndex]}
                </h2>
                <p>Attempts: {attempts[players[currentPlayerIndex]]}</p>
                <div className="flex gap-2">
                  <button
                    className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    onClick={recordAttempt}
                  >
                    Next Player
                  </button>
                  <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={markPlayerFinished}
                    disabled={finishedPlayers.includes(
                      players[currentPlayerIndex],
                    )}
                  >
                    In
                  </button>
                </div>
              </>
            ) : (
              <h2 className="text-lg">All players have finished!</h2>
            )}
            <div className="mt-4 w-full">
              <h3 className="font-mono text-lg font-semibold">Scoreboard</h3>
              <ul className="mt-2">
                {players.map((player, index) => (
                  <li key={index} className="py-1 font-mono">
                    {player}: {attempts[player]} attempts
                    {finishedPlayers.includes(player) ? " (Finished)" : ""}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page

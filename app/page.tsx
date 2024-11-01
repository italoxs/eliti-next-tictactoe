'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RefreshCcw, Trophy } from "lucide-react";
import { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [scores, setScores] = useState({ player1: 0, player2: 0 })
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
      [0, 4, 8], [2, 4, 6] // diagonais
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (!gameStarted || board[i] || calculateWinner(board)) return

    const newBoard = board.slice()
    newBoard[i] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)

    const winner = calculateWinner(newBoard)
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner === 'X' ? 'player1' : 'player2']: prev[winner === 'X' ? 'player1' : 'player2'] + 1
      }))
    }
  }

  const startGame = () => {
    if (player1Name && player2Name) {
      setGameStarted(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board)
  const status = winner ? `Vencedor: ${winner === 'X' ? player1Name : player2Name}`
    : board.every(square => square)
    ? 'Empate!'
    : `Próximo jogador: ${xIsNext ? player1Name : player2Name} (${xIsNext ? 'X' : 'O'})`

  const renderSquare = (i) => (
    <button
      className={`w-full h-24 border flex items-center justify-center border-blue-500 text-2xl font-bold
        ${!board[i] && gameStarted ? 'hover:bg-gray-100' : ''}
        ${winner && board[i] === winner ? 'bg-green-200' : 'bg-white'}`}
      onClick={() => handleClick(i)}
      disabled={!gameStarted}
    >
      {board[i]}
    </button>
  )

  if (!gameStarted) {
    return (
      <Card className="w-96 m-auto mt-10 bg-blue-600 border-0">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-slate-200">Jogo da Velha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 ">
          <div className="space-y-2 text-slate-200 placeholder-slate-100">
            <Input
              placeholder="Nome do Jogador 1 (X)"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
            <Input
              placeholder="Nome do Jogador 2 (O)"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
            />
          </div>
          <Button 
            className="w-full"
            onClick={startGame}
            disabled={!player1Name || !player2Name}
          >
            Começar Jogo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-96 m-auto mt-10 bg-blue-600 border-0">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-slate-200">
          <span className="">Jogo da Velha Next</span>
          <Trophy className="text-yellow-500" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-4 p-2 bg-slate-950 text-slate-200 rounded flex justify-between items-center">
          <div>
            <div>{player1Name} (X): {scores.player1}</div>
            <div>{player2Name} (O): {scores.player2}</div>
          </div>
          <Button variant="outline" size="icon" onClick={resetGame}>
            <RefreshCcw className="h-4 w-4 text-slate-500"/>
          </Button>
        </div>

        <div className="text-center mb-4 text-slate-200 font-bold ">{status}</div>

        <div className="grid grid-cols-3 gap-1 mb-4">
          {Array(9).fill(null).map((_, i) => (
            <div key={i}>{renderSquare(i)}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

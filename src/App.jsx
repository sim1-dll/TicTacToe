import { useState } from 'react'
import './App.css'
import TicTacGrid from './controls/TicTacGrid';
import { getAIMove } from './ai';

export default function App() {
  const [cells, setCells] = useState(new Array(9).fill({play:'',winner:false}));
  const [nextPlayer, setNextPlayer] = useState('x');
  const [winnerPlayer, setwinnerPlayer] = useState('');
  const [frozen, setFrozen] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);

  function checkWinnerArr(arr)
  {
    if (arr.length != 3)
      return false;

    if (arr[0].play != '' && arr[0].play === arr[1].play && arr[0].play === arr[2].play)
      return true;
  }

  function checkWinner(arr){

    if (checkWinnerArr([arr[0],arr[1],arr[2]]))
    {
        return [0,1,2];
    }
    if (checkWinnerArr([arr[3],arr[4],arr[5]]))
    {
        return [3,4,5];
    }

    if (checkWinnerArr([arr[6],arr[7],arr[8]]))
    {
        return [6,7,8];
    }

    if (checkWinnerArr([arr[0],arr[3],arr[6]]))
    {
        return [0,3,6];
    }

    if (checkWinnerArr([arr[1],arr[4],arr[7]]))
    {
        return [1,4,7];
    }

    if (checkWinnerArr([arr[2],arr[5],arr[8]]))
    {
        return [2,5,8];
    }

    if (checkWinnerArr([arr[0],arr[4],arr[8]]))
    {
        return [0,4,8];
    }

    if (checkWinnerArr([arr[2],arr[4],arr[6]]))
    {
        return [2,4,6];
    }

    return [];
  }
  /**
   * Returns true if there are available moves
   */
  function movesAvailable(cells){
    let emptyCells = false;
    for(let i=0;i < cells.length;i++)
    {
        if (cells[i].play === '')
        {
            emptyCells = true;
            break;
        }
    }

    return emptyCells;
  }

  function switchPlayer(np) {
    if (np === 'x')
      {
        setNextPlayer('o');
        return 'o';
      }
    else
      {
        setNextPlayer('x');
        return 'x';
      }
  }

  function makeMove(idx, cells, player)
  {
    let isGameOver = false;
    let nextCells = cells.map((c, i) => {
      if (i === idx) {
        // Set the clicked cell
        return {play: player, winner:false}
      } else {
        // The rest haven't changed
        return c;
      }
    });

    let winners = checkWinner(nextCells);
    if (winners.length === 3)
    {
      isGameOver = true;
      setFrozen(true);

      //we have winners!
      setwinnerPlayer(player);

      nextCells = nextCells.map((c, i) => {
      if (winners.includes(i)) {
        // Set the cell as winner
        return {play:c.play, winner:true}
      } else {
        // The rest haven't changed
        return c;
      }
    });
    }
    else
    {
      //draw?
      if (!movesAvailable(nextCells))
      {
        isGameOver = true;
        setwinnerPlayer('-');
      }
    }

    return { isGameOver, nextCells };
  }

  function cellClick(idx) {
    let np = nextPlayer;
    let r = makeMove(idx, cells, nextPlayer);
    np = switchPlayer(np);

    if (aiEnabled && !r.isGameOver)
    {
      let aiMove = getAIMove(r.nextCells)
      if (aiMove != -1)
      {
        r = makeMove(aiMove, r.nextCells, np);
      }
      switchPlayer(np);
    }

    setCells(r.nextCells);
  }

  function newGame() {
    setwinnerPlayer('');
    
    //In AI games, user is always 'x'
    //In PVP games, 'o' can start first
    if (aiEnabled)
      setNextPlayer('x');

    setCells(new Array(9).fill({play:'',winner:false}));
    setFrozen(false);
  }
  
  function aiModeChange(e) {
    setAiEnabled(e.target.checked);
  }

  //Display winning message or next player message
  let displayMessage;
  if (winnerPlayer)
  {
    if (winnerPlayer === '-')
      displayMessage = "Draw!";
    else
      displayMessage = winnerPlayer + " wins!";
  }
  else
  {
    displayMessage = "Next move: player " + nextPlayer;
  }

  return (
    <>
      <p style={{
        margin: '5px'
      }}>{displayMessage}</p>

      <TicTacGrid cells={cells} cellClick={cellClick} frozen={frozen}></TicTacGrid>

      <div style={{
        margin: '5px',
        justifySelf : 'right'
      }}>
            <input type="checkbox" id="cpu_cb" name="cpu_cb" onChange={aiModeChange} checked={aiEnabled}  />
            <label htmlFor="cpu_cb">vs CPU</label>
      </div>

      <div style={{
        margin: '5px'
      }}>
        <button onClick={() => {newGame();}}>New Game</button>
      </div>
    </>
  );
}


import TicTacCell from "./TicTacCell";
 
export default function TicTacGrid({cells, cellClick, frozen}) {
  
  return (
    <>
      <div style={{
        width: 180,
        display: 'flex',
        justifyContent : 'center',
        flexWrap : 'wrap'
      }}>

        {cells.map( (p, i) => 
          <TicTacCell 
              play={p.play} 
              isWinner={p.winner} 
              key={i} 
              idx={i} 
              click={cellClick} 
              frozen={frozen}/>)}

       </div> 
       
    </>
  );
}

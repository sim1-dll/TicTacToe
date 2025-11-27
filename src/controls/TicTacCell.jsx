export default function TicTacCell({play, isWinner, idx, click, frozen}){

const isHoverable = !frozen && !play;

return (<div
            className={"cell " + (isWinner ? 'winner' : '') +
                                  (isHoverable ? 'enabled' : '')
            }
            onClick={() => {
                                if (!frozen && !play) 
                                    {click(idx);}
                         }}
                     >
                      {play}
        </div>);

}
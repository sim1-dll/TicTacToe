
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getAIMove(cells)
{
    let emptyCells = [];
    for(let i=0;i < cells.length;i++)
    {
        if (cells[i].play === '')
        {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0)
        return -1;

    let aimove = getRandomInt(emptyCells.length);
    return emptyCells[aimove];
}
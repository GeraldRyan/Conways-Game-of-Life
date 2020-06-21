import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import produce from 'immer'

const numRows = 50
const numColumns = 50

function App()
{
  const [grid, setGrid] = useState(() =>
  {
    const rows = []
    for (let i = 0; i < numRows; i++)
    {
      rows.push(Array.from(Array(numColumns), () => 0))
    }
    return rows
  })

  // console.log(grid)
  return (
    <div className="App"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numColumns}, 20px)`
      }}>



      {grid.map((rows, i) =>
        rows.map((col, k) => (

          <div
            key={`${i}-${k}`}
            onClick={() =>
            {
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][k] = gridCopy[i][k] ? 0 :1 
              })
              setGrid(newGrid)
            }}
            className="grid"
            style={{
              width: 20, height: 20, backgroundColor: grid[i][k] ? 'black' : undefined,
              border: "solid 1px black"


            }}></div>

        ))
      )}
    </div>
  );
}

export default App;

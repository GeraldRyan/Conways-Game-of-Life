import React, { useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import produce from 'immer'

const numRows = 50
const numColumns = 50

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [-1, -1],
  [1, 1],
  [1, 0],
  [-1, 0]
]

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

  const [running, setrunning] = useState(false)

  const runningRef = React.useRef(running)
  runningRef.current = running

  const runSimulation = useCallback(() =>
  {
    if (!runningRef.current)
    {
      return
    }
    // simulate

    setGrid(g =>
    {
      return produce(g, gridCopy =>
      {
        for (let i = 0; i < numRows; i++)
        {
          for (let k = 0; k < numColumns; k++)
          {
            let neighbors = 0
            operations.forEach(([x, y]) =>
            {
              const newI = i + x
              const newK = i + y
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numColumns)
              {
                neighbors += g[newI][newK]
              }
            })

            if (neighbors < 2 || neighbors > 3)
            {
              gridCopy[i][k] = 0
            }
            else if (g[i][k] === 0 && neighbors === 3)
            {
              gridCopy[i][k] = 1

            }
          }
        }

      })
    })

    setTimeout(runSimulation, 1000)
  }, [])

  // console.log(grid)
  return (
    <div className="App">
      <button onClick={() =>
      {
        setrunning(!running)
        if (!running)
        {
          runningRef.current = true
          runSimulation()
        }
      }}>
        {running ? 'Stop' : "Start"}</button>
      <div 
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
                const newGrid = produce(grid, gridCopy =>
                {
                  gridCopy[i][k] = gridCopy[i][k] ? 0 : 1
                })
                setGrid(newGrid)
              }}
              className="grid"
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? 'black' : undefined,
                border: "solid 1px black"
              }}>

            </div>

          ))
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useCallback } from "react";
import "./App.css";
import produce from "immer";
import Sidebar from "./sidebar";

const numRows = 50;
const numColumns = 50;
let currentGen = 0
let once = false

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [-1, -1],
  [1, 1],
  [1, 0],
  [-1, 0],
];

function App() {
  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }
    return rows;
  };
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = React.useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    // simulate
currentGen++
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numColumns; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (
                newI >= 0 &&
                newI < numRows &&
                newK >= 0 &&
                newK < numColumns
              ) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    if (!once){
    setTimeout(runSimulation, 50)};
  }, []);

  // console.log(grid)
  return (
    <div className="App">
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numColumns), () => (Math.random() > 0.6 ? 1 : 0))
            );
          }
          setGrid(rows);
        }}
      >
        Random
      </button>
      <button>View Rules</button>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            once = true
            runningRef.current = true;
            runSimulation();
            once = false
          }
        }}
      >Step One</button>
      <div>Current Generation: {currentGen}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numColumns}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              className="grid"
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "black" : undefined,
                border: "solid 1px black",
              }}
            ></div>
          ))
        )}
      </div>
      <Sidebar />
    </div>
  );
}

export default App;

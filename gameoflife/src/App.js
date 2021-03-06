import React, { useState, useCallback } from "react";
import "./App.css";
import produce from "immer";
import Sidebar from "./sidebar";
import Rules from "./Rules";

let currentGen = 0;
let once = false;
let timeout = 50;

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
  const [numRows, setNumRows] = useState(50);
  const [numColumns, setNumColumns] = useState(50);
  


  const generateEmptyGrid = (r = numRows, c = numColumns) => {
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
    currentGen++;
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
    if (!once) {
      setTimeout(runSimulation, timeout);
    }
  }, []);

  const handleSlideChange = (e) => {
    console.log(e.target.value);
    timeout = e.target.value;
  };
const handleRowRange = (e) =>{
  console.log(`number of rows: ${e.target.value}`);
  setNumRows(e.target.value)
  setGrid(generateEmptyGrid())
}
const handleColRange = (e) =>{
  console.log(`number of columns: ${e.target.value}`);
  setNumColumns(e.target.value)
  setTimeout(() => {
    setGrid(generateEmptyGrid())
    
  }, 1000);
}


  // console.log(grid)
  return (
    <div className="App">
      <div className="flexcontainer">
        <div className="gameContainer">
          <Rules></Rules>
          <button
            onClick={() => {
              setGrid(generateEmptyGrid());
            }}
          >
            Clear
          </button>

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
              const rows = [];
              for (let i = 0; i < numRows; i++) {
                rows.push(
                  Array.from(Array(numColumns), () =>
                    Math.random() > 0.6 ? 1 : 0
                  )
                );
              }
              setGrid(rows);
            }}
          >
            Random
          </button>
          <button
            onClick={() => {
              setRunning(!running);
              if (!running) {
                once = true;
                runningRef.current = true;
                runSimulation();
                once = false;
              }
            }}
          >
            Step One
          </button>
          <div>Current Generation: {currentGen}</div>

          <form>
            <label htmlFor="speed">Speed</label>
            <input
              type="range"
              direction="rtl"
              min="1"
              max="2000"
              defaultValue="200"
              className="slider"
              name="speed"
              id="speed"
              onChange={handleSlideChange}
            />
          </form>

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
        </div>
        {/* <div className="sidebar">
          <div className="sidebarParent">
            <div>
            </div>
            <div className="gridsizer">
            <label htmlFor="rowrange">rows</label>
            <input
              type="range"
              className="vranger"
              min="10"
              max="100"
              defaultValue="50"
              id="rowrange"
              onChange={handleRowRange}
              />
            <label htmlFor="colrange">columns</label>

            <input
              type="range"
              className="vranger"
              min="10"
              max="50"
              defaultValue="50"
              id="colrange"
              // onChange={handleColRange} TODO - Fix bug,. Buggy for some reason

            />
            </div>
          </div>
          <div style={{marginTop:"150px"}}>

          <Rules></Rules>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;

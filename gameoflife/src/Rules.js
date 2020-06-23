import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

const Rules = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  return (
    <>
      <button
        onClick={() => {
          setModalIsOpen(!modalIsOpen);
        }}
      >
        View Rules
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(!modalIsOpen);
        }}
        style={{
          overlay: {
            backgroundColor: "gray",
          },
          content: {
            color: "orange",
          },
        }}
      >
        <h1>Conway's Game of Life Rules</h1>
        <h2>
          From Wikipedia:{" "}
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            Link
          </a>{" "}
        </h2>
        <p>
          The universe of the Game of Life is an infinite, two-dimensional
          orthogonal grid of square cells, each of which is in one of two
          possible states, live or dead, (or populated and unpopulated,
          respectively). Every cell interacts with its eight neighbours, which
          are the cells that are horizontally, vertically, or diagonally
          adjacent. At each step in time, the following transitions occur:
        </p>

        <li>
          1. Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
        <li>
          2. Any live cell with two or three live neighbours lives on to the
          next generation.
        </li>
        <li>
          3. Any live cell with more than three live neighbours dies, as if by
          overpopulation.
        </li>
        <li>
          4. Any dead cell with exactly three live neighbours becomes a live
          cell, as if by reproduction.
        </li>
        <li></li>

        <p>
          These rules, which compare the behavior of the automaton to real life,
          can be condensed into the following:
        </p>

        <li>Any live cell with two or three live neighbours survives.</li>
        <li>Any dead cell with three live neighbours becomes a live cell.</li>
        <li>
          All other live cells die in the next generation. Similarly, all other
          dead cells stay dead.
        </li>
        <p>
          The initial pattern constitutes the seed of the system. The first
          generation is created by applying the above rules simultaneously to
          every cell in the seed; births and deaths occur simultaneously, and
          the discrete moment at which this happens is sometimes called a tick.
          Each generation is a pure function of the preceding one. The rules
          continue to be applied repeatedly to create further generations.
        </p>
        <button
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
          }}
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default Rules;

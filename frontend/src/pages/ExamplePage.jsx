import React, { useState } from "react";

/**
 * @typedef {Object} Square
 * @property {number} id
 * @property {string} color
 * @property {number} top
 * @property {number} left
 */

function getRandomColor() {
  // Pastel colors
  const colors = [
    "#A7C7E7", // pastel blue
    "#B5EAD7", // pastel green
    "#FFDAC1", // pastel orange
    "#FFB7B2", // pastel pink
    "#E2F0CB", // pastel lime
    "#C7CEEA", // pastel purple
    "#FFFACD", // pastel yellow
    "#ECECEC", // pastel gray
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomPosition() {
  // Return numbers, not strings
  return {
    top: Math.random() * 80 + 10, // number, vh will be added in style
    left: Math.random() * 80 + 10, // number, vw will be added in style
  };
}

function ExamplePage() {
  /** @type {[Square[], Function]} */
  const [squares, setSquares] = useState([]);

  const handleAddSquares = () => {
    const newSquares = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      color: getRandomColor(),
      ...getRandomPosition(),
    }));
    setSquares(
      /**
       * @param {Square[]} prev
       */
      (prev) => [...prev, ...newSquares],
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-light flex flex-col items-center justify-center relative overflow-hidden">
      <h1 className="text-4xl font-bold mb-6">Página de ejemplo</h1>
      <p className="text-lg text-gray-light mb-4">
        Este es un contenido de ejemplo para comprobar que el chatbot flota por
        encima de la página.
      </p>
      <div className="w-full max-w-xl bg-white rounded-xl shadow-chatbot p-8 text-gray-dark mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contenido principal</h2>
        <p className="mb-2">
          Puedes interactuar con el chatbot en la esquina inferior derecha y
          comprobar que siempre está por encima de este contenido.
        </p>
        <ul className="list-disc pl-6 text-gray-light">
          <li>El chatbot debe flotar sobre todo el contenido.</li>
          <li>El botón y el chat no deben tapar el contenido importante.</li>
          <li>Puedes hacer scroll y el chatbot seguirá fijo.</li>
        </ul>
      </div>
      <button
        className="mb-8 px-6 py-2 rounded-lg bg-light-blue text-gray-dark font-bold shadow-chatbot hover:bg-gray-light transition"
        onClick={handleAddSquares}
        type="button"
      >
        ¡Haz aparecer cuadraditos rebotando!
      </button>
      {squares.map((sq) => (
        <BouncingSquare
          key={sq.id}
          color={sq.color}
          initialTop={sq.top}
          initialLeft={sq.left}
        />
      ))}
    </div>
  );
}

/**
 * @param {{ color: string, initialTop: number, initialLeft: number }} props
 */
function BouncingSquare({ color, initialTop, initialLeft }) {
  const [pos, setPos] = useState({
    top: initialTop,
    left: initialLeft,
    vTop: (Math.random() - 0.5) * 1.5,
    vLeft: (Math.random() - 0.5) * 1.5,
  });

  let frame;

  React.useEffect(() => {
    /** @type {number} */
    let frame;
    function animate() {
      setPos((prev) => {
        let { top, left, vTop, vLeft } = prev;
        top += vTop;
        left += vLeft;
        if (top < 0) {
          top = 0;
          vTop = -vTop;
        }
        if (top > 100) {
          top = 100;
          vTop = -vTop;
        }
        if (left < 0) {
          left = 0;
          vLeft = -vLeft;
        }
        if (left > 100) {
          left = 100;
          vLeft = -vLeft;
        }
        return { top, left, vTop, vLeft };
      });
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: pos.top + "vh",
        left: pos.left + "vw",
        width: 40,
        height: 40,
        background: color,
        borderRadius: 8,
        boxShadow: "0 6px 12px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.15)", // Igual que shadow-chatbot
        zIndex: 30,
        pointerEvents: "none",
        transition: "box-shadow 0.2s",
      }}
    />
  );
}

export default ExamplePage;

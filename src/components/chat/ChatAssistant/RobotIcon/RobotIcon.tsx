import './RobotIcon.css';

// Robotito pensativo: una ceja levantada, ojos mirando hacia arriba y burbujas de pensamiento.
function RobotIcon() {
  return (
    <svg className="robot-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {/* Antena */}
      <line
        x1="32"
        y1="10"
        x2="32"
        y2="17"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="robot-icon__bulb" cx="32" cy="8" r="3.4" fill="#22d3ee" />

      {/* Orejas */}
      <rect x="5" y="29" width="6" height="14" rx="3" fill="currentColor" opacity="0.75" />
      <rect x="53" y="29" width="6" height="14" rx="3" fill="currentColor" opacity="0.75" />

      {/* Cabeza y pantalla */}
      <rect x="10" y="17" width="44" height="35" rx="13" fill="currentColor" />
      <rect x="15" y="23" width="34" height="23" rx="9" fill="#0b1220" />

      {/* Cejas: la izquierda levantada, la derecha recta */}
      <path
        d="M20.5 28.5 L28 26"
        stroke="#22d3ee"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M36.5 27.5 L43.5 27.5"
        stroke="#22d3ee"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Ojos mirando hacia arriba a la derecha */}
      <g className="robot-icon__eyes">
        <circle cx="24.5" cy="33" r="3.6" fill="#22d3ee" />
        <circle cx="39.5" cy="33" r="3.6" fill="#22d3ee" />
        <circle cx="25.6" cy="31.8" r="1.2" fill="#ffffff" />
        <circle cx="40.6" cy="31.8" r="1.2" fill="#ffffff" />
      </g>

      {/* Boca ondulada, de "hmm..." */}
      <path
        d="M25.5 41 Q28 38.6 30.5 41 T35.5 41 T38.5 40"
        stroke="#22d3ee"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Burbujas de pensamiento */}
      <circle
        className="robot-icon__dot robot-icon__dot--1"
        cx="56.5"
        cy="14"
        r="1.7"
        fill="currentColor"
      />
      <circle
        className="robot-icon__dot robot-icon__dot--2"
        cx="59.5"
        cy="8.5"
        r="2.3"
        fill="currentColor"
      />
    </svg>
  );
}

export default RobotIcon;
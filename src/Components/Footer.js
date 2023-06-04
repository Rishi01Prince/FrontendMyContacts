import React, { useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const intervalId = setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <div>
      <footer className="footer fixed-bottom bg-dark">
        <div className="container">
          <span className="te">© 2023 Your Contact List , Inc. {time}</span>
        </div>
      </footer>
    </div>
  );
}

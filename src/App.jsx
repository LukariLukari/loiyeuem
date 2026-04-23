import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Stars } from 'lucide-react';

const App = () => {
  const [revealed, setRevealed] = useState({}); // { cardIndex: messageIndex }
  const [order, setOrder] = useState([]); // Array of card indices in the order they were clicked
  const [shuffledFirstFour, setShuffledFirstFour] = useState([]);

  const messages = [
    "Em là điều tuyệt vời nhất anh từng gặp. ❤️",
    "Mỗi ngày bên em là một món quà. 🌸",
    "Anh yêu cách em cười, cách em nhìn anh. ✨",
    "Trái tim anh đã thuộc về em từ lâu rồi. 🌹",
    "LỜI CUỐI: Cưới anh nhé? Đùa thôi, nhưng anh yêu em mãi mãi! 💖" // Nội dung thứ 5 đặc biệt
  ];

  useEffect(() => {
    // Shuffle the first 4 messages indices
    const firstFour = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    setShuffledFirstFour(firstFour);
  }, []);

  const handleCardClick = (index) => {
    if (revealed[index] !== undefined) return;

    const currentDrawCount = Object.keys(revealed).length;
    let msgIndex;

    if (currentDrawCount < 4) {
      msgIndex = shuffledFirstFour[currentDrawCount];
    } else {
      msgIndex = 4; // The 5th message
    }

    setRevealed(prev => ({ ...prev, [index]: msgIndex }));
    setOrder(prev => [...prev, index]);

    // Effects
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#ff85a2', '#ffffff']
    });

    if (currentDrawCount === 4) {
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#ff85a2', '#ffffff']
        });
      }, 1000);
    }
  };

  const reset = () => {
    setRevealed({});
    setOrder([]);
    setShuffledFirstFour([0, 1, 2, 3].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="container">
      {/* Background Text */}
      <div className="bg-text-container">
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i} 
            className="bg-text"
            animate={{ x: i % 2 === 0 ? [-30, 30] : [30, -30] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          >
            LỜI YÊU EM
          </motion.div>
        ))}
      </div>

      <div className="header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Bốc Bài Hello Kitty ❤️
        </motion.h1>
      </div>

      <div className="card-deck">
        {[0, 1, 2, 3, 4].map((i) => {
          const isRevealed = revealed[i] !== undefined;
          const msgIndex = revealed[i];

          return (
            <motion.div
              key={i}
              className="card-item"
              initial={{ 
                rotate: (i - 2) * 15, 
                x: (i - 2) * 45,
                y: Math.abs(i - 2) * 15
              }}
              animate={{ 
                rotate: isRevealed ? 0 : (i - 2) * 15,
                x: isRevealed ? 0 : (i - 2) * 45,
                y: isRevealed ? (msgIndex === 4 ? -50 : 0) : Math.abs(i - 2) * 15,
                scale: isRevealed ? 1.1 : 1,
                rotateY: isRevealed ? 180 : 0,
                zIndex: isRevealed ? 100 : i
              }}
              onClick={() => handleCardClick(i)}
              whileHover={!isRevealed ? { y: -20, scale: 1.05 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {/* Back Face */}
              <div className="card-face card-back" />
              
              {/* Front Face */}
              <div className="card-face card-front" style={msgIndex === 4 ? { background: '#fff0f3', border: '3px solid #ff85a2' } : {}}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                  {msgIndex === 4 ? <Stars color="#ff85a2" size={40} /> : <Heart size={30} color="#ff85a2" fill="#ff85a2" />}
                  <p className="card-front-text" style={msgIndex === 4 ? { fontSize: '1.1rem', fontWeight: '800', color: '#8b3d4a' } : {}}>
                    {messages[msgIndex]}
                  </p>
                  {msgIndex === 4 && <div style={{ fontSize: '0.8rem', marginTop: '10px', color: '#ff85a2' }}>Mãi yêu em!</div>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="instruction">
        {Object.keys(revealed).length < 5 
          ? `BỐC TIẾP LÁ THỨ ${Object.keys(revealed).length + 1}...` 
          : "CẢM ƠN EM VÌ ĐÃ ĐẾN BÊN ANH!"}
      </div>

      {Object.keys(revealed).length === 5 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="button-reset"
          onClick={reset}
        >
          <RotateCcw size={18} />
          BỐC LẠI TỪ ĐẦU
        </motion.button>
      )}

      {/* Floating Sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{ position: 'absolute', pointerEvents: 'none' }}
          initial={{ x: Math.random() * 400, y: 1000 }}
          animate={{ y: -100, opacity: [0, 0.5, 0] }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
        >
          <Heart size={10} fill="white" />
        </motion.div>
      ))}
    </div>
  );
};

export default App;

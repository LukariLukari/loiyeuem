import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';

const App = () => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [revealedIndices, setRevealedIndices] = useState({});
  const [shuffledFirstFour, setShuffledFirstFour] = useState([]);
  const [showFinal, setShowFinal] = useState(false);
  const [finalFlipped, setFinalFlipped] = useState(false);

  const messages = [
    "Em là điều tuyệt vời nhất anh từng gặp. ❤️",
    "Mỗi ngày bên em là một món quà. 🌸",
    "Anh yêu cách em cười, cách em nhìn anh. ✨",
    "Trái tim anh đã thuộc về em từ lâu rồi. 🌹",
    "LỜI CUỐI: Cưới anh nhé? Đùa thôi, nhưng anh yêu em mãi mãi! 💖"
  ];

  useEffect(() => {
    // Shuffle messages 0-3
    setShuffledFirstFour([0, 1, 2, 3].sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (index) => {
    if (revealedIndices[index] !== undefined) return;

    const msgIndex = shuffledFirstFour[revealedCount];
    setRevealedIndices(prev => ({ ...prev, [index]: msgIndex }));
    setRevealedCount(prev => prev + 1);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#ff85a2', '#ffffff']
    });
  };

  const handleFinalClick = () => {
    setFinalFlipped(true);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ffd700', '#ff85a2', '#ffffff']
    });
  };

  const reset = () => {
    setRevealedCount(0);
    setRevealedIndices({});
    setShowFinal(false);
    setFinalFlipped(false);
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
        <motion.h1>
          {showFinal ? "Điều Cuối Cùng ❤️" : "4 Lời Chúc Ngọt Ngào ✨"}
        </motion.h1>
      </div>

      <div className="card-deck" style={{ height: showFinal ? '400px' : '350px' }}>
        <AnimatePresence mode="wait">
          {!showFinal ? (
            <motion.div 
              key="deck"
              style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {[0, 1, 2, 3].map((i) => {
                const isRevealed = revealedIndices[i] !== undefined;
                return (
                  <motion.div
                    key={i}
                    className="card-item"
                    initial={{ rotate: (i - 1.5) * 20, x: (i - 1.5) * 50 }}
                    animate={{ 
                      rotate: isRevealed ? 0 : (i - 1.5) * 20,
                      x: isRevealed ? 0 : (i - 1.5) * 50,
                      rotateY: isRevealed ? 180 : 0,
                      zIndex: isRevealed ? 100 : i,
                      scale: isRevealed ? 1.1 : 1
                    }}
                    onClick={() => handleCardClick(i)}
                    whileHover={!isRevealed ? { y: -20 } : {}}
                  >
                    <div className="card-face card-back" />
                    <div className="card-face card-front">
                      <p className="card-front-text">{messages[revealedIndices[i]]}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="final-card"
              className="card-item"
              initial={{ scale: 0, rotate: 720 }}
              animate={{ scale: 1.3, rotate: 0, rotateY: finalFlipped ? 180 : 0 }}
              style={{ zIndex: 1000 }}
              onClick={handleFinalClick}
            >
              <div className="card-face card-back" style={{ border: '4px solid #ffd700' }} />
              <div className="card-face card-front" style={{ background: '#fff0f3' }}>
                <div style={{ padding: '10px' }}>
                  <Sparkles color="#ff85a2" size={32} style={{ marginBottom: '10px' }} />
                  <p className="card-front-text" style={{ fontSize: '1.2rem', fontWeight: '900', color: '#8b3d4a' }}>
                    {messages[4]}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="instruction" style={{ marginTop: '50px' }}>
        {!showFinal ? (
          revealedCount < 4 
            ? `BỐC LÁ THỨ ${revealedCount + 1}/4...` 
            : (
              <motion.button 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="button-reset"
                onClick={() => setShowFinal(true)}
                style={{ background: '#ff85a2', color: 'white' }}
              >
                XEM ĐIỀU CUỐI CÙNG <ArrowRight size={18} />
              </motion.button>
            )
        ) : (
          !finalFlipped ? "CHẠM ĐỂ MỞ LỜI CUỐI ❤️" : "MÃI YÊU EM!"
        )}
      </div>

      {finalFlipped && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="button-reset"
          onClick={reset}
          style={{ marginTop: '20px' }}
        >
          <RotateCcw size={18} /> BỐC LẠI NHÉ
        </motion.button>
      )}
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';

const App = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const cardMessages = [
    "Càng bên em, anh càng thấy mình là người may mắn nhất thế gian. ❤️",
    "Mọi con đường anh đi đều muốn có em sánh bước cùng. 🌸",
    "Em là lý do để mỗi sáng anh thức dậy với một nụ cười. ✨",
    "Trái tim anh chỉ có một ngăn, và nó đã dành trọn cho em rồi. 🌹",
    "Yêu em không chỉ là lời nói, mà là từng hơi thở của anh. 💖"
  ];

  const handleCardClick = (index) => {
    if (selectedCard !== null) return;
    
    setSelectedCard(index);
    setTimeout(() => {
      setIsFlipped(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff85a2', '#ffffff', '#8b3d4a', '#d4af37']
      });
    }, 600);
  };

  const reset = () => {
    setSelectedCard(null);
    setIsFlipped(false);
  };

  return (
    <div className="container">
      {/* Background Text Layer */}
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
        <AnimatePresence>
          {[0, 1, 2, 3, 4].map((i) => {
            const isThisSelected = selectedCard === i;
            const isAnySelected = selectedCard !== null;

            if (isAnySelected && !isThisSelected) return null;

            return (
              <motion.div
                key={i}
                className="card-item"
                layoutId={`card-${i}`}
                initial={{ 
                  rotate: (i - 2) * 12, 
                  x: (i - 2) * 35,
                  y: Math.abs(i - 2) * 10,
                  opacity: 0
                }}
                animate={{ 
                  rotate: isThisSelected ? 0 : (i - 2) * 12,
                  x: isThisSelected ? 0 : (i - 2) * 35,
                  y: isThisSelected ? 0 : Math.abs(i - 2) * 10,
                  scale: isThisSelected ? 1.3 : 1,
                  opacity: 1,
                  rotateY: isThisSelected && isFlipped ? 180 : 0
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => handleCardClick(i)}
                whileHover={!isAnySelected ? { y: -20, scale: 1.05 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                {/* Back Face - User's exact Hello Kitty image */}
                <div className="card-face card-back" />
                
                {/* Front Face - Message */}
                <div className="card-face card-front">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <Heart size={40} color="#ff85a2" fill="#ff85a2" />
                    <p className="card-front-text">
                      {cardMessages[i]}
                    </p>
                    <Sparkles color="#d4af37" size={24} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!selectedCard && (
        <motion.div 
          className="instruction"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          CHỌN MỘT LÁ BÀI...
        </motion.div>
      )}

      {isFlipped && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="button-reset"
          onClick={reset}
        >
          <RotateCcw size={18} />
          BỐC LẠI NHÉ
        </motion.button>
      )}

      {/* Floating Sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="sparkle"
          initial={{ 
            x: Math.random() * 400, 
            y: Math.random() * 800,
            scale: 0
          }}
          animate={{ 
            scale: [0, 1, 0],
            y: '-=100'
          }}
          transition={{ 
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          <Heart size={12} fill="white" opacity={0.2} />
        </motion.div>
      ))}
    </div>
  );
};

export default App;

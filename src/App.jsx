import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

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
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff85a2', '#ffffff', '#bc7c86']
      });
    }, 600);
  };

  const reset = () => {
    setSelectedCard(null);
    setIsFlipped(false);
  };

  return (
    <div className="container">
      {/* Background Text */}
      <div className="bg-text-container">
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i} 
            className="bg-text"
            animate={{ x: i % 2 === 0 ? [-50, 50] : [50, -50] }}
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
          Bốc Bài Tình Yêu ❤️
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
                  rotate: (i - 2) * 15, 
                  x: (i - 2) * 40,
                  y: Math.abs(i - 2) * 10,
                  opacity: 0
                }}
                animate={{ 
                  rotate: isThisSelected ? 0 : (i - 2) * 15,
                  x: isThisSelected ? 0 : (i - 2) * 40,
                  y: isThisSelected ? 0 : Math.abs(i - 2) * 10,
                  scale: isThisSelected ? 1.2 : 1,
                  opacity: 1,
                  rotateY: isThisSelected && isFlipped ? 180 : 0
                }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                onClick={() => handleCardClick(i)}
                whileHover={!isAnySelected ? { y: -20, transition: { duration: 0.2 } } : {}}
              >
                {/* Back Face */}
                <div className="card-face card-back" />
                
                {/* Front Face */}
                <div className="card-face card-front">
                  <div className="card-front-content">
                    <Heart size={48} color="#bc7c86" fill="#bc7c86" />
                    <p className="card-front-text">
                      {cardMessages[i]}
                    </p>
                    <Sparkles color="#ff85a2" />
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
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          CHỌN MỘT LÁ BÀI BẤT KỲ...
        </motion.div>
      )}

      {isFlipped && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="button-reset"
          onClick={reset}
        >
          <RotateCcw size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Bốc lại nhé
        </motion.button>
      )}

      {/* Floating Elements */}
      {[...Array(15)].map((_, i) => (
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
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          <Heart size={Math.random() * 10 + 10} fill="white" opacity={0.3} />
        </motion.div>
      ))}
    </div>
  );
};

export default App;

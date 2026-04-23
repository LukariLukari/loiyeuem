import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars, Sparkle } from 'lucide-react';

const App = () => {
  const [step, setStep] = useState('box'); // box, selection, message
  const [selectedKitty, setSelectedKitty] = useState(null);

  const messages = {
    1: "Em là món quà quý giá nhất mà cuộc đời đã dành tặng cho anh. ❤️",
    2: "Mỗi ngày bên em đều là một ngày hạnh phúc nhất của anh. Yêu em! 🌸"
  };

  const handleOpenBox = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff85a2', '#ffb7c5', '#ffca28']
    });
    setStep('selection');
  };

  const handleKittyClick = (id) => {
    setSelectedKitty(id);
    setStep('message');
  };

  return (
    <div className="container">
      {/* Background Scrolling Text */}
      <div className="bg-text-container">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-text"
            initial={{ x: i % 2 === 0 ? -100 : 100 }}
            animate={{ x: i % 2 === 0 ? 100 : -100 }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "linear" 
            }}
          >
            LỜI YÊU EM
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'box' && (
          <motion.div
            key="box"
            className="main-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            onClick={handleOpenBox}
          >
            <motion.h1 
              className="header-title"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Gửi Tặng Công Chúa ❤️
            </motion.h1>
            
            <div style={{ position: 'relative' }}>
              <motion.img 
                src="/main-element.png" 
                alt="Lovely TV" 
                className="central-img"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              
              {/* Floating bits */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{ position: 'absolute', top: `${20 * i}%`, left: `${i % 2 === 0 ? -10 : 90}%` }}
                  animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }}
                >
                  <Heart size={24} color="#ff85a2" fill="#ff85a2" opacity={0.6} />
                </motion.div>
              ))}
            </div>

            <motion.div className="action-hint">
              Chạm để mở quà... ✨
            </motion.div>
          </motion.div>
        )}

        {step === 'selection' && (
          <motion.div
            key="selection"
            className="selection-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#ff85a2', fontSize: '1.8rem' }}>Chọn Bé Kitty Của Em!</h2>
              <p style={{ opacity: 0.5 }}>Mỗi bé mang một lời chúc riêng...</p>
            </div>

            <div className="kitty-selection">
              <motion.div 
                className="kitty-card"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleKittyClick(1)}
              >
                <img src="/kitty1.png" alt="Kitty 1" className="kitty-img" />
                <span style={{ marginTop: '10px', color: '#ff85a2', fontWeight: 'bold' }}>Bé Classic</span>
              </motion.div>

              <motion.div 
                className="kitty-card"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleKittyClick(2)}
              >
                <img src="/kitty2.png" alt="Kitty 2" className="kitty-img" />
                <span style={{ marginTop: '10px', color: '#ff85a2', fontWeight: 'bold' }}>Bé Flower</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === 'message' && (
          <motion.div
            key="message"
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                <Stars color="#ffca28" fill="#ffca28" />
                <Heart color="#ff85a2" fill="#ff85a2" size={32} />
                <Stars color="#ffca28" fill="#ffca28" />
              </div>
              
              <p className="message-text">
                {messages[selectedKitty]}
              </p>

              <button className="close-btn" onClick={() => setStep('selection')}>
                Chọn lại nhé ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
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
            <Sparkle size={12} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default App;

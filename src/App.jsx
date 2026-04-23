import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

const App = () => {
  const [step, setStep] = useState('box'); // box, unboxing, selection, message
  const [selectedKitty, setSelectedKitty] = useState(null);

  const messages = {
    1: "Em là điều tuyệt vời nhất mà anh từng có. Yêu em rất nhiều! ❤️",
    2: "Cảm ơn em đã luôn ở bên cạnh anh. Thế giới của anh rực rỡ hơn khi có em! 🌸"
  };

  const handleOpenBox = () => {
    setStep('unboxing');
    setTimeout(() => {
      setStep('selection');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#ff9f43', '#feca57']
      });
    }, 2000);
  };

  const handleKittyClick = (id) => {
    setSelectedKitty(id);
    setStep('message');
  };

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {step === 'box' && (
          <motion.div
            key="box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ y: -500, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="blind-box-container"
            onClick={handleOpenBox}
          >
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#ff6b6b' }}>
              Bất ngờ cho công chúa của anh! ✨
            </h1>
            <motion.img 
              src="/box.png" 
              alt="Blind Box" 
              className="blind-box"
              animate={{ 
                rotate: [0, -2, 2, -2, 2, 0],
                y: [0, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', opacity: 0.7 }}>
              Chạm vào hộp để mở...
            </div>
          </motion.div>
        )}

        {step === 'unboxing' && (
          <motion.div
            key="unboxing"
            className="blind-box-container"
            initial={{ scale: 1 }}
          >
            <motion.img 
              src="/box.png" 
              alt="Blind Box" 
              className="blind-box"
              animate={{ y: -100, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div 
              className="seal-strip"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                XÉ SEAL <Sparkles size={16} />
              </div>
            </motion.div>
          </motion.div>
        )}

        {step === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="selection-screen"
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ color: '#ff6b6b', marginBottom: '10px' }}>Oaaa! Em chọn bé nào?</h2>
            <p style={{ opacity: 0.6, marginBottom: '30px' }}>Mỗi bé đều mang một thông điệp bí mật...</p>
            
            <div className="kitty-selection">
              <motion.div 
                className="kitty-card"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleKittyClick(1)}
              >
                <img src="/kitty1.png" alt="Hello Kitty 1" className="kitty-img" />
                <span style={{ marginTop: '10px', fontWeight: 'bold' }}>Bé Classic</span>
              </motion.div>

              <motion.div 
                className="kitty-card"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleKittyClick(2)}
              >
                <img src="/kitty2.png" alt="Hello Kitty 2" className="kitty-img" />
                <span style={{ marginTop: '10px', fontWeight: 'bold' }}>Bé Flower</span>
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
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div style={{ marginBottom: '20px' }}>
                <Heart size={48} color="#ff6b6b" fill="#ff6b6b" />
              </div>
              <p className="message-text">
                {messages[selectedKitty]}
              </p>
              <button 
                className="close-btn"
                onClick={() => setStep('selection')}
              >
                Quay lại chọn tiếp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background elements */}
      <div className="background-decor">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-heart"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: -100,
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Heart size={24} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default App;

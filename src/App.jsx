import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowDownCircle, RefreshCw } from 'lucide-react';

const App = () => {
  const [state, setState] = useState('machine'); // machine, pulling, selection, message
  const [selectedKitty, setSelectedKitty] = useState(null);

  const messages = {
    1: "Em là điều kỳ diệu nhất mà anh tìm thấy được trong 'chiếc máy' cuộc đời này. ❤️",
    2: "Gắp được em là chiến thắng lớn nhất của đời anh. Yêu em vô cùng! 🌸"
  };

  const handlePull = () => {
    if (state !== 'machine') return;
    
    setState('pulling');
    
    // Sequence: Shake -> Drop Capsule -> Show Selection
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8, x: 0.5 },
        colors: ['#ff85a2', '#ffd1dc', '#d4af37']
      });
      setState('selection');
    }, 2000);
  };

  const handleKittyClick = (id) => {
    setSelectedKitty(id);
    setState('message');
  };

  return (
    <div className="container">
      {/* Background Decor */}
      <div className="bg-text-container">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-text">LỜI YÊU EM</div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {state === 'machine' || state === 'pulling' ? (
          <motion.div 
            key="machine-view"
            className="gacha-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: state === 'pulling' ? [0, -5, 5, -5, 5, 0] : 0 
            }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: state === 'pulling' ? 0.5 : 0.3 }}
          >
            <div className="machine-header">
              <h1>Gacha Tình Yêu ✨</h1>
            </div>

            <div style={{ position: 'relative' }}>
              <img src="/gacha-machine.png" alt="Gacha Machine" className="machine-img" />
              
              {/* Lever Hitbox & Animation */}
              <motion.div 
                className="lever-hitbox"
                whileTap={{ scale: 0.9 }}
                onClick={handlePull}
                animate={{ 
                  y: state === 'pulling' ? [0, 40, 0] : 0 
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Capsule Drop Animation */}
              {state === 'pulling' && (
                <motion.div 
                  className="capsule"
                  initial={{ y: -50, x: 0, opacity: 0 }}
                  animate={{ 
                    y: [0, 100], 
                    x: [0, 20],
                    opacity: 1,
                    rotate: 360
                  }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "bounceOut" }}
                />
              )}
            </div>

            <motion.div 
              className="pull-hint"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDownCircle size={20} /> Gạt cần để nhận quà!
            </motion.div>
          </motion.div>
        ) : state === 'selection' ? (
          <motion.div 
            key="selection-view"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="selection-grid"
          >
            <div style={{ gridColumn: '1 / span 2', textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: '#ff85a2', fontFamily: 'Dancing Script', fontSize: '2.5rem' }}>Oaaa! Em chọn bé nào?</h2>
            </div>
            
            <motion.div 
              className="kitty-card-new"
              whileHover={{ y: -10 }}
              onClick={() => handleKittyClick(1)}
            >
              <img src="/kitty1.png" alt="Kitty 1" className="kitty-img-large" />
              <span style={{ fontWeight: 'bold', color: '#ff85a2' }}>Bé Classic</span>
            </motion.div>

            <motion.div 
              className="kitty-card-new"
              whileHover={{ y: -10 }}
              onClick={() => handleKittyClick(2)}
            >
              <img src="/kitty2.png" alt="Kitty 2" className="kitty-img-large" />
              <span style={{ fontWeight: 'bold', color: '#ff85a2' }}>Bé Flower</span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="message-view"
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="love-modal"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)' }}>
                <div style={{ background: 'white', padding: '15px', borderRadius: '50%', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                  <Heart size={40} color="#ff85a2" fill="#ff85a2" />
                </div>
              </div>

              <p className="love-message">
                {messages[selectedKitty]}
              </p>

              <button 
                className="close-btn"
                onClick={() => setState('machine')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}
              >
                <RefreshCw size={18} /> Chơi lại lần nữa nhé
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{ 
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            pointerEvents: 'none',
            zIndex: 1
          }}
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2
          }}
        >
          <Heart size={20} color="#ff85a2" fill="#ff85a2" />
        </motion.div>
      ))}
    </div>
  );
};

export default App;

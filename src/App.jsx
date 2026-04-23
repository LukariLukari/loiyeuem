import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, MousePointer2, RefreshCw, Star } from 'lucide-react';

const App = () => {
  const [phase, setPhase] = useState('start'); // start, pulling, capsule, choice, result
  const [selected, setSelected] = useState(null);

  const data = {
    1: "Bé Classic: 'Em là mảnh ghép hoàn hảo nhất trong trái tim anh.' ❤️",
    2: "Bé Flower: 'Cảm ơn em đã rực rỡ như một đóa hoa trong đời anh.' 🌸"
  };

  const onPull = () => {
    if (phase !== 'start') return;
    
    setPhase('pulling');
    
    // Shake and Lever motion
    setTimeout(() => {
      setPhase('capsule');
    }, 1000);

    // Show selection after capsule "rolls out"
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.7 }
      });
      setPhase('choice');
    }, 2500);
  };

  return (
    <div className="container">
      {/* Background Text Layer */}
      <div className="bg-text-container">
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i} 
            className="bg-text"
            animate={{ x: i % 2 === 0 ? [-50, 50] : [50, -50] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          >
            LỜI YÊU EM
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {(phase === 'start' || phase === 'pulling' || phase === 'capsule') && (
          <motion.div 
            key="gacha-view"
            className="gacha-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: phase === 'pulling' ? [-2, 2, -2, 2, 0] : 0,
              y: phase === 'pulling' ? [-1, 1, -1, 1, 0] : 0
            }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          >
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <motion.h1 
                style={{ fontFamily: 'Dancing Script', color: '#ff85a2', fontSize: '2.5rem' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Gacha Tình Yêu ✨
              </motion.h1>
            </div>

            <div className="machine-body">
              <img src="/gacha-machine.png" alt="Machine" className="machine-img" />
              
              {/* INTERACTIVE LEVER */}
              <motion.div 
                className="lever-visual"
                onClick={onPull}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, y: 20 }}
                animate={{ 
                  y: phase === 'pulling' ? [0, 30, 0] : 0,
                  boxShadow: phase === 'start' ? ["0 0 10px rgba(212,175,55,0.4)", "0 0 30px rgba(212,175,55,0.8)", "0 0 10px rgba(212,175,55,0.4)"] : "0 0 10px rgba(212,175,55,0.4)"
                }}
                transition={{ duration: phase === 'pulling' ? 0.5 : 1.5, repeat: phase === 'start' ? Infinity : 0 }}
              >
                <div className="lever-handle" />
                {phase === 'start' && (
                  <div className="click-indicator">
                    <MousePointer2 size={32} />
                  </div>
                )}
              </motion.div>

              {/* CAPSULE DROP */}
              {phase === 'capsule' && (
                <motion.div 
                  className="capsule-out"
                  initial={{ y: -60, x: 20, opacity: 0 }}
                  animate={{ 
                    y: [0, 80],
                    x: [20, 50],
                    opacity: 1,
                    rotate: 720
                  }}
                  transition={{ duration: 1, ease: "bounceOut" }}
                />
              )}
            </div>

            <div style={{ marginTop: '40px', color: '#ff85a2', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Star fill="#ff85a2" size={16} /> GẠT CẦN ĐỂ NHẬN QUÀ <Star fill="#ff85a2" size={16} />
            </div>
          </motion.div>
        )}

        {phase === 'choice' && (
          <motion.div 
            key="choice-view"
            className="selection-view"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 style={{ fontFamily: 'Dancing Script', fontSize: '2.5rem', color: '#ff85a2' }}>Chọn quà của em!</h2>
            <div className="kitty-grid">
              <motion.div 
                className="kitty-card-premium"
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSelected(1); setPhase('result'); }}
              >
                <img src="/kitty1.png" alt="K1" style={{ width: '80px' }} />
                <p style={{ marginTop: '10px', color: '#ff85a2', fontWeight: 'bold' }}>Bé Classic</p>
              </motion.div>
              <motion.div 
                className="kitty-card-premium"
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSelected(2); setPhase('result'); }}
              >
                <img src="/kitty2.png" alt="K2" style={{ width: '80px' }} />
                <p style={{ marginTop: '10px', color: '#ff85a2', fontWeight: 'bold' }}>Bé Flower</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div 
            key="result-view"
            className="modal-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="message-box">
              <Heart size={64} color="#ff85a2" fill="#ff85a2" style={{ margin: '0 auto' }} />
              <p className="message-text-big">{data[selected]}</p>
              <button 
                onClick={() => setPhase('start')}
                style={{ 
                  background: '#ff85a2', color: 'white', border: 'none', 
                  padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold',
                  display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto'
                }}
              >
                <RefreshCw size={18} /> Chơi lại lần nữa nhé
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';

const App = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const cardMessages = [
    "Em nhỏ ơi, đã 2 sinh nhật của em trôi qua rùi, anh chưa từng nghĩ anh có thể đi with một ai lâu đến thế. Mọi thứ đến with anh thật nhanh, ngay khi anh chưa quá hoàn thiện để trở thành một người yêu hoàn hảo, anh có những vấn đề, những sự vụn về khi yêu em, cảm ơn em đã đến bên anh, yêu thương anh, quan tâm anh như một gia đình mà chẳng đòi hỏi bất cứ điều gì, điều tuyệt vời nhất trên đời là sự đồng hành, em đã cho anh điều tưởng chừng nhỏ bé ấy nhưng nó thật sự rất lớn lao và khó có ai làm được.",
    "Thật sự nhưng gì em trao cho anh, em cứ nghĩ phải đong đếm bằng tiền bạc hay vật chất thì hong phải đâu. Những lúc cảm xúc của em biến sắc khi thấy anh đau, anh có chuyện, hay lúc em giật mình vì call mà anh đang lái xe, lời quan tâm, yêu thương sợ anh bị này bị kia, lời động viên, khen ngợi, những cái mếu, cái hun bòa qua cam, những lúc em khóc nhè mè nheo with anh và vô vàn điều khác những, chúng mới là những điều đáng quý. Bộ one piece sẽ rất tầm thường nếu anh đi mua nhưng khi em mua, em chăm chút, lựa từng cuốn 1 cho anh đấy mới là dáng vẻ đáng trân trọng nhất của em.",
    "Em bé của anh là cô bé giỏi giang nhất trên đời này, chẳng có ai so sánh được with em cả, em nghị lực trong chính môi trường của mình, em có vấn đề gì em luôn tự mình đứng dậy hoặc khóc nhè with anh rồi nỗ lực vượt qua nó, chứ không nằm 1 chỗ mà than thân trách phận đấy mới là cái mà một con người thành công cần có babi ạ",
    "Anh thương em",
    "Anh nhớ em nhiều lắm, anh ở đâu anh cũng nhớ tới em hức, mấy hôm em bận em stress anh vừa xót lại vừa nhớ em, anh thấy mình bình yên thế thui chứ không có em anh không chịu được mất, anh viết dòng này mà mắt anh rơm rớm luôn, anh thương nhớ em quá đi mất, ôm em thơm quá, xinh yêu nằm gọn trong lòng anh anh nhớ em quá huhuhuhuuhhu"
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
                  scale: isThisSelected ? (isFlipped ? 1.4 : 1.2) : 1,
                  opacity: 1,
                  rotateY: isThisSelected && isFlipped ? 180 : 0,
                  zIndex: isThisSelected ? 100 : 10,
                  position: isThisSelected && isFlipped ? 'fixed' : 'absolute',
                  top: isThisSelected && isFlipped ? '50%' : 'auto',
                  left: isThisSelected && isFlipped ? '50%' : 'auto',
                  // Using translate via transform handled by framer-motion's x/y
                  marginTop: isThisSelected && isFlipped ? '-160px' : '0', // Half of height
                  marginLeft: isThisSelected && isFlipped ? '-100px' : '0', // Half of width
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => handleCardClick(i)}
                whileHover={!isAnySelected ? { y: -20, scale: 1.05 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <div className="card-face card-back" />
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
        <motion.div
          className="bottom-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="button-reset" onClick={reset}>
            <RotateCcw size={18} />
            BỐC LẠI NHÉ
          </button>
        </motion.div>
      )}

      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="sparkle"
          initial={{ x: Math.random() * 400, y: Math.random() * 800, scale: 0 }}
          animate={{ scale: [0, 1, 0], y: '-=100' }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
        >
          <Heart size={12} fill="white" opacity={0.2} />
        </motion.div>
      ))}
    </div>
  );
};

export default App;

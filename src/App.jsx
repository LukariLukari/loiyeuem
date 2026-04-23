import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';

const App = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const cardMessages = [
    "Em nhỏ ơi, đã 2 sinh nhật của em trôi qua rùi, anh chưa từng nghĩ anh có thể đi with một ai lâu đến thế. Mọi thứ đến with anh thật nhanh, ngay khi anh chưa quá hoàn thiện để trở thành một người yêu hoàn hảo, anh có những vấn đề, những sự vụn về khi yêu em, cảm ơn em đã đến bên anh, yêu thương anh, quan tâm anh như một gia đình mà chẳng đòi hỏi bất cứ điều gì, điều tuyệt vời nhất trên đời là sự đồng hành, em đã cho anh điều tưởng chừng nhỏ bé ấy nhưng nó thật sự rất lớn lao và khó có ai làm được.",
    "Thật sự nhưng gì em trao cho anh, em cứ nghĩ phải đong đếm bằng tiền bạc hay vật chất thì hong phải đâu. Những lúc cảm xúc của em biến sắc khi thấy anh đau, anh có chuyện, hay lúc em giật mình vì call mà anh đang lái xe, lời quan tâm, yêu thương sợ anh bị này bị kia, lời động viên, khen ngợi, những cái mếu, cái hun bòa qua cam, những lúc em khóc nhè mè nheo with anh và vô vàn điều khác những, chúng mới là những điều đáng quý. Bộ one piece sẽ rất tầm thường nếu anh đi mua nhưng khi em mua, em chăm chút, lựa từng cuốn 1 cho anh đấy mới là dáng vẻ đáng trân trọng nhất của em.",
    "Em bé của anh là cô bé giỏi giang nhất trên đời này, chẳng có ai so sánh được with em cả, em nghị lực trong chính môi trường của mình, em có vấn đề gì em luôn tự mình đứng dậy hoặc khóc nhè with anh rồi nỗ lực vượt qua nó, chứ không nằm 1 chỗ mà than thân trách phận đấy mới là cái mà một con người thành công cần có babi ạ",
    "Sinh nhật ẻm năm 22 tuổi sẽ hông có quá nhiều điều khác biệt, không có điều gì quá to tát, vẫn là anh, vẫn là những người yêu thương em, anh manifest cho sự xinh đẹp luôn ngự trị lên nụ cười rạng rỡ của em, mái tóc dài thướt tha kia vẫn luôn là điều khiến em tự hào, mông căng, ngực nở, eo thon, má em bé, đi hăm vấp té, tiền nhiều khổng lồ, mua được đồ cho mẹ, cho anh cho bất kì ai mà em yêu thương mà không phải nhìn giá. Và em sẽ luôn hạnh phúc cùng với anh. ",
    "Anh nhớ em nhiều lắm, anh ở đâu anh cũng nhớ tới em hức, mấy hôm em bận em stress anh vừa xót lại vừa nhớ em, anh thấy mình bình yên thế thui chứ không có em anh không chịu được mất, anh viết dòng này mà mắt anh rơm rớm luôn, anh thương nhớ em quá đi mất, ôm em thơm quá, xinh yêu nằm gọn trong lòng anh anh nhớ em quá huhuhuhuuhhu"
  ];

  const handleCardClick = (index) => {
    if (selectedCard !== null) return;

    setSelectedCard(index);

    // Confetti effect
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff85a2', '#ffffff', '#8b3d4a']
    });

    // Show result after a short delay
    setTimeout(() => {
      setShowResult(true);
    }, 600);
  };

  const reset = () => {
    setSelectedCard(null);
    setShowResult(false);
  };

  return (
    <div id="root">
      {/* Background Decorative Layer */}
      <div className="bg-layer">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-text-line"
            animate={{ x: i % 2 === 0 ? [-100, 100] : [100, -100] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          >
            LỜI YÊU EM LỜI YÊU EM LỜI YÊU EM
          </motion.div>
        ))}
      </div>

      <div className="container">
        <header className="header">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Mỗi lá bài chất chứa lời nói từ trái tim anh
          </motion.h1>
        </header>

        <main className="card-deck">
          <AnimatePresence>
            {!showResult && [0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="card-item"
                initial={{
                  rotate: (i - 2) * 12,
                  x: (i - 2) * 25,
                  y: Math.abs(i - 2) * 10,
                  opacity: 0
                }}
                animate={{
                  rotate: selectedCard === i ? 0 : (i - 2) * 12,
                  x: selectedCard === i ? 0 : (i - 2) * 25,
                  y: selectedCard === i ? -40 : Math.abs(i - 2) * 10,
                  opacity: selectedCard === null || selectedCard === i ? 1 : 0,
                  scale: selectedCard === i ? 1.1 : 1
                }}
                exit={{ opacity: 0, scale: 0.5, y: -100 }}
                onClick={() => handleCardClick(i)}
                whileHover={selectedCard === null ? { y: -15, scale: 1.05 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <div className="card-face" />
              </motion.div>
            ))}
          </AnimatePresence>
        </main>

        {!selectedCard && (
          <motion.footer
            className="instruction"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            CHỌN MỘT LÁ BÀI...
          </motion.footer>
        )}
      </div>

      {/* Full Screen Result Overlay */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                <Heart size={28} color="#ff85a2" fill="#ff85a2" />
              </div>

              <div className="message-scroll">
                {cardMessages[selectedCard]}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Sparkles color="#d4af37" size={20} />
              </div>
            </motion.div>

            {/* Global Reset Button - Outside the card */}
            <motion.div
              className="reset-btn-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button className="btn-reset" onClick={reset}>
                <RotateCcw size={20} />
                BỐC TIẾP NHÉ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="sparkle"
          initial={{ x: Math.random() * 500, y: Math.random() * 900, scale: 0 }}
          animate={{ scale: [0, 1, 0], y: '-=100' }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
        >
          <Heart size={10} fill="white" opacity={0.1} />
        </motion.div>
      ))}
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import './App.css'; // เพิ่มเพื่อใช้สไตล์จากไฟล์ CSS

export default function App() {
  const [size, setSize] = useState(100);
  const [imageSrc, setImageSrc] = useState('Nong-Moo-Deng.jpeg');
  const [isFull, setIsFull] = useState(false);
  const [effectText, setEffectText] = useState('');
  const [effectPosition, setEffectPosition] = useState({ x: 0, y: 0 });

  const feedMooDang = (increment, event) => {
    if (isFull) return;

    const newSize = size + increment;
    setSize(newSize);
    setEffectText(`+${increment}`);
    setEffectPosition({ x: event.clientX, y: event.clientY });

    setTimeout(() => {
      setEffectText('');
    }, 1000);

    if (newSize >= 500) {
      setImageSrc('Bigmoodang.jpeg');
      setIsFull(true);
    }
  };

  const resetMooDang = () => {
    setSize(100);
    setImageSrc('Nong-Moo-Deng.jpeg');
    setIsFull(false);
  };

  return (
    <div className="container">
      <h1>มาให้อาหารหมูเด้งกันเถอะ</h1>

      {/* หมูเด้ง */}
      <img 
        src={`/Picture/${imageSrc}`} 
        className={`moodang-image ${isFull ? 'full' : ''}`}
        style={{ width: `${size}px`, height: `${size}px` }} 
        alt="หมูเด้ง"
      />

      {/* อาหารต่าง ๆ */}
      <div className="food-container">
        <img 
          src="/Picture/melon.jpeg" 
          alt="แตงโม" 
          className="smallimg" 
          onClick={(e) => feedMooDang(5, e)} 
        />
        <img 
          src="/Picture/pumpkin.jpeg" 
          alt="ฟักทอง" 
          className="smallimg" 
          onClick={(e) => feedMooDang(10, e)} 
        />
        <img 
          src="/Picture/banana.jpeg" 
          alt="กล้วย" 
          className="smallimg" 
          onClick={(e) => feedMooDang(15, e)} 
        />
      </div>

      {/* ปุ่มรีเซ็ต */}
      <button onClick={resetMooDang} className="reset-button">
        Reset
      </button>

      {/* เอฟเฟกต์ข้อความเมื่อกดอาหาร */}
      {effectText && (
        <div 
          className="effect-text"
          style={{ top: effectPosition.y, left: effectPosition.x }}
        >
          {effectText}
        </div>
      )}
    </div>
  );
}
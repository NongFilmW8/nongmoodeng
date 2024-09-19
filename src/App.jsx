import React, { useState } from 'react';
import './App.css'; // เพิ่มเพื่อใช้สไตล์จากไฟล์ CSS

export default function App() {
  const [size, setSize] = useState(100);
  const [imageSrc, setImageSrc] = useState('Nong-Moo-Deng.jpeg');
  const [isFull, setIsFull] = useState(false);
  const [effectText, setEffectText] = useState(''); // state สำหรับเก็บข้อความเอฟเฟกต์
  const [effectPosition, setEffectPosition] = useState({ x: 0, y: 0 }); // ตำแหน่งของเอฟเฟกต์

  // ฟังก์ชันที่ใช้เพิ่มขนาดของหมูเด้งเมื่อคลิกที่ภาพอาหาร
  const feedMooDang = (increment, event) => {
    if (isFull) return;

    const newSize = size + increment;
    setSize(newSize);

    // แสดงเอฟเฟกต์ "+5", "+10", "+15" ตามค่า increment
    setEffectText(`+${increment}`);
    // ตำแหน่งที่จะแสดงข้อความเอฟเฟกต์ (ตามตำแหน่งคลิก)
    setEffectPosition({ x: event.clientX, y: event.clientY });

    // ลบข้อความเอฟเฟกต์หลังจาก 1 วินาที
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
        src={`./src/Picture/${imageSrc}`}  
        className={`moodang-image ${isFull ? 'full' : ''}`}
        style={{ width: `${size}px`, height: `${size}px` }} 
        alt="หมูเด้ง"
      />

      {/* อาหารต่าง ๆ */}
      <div className="food-container">
        <img 
          src="./src/Picture/melon.jpeg" 
          alt="แตงโม" 
          className="smallimg" 
          onClick={(e) => feedMooDang(5, e)} // แตงโมเพิ่มขนาด 5 และส่งตำแหน่งคลิก
        />
        <img 
          src="./src/Picture/pumpkin.jpeg" 
          alt="ฟักทอง" 
          className="smallimg" 
          onClick={(e) => feedMooDang(10, e)} // ฟักทองเพิ่มขนาด 10
        />
        <img 
          src="./src/Picture/banana.jpeg" 
          alt="กล้วย" 
          className="smallimg" 
          onClick={(e) => feedMooDang(15, e)} // กล้วยเพิ่มขนาด 15
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
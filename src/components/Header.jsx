import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import style from './Header.module.css';

const Header = ({ currentPage }) => {
  const [isHovered, setIsHovered] = useState(false); // 헤더 배경색을 하얗게 할지 여부
  const [isNavHovered, setIsNavHovered] = useState(false); // Navigation에 마우스가 올렸는지 여부

  const getHeaderColor = () => {
    if (isHovered || isNavHovered) {
      return 'white'; // 마우스를 올렸을 때 헤더 배경색을 하얗게
    }
    switch (currentPage) {
      case 0:
        return 'transparent';
      case 1:
        return 'white';
      case 2:
        return 'transparent';
      case 3:
        return 'white';
      default:
        return 'transparent';
    }
  };

  const getFontColor = () => {
    if (isHovered) {
      return 'black'; // 배경이 하얗게 될 때 네비게이션 글씨 색을 검정색으로 변경
    }
    switch (currentPage) {
      case 0:
        return 'white';
      case 1:
        return 'black';
      case 2:
        return 'white';
      case 3:
        return 'black';
      default:
        return 'white';
    }
  };

  // 로고 이미지 경로 결정
  const getLogoSrc = () => {
    if (isHovered) {
      return './img/logo_black.png'; // 마우스를 올렸을 때 검은색 로고로 변경
    }
    return currentPage % 2 === 0
      ? './img/logo_white.png'
      : './img/logo_black.png';
  };

  return (
    <div
      className={`${style.Header}`}
      style={{
        background: getHeaderColor(),
        paddingBottom: isNavHovered ? '100px' : '0', // Navigation에 마우스를 올렸을 때 padding-bottom을 200px로 변경
        transition: '0.7s',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      
      <div
        onMouseEnter={() => {
          setIsNavHovered(true);
        }}
        onMouseLeave={() => {
          setIsNavHovered(false);
        }}
      >
        <Navigation fontColor={getFontColor()} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default Header;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import style from './Navigation.module.css';

function Navigation({
  isLogined,
  setIsLogined,
  onMouseEnter,
  onMouseLeave,
  isHovered,
}) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(''); //아이디 입력란 처음공백
  const [pass, setPass] = useState(''); //이메일 입력란 처음공백
  const [headerLogined, setHeaderLogined] = useState(false);

  // 드롭다운 메뉴 토글
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('realname')) {
      setHeaderLogined(true);
    }
  }, []);

  async function fn_login() {
    const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;

    if (!userName.trim()) {
      alert('아이디가 공백입니다.');
      return;
    }
    if (!pass.trim()) {
      alert('비밀번호가 공백입니다.');
      return;
    }
    if (regExp.test(userName)) {
      alert('아이디에 한글을 입력하실 수 없습니다.');
      return;
    }

    try {
      const result = await axios.post('http://localhost:8080/kokee/login', {
        userName: userName,
        password: pass,
      });

      console.log(result);
      if (result.status === 200) {
        setIsLogined(!isLogined);
        setHeaderLogined(!headerLogined);
        document.querySelector('.sec_modal').classList.remove('active');
        localStorage.setItem('userName', userName);
        localStorage.setItem('realname', result.data.name);
        localStorage.setItem('email', result.data.email);
        alert(`${localStorage.getItem('realname')}님 환영합니다!`);
        navigate('/');
        console.log('userName:', localStorage.getItem('userName'));
        console.log('realname:', localStorage.getItem('realname'));
        console.log('email:', localStorage.getItem('email'));
      }
    } catch (error) {
      alert('아이디과 비밀번호를 확인해보세요');
    }
  }

  function logoutFunction() {
    alert(
      `로그아웃 합니다. ${localStorage.getItem('realname')}님 안녕히 가세요.`
    );
    localStorage.clear();
    setIsLogined(!isLogined);
    navigate('/');
    window.location.reload();
  }

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // 드롭다운 메뉴 활성화
  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  // 드롭다운 메뉴 비활성화
  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  // 모달 열기/닫기 상태
  const [isModalOpen, setModalOpen] = useState(false);

  // 회원가입 이동
  const toForm = () => {
    setModalOpen(false);
    navigate('/form');
  };

  return (
    <div
      className={`${style.Navigation} ${isHovered ? style.hovered : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {' '}
      <div
        className={style.dropdown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* KOKEE STORY 메뉴 */}
        <div>
          KOKEE STORY
          {isDropdownVisible && (
            <div className={`${style.submenu}`}>
              <Link to="/listpage">Brand</Link>
            </div>
          )}
        </div>

        {/* MENU 메뉴 */}
        <div>
          MENU
          {isDropdownVisible && (
            <div>
              <Link to="./productlist">Drink</Link>
            </div>
          )}
        </div>

        {/* STORE 메뉴 */}
        <div>
          STORE
          {isDropdownVisible && (
            <div>
              <Link to="./waytocome">The way to find</Link>
            </div>
          )}
        </div>

        {/* AFFILIATED 메뉴 */}
        <div>
          AFFILIATED
          {isDropdownVisible && (
            <div>
              <Link to="/FranchiseInquiryPage">Inquire</Link>
            </div>
          )}
        </div>

        {/* SUPPORT 메뉴 */}
        <div>
          SUPPORT
          {isDropdownVisible && (
            <div>
              <Link to="./faq">FAQ</Link>
              <Link to="./VoiceOfCustomer">1:1 Inquire</Link>
            </div>
          )}
        </div>
      </div>
      <div className="inner">
        <ul className={`${style.header_top}`}>
          {headerLogined ? (
            <li onClick={logoutFunction}>
              <Link to="#">{localStorage.getItem('realname')}님 LOGOUT |</Link>
            </li>
          ) : (
            <li>
              <Link onClick={toggleModal}>LOGIN&nbsp;&nbsp;&nbsp;&nbsp;|</Link>
            </li>
          )}
          {!headerLogined && (
            <li>
              <Link to="/form">JOIN</Link>
            </li>
          )}
          {headerLogined && (
            <li>
              <Link to="/mypage">MY PAGE</Link>
            </li>
          )}
          <li>
            <Link>
              <img
                src="./images/facebook.png"
                alt="logo"
                className={`${style.sns}`}
              />
            </Link>
          </li>
          <li>
            <Link>
              <img
                src="./images/insta.png"
                alt="logo"
                className={`${style.sns}`}
              />
            </Link>
          </li>
          <li>
            <Link>
              <img
                src="./images/yutube.png"
                alt="logo"
                className={`${style.sns} ${style.youtube_icon}`}
              />
            </Link>
          </li>
        </ul>
      </div>
      {isModalOpen && (
        <div className={style.sec_modal}>
          <div className="modal_login">
            <h2>로그인</h2>
            <input
              type="text"
              placeholder="아이디"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fn_login()}
            />
            <label className="checkbox_wrap">
              <input type="checkbox" />
              <p>로그인 상태 유지</p>
            </label>
            <button type="button" onClick={fn_login}>
              로그인
            </button>
            <div className="join" onClick={toForm}>
              회원가입
            </div>
            <div className="modal_close" onClick={toggleModal}>
              <i className="fa-regular fa-x" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;

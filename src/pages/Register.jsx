import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.css';

const Form = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userPwCheck, setUserPwCheck] = useState('');
  const [userName, setUserName] = useState('');
  const [phone02, setPhone02] = useState('');
  const [phone03, setPhone03] = useState('');
  const [email01, setEmail01] = useState('');
  const [email02, setEmail02] = useState('');
  const [agree1, setAgree1] = useState(false); // 이용약관 동의
  const [agree2, setAgree2] = useState(false); // 개인정보 처리방침 동의
  const [validId, setValidId] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [modalContent, setModalContent] = useState(''); // 모달에 표시할 내용
  const navigate = useNavigate();

  // 모달 열기 함수
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onChangeUserId = (e) => {
    const userIdRegex = /^[a-zA-Z0-9]{4,16}$/;
    if (!e.target.value || userIdRegex.test(e.target.value)) {
      setValidId(false);
    } else {
      setValidId(true);
    }
    setUserId(e.target.value);
  };

  const onChangeUserPw = (e) => {
    const userPwRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+{}|:"<>?]).{8,16}$/;
    if (!e.target.value || userPwRegex.test(e.target.value)) {
      setValidPw(false);
    } else {
      setValidPw(true);
    }
    setUserPw(e.target.value);
  };

  const onJoin = (event) => {
    event.preventDefault();
    if (
      userId === '' ||
      userPw === '' ||
      userPwCheck === '' ||
      userName === '' ||
      phone02 === '' ||
      phone03 === '' ||
      email01 === '' ||
      email02 === ''
    ) {
      alert('필수 항목은 빈칸이 없게 모두 입력해 주세요.');
    } else if (userPw !== userPwCheck) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (!agree1 || !agree2) {
      alert('필수 항목에 동의해 주세요.');
    } else if (validId || validPw) {
      alert(
        '사용할 수 없는 아이디 혹은 비밀번호 입니다. \n양식에 맞게 다시 작성해주세요.'
      );
    } else {
      axios
        .post('http://localhost:8080/kokee/join', {
          userId: userId,
          userPw: userPw,
          userPwCheck: userPwCheck,
          userName: userName,
          phone02: phone02,
          phone03: phone03,
          email01: email01,
          email02: email02,
          role: 'user',
        })
        .then((res) => {
          console.log(res);
          if (res.data === 'success') {
            alert('회원가입을 환영합니다. 메인페이지로 이동합니다.');
            navigate('/');
          }
        })
        .catch((err) => {
          if (err.response.data === 'failed') {
            alert(
              `입력하신 아이디와 이메일은 이미 가입된 회원 입니다.\n다른 내용으로 가입해주세요.`
            );
          } else {
            alert('알수 없는 에러가 발생했습니다. 관리자에게 문의하세요.');
          }
        });
    }
  };

  // 이용약관 및 개인정보 처리방침 내용
  const termsContent = `
  제1조(목적) 이 약관은 (주)코키티 회사(전자거래 사업자)가 운영하는 (주)코키티 사이버 몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 사이버몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다. ※ 「PC통신등을 이용하는 전자거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다」 제2조(정의) ① "몰"이란 (주)코키티 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다. ② "이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다. ③ '회원’이라 함은 "몰"에 개인정보를 제공하여 회원등록을 한 자로서, "몰"의 정보를 지속적으로 제공받으며, "몰"이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다. ④ '비회원’이라 함은 회원에 가입하지 않고 "몰"이 제공하는 서비스를 이용하는 자를 말합니다. 제3조(약관등의 명시와 설명 및 개정) ① "몰"은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호·모사전송번호·전자우편주소, 사업자등록번호, 통신판매업신고번호, 개인정보관리책임자등을 이용자가 쉽게 알 수 있도록 "몰"의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다. ② "몰"은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회·배송책임·환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다. ③ "몰"은 전자상거래등에서의소비자보호에관한법률, 약관의규제에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에관한법률, 방문판매등에관한법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다. ④ "몰"이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 "몰“은 개정전 내용과 개정후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. ⑤ "몰"이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간내에 "몰"에 송신하여 "몰"의 동의를 받은 경우에는 개정약관 조항이 적용됩니다. ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자보호지침 및 관계법령 또는 상관례에 따릅니다.
  `;

  const privacyContent = `
  1. 총칙 (주)코키티는 이용자들의 개인정보보호를 매우 중요시하며, 이용자가 회사의 서비스를 이용함과 동시에 온라인상에서 회사에 제공한 개인정보가 보호 받을 수 있도록 최선을 다하고 있습니다. 이에 (주)코키티는 통신비밀보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 정보통신서비스제공자가 준수하여야 할 관련 법규상의 개인정보보호 규정 및 정보통신부가 제정한 개인정보보호지침을 준수하고 있습니다. (주)코키티는 개인정보 취급방침을 통하여 이용자들이 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려 드립니다. (주)코키티의 개인정보 취급방침은 정부의 법률 및 지침 변경이나 (주)코키티의 내부 방침 변경 등으로 인하여 수시로 변경될 수 있고, 이에 따른 개인정보 취급방침의 지속적인 개선을 위하여 필요한 절차를 정하고 있습니다. 그리고 개인정보 취급방침을 개정하는 경우나 개인정보 취급방침 변경될 경우 쇼핑몰의 첫 페이지의 개인정보취급방침을 통해 고지하고 있습니다. 이용자들께서는 사이트 방문 시 수시로 확인하시기 바랍니다. 2. 개인정보 수집에 대한 동의 (주)코키티은 귀하께서 (주)코키티의 개인정보보호방침 또는 이용약관의 내용에 대해 「동의합니다」버튼 또는 「동의하지 않습니다」버튼을 클릭할 수 있는 절차를 마련하여, 「동의합니다」버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다.

  `;

  return (
    <>
      <div className={style.joinForm}>
        <h2>회원가입</h2>
        <div className={style.required}>
          <span className={style.start}>* </span> 표시는 필수 입력 사항입니다.
        </div>
        <p className={style.requiredItems}></p>
        <p className={style.itemTitle1}>로그인 정보</p>
        <form id="frm">
          <div className={style.formSection}>
            <div className={style.formRow}>
              <div className={style.frmTitle}>
                <span className={`${style.redStar} ${style.default_size}`}>
                  아이디
                </span>
              </div>
              <div className={`${style.formInput} ${style.error_display}`}>
                <input
                  type="text"
                  name="userId"
                  onChange={onChangeUserId}
                  value={userId}
                />
                {validId && (
                  <span className={style.errorMessage}>
                    아이디는 특수 문자를 제외하고, 영문과 숫자를 이용한 4~16자만
                    가능합니다.
                  </span>
                )}
              </div>
            </div>
            <div className={style.formRow}>
              <div className={style.frmTitle}>
                <span className={`${style.redStar} ${style.default_size}`}>
                  비밀번호
                </span>
              </div>
              <div className={`${style.formInput} ${style.error_display}`}>
                <input
                  type="password"
                  name="userPw"
                  onChange={onChangeUserPw}
                  value={userPw}
                />
                {validPw && (
                  <span className={style.errorMessage}>
                    비밀번호는 특수 문자를 포함한, 영문과 숫자를 이용한 8~16자만
                    가능합니다.
                  </span>
                )}
              </div>
            </div>
            <div className={style.formRow}>
              <div className={`${style.frmTitle} ${style.default_size}`}>
                비밀번호 확인
              </div>
              <div className={style.formInput}>
                <input
                  type="password"
                  name="userPwCheck"
                  onChange={(e) => setUserPwCheck(e.target.value)}
                  value={userPwCheck}
                />
              </div>
            </div>
            <div className={style.formRow}>
              <div className={style.frmTitle}>
                <span className={`${style.redStar} ${style.default_size}`}>
                  이름
                </span>
              </div>
              <div className={style.formInput}>
                <input
                  type="text"
                  name="userName"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
              </div>
            </div>
            <p className={style.itemTitle2}>연락처 정보</p>

            <div className={style.formRow}>
              <div className={style.frmTitle}>
                <span className={`${style.redStar} ${style.default_size}`}>
                  휴대폰번호
                </span>
              </div>
              <div className={style.formInput}>
                <select name="phone01" className={style.phone01}>
                  <option value="010">010</option>
                  <option value="010">011</option>
                  <option value="010">016</option>
                  <option value="010">017</option>
                </select>
                -
                <input
                  type="text"
                  name="phone02"
                  className={style.phoneInput}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
                    setPhone02(value);
                  }}
                  value={phone02}
                />
                -
                <input
                  type="text"
                  name="phone03"
                  className={style.phoneInput}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
                    setPhone03(value);
                  }}
                  value={phone03}
                />
              </div>
            </div>
            <div className={style.formRow}>
              <div className={style.frmTitle}>
                <span className={`${style.redStar} ${style.default_size}`}>
                  이메일
                </span>
              </div>
              <div className={style.formInput}>
                <input
                  type="text"
                  name="email1"
                  onChange={(e) => setEmail01(e.target.value)}
                  value={email01}
                />
                @
                <input
                  type="text"
                  className={style.email2}
                  name="email2"
                  onChange={(e) => setEmail02(e.target.value)}
                  value={email02}
                />
              </div>
            </div>
          </div>

          <div className={style.formSection}>
            <div className={style.formHeader}>
              <span className={style.frmH3}>약관동의</span>
            </div>
            <div className={style.bgGray}>
              <div className={style.agreeItem}>
                <input
                  type="checkbox"
                  onChange={(e) => setAgree1(e.target.checked)}
                  checked={agree1}
                />
                <label>
                  <span className={style.font_red}>[필수]</span> 이용약관에
                  동의합니다.
                </label>
                <div
                  className={style.detailButton}
                  onClick={() => openModal(termsContent)}
                >
                  자세히 보기
                </div>
              </div>
              <div className={style.agreeItem}>
                <input
                  type="checkbox"
                  onChange={(e) => setAgree2(e.target.checked)}
                  checked={agree2}
                />
                <label>
                  <span className={style.font_red}>[필수]</span> 개인정보
                  처리방침에 동의합니다.
                </label>
                <div
                  className={style.detailButton}
                  onClick={() => openModal(privacyContent)}
                >
                  자세히 보기
                </div>
              </div>
            </div>
          </div>

          <div className={style.formSection}>
            <div className={style.dflex2}>
              <button className={style.cursor} type="button" onClick={onJoin}>
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <p className={style.modalTitle}>
              {modalContent === termsContent ? '이용약관' : '개인정보처리방침'}
            </p>
            <pre>{modalContent}</pre>
            <div className={style.modalButtons}>
              <button
                className={style.modalConfirm}
                onClick={() => {
                  if (modalContent === termsContent) {
                    setAgree1(true); // 이용약관 동의
                  } else if (modalContent === privacyContent) {
                    setAgree2(true); // 개인정보 처리방침 동의
                  }
                  closeModal(); // 모달 닫기
                }}
              >
                동의
              </button>
              <button className={style.modalClose} onClick={closeModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;

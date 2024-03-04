import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterUl>
        <FooterLi>
          <FooterLogo>
            <img src={"/imgs/logo2.png"} alt="logo" />
          </FooterLogo>
          <FooterText> Copyright ©TITTO. All Rights Reserved.</FooterText>
        </FooterLi>
      </FooterUl>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #f5f5f5;
  height: 80px;
  display: flex;
  justify-content: center;
  border-top: 2px solid #ccc;
  margin-top: 50px;
`;

const FooterUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  width: 1100px;
  justify-content: center;
`;
const FooterLi = styled.li`
  margin-right: 30px;
  display: flex;
  align-items: center;
  position: relative;
`;

const FooterText = styled.p`
  font-size: 0.8rem;
  color: black;
  font-weight: bold;
  margin: 0;
`;

const FooterLogo = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #3e68ff;
  margin: 0 20px;
  img {
    width: 60px;
    height: 60px;
    padding: 5px;
  }
`;

export default Footer;

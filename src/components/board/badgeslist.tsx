import React, { useState } from "react";
import styled from "styled-components";

export const badgeImageMap: { [key: string]: string } = {
  NOVICE_INQUIRER: "/imgs/bg/NOVICE_INQUIRER.png",
  BEGINNER_INQUIRER: "/imgs/bg/BEGINNER_INQUIRER.png",
  TRAINEE_INQUIRER: "/imgs/bg/TRAINEE_INQUIRER.png",
  PROFESSIONAL_INQUIRER: "/imgs/bg/PROFESSIONAL_INQUIRER.png",
  EXPERT_INQUIRER: "/imgs/bg/EXPERT_INQUIRER.png",
  NOVICE_RESPONDER: "/imgs/bg/NOVICE_RESPONDER.png",
  BEGINNER_RESPONDER: "/imgs/bg/BEGINNER_RESPONDER.png",
  TRAINEE_RESPONDER: "/imgs/bg/TRAINEE_RESPONDER.png",
  PROFESSIONAL_RESPONDER: "/imgs/bg/PROFESSIONAL_RESPONDER.png",
  EXPERT_RESPONDER: "/imgs/bg/EXPERT_RESPONDER.png",
  NOVICE_SOLVER: "/imgs/bg/NOVICE_SOLVER.png",
  BEGINNER_SOLVER: "/imgs/bg/BEGINNER_SOLVER.png",
  TRAINEE_SOLVER: "/imgs/bg/TRAINEE_SOLVER.png",
  PROFESSIONAL_SOLVER: "/imgs/bg/PROFESSIONAL_SOLVER.png",
  EXPERT_SOLVER: "/imgs/bg/EXPERT_SOLVER.png",
  TITTO_MASTER: "/imgs/bg/TITTO_MASTER.png",
  TITTO_AUTHORITY: "/imgs/bg/TITTO_AUTHORITY.png",
};

export const badgeComments: { [key: string]: string } = {
  NOVICE_INQUIRER: "신입 질문러",
  BEGINNER_INQUIRER: "초보 질문러",
  TRAINEE_INQUIRER: "견습 질문러",
  PROFESSIONAL_INQUIRER: "프로 질문러",
  EXPERT_INQUIRER: "전문 질문러",
  NOVICE_RESPONDER: "신입 답변러",
  BEGINNER_RESPONDER: "초보 답변러",
  TRAINEE_RESPONDER: "견습 답변러",
  PROFESSIONAL_RESPONDER: "프로 답변러",
  EXPERT_RESPONDER: "전문 답변러",
  NOVICE_SOLVER: "신입 해결사",
  BEGINNER_SOLVER: "초보 해결사",
  TRAINEE_SOLVER: "견습 해결사",
  PROFESSIONAL_SOLVER: "프로 해결사",
  EXPERT_SOLVER: "전문 해결사",
  TITTO_MASTER: "티토 마스터",
  TITTO_AUTHORITY: "티토 권위자",
};
const BadgeList = ({
  badges,
  badgeImageMap,
  badgeComments,
}: {
  badges: string[];
  badgeImageMap: { [key: string]: string };
  badgeComments: { [key: string]: string };
}) => {
  const [hoveredBadge, setHoveredBadge] = useState("");
  const handleMouseEnter = (badge: string) => {
    setHoveredBadge(badge);
  };

  const handleMouseLeave = () => {
    setHoveredBadge("");
  };

  return (
    <div className="imgcnt">
      {badges &&
      Array.isArray(badges) &&
      badges.length > 0 &&
      badges[0] !== "" ? (
        badges.map((badge) => (
          <BadgeContainer
            key={badge}
            onMouseEnter={() => handleMouseEnter(badge)}
            onMouseLeave={handleMouseLeave}
          >
            <BadgeImage src={badgeImageMap[badge]} alt="" />
            {hoveredBadge === badge && (
              <Popup position={{ x: 35, y: 100 }}>{badgeComments[badge]}</Popup>
            )}
          </BadgeContainer>
        ))
      ) : (
        <p>
          {badges && Array.isArray(badges) && badges.length > 0
            ? "보유한 뱃지가 없습니다."
            : "뱃지 정보가 없습니다."}
        </p>
      )}
    </div>
  );
};

export default BadgeList;

const Popup = styled.div<{ position: { x: number; y: number } }>`
  background: white;
  width: 120px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;

  color: #3e68ff;
  font-weight: bold;
  z-index: 999;
  position: absolute;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BadgeContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const BadgeImage = styled.img`
  width: 50px;
`;

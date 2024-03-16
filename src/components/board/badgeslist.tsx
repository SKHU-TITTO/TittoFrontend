import React from "react";

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

const BadgeList = ({
  badges,
  badgeImageMap,
}: {
  badges: string[];
  badgeImageMap: { [key: string]: string };
}) => {
  return (
    <div className="imgcnt">
      {badges &&
      Array.isArray(badges) &&
      badges.length > 0 &&
      badges[0] !== "" ? (
        badges.map((badge) => (
          <img key={badge} src={badgeImageMap[badge]} alt="" />
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

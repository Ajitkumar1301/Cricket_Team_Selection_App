import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const TeamSelector = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [team1Members, setTeam1Members] = useState([]);
  const [team2Members, setTeam2Members] = useState([]);
  const [commonColumn, setCommonColumn] = useState([]);

  const Members = useLocation();
  const navigate = useNavigate();
  const selectedMembers = Members.state.selectedMembers;

  function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5)
  }

  const assignTeams = () => {
    setIsDisabled(true);
    const shuffledMembers = shuffleArray(selectedMembers);
    const sortedMembers = shuffledMembers.sort((a, b) => b.points - a.points);

    let team1Points = 0;
    let team2Points = 0;


    sortedMembers.forEach((member, index) => {

      if (sortedMembers.length % 2 !== 0 && index === sortedMembers.length - 1) {
        setCommonColumn([member]);
      } else {
        if (team1Points <= team2Points) {
          setTeam1Members((prevMembers) => [...prevMembers, member]);
          team1Points += member.points;
        } else {
          setTeam2Members((prevMembers) => [...prevMembers, member]);
          team2Points += member.points;
        }
      }
    });
    // const id1And2Members = sortedMembers.filter(
    //   (member) => member.id === 5 || member.id === 8 || member.id === 1
    // );
    // const otherMembers = sortedMembers.filter(
    //   (member) => member.id !== 5 && member.id !== 8 && member.id !== 1
    // );

    // id1And2Members.forEach((member) => {

    //   if (team1Points <= team2Points) {
    //     if (member.id === 1 || member.id === 8) {
    //       setTeam2Members((prevMembers) => [...prevMembers, member]);
    //       team2Points += member.points;
    //     }
    //     else if (member.id === 5) {

    //       setTeam1Members((prevMembers) => [...prevMembers, member]);
    //       team1Points += member.points;
    //     }
    //   }
    //   else {

    //     setTeam2Members((prevMembers) => [...prevMembers, member]);
    //     team2Points += member.points;
    //   }
    // });

    // otherMembers.forEach((member, index) => {

    //   if (id1And2Members.length % 2 !== 0 ? (otherMembers.length % 2 !== 1 && index === otherMembers.length - 1) : (otherMembers.length % 2 !== 0 && index === otherMembers.length - 1)) {
    //     setCommonColumn([member]);
    //   } else {
    //     if (team1Points <= team2Points) {
    //       setTeam1Members((prevMembers) => [...prevMembers, member]);
    //       team1Points += member.points;
    //     } else {
    //       setTeam2Members((prevMembers) => [...prevMembers, member]);
    //       team2Points += member.points;
    //     }
    //   }

    // });

  };


  const NextPage = () => {
    navigate("/final", {
      state: {
        teamA: team1Members,
        teamB: team2Members,
        impact: commonColumn
      }
    });
  };


  const shuffledIndices = shuffleArray([...Array(team1Members.length).keys()]);
  const shuffledIndices2 = shuffleArray([...Array(team2Members.length).keys()]);

  return (
    <div className="team-selector-container">
      <div className="selected-players-container">
        <h3>Selected players</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.5rem",
          }}
        >
          {selectedMembers.map((member) => (
            <div
              key={member.id}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {member.name}
            </div>
          ))}
        </div>
        <button
          className={`${!isDisabled ? "active" : "disable"}`}
          disabled={isDisabled}
          onClick={assignTeams}
        >
          Assign Players
        </button>
        {isDisabled &&
          <button
            className="active"
            style={{ marginLeft: '2rem' }}
            onClick={NextPage}
          >
            View Squad
          </button>}
      </div>

    </div>
  );
};

export default TeamSelector;

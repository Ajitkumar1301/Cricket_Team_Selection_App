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
    const team1Members = [];
    const team2Members = [];
    let commonColumnMember = null;

    // sortedMembers.forEach((member, index) => {

    //   if (sortedMembers.length % 2 !== 0 && index === sortedMembers.length - 1) {
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

    const id1And2Members = sortedMembers.filter(member =>
      [1, 5, 8].includes(member.id)
    );
    const otherMembers = sortedMembers.filter(member =>
      ![1, 5, 8].includes(member.id)
    );



    id1And2Members.forEach((member) => {


      if (member.id === 1 || member.id === 8) {
        team2Members.push(member);
        team2Points += member.points;
      } else if (member.id === 5) {
        team1Members.push(member);
        team1Points += member.points;
      }

    });

    const targetNumMembersPerTeam = Math.floor((otherMembers.length + id1And2Members.length) / 2);

    otherMembers.forEach((member, index) => {
      console.log({targetNumMembersPerTeam});
      if (team1Members.length < targetNumMembersPerTeam) {
        team1Members.push(member);
      } else {
        team2Members.push(member);
      }
      if (team1Members.length !== team2Members.length && index === otherMembers.length - 1) {
        commonColumnMember = member;
        console.log(commonColumnMember.id);

        if (team1Members.some(member => member.id === setCommonColumn?.id)) {
          const index = team1Members.findIndex(member => member.id === setCommonColumn?.id);
          team1Members.splice(index, 1);
        } else if (team2Members.some(member => member.id === setCommonColumn?.id)) {
          const index = team2Members.findIndex(member => member.id === setCommonColumn?.id);
          team2Members.splice(index, 1);
        }
      }



    });
    const TeamA = team1Members.filter(member =>
      ![commonColumnMember?.id].includes(member.id)
    );
    const TeamB = team2Members.filter(member =>
      ![commonColumnMember?.id].includes(member.id)
    );

    setTeam1Members(TeamA);
    setTeam2Members(TeamB);
    setCommonColumn(commonColumnMember ? [commonColumnMember] : []);

  };

  console.log({ team1Members, team2Members, commonColumn });

  const NextPage = () => {
    navigate("/final", {
      state: {
        teamA: team1Members,
        teamB: team2Members,
        impact: commonColumn
      }
    });
  };


  // const shuffledIndices = shuffleArray([...Array(team1Members.length).keys()]);
  // const shuffledIndices2 = shuffleArray([...Array(team2Members.length).keys()]);

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

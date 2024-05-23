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


    const team1Members = [];
    const team2Members = [];
    let commonColumnMember = null;



    const id1And2Members = sortedMembers.filter(member =>
      [1, 5, 8].includes(member.id)
    );
    const otherMembers = sortedMembers.filter(member =>
      ![1, 5, 8].includes(member.id)
    );

    let team1Points = 0;
    let team2Points = 0;

    id1And2Members.forEach((member) => {


      if (member.id === 1 || member.id === 8) {
        team2Members.push(member);
        team2Points += member.points;
      } else if (member.id === 5) {
        team1Members.push(member);
        team1Points += member.points;
      }

    });
    console.log(team1Points, team2Points);

    // const targetNumMembersPerTeam = Math.floor((otherMembers.length + id1And2Members.length) / 2);

    otherMembers.forEach((member, index) => {

      if (team1Points < team2Points) {
        team1Members.push(member);
        team1Points += member.points;
      } else {
        team2Members.push(member);
        team2Points += member.points;
      }


    });
    const TeamA = team1Members.filter(member =>
      ![commonColumnMember?.id].includes(member.id)
    );
    const TeamB = team2Members.filter(member =>
      ![commonColumnMember?.id].includes(member.id)
    );


    if (TeamA.length !== TeamB.length) {

      const longerArray = TeamA.length > TeamB.length ? TeamA : TeamB;

      // const shorterArray = TeamA.length > TeamB.length ? TeamB : TeamA;


      const numToRemove = Math.abs(TeamA.length - TeamB.length);


      for (let i = 0; i < numToRemove; i++) {

        const removedMember = longerArray.pop();

        commonColumnMember = removedMember;
      }
    }


    setTeam1Members(TeamA);
    setTeam2Members(TeamB);
    setCommonColumn(commonColumnMember ? [commonColumnMember] : []);

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

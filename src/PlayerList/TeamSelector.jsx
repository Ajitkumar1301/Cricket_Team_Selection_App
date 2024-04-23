import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";

const TeamSelector = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [team1Members, setTeam1Members] = useState([]);
  const [team2Members, setTeam2Members] = useState([]);
  const [commonColumn, setCommonColumn] = useState([]);

  const Members = useLocation();
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

    const id1And2Members = sortedMembers.filter(
      (member) => member.id === 5 || member.id === 8
    );
    const otherMembers = sortedMembers.filter(
      (member) => member.id !== 5 && member.id !== 8
    );

    id1And2Members.forEach((member) => {
      if (team1Points <= team2Points) {
        setTeam1Members((prevMembers) => [...prevMembers, member]);
        team1Points += member.points;
      } else {
        setTeam2Members((prevMembers) => [...prevMembers, member]);
        team2Points += member.points;
      }
    });

    otherMembers.forEach((member, index) => {
      if (otherMembers.length % 2 !== 0 && index === otherMembers.length - 1) {
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
      </div>
      <table className="teams-table">
        <thead>
          <tr>
            <th>Team 1</th>
            <th>Team 2</th>
            {commonColumn.length > 0 && <th>Common</th>}
          </tr>
        </thead>
        <tbody>
          {team1Members.length > 0 || team2Members.length > 0 ? (
            <tr>
              <td style={{ textAlign: "center" }}>
                <ul>
                  {team1Members
                    .sort((a, b) => b.name.localeCompare(a.name))
                    .map((member, i) => (
                      <li
                        key={member.id}
                        style={{
                          color:
                            shuffledIndices.indexOf(i) === 0
                              ? "red"
                              : shuffledIndices.indexOf(i) === 1
                                ? "darkorange"
                                : "inherit",
                        }}
                      >
                        {" "}
                        {shuffledIndices.indexOf(i) === 0
                          ? `${member.name} (C)`
                          : shuffledIndices.indexOf(i) === 1
                            ? `${member.name} (VC)`
                            : member.name}
                      </li>
                    ))}
                </ul>
              </td>
              <td style={{ textAlign: "center" }}>
                <ul>
                  {team2Members
                    .sort((a, b) => b.name.localeCompare(a.name))
                    .map((member, i) => (
                      <li
                        key={member.id}
                        style={{
                          color:
                            shuffledIndices2.indexOf(i) === 0
                              ? "blue"
                              : shuffledIndices2.indexOf(i) === 1
                                ? "darkcyan"
                                : "inherit",
                        }}
                      >
                        {" "}
                        {shuffledIndices2.indexOf(i) === 0
                          ? `${member.name} (C)`
                          : shuffledIndices2.indexOf(i) === 1
                            ? `${member.name} (VC)`
                            : member.name}
                      </li>
                    ))}
                </ul>
              </td>
              {commonColumn.length > 0 && (
                <td style={{ textAlign: "center" }}>
                  <ul>
                    {commonColumn.map((member) => (
                      <li key={member.id}>{member.name}</li>
                    ))}
                  </ul>
                </td>
              )}
            </tr>
          ) : (
            <tr>
              <td colSpan={commonColumn.length > 0 ? "3" : "2"}>
                Teams will be assigned once players are selected and assigned
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamSelector;

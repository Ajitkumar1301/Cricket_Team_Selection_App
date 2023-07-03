import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlayerList = () => {
  const teamMembers = [
    { id: 1, name: "Ajith", points: 1.5 },
    { id: 2, name: "AproseKhan", points: 1.5 },
    { id: 3, name: "Ashwathaman", points: 3 },
    { id: 4, name: "Chandru", points: 1.5 },
    { id: 5, name: "Daniel", points: 3 },
    { id: 6, name: "Deepak", points: 2 },
    { id: 7, name: "Giridharan", points: 1 },
    { id: 8, name: "Jeffrin", points: 2 },
    { id: 9, name: "Jones", points: 2 },
    { id: 10, name: "KumarSelvam", points: 1.5 },
    { id: 11, name: "MuraliK", points: 3 },
    { id: 12, name: "Naveen", points: 1 },
    { id: 13, name: "Nirmal", points: 3 },
    { id: 14, name: "Prabhakaran", points: 3 },
    { id: 15, name: "Pravin", points: 1.5 },
    { id: 16, name: "Sakthivel", points: 2 },
    { id: 17, name: "Sarath", points: 3 },
    { id: 18, name: "Selvendran", points: 3 },
    { id: 19, name: "Sikkandar", points: 2.5 },
    { id: 20, name: "SivaDurai", points: 2.5 },
    { id: 21, name: "ThiruVarasan", points: 1.5 },
    { id: 22, name: "VelMurugan", points: 3 },
    { id: 23, name: "Vignesh", points: 1.5 },
  ];

  const [selectedMembers, setSelectedMembers] = useState([]);
  const navigate = useNavigate();

  const handleSelectMember = (member) => {
    if (selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers((prevMembers) =>
        prevMembers.filter((m) => m.id !== member.id)
      );
    } else {
      setSelectedMembers((prevMembers) => [...prevMembers, member]);
    }
  };

  const handleSelectAll = () => {
    setSelectedMembers(teamMembers);
  };

  const handleDeselectAll = () => {
    setSelectedMembers([]);
  };

  const handleNavigate = () => {
    navigate("/team", { state: { selectedMembers: selectedMembers } });
  };

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%", marginTop: "2rem" }}>
      <div>
        <h2>Team Members</h2>
        <div>
          <input
            type="checkbox"
            checked={selectedMembers.length === teamMembers.length}
            onChange={
              selectedMembers.length === teamMembers.length
                ? handleDeselectAll
                : handleSelectAll
            }
          />
          <label style={{ fontWeight: "bolder", marginLeft: "0.3rem" }}>
            Select All
          </label>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
          ></div>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                style={{ marginLeft: "1rem" }}
                type="checkbox"
                checked={selectedMembers.some((m) => m.id === member.id)}
                onChange={() => handleSelectMember(member)}
              />
              <label>{member.name}</label>
            </div>
          ))}
        </div>
      </div>
      {selectedMembers.length > 1 && (
        <div style={{ marginTop: "2rem", marginLeft: "25%" }}>
          <button
            style={{
              backgroundColor: "red",
              border: "2px solid red",
              color: "gold",
              cursor: "pointer",
              width: "50%",
              marginBottom: "3rem",
            }}
            onClick={handleNavigate}
          >
            Team Select
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerList;

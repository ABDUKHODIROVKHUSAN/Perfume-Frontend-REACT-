import React from "react";
import { useHistory } from "react-router-dom"; 

const rooms = [
  {
    name: "Living Room",
    image: "/img/livingRoom.jpeg",
    bgColor: "#2C2C2C",
    collection: "LIVING_ROOM",
  },
  {
    name: "Dining Room",
    image: "/img/diningRoom.jpeg",
    bgColor: "#4C5C45",
    collection: "DINING_ROOM",
  },
  {
    name: "Office Room",
    image: "/img/OfficeRoom.jpeg",
    bgColor: "#2C2C2C",
    collection: "OFFICE",
  },
];

const RoomsSection = () => {
  const history = useHistory();

  const handleRoomClick = (collection: string) => {
    history.push(`/perfumes?collection=${collection}`);
  };

  const handleShowAll = () => {
    history.push(`/perfumes?collection=ALL`);
  };

  return (
    <div className="rooms-container">
      <div className="rooms-left">
        {rooms.map((room, index) => (
          <div
            key={room.name}
            className={`room-card ${index === 1 ? "middle-card" : ""}`}
            style={{ backgroundColor: room.bgColor, cursor: "pointer" }}
            onClick={() => handleRoomClick(room.collection)}
          >
            <img src={room.image} alt={room.name} className="room-img" />
            <span className="room-title">{room.name}</span>
          </div>
        ))}
      </div>
      <div className="rooms-right">
        <h2>Shop by room</h2>
        <p>
          Having a home you love means having furnishing that you’re proud of.
          We are proud to bring you trendy perfume for every room in the
          house, with the added bonus.
        </p>
        <span onClick={handleShowAll} className="show-link" style={{ cursor: "pointer" }}>
          Show all kinds <span className="arrow">→</span>
        </span>
      </div>
    </div>
  );
};

export default RoomsSection;

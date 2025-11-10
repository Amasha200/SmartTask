import React from "react";

const History = () => {
  const dummyData = [
    { id: 1, date: "2025-11-05", duration: "30 mins", interviewer: "John Doe" },
    { id: 2, date: "2025-11-06", duration: "45 mins", interviewer: "Jane Smith" },
  ];

  return (
    <div>
      <h2>Meeting History</h2>
      <ul>
        {dummyData.map((meet) => (
          <li key={meet.id}>
            {meet.date} - {meet.duration} with {meet.interviewer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

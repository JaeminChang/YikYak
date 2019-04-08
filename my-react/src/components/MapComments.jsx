import React from "react";

const MapComments = ({ feed, getDate, deleteComment }) => {
  return feed.map(data => {
    return (
      <div key={data.Id} className="card mb-1">
        <div className="el-card-item">
          <h6>{data.Content}</h6>
          <h6>{getDate(data.DateCreated)}</h6>
          <button onClick={() => deleteComment(data.Id)}>
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>
    );
  });
};

export default React.memo(MapComments);

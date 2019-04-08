import React from "react";

const MapPosts = ({ feed, upVote, downVote, push }) => {
  return feed.map(data => {
    return (
      <div key={data.Id} className="card mb-1">
        <h5 className="card-title yolo text-center pt-1 pb-2">{data.Title}</h5>
        <div className="row">
          <div className="col-md-2 ml-2 mt-2 mb-2">
            <div className="btn-group-vertical">
              <button
                className="btn btn-outline-dark"
                onClick={() => upVote(data.Id, data.NumberOfLikes)}
              >
                <i className="fas fa-chevron-up" />
              </button>
              <span className="btn btn-outline-dark">{data.NumberOfLikes}</span>

              <button
                className="btn btn-outline-dark"
                onClick={() => downVote(data.Id, data.NumberOfLikes)}
              >
                <i className="fas fa-chevron-down" />
              </button>
            </div>
          </div>
          <div className="col-md-9" onClick={() => push(data.Id)}>
            <h6>{data.Content}</h6>
          </div>
        </div>
      </div>
    );
  });
};

export default React.memo(MapPosts);

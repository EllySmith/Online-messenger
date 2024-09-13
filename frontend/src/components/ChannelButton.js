import React from 'react'

const ChannelButton = ({ id, name, onClick, removable }) => {

  return (
    <div className="nav-item w-100">
      <button className="w-100 rounded-0 text-start btn btn-secondary" onClick={() => onClick(id)}>
      <span className="me-1">#</span>{name}
      </button>
    </div>
  );
};

export default ChannelButton;



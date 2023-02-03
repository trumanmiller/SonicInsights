import React from 'react';

function Card(props) {
  return (
    <div style={{
      backgroundImage: `url(${props.backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '200px',
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px'
    }} className="card">
      <h3>{props.artistName}</h3>
      <h4>{props.trackName}</h4>
      {/* <h5>{props.albumName}</h5> */}
    </div>
  );
}

export default Card;

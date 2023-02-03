import React, { Component, useEffect } from 'react';
import Card from './card.jsx';

// const Cards = [];

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/spotify')
      .then((response) => response.json())
      .then((data) => {
        const cards = data.map((el) => {
          return (
            <Card
              backgroundImg={el.track.album.images[1].url}
              artistName={el.track.artists[0].name}
              trackName={el.track.name}
              albumName={el.track.album.name}
            ></Card>
          );
        });
        this.setState({ cards });
      });
  }

  render() {
    return <div className='grid'>{this.state.cards}</div>;
  }
}



// function Grid() {
//   const Cards = [];

//   fetch('http://localhost:3000/spotify')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       data.items.forEach((el) => {
//         const card = (
//           <Card
//             backgroundImg={el.track.album.images[1].url}
//             artistName={el.track.artists[0].name}
//             trackName={el.track.name}
//             albumName={el.track.album.name}
//           ></Card>
//         );
//         Cards.push(card);
//       });
//     });
//   return Cards;
// }

export default Grid;

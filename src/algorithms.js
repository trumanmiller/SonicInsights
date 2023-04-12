const toExport = {};

/**
 * @method mostFrequenctyListened Currates the most frequently listened songs
 * @param {{}[]} arr
 * @param {string} playlistId The id of the playlist to be created/updated
 * @param {number} playlistLenth Length of updated playlist
 * @returns {Promise<void>} A promise that resolves if the operation is successful or rejects with an error message if it fails
 */

toExport.mostFrequentlyListened = (arr) => {
  const cache = {};
  for (const el of arr.data.items) {
    cache[el.track.uri] ? cache[el.track.uri]++ : (cache[el.track.uri] = 1);
  }

  const sortedArray = [];
  let highestOccurence = -Infinity;
  let highestOccuringId = '';

  while (sortedArray.length < 12) {
    for (const key in cache) {
      if (highestOccurence < cache[key]) {
        highestOccurence = cache[key];
        highestOccuringId = key;
      }
    }
    delete cache[highestOccuringId];
    sortedArray.push(highestOccuringId);
    highestOccurence = -Infinity;
    highestOccuringId = '';
  }

  return sortedArray;
};

// write your custom algo here
toExport.custom1 = (arr) => {};

module.exports = toExport;

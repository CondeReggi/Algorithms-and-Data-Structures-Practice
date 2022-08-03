/*-Find the next perfect square!-*/

function findNextSquare(sq) {
  const siguiente = Math.sqrt(sq) + 1;
  if(siguiente !== Math.floor(siguiente)) return -1
  
  return Math.pow(siguiente, 2);
}

/*-The Baum-Sweet sequence-*/


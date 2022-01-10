import jwt_decode from "jwt-decode";

function isTokenValid( accessToken ) {
  const decodedToken = jwt_decode( accessToken );
  const expirationUnix = decodedToken.exp; // let op: dit is een UNIX timestamp

  const now = new Date().getTime(); // dit is een javascript timestamp
  const nowInUnix = Math.round( now / 1000 ); // nu is het ook een UNIX timestamp

  // Als er nog seconden over zijn wanneer we "nu" aftrekken van de expiratiedatum is hij nog geldig
  return expirationUnix - nowInUnix > 0;

}

export default isTokenValid;
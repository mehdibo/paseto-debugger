const Paseto = require('paseto.js');

function getVersion(token) {
  return token.split
}

export default (req, res) => {
    const version = req.body.token.split(".")[0]
    const pVersion = (version === 'v1') ? new Paseto.V1() : new Paseto.V2();
    // TODO: handle public Paseto tokens
    const sk = new Paseto.SymmetricKey(pVersion);
    sk.hex(req.body.secret);

    pVersion
      .decrypt(req.body.token, sk)
      .then(
          function (m) {
              // TODO: handle non-json payloads
              // TODO: handle footers
              res.statusCode = 200
              res.json(JSON.parse(m))
          }
      ).catch(
          function (error) {
              res.statusCode = 400
              console.log(error.message);
              res.json({error: error.message})
          }
    );
}

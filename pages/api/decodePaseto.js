// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Paseto = require('paseto.js');

function getVersion(token) {
  return token.split
}

export default (req, res) => {
    const version = req.body.token.split(".")[0]
    const pVersion = (version === 'v1') ? new Paseto.V1() : new Paseto.V2();
    const sk = new Paseto.SymmetricKey(pVersion);
    sk.hex(req.body.secret);

    pVersion
      .decrypt(req.body.token, sk)
      .then(
          function (m) {
              res.statusCode = 200
              res.json(JSON.parse(m))
          }
      );
}

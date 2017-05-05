import HTTPStatus from 'http-status';
import jwt from 'jwt-simple';

export default (app) => {
  const config = app.config;
  const Users = app.datasource.models.Users;

  app.get('/', (req, res) => {
    res.status(HTTPStatus.OK);
    res.end('No ar... Branch Fabricio');
  });

  app.post('/token', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      Users.findOne({ where: { email } })
        .then((user) => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id };
            res.json({
              token: jwt.encode(payload, config.jwtSecret),
            });
          } else {
            res.sendStatus(HTTPStatus.UNAUTHORIZED);
          }
        })
        .catch(() => res.sendStatus(HTTPStatus.UNAUTHORIZED));
    } else {
      res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
  });
};

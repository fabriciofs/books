import HTTPStatus from 'http-status';

const defaultResponse = (data, statusCode = HTTPStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HTTPStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class UsersController {
  constructor(Users) {
    this.Users = Users;
  }

  getAll() {
    return this.Users.findAll({})
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message));
  }

  getById(params) {
    return this.Users.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message));
  }

  create(data) {
    return this.Users.create(data)
      .then(result => defaultResponse(result, HTTPStatus.CREATED))
      .catch(err => errorResponse(err.message, HTTPStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.Users.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(err => errorResponse(err.message, HTTPStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Users.destroy({ where: params })
      .then(result => defaultResponse(result, HTTPStatus.NO_CONTENT))
      .catch(err => errorResponse(err.message, HTTPStatus.UNPROCESSABLE_ENTITY));
  }

}

export default UsersController;

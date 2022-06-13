const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');
const userService = require('../services/userService');

const router = Router();

// TODO: Implement route controllers for user

router.post('/', createUserValid,
  function (req, res, next) {
    try {
      if (res.data) {
        userService.create(res.data)
      }
    } catch (err) {
      res.err = err
    } finally {
      next()
    }
  },
  responseMiddleware)

  .put('/:id', updateUserValid, function (req, res, next) {
    try {
      if (res.data) {
        const data = userService.update(req.params.id, res.data)
        res.data = data
      }
    } catch (err) {
      res.err = err
    } finally {
      next()
    }
  }, responseMiddleware)

  .delete('/:id', function (req, res, next) {
    try {
      userService.delete(req.params.id)
      res.data = `User ${req.params.id} deleted`
    } catch (err) {
      res.err = err
    } finally {
      next()
    }
  }, responseMiddleware);

module.exports = router;



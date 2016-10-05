import express from 'express';
import axios from 'axios';
import validateInput from '../shared/validations/signup';

let router = express.Router();

router.post('/', (req, res) => {
  setTimeout(() => {

    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
      const { username, password } = req.body;
      axios.post('http://api.con/api/user', {
          username: username,
          password: password
        })
        .then(user => res.json({ success: true }))
        .catch(error => res.status(500).json({ error: error }));
    }else{
      res.status(400).json(errors);
    }
  }, 1000);
});

export default router;
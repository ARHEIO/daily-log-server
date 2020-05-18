const express = require('express');
const router = express.Router();
const { getUserByEmail } = require ('../../services/database')
const { logger } = require('../../utils/logger');
const asyncHandler = require('express-async-handler')

/* GET users listing. */
router.get('/', asyncHandler(async (req, res) => {
  const email = req.user.email;
  const user = await getUserByEmail(email);
  if (!user.length) {
    res.status(404).send('{"err":"no user found"}');
  }
  logger.info(`Got user ${email}`)
  res.status(200).send(JSON.stringify(user));
}));

// router.post('/', async (req, res) => {
//   const { givenName, surname, dob, sex, gender, p_subject, p_object, possessive } = req.body;
//   try {
//     const result = await db.query(`
//     INSERT INTO user_account (
//       given_name, surname, dob, sex, gender, p_subject, p_object, p_possessive, email
//     ) VALUES (
//       $1, $2, $3, $4, $5, $6, $7, $8, $9
//     );
//     `, [givenName, surname, dob, sex, gender, p_subject, p_object, possessive, req.user.email])
//     return res.sendStatus(200);
//   } catch (err) {
//     return res.sendStatus(500).send(err);
//   }
// })


module.exports = router;

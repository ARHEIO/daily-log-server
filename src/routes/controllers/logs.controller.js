const express = require('express');
const router = express.Router();
const db = require ('../../services/database')

/**
 * Get's all logs associated with the user
 * User is identified based on the email in the JWT
 */
router.get('/', async (req, res) => {
  try {
    const user = (await db.query('SELECT * FROM user_account WHERE email = $1', [req.user.email])).rows[0];
    console.log(user);
    if (!user) {
      return res.status(404).send({ err: "User not found" });
    }
    const results = await db.query(`
      SELECT log.answer, question.* FROM "log"
      INNER JOIN question ON question.id = log.question_id
      WHERE user_id = $1;`,
      [user.id]
    );

    return res.status(200).json(results.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Puts a new log into the 
 * User is identified based on the email in the JWT
 */
router.put('/', async (req, res) => {
  const { questionId, answer } = req.body;
  try {
    const userId = (await db.query('SELECT * FROM user_account WHERE email = $1', [req.user.email])).rows[0].id;
    await db.query(`
      INSERT INTO log ( user_id, question_id, answer ) VALUES ( $1, $2, $3 );`,
      [userId, questionId, answer]
    );

    return res.status(204).send();
  } catch (err) {
    return res.status(500).send(err);
  }
});


module.exports = router;
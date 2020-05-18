const express = require('express');
const router = express.Router();
const db = require ('../../services/database')

const validQuestionTypes = [
  "boolean",
  "scale",
  "number"
]

/**
 * Get's all logs associated with the user
 * User is identified based on the email in the JWT
 */
router.get('/', async (req, res) => {
  try {
    const currentQuestionList = (await db.query('SELECT * FROM question')).rows;
    return res.status(200).json(currentQuestionList);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:questionId', async (req, res) => {
  const id = req.params.questionId;
  if (!id.match(/^[0-9]*$/)) {
    return res.status(400).json({message: "'id' must be an integer"})
  }
  try {
    const currentQuestionList = (await db.query('SELECT * FROM question WHERE id = $1', [id])).rows;
    return res.status(200).json(currentQuestionList);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/types', async (req, res) => {
  const returnJson = {
    types: validQuestionTypes
  }
    return res.status(200).json(returnJson);
});

router.post('/', async(req, res) => {
  const { question, type } = req.body;
  if (!validQuestionTypes.includes(type)) {
    return res.status(400).json({message: "disallowed type"})
  }
  try {
    const result = await db.query(
      `INSERT INTO question ( question, answertype ) VALUES ( $1, $2 );`,
      [question, type])
    return res.status(200).json(result);
  } catch (err) {
    console.log(err.code, err.detail);
    return res.status(500).json(err);
  }
})


module.exports = router;
const express = require('express');
const crypto = require('crypto');
const { getTalkerData, addTalkerData } = require('./utils/readWrite');
const { validLogin } = require('./middlewares/loginValidation');
const { validToken } = require('./middlewares/tokenValidation');
const { validateAge, validateName, validateTalk,
  validateRate, validateWatch } = require('./middlewares/userValidation');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await getTalkerData();
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await getTalkerData();
  const talkerId = talkers.find(({ id }) => id === +(req.params.id));
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerId);
});

// link da documentação do randomBytes para geração do token aleatório
// https://nodejs.org/dist/latest-v14.x/docs/api/crypto.html#crypto_crypto_randombytes_size_callback
const generateToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

app.post('/login', validLogin, async (_req, res) => {
  const token = generateToken();
return res.status(200).json({ token });
});

app.post('/talker', validToken, validateName, validateAge,
validateTalk, validateRate, validateWatch, async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await getTalkerData();
  const createTalker = {
    name,
    age,
    id: talker.length + 1,
    talk,
  };
  talker.push(createTalker);
  await addTalkerData(createTalker);
  return res.status(201).json(createTalker);
});

/* app.put('/talker/:id', validToken, validateName, validateAge,
validateTalk, validateRate, validateWatch, async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const peek = await getTalkerData();
  const idTalker = peek.find((e) => e.id === +id);
    if (!idTalker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada'
      });
    }
  const getTalker = peek.map((e) => {
    if (e.id === +id) {
      return {
        id: e.id, ...body
      };
    }
    return e;
  });
  await addTalkerData(getTalker);
    return res.status(200).json({
      id: +id, ...body
    });
}); */

app.listen(PORT, () => {
  console.log('Online');
});

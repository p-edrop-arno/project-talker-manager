const express = require('express');
const crypto = require('crypto');
const { getTalkerData, writeTalkerData,
  updateTalkerData, deleteTalkerData } = require('./utils/readWrite');
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
  await writeTalkerData(createTalker);
  return res.status(201).json(createTalker);
});

app.put('/talker/:id', validToken, validateName, validateAge,
validateTalk, validateRate, validateWatch, async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    const updatedTalker = await updateTalkerData(body, id);
    const talkerUpdated = updatedTalker.find((talker) => talker.id === +id);
    if (!talkerUpdated) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkerUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.delete('/talker/:id', validToken, async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTalkerData(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Could not delete talker data' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

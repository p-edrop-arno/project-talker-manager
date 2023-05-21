const validateName = (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== 'string') {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  return next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age.length === 0) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18 || !Number.isInteger(age)) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  return next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
     return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  }
  return next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  
  if (typeof rate !== 'number') {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) { 
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  } 
  return next();
};

const validateWatch = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const regex = /\d{2}\/\d{2}\/\d{4}/.test(watchedAt);
  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (!regex) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  return next();
};

const dateValidation = (req, res, next) => {
  const { date } = req.query;
  const validation = /\d{2}\/\d{2}\/\d{4}/;
  if (date && !validation.test(date)) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  return next();
};

module.exports = {
  validateName,
  validateAge,
  dateValidation,
  validateTalk,
  validateWatch,
  validateRate,
};

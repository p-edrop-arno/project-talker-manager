const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email) {
    return 'O campo "email" é obrigatório';
  }
  if (!regex.test(email)) {
    return 'O "email" deve ter o formato "email@email.com"';
  }
  return true;
};

const validatePassword = (password) => {
  const minLength = 6;
  if (!password) {
    return 'O campo "password" é obrigatório';
  }
  if (password.length < minLength) {
    return 'O "password" deve ter pelo menos 6 caracteres';
  }
  return true;
};

const validLogin = (req, res, next) => {
  const { password, email } = req.body;
  const emailResult = validateEmail(email);
  const passwordResult = validatePassword(password);
  if (emailResult === true && passwordResult === true) {
    next();
  } else {
    res.status(400).send({
      message: emailResult !== true ? emailResult : passwordResult,
    });
  }
};

module.exports = { validLogin };
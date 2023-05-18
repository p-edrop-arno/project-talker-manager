const fs = require('fs').promises;

const talkerDataPath = 'src/talker.json';

const getDataBase = async () => {
  try {
    const data = await fs.readFile(talkerDataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    const err = new Error('Can not open file');
    throw err;
  }
};

const getTalkerData = async () => {
  const dataBaseFile = await getDataBase();
  return dataBaseFile;
};

module.exports = { getTalkerData };
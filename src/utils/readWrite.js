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

const addTalkerData = async (newTalker) => {
  try {
    const talkerData = await fs.readFile(talkerDataPath, 'utf8');
    const talkerArray = JSON.parse(talkerData);
    talkerArray.push(newTalker);
    await fs.writeFile('src/talker.json', JSON.stringify(talkerArray));
  } catch (error) {
    const err = new Error('Can not add data');
    throw err;
  }
};

module.exports = { getTalkerData, addTalkerData };

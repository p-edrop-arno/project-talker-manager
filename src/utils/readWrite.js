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

const writeTalkerData = async (newTalker) => {
  try {
    const talkerData = await fs.readFile(talkerDataPath, 'utf8');
    const talkerArray = JSON.parse(talkerData);
    talkerArray.push(newTalker);
    await fs.writeFile(talkerDataPath, JSON.stringify(talkerArray));
  } catch (error) {
    const err = new Error('Can not add data');
    throw err;
  }
};

const updateTalkerData = async (talkerUpdate, id) => {
  try {
    const talkerFile = await fs.readFile(talkerDataPath, 'utf8');
    const changeTalker = JSON.parse(talkerFile);
    const talkerUpdated = changeTalker.map((talker) => {
      if (talker.id === +id) {
        return { ...talker, ...talkerUpdate };
      }
      return talker;
    });
    await fs.writeFile(talkerDataPath, JSON.stringify(talkerUpdated));
    return talkerUpdated;
  } catch (error) {
    const err = new Error('Can not update data');
    throw err;
  }
};

module.exports = { getTalkerData, writeTalkerData, updateTalkerData };

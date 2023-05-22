const fs = require('fs').promises;

const talkerDataPath = 'src/talker.json';

const getDataBase = async () => {
  try {
    const data = await fs.readFile(talkerDataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    const err = new Error('Could not open file');
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
    const err = new Error('Could not write data');
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
    const err = new Error('Could not update data');
    throw err;
  }
};

const deleteTalkerData = async (id) => {
  try {
    const talkerFile = await fs.readFile(talkerDataPath, 'utf8');
    const talkerBase = JSON.parse(talkerFile);
    const removedTalkers = talkerBase.filter((talker) => talker.id !== +id);
    await fs.writeFile(talkerDataPath, JSON.stringify(removedTalkers));
    return removedTalkers;
  } catch (error) {
    const err = new Error('Could not delete data');
    throw err;
  }
};

module.exports = { getTalkerData, writeTalkerData, updateTalkerData, deleteTalkerData };

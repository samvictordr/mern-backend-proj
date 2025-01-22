const fs = require('fs');
const path = './sample.json';

const readData = () => {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

const うみだす = (newItem) => {
    const data = readData();
    data.push(newItem);
    writeData(data);
};

const 読んで = (id) => {
    const data = readData();
    return data.find(item => item.id === id);
};

const 修正 = (id, updatedItem) => {
    const data = readData();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedItem };
        writeData(data);
    }
};

const 除く = (id) => {
    const data = readData();
    const filteredData = data.filter(item => item.id !== id);
    writeData(filteredData);
};

module.exports = { create, read, update, remove };
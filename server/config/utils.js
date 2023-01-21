const csv = require('csv-parser');
const fs = require('fs');

function importCSV(filePath, model){
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            const newModel = new model(data);
            newModel.save();
        })
        .on('end', () => {
            console.log(`${model.modelName} imported successfully`);
        });
}


module.exports = {
    importCSV : importCSV
}
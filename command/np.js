var fs = require('fs');
var inquirer = require('inquirer');

var js_template = require('../src/templates/page/script');
var style_template = require('../src/templates/page/style');
var pug_template = require('../src/templates/page/pug');
var data_template = require('../src/templates/page/data');
// var filePath = global.postsPath;

// console.log('new page...'+);


inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What\'s the page name?'
    }
]).then(function (answer) {
    // console.log(answer);

    mknew(answer.name)
});


function mknew(_name) {
    const targetFolderPath = `./src/pages/${_name}`;
    const targetDataFolder = `${targetFolderPath}/data`;

    

    if (!fs.existsSync(targetFolderPath)) {
        fs.mkdirSync(targetFolderPath);
        fs.mkdirSync(targetDataFolder);

        generate(_name,targetFolderPath,targetDataFolder).then(()=>console.log('Info: Done'));
        // let name = name;
        
    } else {
        console.error('Error: this page already exist!');
        process.exit();
    }
}

async function generate(_name,_tfp, _tdp){
    const targetScriptPath = `${_tfp}/index.js`;
    const targetStylePath = `${_tfp}/style.scss`;
    const targetPugPath = `${_tfp}/index.pug`;
    const targetDataPath = `${_tdp}/index.json`;

    await new Promise((resolve, reject)=>{
        fs.writeFile(targetScriptPath, js_template.getTemplate(_name), (err, fd)=>{
            resolve();
        })
    });
    await new Promise((resolve, reject)=>{
        fs.writeFile(targetStylePath, style_template.getTemplate(_name), (err, fd)=>{
            resolve();
        })
    });

    await new Promise((resolve, reject)=>{
        fs.writeFile(targetPugPath, pug_template.getTemplate(_name), (err, fd)=>{
            resolve();
        })
    });

    await new Promise((resolve, reject)=>{
        fs.writeFile(targetDataPath, data_template.getTemplate(), (err, fd)=>{
            resolve();
        })
    });
}


// exports.mknew = function(fileName){
//     // first check if filepath exist
//     console.log(filePath);
//     if (filePath) {
//         if (!fs.existsSync(filePath)) {
//             fs.mkdirSync(filePath);
//         }
//         let tmpPostPath = filePath + fileName + '.md';
//         let tmpDate = getDateTime();
//         let template =
// `---
// title: ${fileName}
// date: ${tmpDate.year}/${tmpDate.month}/${tmpDate.day} ${tmpDate.hour}:${tmpDate.min}:${tmpDate.sec}
// tags: 
// ---`;
//         if (!fs.existsSync(tmpPostPath)) {
//             fs.writeFile(tmpPostPath, template, (err, fd) => {
//                 console.log('Info: Done');
//             });
//         } else {
//             console.log('err: there has had a past named: ' + fileName);
//         }
//     }
// }
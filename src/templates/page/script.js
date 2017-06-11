exports.getTemplate = (name) => 
`export default class ${name} {
    constructor() {
    }
    init() {
        return new Promise((resolve) => {

            resolve();
        });
    }
}
${name}.pageName = '${name}';
`;
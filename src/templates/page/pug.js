exports.getTemplate = (name) => 
`extends ../../templates/index.pug

block content
    section.${name}
`;
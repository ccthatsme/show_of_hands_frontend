import {html, render} from '../../node_modules/lit-html/lit-html.js';


const myTemplate = (params) => html`
<h1>survey</h1>

<h4>survey id = ${params}</h4>
`;

 //render(myTemplate(getParams()), document.getElementById('example1'));

// async function waitResolve(){
//   let survey = await createSurvey();
// return survey;
// }

// element.addEventListener('click', render(myTemplate('hello'), document.getElementById('example1')), false);

window.addEventListener('hashchange', function(){
    render(myTemplate('hello'), document.getElementById('example1'));
})

export {render};

//try in this file to have your haschange conditoional, the above was succesfull in only displaying the template on a hashchanbge event like creating a survey
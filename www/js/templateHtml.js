import {html, render, nothing, TemplateResult} from '../../node_modules/lit-html/lit-html.js';
const mySurveyButton = document.getElementById('mysurvey');

const myTemplate = (params) => html`
<h1>survey</h1>

<h4>survey id = ${params.id}</h4>
<h4>survey question is ${params.question}</h4>
`;

const homeTemplate = html`<h1>im home</h1>`;

const surveyListTemplate = (survey) => html`
<h1>${survey.question}</h1>
`;

// function replaceSurveyList(surveys){

//     let template: () => TemplateResult; 

// }

window.addEventListener('hashchange', function(){
    console.log(history.state);
    if(location.hash.includes('#survey/')){

    
    console.log(location.hash);
    let displaySurvey = getParams();
    displaySurvey.then(function(result){

        // window.history.replaceState('pushstate from url typeing in change', null, `/#survey/${result.id}`)
    render(myTemplate(result), document.getElementById('example1'));
    render('', document.getElementById('totalSurvey'));
})}

else if(location.hash.includes('#home')){
    render(homeTemplate, document.getElementById('example1'));
}
    });

    async function createSurvey(e) {
        e.preventDefault();
       let test = await getCurrentDate()
       let numChildren = document.getElementById("radioDiv").children;
       let question = await getQuestion(numChildren);
       let choices = await getChoices(numChildren);
       let jsonSurvey = await createJsonSurvey(question, choices);
   
       fetch('http://localhost:8080/polls/'+jsonSurvey[1], {
           method: 'POST',
           headers: {
               
                'Content-Type': 'application/json'
           },
           body: JSON.stringify(jsonSurvey[0])
       })
       .then(response => response.json())
       .then(function(data){
        //    window.location.hash = `#survey/${data.id}`;
           // console.log(window.location.hash);
           // console.log(location.hash)
            window.history.pushState(data, null, `#survey/${data.id}`);
            render(myTemplate(data), document.getElementById('example1'));
    render('', document.getElementById('totalSurvey'));
           return data;
       }).catch((error) =>
       {
           console.error('Error', error);
       });
   };

window.addEventListener('popstate', (e) => {
console.log(e.state);
if(e.state === 'home'){
    console.log('home popping from template module');
}
else if(e.state === 'pushstate from url typeing in change'){
    console.log('url typeing popping from template module');
}

else if(e.state === '/#home'){
    console.log('state test from initial survey creation popping from template module');
    render(homeTemplate, document.getElementById('example1'));
}

else if(e.state === 'mysurvey'){
    let templateList = creatingTemplateList();
    
    templateList.then(function(result){
        render(result, document.getElementById('example1'));
});
    
}
});

element.addEventListener('click', createSurvey, false);

mySurveyButton.addEventListener('click', displaySurveys, false);

async function displaySurveys(){
    window.history.pushState('mysurvey', null, `#mysurveys`);

    let templateList = creatingTemplateList();

    templateList.then(function(result){
        render(result, document.getElementById('example1'));
});};

async function creatingTemplateList(){
    let array1 = await getList();

    const templates = array1.map(element => {
        return html`
        <tr>
        <td>${element.question}</td>
        </tr>`;});

        const ulTemplate = html`
        <h1>Here are Your surveys</h1>
        
        <table>
        <tr>
            <th>Question</th>
        </tr>
            ${templates}
        </table>`;

    
        return ulTemplate;
};



function getList(){
    return fetch('http://localhost:8080/polls/all_surveys?' + new URLSearchParams({
        userId: 3
    }), {
        method: 'GET',
        headers: {
            
             'Content-Type': 'application/json'
        },
    }).then(function(response) {
        return response.json();
    }).then(function(polls){
        return polls;
    })};

export {render};


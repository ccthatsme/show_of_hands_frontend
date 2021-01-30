import {html, render, nothing, TemplateResult} from '../../node_modules/lit-html/lit-html.js';
const mySurveyButton = document.getElementById('mysurvey');


const myTemplate = (params) => html`
    <h1>survey</h1>

    <h4>survey id = ${params.id}</h4>
    <h4>survey question is ${params.question}</h4>
`;

const homeTemplate = html`
<div id="radioAurvey" @click=${createChoices}>
<label>How Many Choices do you Need?
<input type="radio" name="radioChoice" value="2">2
<input type="radio" name="radioChoice"  value="3">3
<input type="radio" name="radioChoice"  value="4">4
    
</label><br>

</div>`;

const actionButtons = html`
<button id="create" @click=${createSurvey}>Create!</button>
`;


// function clickHandler(e){
//     console.log(e);
// }

async function createInputs(x){

    await deleteInputs();
    
    let quesInput = questionInput;
    radioDiv.innerHTML = quesInput;

    for (let index = 1; index <= x ; index++) {
       let input = document.createElement('input')

        input.setAttribute('placeholder',`choice${index}`);
        input.setAttribute('id', `choice${index}`)
        input.setAttribute('class', `radioDivChildren`);

        radioDiv.appendChild(input);
    }

}

function createChoices(e){
    e.stopPropagation()
  let list = document.querySelectorAll('input[name="radioChoice"]');

    for (const item of list){
        if(item.checked){
            createInputs(item.value);
        }
    }

};

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
            window.history.pushState(data, null, `#survey/${data.id}`);
            render('', document.getElementById('totalSurvey'));
            render('', document.getElementById('radioDiv'));
            render('', document.getElementById('actionButtons'));
            render(myTemplate(data), document.getElementById('example1'));
           return data;
       }).catch((error) =>
       {
           console.error('Error', error);
       });
   };

async function displaySurveys(){
    window.history.pushState('mysurvey', null, `#mysurveys`);
    console.log('displayhing surveys')
    let templateList = creatingTemplateList();

    const radioDivChildren = document.getElementsByClassName('radioDivChildren');

    Array.from(radioDivChildren).forEach(element => {
        element.remove();
    });

    // radioDivChildren.array.forEach(element => {
    //     console.log(element);
    //     element.remove();
    // });

    templateList.then(await function(result){
        render('', document.getElementById('radioDiv'));
        render('', document.getElementById('totalSurvey'));
        render('', document.getElementById('actionButtons'));
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

window.addEventListener('popstate', (e) => {

        if(e.state === '/#home'){
           
           
            render(homeTemplate, document.getElementById('totalSurvey'));
            render(actionButtons, document.getElementById('actionButtons'));
            render('', document.getElementById('example1'));
        }
        
        else if(e.state === 'mysurvey'){
            let templateList = creatingTemplateList();
            
            templateList.then(function(result){
                render('', document.getElementById('totalSurvey'));
                render('', document.getElementById('radioDiv'));
                render(result, document.getElementById('example1'));
        });
}

else if(e.state !== 'mysurvey' || e.state !== '/#home'){
             render('', document.getElementById('totalSurvey'));
            render('', document.getElementById('actionButtons'));
            render(myTemplate(e.state), document.getElementById('example1'));
            // render(myTemplate(e.state), document.getElementById('example1'));
}


});
        
element.addEventListener('click', createSurvey, false);
        
mySurveyButton.addEventListener('click', displaySurveys, false);

radioForm.addEventListener('click', createChoices, false);

// window.addEventListener('hashchange', function(){
//     console.log('hashchange');
//             if(location.hash.includes('#survey/')){
//                 let displaySurvey = getParams();
//                 displaySurvey.then(function(result){
//                 render(myTemplate(result), document.getElementById('example1'));
//                 render('', document.getElementById('totalSurvey'));
//                 render('', document.getElementById('radioDiv'));
//             })}
            
//             else if(location.hash.includes('#home')){
                
//                 render(homeTemplate, document.getElementById('totalSurvey'));
// }

// else if(location.hash.includes('#mysurveys')) {
//     render('', document.getElementById('totalSurvey'));
//     render('', document.getElementById('radioDiv'));
//     render('', document.getElementById('actionButtons'));
// }

// });

export {render};


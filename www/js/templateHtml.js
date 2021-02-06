import {html, render, nothing, TemplateResult} from '../../node_modules/lit-html/lit-html.js';
const mySurveyButton = document.getElementById('mysurvey');
const radioDivParent = document.getElementById('radioDivParent');
let surveyChoices = null;


const myTemplate = (params) => {

   if(typeof params.choiceFour != 'undefined'){
    return html`
    <h1>survey</h1>

    <h4>${params.question}</h4>

    <button>${params.choiceOne}</button>
    <button>${params.choiceTwo}</button>
    <button>${params.choiceThree}</button>
    <button>${params.choiceFour}</button>
`;
}

    else if(typeof params.choiceThree != 'undefined'){
        return html`
        <h1>survey</h1>

        <h4>${params.question}</h4>

        <div id="surveyChoices" @click=${getChoiceSelection}>
        <button id="choiceOne">${params.choiceOne}</button>
        <button id="choiceTwo">${params.choiceTwo}</button>
        <button id="choiceThree">${params.choiceThree}</button>
        </div>
`;
}

    else if (typeof params.choiceTwo !== 'undefined'){
        return html`<div>test</div>`;
}

};

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

function getChoiceSelection(e){
    console.log(e.target.id);
    let choiceSelected = e.target.id;
    let result = 0;
    let resultRecording = null;


   switch (choiceSelected) {
       case "choiceOne":
           result++;
           resultRecording ={"resultRecording": "resultOne", "result": result };
           break;

        case "choiceTwo":
            result++
            resultRecording ={"resultRecording": "resultTwo", "result": result };
            break;
        
        case "choiceThree":
            result++;
            resultRecording ={"resultRecording": "resultThree", "result": result };
            break;

       default:
           break;
   }

   console.log(resultRecording);

   recordChoice(resultRecording);
    
}

async function recordChoice(resultRecording){

    let surveyId = window.location.hash.substring(8,11);

    let survey = await getSurveyById(surveyId);

    for (const prop in survey){
        if (prop === resultRecording.resultRecording){
            survey[prop] = resultRecording.result;
        }
    }

    console.log(survey);

    fetch('http://localhost:8080/polls/submit_three_poll', {
           method: 'PUT',
           headers: {
               
                'Content-Type': 'application/json'
           },
           body: JSON.stringify(jsonSurvey[0])
       })
}

async function createInputs(x){
    await deleteInputs();
    
    if(!document.body.contains(document.getElementById('radioDiv'))){

        let radioDiva = document.createElement('div');
        radioDiva.setAttribute('id', 'radioDiv');
        let quesInput = questionInput;

        radioDivParent.appendChild(radioDiva);

        radioDiva.innerHTML = quesInput;

        for (let index = 1; index <= x ; index++) {
            let input = document.createElement('input')
     
             input.setAttribute('placeholder',`choice${index}`);
             input.setAttribute('id', `choice${index}`)
             input.setAttribute('class', `radioDivChildren`);
     
             radioDiva.appendChild(input);
         }
    }

    else{
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
   
       const radioDivChildren = document.getElementsByClassName('radioDivChildren');

       Array.from(radioDivChildren).forEach(element => {
        element.remove();
        });

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
            surveyChoices = document.getElementById('surveyChoices');
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

    // const rd = document.getElementById('radioDivParent');

    //  rd.remove();

    Array.from(radioDivChildren).forEach(element => {
        element.remove();
    });

    templateList.then(await function(result){
        render('', document.getElementById('radioDivParent'));
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
           
            console.log('hello!!')
           
            render(homeTemplate, document.getElementById('totalSurvey'));
            render(actionButtons, document.getElementById('actionButtons'));
            render('', document.getElementById('example1'));
        }
        
        else if(e.state === 'mysurvey'){
            let templateList = creatingTemplateList();
            
            templateList.then(function(result){
                render('', document.getElementById('totalSurvey'));

                if(document.body.contains(document.getElementById('radioDiv'))){
                    console.log('remove radioDiv if you pop to mysurvey')
                    const radioDivChildren = document.getElementsByClassName('radioDivChildren');

                    Array.from(radioDivChildren).forEach(element => {
                     element.remove();
                     });
                    // render('', document.getElementById('radioDiv'));
                }

                if(document.body.contains(document.getElementById('actionButtons'))){
                    render('', document.getElementById('actionButtons'));
                }

                // render('', document.getElementById('radioDiv'));
                render(result, document.getElementById('example1'));
        });
}

else if(e.state !== 'mysurvey' || e.state !== '/#home'){

    const radioDivChildren = document.getElementsByClassName('radioDivChildren');

    Array.from(radioDivChildren).forEach(element => {
     element.remove();
     });

             render('', document.getElementById('totalSurvey'));
            render('', document.getElementById('actionButtons'));
            // render('', document.getElementById('radioDiv'));
            // render('', document.getElementById('radioDivParent'));
            render(myTemplate(e.state), document.getElementById('example1'));
            // render(myTemplate(e.state), document.getElementById('example1'));
}


});
        
element.addEventListener('click', createSurvey, false);
        
mySurveyButton.addEventListener('click', displaySurveys, false);

radioForm.addEventListener('click', createChoices, false);

// surveyChoices.addEventListener('click', getChoiceSelection, false);

export {render};


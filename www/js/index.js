

 const element = document.getElementById('create');
const radioForm = document.getElementById('radioSurvey');
const radioDiv = document.getElementById('radioDiv');
const questionInput = `<label for="question"></label><br>
<input type="text" id="question" placeholder="Question"><br>`;

window.onload = () =>{
    //window.location.hash = '#/home';
    window.history.pushState(null, null, '/#home');
}

async function createSurvey(e) {
     e.preventDefault();
    let test = await getCurrentDate()
    console.log(test);
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
    .then(data => {
        let expires = getCurrentDate();
        //document.cookie = 'survey='+JSON.stringify(data) + ';' + ' expires=' + expires + ';  path=/;';
         console.log(data.id);
        // let url = new URL(window.location.href + `/survey/${data.id}`);
        // console.log(url);
        // url.searchParams.set("surveyId", data.id);
        window.location.hash = `#/survey/${data.id}`;
         window.history.pushState({}, '', `/#survey/${data.id}`);
        // window.location.replace("survey.html")
    }).catch((error) =>
    {
        console.error('Error', error);
    });
};

function getSurvey(e){
    e.preventDefault();
    fetch('http://localhost:8080/polls', {
        method: 'GET',
        headers: {
            
             'Content-Type': 'application/json'
        }
    }).then(function(response) {
        console.log(response);
        return response.json();
    }).then(function(polls){
        console.log(polls);
        return polls;
    })};

async function createInputs(x){

    await deleteInputs();
    
    let quesInput = questionInput;
    radioDiv.innerHTML = quesInput;

    for (let index = 1; index <= x ; index++) {
       let input = document.createElement('input')

        input.setAttribute('placeholder',`choice${index}`);
        input.setAttribute('id', `choice${index}`)

        radioDiv.appendChild(input);
    }

}

function deleteInputs(){
    
    while(radioDiv.children.length !== 0)  {
        radioDiv.removeChild(radioDiv.lastChild);
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



radioForm.addEventListener('click', createChoices, false);
element.addEventListener('click', createSurvey, false);
test.addEventListener('click', getSurvey, false);
//test.addEventListener()

window.addEventListener('hashchange', async () => {
   if(location.hash.includes('#survey/')){
       //this works
console.log('got here');
let url = location.hash.substring(1);
console.log(url);
// survey/125
let parts = url.split('/');
let params = [];
let obj = {};

obj[parts[0]] = parts[1];

params.push(obj);

let survey = await getSurveyById(params[0].survey)

console.log(survey);
//render(myTemplate(survey), app);

app.innerHTML = `<h1>survey</h1>
<br>
<h4>${survey.id}</h4>`;

console.log(params[0].survey);
   }
});


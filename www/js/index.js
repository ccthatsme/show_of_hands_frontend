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
        window.location.hash = `/#survey/${data.id}`;
        console.log(window.location.hash);
        console.log(location.hash)
         window.history.pushState(null, null, `/#survey/${data.id}`);
        return data;
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
        return response.json();
    }).then(function(polls){
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


// window.addEventListener('popstate', function(popStateEvent){
//     console.log("popstate event fired");
//     console.log(popStateEvent.state);
//     if(location.hash.includes('#/#')){
//         window.history.pushState(null, null, `/#survey`);
//     }
// });
radioForm.addEventListener('click', createChoices, false);
element.addEventListener('click', createSurvey, false);
test.addEventListener('click', getSurvey, false);

async function getParams(){
    if(location.hash.includes('#survey/')){
    
 let url = location.hash.substring(1);
console.log(url);
 let parts = url.split('/');
 let params = [];
 let obj = {};
 
 obj[parts[0]] = parts[1];
 
 params.push(obj);
 
 let survey = await getSurveyById(params[0].survey)
 return survey;
}
return
};
 const element = document.getElementById('create');
const radioForm = document.getElementById('radioSurvey');
const radioDiv = document.getElementById('radioDiv');


async function createSurvey(e) {
     e.preventDefault();
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
        document.cookie = 'survey='+JSON.stringify(data);
        window.location.replace("survey.html")
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

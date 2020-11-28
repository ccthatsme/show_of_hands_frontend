 const element = document.getElementById('create');
const question = document.getElementById('question');
const choiceOne = document.getElementById('choice1');
const choiceTwo = document.getElementById('choice2');
const choiceThree = document.getElementById('choice3');
const test = document.getElementById('test');
const radioForm = document.getElementById('radioSurvey');
const radioDiv = document.getElementById('radioDiv');


async function createSurvey(e) {
     e.preventDefault();
    let numChildren = document.getElementById("radioDiv").children;
    let question = getQuestion(numChildren);
    let choices = getChoices(numChildren);
    let jsonSurvey = createJsonSurvey(question, choices);

    fetch('http://localhost:8080/polls/'+jsonSurvey[1], {
        method: 'POST',
        headers: {
            
             'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonSurvey[0])
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
    
    let quesInput = `<label for="question"></label><br>
    <input type="text" id="question" placeholder="Question"><br>`;
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

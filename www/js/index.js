const element = document.getElementById('create');
const radioForm = document.getElementById('radioSurvey');
// const radioDiv = document.getElementById('radioDiv');
const questionInput = `<label class="radioDivChildren" for="question"></label><br class="radioDivChildren">
<input class="radioDivChildren" type="text" id="question" placeholder="Question"><br class="radioDivChildren">`;
const backButton = document.getElementById('back');

window.onload = () =>{
    history.replaceState('/#home', "home", '/#home');
}

// async function createInputs(x){

//     await deleteInputs();
    
//     let quesInput = questionInput;
//     radioDiv.innerHTML = quesInput;

//     for (let index = 1; index <= x ; index++) {
//        let input = document.createElement('input')

//         input.setAttribute('placeholder',`choice${index}`);
//         input.setAttribute('id', `choice${index}`)

//         radioDiv.appendChild(input);
//     }

// }

function deleteInputs(){
    let radioDiv = document.getElementById('radioDiv');

    if(radioDiv !== null){

    console.log('deleting inputs')
    while(radioDiv.children.length !== 0)  {
        radioDiv.removeChild(radioDiv.lastChild);
      }
    }
}

// function createChoices(e){
//     e.stopPropagation()
//   let list = document.querySelectorAll('input[name="radioChoice"]');

//     for (const item of list){
//         if(item.checked){
//             createInputs(item.value);
//         }
//     }

// };

async function getParams(){
    if(location.hash.includes('#survey/')){
    
        let url = location.hash.substring(1);
   
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

function goingBack(){
    window.history.go(-1);
    console.log(history);
}

function goingForward(){
    window.history.forward();
    console.log(history);
}

//radioForm.addEventListener('click', createChoices, false);
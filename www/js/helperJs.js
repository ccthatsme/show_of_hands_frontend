const questionInput = `<label for="question"></label><br>
<input type="text" id="question" placeholder="Question"><br>`;
const surveySection = document.getElementById('surveySection');

function createdSurveyGen(data){

    let createdSurvey = ` <h1> ${data.question} </h1>
    <table>
        <thead>Select</thead>
         <tr><button>${data.choiceOne}</button></tr>
         <tr><button>${data.choiceTwo}</button></tr>
         <tr><button>${data.choiceThree}</button></tr>

    </table>`;



}
const questionInput = `<label for="question"></label><br>
<input type="text" id="question" placeholder="Question"><br>`;

window.onload = findSurveySection;

function findSurveySection(){
    const surveySection = document.getElementById('surveySection');
}

async function createdSurveyGen(data){
    window.location.replace("survey.html")
    let createdSurvey = `<h1> ${data.question} </h1>
    <table>
        <thead>Select</thead>
         <tr name="tr"><input type='submit' id="resultOne">${data.choiceOne}</input></tr>

         <tr name="tr"><input type='submit' id="resultTwo">${data.choiceTwo}</input></tr>

         <tr name="tr"><input type='submit' id="resultThree">${data.choiceThree}</input></tr>
    </table>`;

console.log(surveySection);
    surveySection.innerHTML = createdSurvey;

    // window.location.replace("survey.html")

}
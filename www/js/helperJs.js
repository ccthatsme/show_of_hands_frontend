const questionInput = `<label for="question"></label><br>
<input type="text" id="question" placeholder="Question"><br>`;

window.onload = findSurveySection;

function findSurveySection(){
    const surveySection = document.getElementById('surveySection');
    console.log('on load ran')

    console.log(document.cookie);
    let createdSurvey = `<h1> </h1>
    <table>
        <thead>Select</thead>
         <tr name="tr"><input type='submit' id="resultOne">aasdf</input></tr>

         <tr name="tr"><input type='submit' id="resultTwo"></input></tr>

         <tr name="tr"><input type='submit' id="resultThree"></input></tr>
    </table>`;
console.log(surveySection);
    surveySection.innerHTML = createdSurvey;
}

async function createdSurveyGen(e){
    e.preventDefault();
    window.location.replace("survey.html")
    console.log(document.cookie);
    let createdSurvey = `<h1> ${data.question} </h1>
    <table>
        <thead>Select</thead>
         <tr name="tr"><input type='submit' id="resultOne"></input></tr>

         <tr name="tr"><input type='submit' id="resultTwo"></input></tr>

         <tr name="tr"><input type='submit' id="resultThree"></input></tr>
    </table>`;

console.log(surveySection);
    surveySection.innerHTML = createdSurvey;

    // window.location.replace("survey.html")

}
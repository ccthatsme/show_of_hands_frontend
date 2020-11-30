const questionInput = `<label for="question"></label><br>
<input type="text" id="question" placeholder="Question"><br>`;

window.onload = findSurveySection;

function unpackCookie(x){

    let array = x.split('=');

    let json = JSON.parse(array[1]);

    return json;

}

function findSurveySection(){
    const surveySection = document.getElementById('surveySection');
    let x = document.cookie;
    let json = unpackCookie(x);

    let createdSurvey = `<h1>${json.question} </h1>
    <ul style='list-style-type:none;'>

    <li><input type='submit' id="choiceOne" value="${json.choiceOne}"/></li>
    <li><input type='submit' id="choiceTwo" value="${json.choiceTwo}"/></li>
    <li><input type='submit' id="choiceThree" value="${json.choiceThree}"/></li>

    </ul>`;

    surveySection.innerHTML = createdSurvey;
}

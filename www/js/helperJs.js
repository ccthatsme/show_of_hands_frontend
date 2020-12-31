function unpackCookie(x){

    let array = x.split('=');

    let json = JSON.parse(array[1]);
    return json;

}

function deleteCookie(){
    document.cookie = 'survey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}


 function getSurveyById(id){
    
  return fetch('http://localhost:8080/polls?' + new URLSearchParams({
        surveyId: id
    }), {
        method: 'GET',
        headers: {
            
             'Content-Type': 'application/json'
        }
    }).then( function(response) {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
    }).then( function(poll){

        return poll;
    })};

async function findSurveySection(){
    let x = document.cookie;
    let json = unpackCookie(x);
    let url = new URL(window.location);
    url.searchParams.set("surveyId", json.id);
    await deleteCookie();
    
    window.history.pushState({}, '', url);

    const surveySection = document.getElementById('surveySection');
    
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('surveyId');
    

let json2 = await getSurveyById(myParam);
    
    let createdSurvey = `<h1>${json2.question} </h1>
    <ul style='list-style-type:none;'>

    <li><input type='submit' id="choiceOne" value="${json2.choiceOne}"/></li>
    <li><input type='submit' id="choiceTwo" value="${json2.choiceTwo}"/></li>
    <li><input type='submit' id="choiceThree" value="${json2.choiceThree}"/></li>

    </ul>`;

    surveySection.innerHTML = createdSurvey;
}

function testRouter(){
    var Router = function(name, routes){
        return{
            name: name,
            routes: routes
        }
    }
}

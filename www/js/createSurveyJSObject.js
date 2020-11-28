
function getQuestion(array){
    for (const element of array) {
        if (element.id === 'question') {
            return element.value;
    }
}
    return
}

function getChoices(array){
    let choices = [];
    for (const element of array) {
        if (element.id.indexOf('choice') !== -1) {
            console.log('in conditional')
            choices.push(element.value)
        }
    }
    return choices;
}

function createJsonSurvey(question, choices){
    let array = [];
    switch (choices.length) {
        case 2:
            let survey2 = {
                "question": question,
                "choiceOne":choices[0],
                "choiceTwo":choices[1],
                "user":{
                    "id": 3,
                    "userName": "jthomas",
                    "email": "jt43@gmail.com",
                    "password": "sample"
                    }
            }
            array.push(survey2, "threepoll")
            return array;
        case 3:
            let survey3 = {
                "question": question,
                "choiceOne":choices[0],
                "choiceTwo":choices[1],
                "choiceThree":choices[2],
                "user":{
                    "id": 3,
                    "userName": "jthomas",
                    "email": "jt43@gmail.com",
                    "password": "sample"
                    }
            }
            return survey3;
        case 4:
            let survey4 = {
                "question": question,
                "choiceOne":choices[0],
                "choiceTwo":choices[1],
                "choiceThree":choices[2],
                "choiceFour":choices[3],
                "user":{
                    "id": 3,
                    "userName": "jthomas",
                    "email": "jt43@gmail.com",
                    "password": "sample"
                    }
            }
            return survey4;

        default:
            console.log('nothing created, try again')
            break;
    }
        return;
}
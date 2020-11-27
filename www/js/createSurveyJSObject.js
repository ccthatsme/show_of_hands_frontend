
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
    console.log(choices)
    return choices;

}
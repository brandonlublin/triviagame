# triviagame
# Timed Movie Trivia Game
A trivia game using JavaScript for the logic and jQuery to manipulate HTML.
<img src="assets/images/start.jpng" alt="trivia game">
Live Application - https://brandonlublin.github.io/triviagame/
- A form with multiple choices (player can only select 1 answer)
- The player will have a limited amount of time to finish the quiz.
- The game ends when the time runs out or player clicks submit. 
- Then the page will reveal the number of questions that players answer correctly and incorrectly.
<img src="assets/images/end.jpng" alt="trivia game">
### Creating the game
Store initial game data as a global object grouping all the data together and making it a little harder to have a error with local variable names
```
var gameData = {
intervalId: null,
timeLeft: 31,
correctAnswers: 0,
incorrectAnswers: 0,
userAnswers: []
}
```
Create game questions and options using jQuery
```
function createQuestionsHtml(){
for(var i = 0;i<questionsObj.length;i++){
var wrap = $('<div>').addClass('questions q-wrap').attr('id', 'quetion-'+i);
var question = $('<p>').addClass('q-text').text(questionsObj[i].question);
var optionWrap = $('<div>').addClass('o-wrap');
for(var j = 0; j < questionsObj[i].choices.length; j++){
var options = questionsObj[i].choices;
var radioOption = '<input type="radio" data-index="'+i+' "class="option" id="o-'+j+'" name="question'+i+'" value="'+options[j]+'">'+options[j];
$(optionWrap).append(radioOption);
}

$(wrap).append(question, optionWrap);
displayQuestionsHtml(wrap);
}
}
Event listen on `change` for the radio button
update an array that holds each questions answer at the index the question lives in another array. This make it easy to check the users answers at the end of the game and allows user to change their answer multiple times.
```
$('#questions').on('change', '.option', function(event){
var selectedOptionName = $(this).attr('name');
var userAnswer = $('input[name='+selectedOptionName+']:checked').val();
var index = $(this).data('index');
gameData.userAnswers.splice(index,1, userAnswer);
});
Check if user answers are right or wrong
```
function evalutateUserAnswers(){ 
for(var i = 0; i< gameData.userAnswers.length; i++){
if(gameData.userAnswers[i] === questionsObj[i].answer){
gameData.correctAnswers++
}else {
gameData.incorrectAnswers++ 
}
}
}
```
## Built With
* [Bootstrap](https://getbootstrap.com/) - Frontend framework used
* [jQuery](https://jquery.com/) - JavaScript library used
## Acknowledgments
* Hat tip to anyone whose code was used

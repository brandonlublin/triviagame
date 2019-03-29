$(document).ready(function(){
    //setting data variables and time to countdown
    var gameData = {
        intervalId: null,
        timeLeft: 31,
        correctAnswers: 0,
        incorrectAnswers: 0,
        userAnswers: []
    }
    //question object, displays the question, choices for each, and the answer by index of the array
    var questionsObj = [
        {
            question: 'In the movie "Happy Gilmore", what sport did Adam Sandler play?',
            choices: ['Golf', 'Football', 'Foosball', 'Soccer'],
            answer: 'Golf'
        },
        {
            question: 'What type of action figure was Woody in the movie "Toy Story"?',
            choices: ['Donkey', 'Frog', 'Cowboy', 'Lizard'],
            answer: 'Cowboy'
        }, 
        {
            question: 'Who were the two primary characters in the movie "Pulp Fiction"?',
            choices: ['John Stamos & Sylvester Stallone', 'Ricky Martin and Christina Aguilera', 'Bob Ross & Hillary Clinton', 'John Travolta & Samuel L. Jackson'],
            answer: 'John Travolta & Samuel L. Jackson'
        },
        {
            question: 'In the movie "The Big Lebowski", Jeff Bridges was often referred to as the ______ ',
            choices: ['Loser', 'Silent One', 'Dude', 'Solo Dolo'],
            answer: 'Dude'
        }, 
        {
            question: 'In the 1994 movie "The Lion King", Mufasa\'s wife name was _______.?',
            choices: ['Beyonce', 'Shakira', 'Cher', 'Nala'],
            answer: 'Nala'
        }, 
        {
            question: 'What would have happened if the Keanu Reeves allowed the bus to drop below 50 MPH in the movie "Speed"?',
            choices: ['The bus would explode', 'His phone would explode', 'His wife would\'ve lost her job', 'The bus driver would give him a high 5'],
            answer: 'The bus would explode'
        }, 
        {
            question: '"Hasta La Vista, Baby" was a famous quote from this 1991 film.',
            choices: ['Terminator 2', 'Terminator 3', 'A Bug\'s Life', 'Pee Wee Herman\'s Vacation'],
            answer: 'Terminator 2'
        }
    ];

    $('#questions').hide();
    $('#gameOver').hide();
    $('#submitButton').hide();

    function populateUserAnswers(){
        for(var i = 0; i< questionsObj.length; i++){
            gameData.userAnswers.push(null)
        }
    }

    populateUserAnswers();

    // check if user answers are right or wrong
    function evaluateUserAnswers(){ 
        for(var i = 0; i< gameData.userAnswers.length; i++){
            if(gameData.userAnswers[i] === questionsObj[i].answer){
                gameData.correctAnswers++
            }else {
                gameData.incorrectAnswers++ 
            }
        }
    }

    // create game questions and options
    function createQuestionsHtml(){
        for(var i = 0; i < questionsObj.length;i++){
            var wrap = $('<div>').addClass('questions q-wrap').attr('id', 'question-'+i);
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

    // displaying game questions on the page
    function displayQuestionsHtml(wrap){
        $('#questions').append(wrap)
    }

    // update users answer for each question on change
    $('#questions').on('change', '.option', function(event){
        var selectedOptionName = $(this).attr('name');
        var userAnswer = $('input[name='+selectedOptionName+']:checked').val();
        var index = $(this).data('index');
        gameData.userAnswers.splice(index,1, userAnswer);
    });

    function runGame(){
        //display the questions after the game has started 
        $('#startContainer').hide();
        $('#instructionContainer').hide();
        createQuestionsHtml();
        $('#questions').show();
        $('#submitButton').show();

        //start timer and allow button clicks on bubbles 
        startTimer();
        decrement();
    }


    $('#startContainer').on('click', function() {
        //hides the start button and instruction panel, shows questions, starts countdown
        runGame();
        //initiate jeopardy song 
        $('#jeopardy')[0].play();
    });

    function startTimer() {
        clearInterval(gameData.intervalId);
        gameData.intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        //  Decrease number by one.
        gameData.timeLeft--;
            //  Show the number in the #show-number tag.
        $('#timeRemaining').html('<h2>' + gameData.timeLeft + ' Seconds Remaining' + '</h2>');
        //  Once number hits zero...
        if (gameData.timeLeft === 0) {
            //Stop the game and Alert the user that they lost
            stopGame();
        }
    }

    $('#submitButton').on('click', function() {
        stopGame();
        //scroll to the top of the page so the user doesn't have to
        $(window).scrollTop(0);
    })

    function stopGame() {
        //if time hits zero, Stop the game and Alert the user that they lost
        clearInterval(gameData.intervalId);
        $('#timeRemaining').html('<h2>The game has ended!</h2>');
        $('#questions').empty().hide();

        //display game over container and hide the submit button 
        $('#gameOver').show();
        $('#submitButton').hide();

        evaluateUserAnswers();

        $('#correctAnswersTotal').text('You answered ' + gameData.correctAnswers + ' correctly.');
        $('#incorrectAnswersTotal').text('You answered ' + gameData.incorrectAnswers + ' incorrectly.');
        
        //pause jeopardy music and play finish trumpet
        $('#jeopardy')[0].pause();
        $('#jeopardy').currentTime = 0;
        $('#trumpet')[0].play();
    }

     //asks user to play again, restarts game if clicked
    $('.playAgainButton').on('click', function() {
        //restart variables 
        gameData.timeLeft = 31;
        gameData.correctAnswers = 0;
        gameData.incorrectAnswers = 0;

        //toggle songs, toggle viewport

        $('#gameOver').hide();
        $('#instructionContainer').show();
        $('#trumpet')[0].pause();
        $('#jeopardy')[0].play();
        runGame();
    })

});
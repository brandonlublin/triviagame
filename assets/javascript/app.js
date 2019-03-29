window.onload = function () {

    //setting data variables and time to countdown
    var intervalId;
    var timeLeft = 31;
    var correctAnswers;
    var incorrectAnswers;
    
    //question object, displays the question, choices for each, and the answer by index of the array
    var questionsObj = [{
        question1: 'In the movie "Happy Gilmore", what sport did Adam Sandler play?',
        choices: ['Golf', 'Football', 'Foosball', 'Soccer'],
        answer: 0
    }, {
        question2: 'What type of action figure was Woody in the movie "Toy Story"?',
        choices: ['John Stamos & Sylvester Stallone', 'Ricky Martin and Christina Aguilera', 'Bob Ross & Hillary Clinton', 'John Travolta & Samuel L. Jackson'],
        answer: 3
    }, {
        question3: 'Who were the two primary characters in the movie "Pulp Fiction"?',
        choices: ['Loser', 'Silent One', 'Dude', 'Solo Dolo'],
        answer: 2
    }, {
        question4: 'In the movie "The Big Lebowski", Jeff Bridges was often referred to as the ______ ',
        choices: ['Beyonce', 'Shakira', 'Cher', 'Nala'],
        answer: 3
    }, {
        question5: 'In the 1994 movie "The Lion King", Mufasa\'s wife name was _______.?',
        choices: ['Golf', 'Football', 'Foosball', 'Soccer'],
        answer: 1
    }, {
        question6: 'What would have happened if the Keanu Reeves allowed the bus to drop below 50 MPH in the movie "Speed"?',
        choices: ['The bus would explode', 'His phone would explode', 'His wife would\'ve lost her job', 'The bus driver would give him a high 5'],
        answer: 0
    }, {
        question7: '"Hasta La Vista, Baby" was a famous quote from this 1991 film.',
        choices: ['Terminator 2', 'Terminator 3', 'A Bug\'s Life', 'Pee Wee Herman\'s Vacation'],
        answer: 1
    }];

    function determineCorrectAnswer() {
        
        // if (quiz.questions.question1.value == 'Football') {
        //     correctAnswers++

        // }
        // if (quiz.questions.question2.value == questionsObj.answer) {
        //     correctAnswers++

            
        // }
        // if (quiz.questions.question3.value == 'Dude') {
        //     correctAnswers++
        // }
        // if (quiz.questions.question4.value == 'Football') {
        //     correctAnswers++
        // }
        // if (quiz.questions.question5.value == 'Football') {
        //     correctAnswers++
        // }
        // if (quiz.questions.question6.value == 'Football') {
        //     correctAnswers++
        // }
        // if (quiz.questions.question7.value == 'Football') {
        //     correctAnswers++
        // }

    }
    $('#questions').hide();
    $('#gameOver').hide();
    $('#submitButton').hide();
    //start game function
    $('#startContainer').on('click', function() {
        //hides the start button and instruction panel, shows questions, starts countdown
        $('#startContainer').hide();
        $('#instructionContainer').hide();

        //display the questions after the game has started 
        $('#questions').show();
        $('#submitButton').show();

        //start timer and allow button clicks on bubbles 
        runGame();
        decrement();

        //initiate jeopardy song 
        $('#jeopardy')[0].play();
    })
    function runGame() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }
    function decrement() {
        //  Decrease number by one.
        timeLeft--;
            //  Show the number in the #show-number tag.
        $('#timeRemaining').html('<h2>' + timeLeft + ' Seconds Remaining' + '</h2>');
        //  Once number hits zero...
        if (timeLeft === 0) {
            //Stop the game and Alert the user that they lost
            stopGame();
        }
    }
    //allow user to submit answers before the time runs out
    $('#submitButton').on('click', function() {
        stopGame();
        //scroll to the top of the page so the user doesn't have to
        $(window).scrollTop(0);
    })
    function stopGame() {
        //if time hits zero, Stop the game and Alert the user that they lost
        clearInterval(intervalId);
        $('#timeRemaining').html('<h2>The game has ended!</h2>');
        $('#questions').hide();

        //display game over container and hide the submit button 
        $('#gameOver').show();
        $('#submitButton').hide();

        $('#correctAnswersTotal').text('You answered ' + correctAnswers + ' correctly.')
        $('#incorrectAnswersTotal').text('You answered ' + incorrectAnswers + ' incorrectly.')
        
        //pause jeopardy music and play finish trumpet
        $('#jeopardy')[0].pause();
        $('#jeopardy').currentTime = 0;
        $('#trumpet')[0].play();

        //calculate score
        determineCorrectAnswer();
    }
    //asks user to play again, restarts game if clicked
    $('.playAgainButton').on('click', function() {
        //restart variables 
        timeLeft = 31;
        correctAnswers = 0;
        incorrectAnswers = 0;

        //toggle songs, toggle viewport
        $('#startContainer').show();
        $('#gameOver').hide();
        $('#instructionContainer').show();
        $('#trumpet')[0].pause();
    })
    
}
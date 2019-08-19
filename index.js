







// STATE OF THE APP
const store = {
	index: 0,
	score: 0,
	state: 'off',
};



//Function that generates welcome
function generateWelcome(){
  return `<div class="welcome">
  <h1>Test your animal knowledge</h1>
  <h2>Can you answer all 10 correct ?</h2>
  <button class='btn start-button'>START</button>
</div>`;
}

//Function that Generate Questions
function generateQuestion(question, A, B, C, D,){
  return `<form>
        <fieldset>
        <legend>${question}</legend>
        <label for ='A'><input type='radio' id="A" name='answer' value="${A}" required>${A}</label>
        <label for ='B'><input type='radio' id="B" name='answer' value="${B}" required>${B}</label>
        <label for ='C'><input type='radio' id="C" name='answer' value="${C}" required>${C}</label>
        <label for ='D'><input type='radio' id="D" name='answer' value="${D}" required>${D}</label>
        <button class='btn submit-button'>Submit</button>
        </fieldset>
  </form>`;
}
//Function that keeps track of the score
function generateState() {
	return `<div class='state-inner'>
    <p>Question: ${store.index + 1} of 10</p>
    <p>Current score: ${store.score} of 10</p>
  </div>`;
}
//Function that generates correct answer
function generateCorrect() {
	return `<div class='overlay'>
          <h3>That is correct!</h3>
          <img class= "hands" src = "https://image.flaticon.com/icons/svg/1616/1616567.svg"></img>
          <button class='btn next-button'>Next</button>
           </div>`;
 
}



//Function that generates incorrect answer
function generateIncorrect(){
return `<div class='overlay'>
<h3>That is incorrect!</h3>
<p class = "feedback">The correct answer is ${data[store.index].answer}</p>
<img class= "facePalm" src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/198/face-palm_1f926.png"></img>
<button class='btn next-button'>Next</button>
</div>`;

}
//Function that generates results
function generateResults (){
let message = '';
if (store.score > 8){
  message = "You know your animals!";
} else if (store.score >= 5){
  message = "Almost there. Keep studying!";
} else {
  message = "Not there yet. Go back and try again!";
}

return `<div class='overlay'>
    <h2>You scored ${store.score} out of 10</h2>
    <p>${message}</p>
    <button class='btn reset-button'>Play Again</button>
  </div>
  `;
}

// Correct answer feedback


//RENDER FUCNTIONS
function renderWelcome(){
  const html = generateWelcome();
	$('.container').html(html);
}

function renderQuestion(){
const question = data[store.index].question,
    A = data[store.index].A,
    B = data[store.index].B,
    C = data[store.index].C,
    D = data[store.index].D,
    html = generateQuestion(question, A, B, C, D,);
    $('.container').html(html);
}

function renderCorrect(){
const html = generateCorrect();
$('.container').html(html);
$('.container').css("background-color", "green")
}

function renderIncorrect(){
const html = generateIncorrect();
$('.container').html(html);
$('.container').css("background-color", "red")


}

function renderState(){
const html = generateState();
if (store.state === 'on') {
  $('.state').html(html);
} else {
  $('.state').empty(html);
}
}

function renderResults(){
const html = generateResults();
$('.container').html(html); 
}




//EVENT HANDLERS
function handleStart(){
  $('.container').on('click', '.start-button', () => {
    renderQuestion();
    store.state = 'on';
    renderState();
  });
}

function handleSubmit() {
	$('.container').submit('.submit-button', event => {
		event.preventDefault();
		if ($('input[name="answer"]:checked').val() === data[store.index].answer) {
			store.score++;
			renderCorrect();
		} else {
			renderIncorrect();
		}
		renderState();
  });
}

function handleNext() {
	$('.container').on('click', '.next-button', () => {
		if (store.index >= 9) {
			renderResults();
		} else {
			store.index++;
			renderQuestion();
			renderState();
    }
    $('.container').css('background-color', ' rgba(255, 255, 255, 0.5)')
    $('.feedback').hide(data[store.index].answer)
  
	});
}

function handleRestart(){
$('.container').on('click', '.reset-button', () => {
    store.index = 0;
		store.state = 'off';
		store.score = 0;
		renderWelcome();
		renderState();
});
}

//MAIN
function init() {
	renderWelcome();
	handleStart();
	handleSubmit();
	handleNext();
	handleRestart();
}

$(init());
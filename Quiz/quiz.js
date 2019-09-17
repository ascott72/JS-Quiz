/*
    Date Created: 8/21/19
		Most recent revision: 8/28/19 2:00am
*/

var index=0;
var numCorrect=0;
var numAnswered=0;

var sessionvar= sessionStorage.getItem("testnum");
var testNum = sessionvar.substr(sessionvar.length-1);

var secs=0;
var finalTime="";
var myTimer= {};
$(document).ready(function () {
	
	$('#testh').text("Test "+ testNum); //Header
	$('#qtimer').hide();
	
	//hide instruction box, show test box, start test
	$('#srtbtn').click(function (){
		$('#instr').hide();
		$('#qtimer').fadeIn(3000);
		
		startTest();
		
		//start timer
		myTimer = setInterval(function(){
			++secs;
			$('#qsecs').html((secs % 60).toString().padStart(2,"0"));
			$('#qmins').html(Math.floor(secs /60).toString().padStart(2,"0"));
		},1000);
	});

	
});

//display test question number, questions,and  answers choices
function startTest(){
		var choiceNum =1;
		var qGroup = questions[index];
		$('#testForm').html("<div class='form-group'><label>"+
			"Question "+(index+1)+" of 5</label>"+"<br>"+
			"<h5>"+qGroup.question+"</h5></div>"
			);
		
		for(c in qGroup.choices)
		{
			$('#testForm').append( "<div class='form-check'><input class= 'form-check-input' id = 'choices"+choiceNum+"' type="+qGroup.type+" name='choices'><label for ='choices"+choiceNum+"' class='form-check-label'>"+qGroup.choices[c]+"</label></div>");
			choiceNum++;
		}
		$('#testForm').append( "<hr/><button onclick = 'checkAnswer();return false;' class='btn btn-primary'> Next </button>");
		
	}
//hide test box show result table
	function showResults() {
		$('#testForm,#qtimer, .test-body').hide();
		$('#testResults').html("<table class='table table-hover'><thead><tr scope='col'><th colspan= '2'>Test "+testNum+" Results</th></tr></thead>"+
		"<tbody><tr><th scope='row'>Questions answered:</th><td> "+numAnswered+" of 5</td></tr>"+
			"<tr><th scope='row'>Questions correct:</th><td> "+numCorrect+" of 5</td></tr>"+
			"<tr><th scope='row'>Time elapsed:</th><td>"+finalTime+" </td></tr></tbody><tfoot><tr scope='col'><th colspan='2'><a href ='quiz.html' class='btn btn-primary'>Take Again</a></th></tr></tfoot></table>"
		);
	}

//check answer and load next question
	function checkAnswer() {
		var answered= false;
		var isCorrect= false;
		//if checked question was answered
		$.each($("input[name='choices']:checked"),function(){
			answered=true;
			var choiceId= $(this).attr("id");
			
			//check if answer matches question array answer
			if($.inArray($("label[for="+choiceId+"]").text(),questions[index].answer)!=-1)
				isCorrect= true;
		});

		if(answered) numAnswered++;
		if(isCorrect) numCorrect++;
		index++;
		if(index > questions.length-1)
		{	
			finalTime= $('#qmins').text()+":"+$('#qsecs').text();
			clearInterval(myTimer);
			showResults();
			
		}
		else
			startTest();
	}


	var questions = [
	{
		question: "Where does Batman live?",
		
		choices: [
			"New York","Metropolis","Gotham","Anartica"
		],
		answer:["Gotham"],
		type: "radio"
	},
	{
		question: "How old is Morgan Freeman?",
		
		choices: [
			"500","901","100","2200"
		],
		answer: ["500"],
		type: "radio"
	},
	{
		question: "What color is a chicken egg?",
		
		choices: [
			"Red","Brown","White","Green"
		],
		answer: ["Brown","White"],
		type: "checkbox"
	},
	{
		question: "How old is Google?",
		
		choices: [
			"10 years","25 years","30 years","20 years"
		],
		answer:["20 years"],
		type: "radio"
	},
	{
		question: "Fish is vegan.",
		
		choices: [
			"True","False"
			
		],
		answer:["False"],
		type: "radio"
	}
	];
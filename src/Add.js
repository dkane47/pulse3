import React from 'react';
import './App.css';

/** 
 * Big-picture structure of this app:
 * This is an addition fact practice app. It is live at pulsemath.com/add, and you can read about how it works at pulsemath.com/about
 * Below are some state variables that control the logic the app.
 * The first useEffect function sets up the sequence of problems.
 * The second useEffect function handles a few pieces of logic as the user answers questions.
 * The third useEffect function handles the logic of generating a new problem when step is incremented by other functions.
 * generateProblem increments the step and handles a few other pieces of logic each time the user gets a question right.
 * targetedPractice handles the logic of switching from analyzing mode to practice mode.
 * checkAnswer handles the logic when an answer is submitted and triggers other functions as appropriate.
 * hold handles the logic for repeating a problem when necessary.
 * handleReadyClick controls the logic for beginning a practice session.
 * The app itself consists of Introduction, ProblemDisplay, and CompletionMessage components. 
 * Within ProblemDisplay is one additional Input component. 
 * **/

const Add = () => {
  //state variables
  //logic - sequence, step, operation
  const [logic, setLogic] = React.useState({
    sequence: [], //initialized in useEffect later
    step: -1 //default step
  });
  
  //problem - numbers, answer, startTime
  const [problem, setProblem] = React.useState({
    num1: 0, // First number in the problem
    num2: 0, // Second number in the problem
    operation: 0,
    userAnswer: '', // User's answer to the problem
    startTime: 0 // Timestamp when the problem started
  });
  
  //messages = message1, message2, countdown
  const [messages, setMessages] = React.useState({
    message1: 'Solve it!', // Message to be displayed for the user, either a "Solve it!" prompt or a correction prompt after a mistake
    message2: 'Analyzing...', // Another message for the user, either "Analyzing" before entering practice mode or sharing the fact family in practice mode
    countdown: ' ', // Countdown display to track remaining problems once the user enters practice mode, or an empty string if not used
  });
  
  //displaysettings
  const [displaySettings, setDisplaySettings] = React.useState({
    showContent: false, // Determines whether to show the main content or introduction
    totalProblems: 44, // Total number of problems the user will encounter
    switch: false, // boolean signaling that a user got a question wrong, and should switch modes once corrected
    switched: false // boolean signaling that practice mode has begun
  });
  
  const [holdData, setHoldData] = React.useState({
    hold: false, //hold a problem to repeat because the user got it wrong or answered slowly
    held: [] //problem to repeat
  });
  
  const [isLevelUpVisible, setIsLevelUpVisible] = React.useState(false); //display level up message

  const [timeToTarget, setTimeToTarget] = React.useState(4000); //time to complete a problem before it is labeled slow

  React.useEffect(() => {
    let numbers = [0,1,2,3,5,6]; //list of problems to randomize - doesn't include +0
    let s = numbers.slice().sort(() => Math.random() - 0.5); //randomize list above
    setLogic((prevLogic) => ({ //build sequence
      ...prevLogic,
      sequence: [
        [s[0],0], [s[1],0], [s[2],0], [s[3],0],  //addition
        [s[0],1], [s[1],1], [s[2],1], [s[3],1],   //subtraction
        [s[0],2], [s[1],2], [s[2],2], [s[3],2],  //fill-in-the-blank addition
        [s[0],3], [s[1],3], [s[2],3], [s[3],3],  //fill-in-the-blank subtraction
        [s[4],0], [s[4],1], [s[4],2], [s[4],3], //random mix
        [s[5],0], [s[5],1], [s[5],2], [s[5],3],
        [6,0], [6,1], [6,2], [6,3], //extra 5s-8s
        [7,0], [7,0], [7,1], [7,1], [7,2], [7,2], [7,3], [7,3], //multi-digit
        [8,0], [8,0], [8,1], [8,1], [8,2], [8,2], [8,3], [8,3], [8,0], [8,0], [8,0], [8.0]
      ]
    }));
  }, []);

  React.useEffect(() => {
    if (logic.step % 4 === 0 && logic.step > 0 && logic.step < 17 && !displaySettings.switched) { //logic for level up message
      setIsLevelUpVisible(true); // Make the message visible
    } else {
      setIsLevelUpVisible(false); // Turn off
    }

    if (logic.step % 4 === 1 && logic.step < 10 && !displaySettings.switched) { //logic for time decrements
      setTimeToTarget((prevTimeToTarget) => prevTimeToTarget - 500);
    }
  }, [logic.step, displaySettings.switched]);

  // Core function, generates next problem when step is incremented
  React.useEffect(() => {
    if (logic.step === -1) { //do nothing if ready button hasn't been clicked
      return;
    }
    
    let newNum1; //initialize variables
    let newNum2;
    let op = logic.sequence[logic.step][1]; //pull operation
    const type = logic.sequence[logic.step][0]; //pull fact family
    
    if (type === 0) {
      newNum1 = 1;
      newNum2 = Math.floor(Math.random() * 10 + 1);//1 and 1 through 10
    } else if (type === 1) {
      newNum1 = 2;
      newNum2 = Math.floor(Math.random() * 9 + 2);//2 and 2 through 10
    } else if (type === 2) {
      newNum1 = Math.floor(Math.random() * 8 + 3);//double, 3 through 10
      newNum2 = newNum1;
    } else if (type === 3) {
      newNum1 = Math.floor(Math.random() * 7 + 3);//3 through 9 and num + 1
      newNum2 = newNum1 + 1;
    } else if (type === 4) {
      newNum1 = 0;
      newNum2 = Math.floor(Math.random() * 10 + 1);//0 and 1 through 10
    } else if (type === 5) {
      newNum1 = Math.floor(Math.random() * 2 + 3);
      newNum2 = Math.floor(Math.random() * (6 + 3 - newNum1) + 5 + newNum1 - 3); //3 or 4 and 6+
    } else if (type === 6) {
      newNum1 = Math.floor(Math.random() * 4 + 5);
      newNum2 = Math.floor(Math.random() * (4 + 5 - newNum1) + 7 + newNum1 - 5); //5 through 8 and 8+
    } else if (type === 7) {
      newNum1 = Math.floor(Math.random() * 28 + 2); //two-digit round one
      newNum2 = Math.floor(Math.random() * 28 + 2);
    } else {
      newNum1 = Math.floor(Math.random() * 98 + 2); //two-digit round two
      newNum2 = Math.floor(Math.random() * 98 + 2);
    }
    
    // if there is a held problem, set the problem to the held problem
    if (holdData.hold && logic.step % 2 === 0) {  //held problem and even step number
      setProblem((prevProblem) => ({
        ...prevProblem,
        num1: holdData.held[0],
        num2: holdData.held[1],
        operation: holdData.held[2], //put data into problem
        userAnswer: '', // Reset userAnswer when generating a new problem
        startTime: Date.now() // Update startTime with the current timestamp
      }));
      setHoldData((prevHold) => ({ //erase hold data
        ...prevHold,
        hold: false
      }));
    } else if (Math.random() < 0.5) { // if no held problem, randomize order of num1 and num2
      setProblem((prevProblem) => ({ 
        ...prevProblem,
        num1: newNum1,
        num2: newNum2,
        operation: op, 
        userAnswer: '', // Reset userAnswer when generating a new problem
        startTime: Date.now() // Update startTime with the current timestamp
      }));
    } else { //alternate random order for num1 and num2
      setProblem((prevProblem) => ({ 
        ...prevProblem,
        num1: newNum2,
        num2: newNum1,
        operation: op,
        userAnswer: '', // Reset userAnswer when generating a new problem
        startTime: Date.now() // Update startTime with the current timestamp
      }));
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logic.step, logic.sequence]); 
  
  const generateProblem = () => { //trigger useEffect by iterating step number
    setLogic((prevLogic) => ({ //essential - step by one
      ...prevLogic,
      step: prevLogic.step + 1
    }));
    
    let numLeft = displaySettings.totalProblems - logic.step; //message logic
    let problem;
    if (numLeft > 1) { //plural for problems conditional
      problem = " problems";
    } else {
      problem = " problem"
    }
    setMessages((prevMessages) => ({ //set new messages
      ...prevMessages,
      message1: 'Solve it!',
      countdown: numLeft.toString() + problem + " left"
    }));
  }; 

  const targetedPractice = () => {
    // set logic signaling that practice mode has begun
    setDisplaySettings((prevSettings) => ({
      ...prevSettings,
      switch: false,
      switched: true
    }));
    
    // grab fact family to focus on
    const type = logic.sequence[logic.step][0];
    let target; //logic for message describing fact family
    if (type >= 7) {
      target = "double digits"
    } else if (type === 0) {
      target = "+1s";
    } else if (type === 1) {
      target = "+2s";
    } else if (type === 2) {
      target = "doubles";
    } else if (type === 3) {
      target = "near doubles";
    } else if (type === 4) {
      target = "+0s";
    } else if (type === 5) {
      target = "3s and 4s";
    } else {
      target = "5s through 8s";
    }
    
    // set messages highlighting fact family and setting countdown
    let numLeft = displaySettings.totalProblems - logic.step; //message logic
    let problem;
    if (numLeft > 1) { //plural for problems conditional
      problem = " problems";
    } else {
      problem = " problem"
    }
    setMessages((prevMessages) => ({ //set new messages
      ...prevMessages,
      message1: 'Solve it!',
      message2: "You are working on " + target + " today",
      countdown: numLeft.toString() + problem + " left"
    }));
    
    // build array alternating target family with mixed practice
    const current = logic.sequence[logic.step];
    let newArray = [];
    for (let i = 0; i < 47; i++) {
      if (i % 2 === 0) {
        newArray.push(current); //every other problem pushes target fact family
      } else {
        const solvedProblems = [...logic.sequence].slice(0, logic.step); //pull problems solved so far
        const easyProblems = [...solvedProblems,[0,0],[1,0],[4,0]] //pull +1, +2, +0 as default mix
        const randomIndex = Math.floor(Math.random() * (logic.step + 3));
        newArray.push(easyProblems[randomIndex]); //randomize problems above
      }
    }
    
    //state changes, all at once - sequence, step
    setLogic((prevLogic) => ({
      ...prevLogic,
      step: prevLogic.step + 1,
      sequence: newArray
    }));
  };

  const hold = () => { // save a problem to repeat if user gets it wrong or slow in practic emode
    if (logic.sequence[logic.step][0] >= 7) {
      return;
    }
    setHoldData((prevHold) => ({ // set a boolean and problem so useEffect uses this problem
      hold: true,
      held: [problem.num1, problem.num2, problem.operation]
    }));
  };

  const checkAnswer = () => {
    if (messages.message1 === 'Correct!') { //logic to avoid spamming enter issues
      return;
    }
    
    //variable for speed
    // Calculate time difference in milliseconds
    const currentTime = Date.now();
    const timeTaken = currentTime - problem.startTime;
    // Determine if time taken is more than 3 seconds
    const tookMoreThanThreeSeconds = timeTaken > timeToTarget;
    //variable for answer
    const ans = problem.num1 + problem.num2;
    //variable for correctness with conditional
    let correct;
    if (problem.operation === 0) {
      correct = parseInt(problem.userAnswer) === ans;
    } else {
      correct = parseInt(problem.userAnswer) === problem.num2;
    }
    
    if (correct) { //conditionals if answer is correct
      //correct answer message
      setMessages((prevMessages) => ({
        ...prevMessages,
        message1: 'Correct!'
      }));
      //delay by 500 milliseconds
      setTimeout(() => {
        if (displaySettings.switch) { //if user got question right after getting question wrong
          targetedPractice();
        } else if (!tookMoreThanThreeSeconds) { //if user got question right quickly
          generateProblem();
        } else if (tookMoreThanThreeSeconds && !displaySettings.switched) {//slow and analyzing mode
          targetedPractice();
        } else if (tookMoreThanThreeSeconds && displaySettings.switched && logic.step % 2 === 0) {//slow and practice mode
          hold();
          generateProblem();
        } else { //just regular old correct
          generateProblem();
        }
        }, 500);
    } else { //conditionals if answer is wrong
      //incorrect answer message
      setMessages((prevMessages) => ({
        ...prevMessages,
        message1: 'Nope, ' + problem.num1.toString() + " + " + problem.num2.toString() + " = " + ans.toString()
      }));
      setProblem((prevProblem) => ({//reset input
        ...prevProblem,
        userAnswer: ''
      }));
      if (!displaySettings.switched) {//switch to practice mode if not in practice mode
        setDisplaySettings((prevSettings) => ({
        ...prevSettings,
        switch: true
      }));
      } else if (displaySettings.switched && logic.step % 2 === 0) { //hold problem if in practice mode
        hold();
      }
    }
  };

  const handleReadyClick = () => { //function to start the app when the user clicks the ready button
    generateProblem(); // Call the generateProblem function
    setDisplaySettings({
      ...displaySettings,
      showContent: true
    });
  };

  return (
    <div className="app" id="app">
      {isLevelUpVisible && (//level up message
        <div className="level-up-message">
          Level Up!
        </div>
      )}
      {logic.step <= displaySettings.totalProblems ? (//should we display content or ending message
        !displaySettings.showContent ? (
          <Introduction onReadyClick={handleReadyClick} /> //display intro text and button
        ) : (
          <ProblemDisplay //display problem and messages
            className="mobile"
            operation={problem.operation} //props
            num1={problem.num1}
            num2={problem.num2}
            userAnswer={problem.userAnswer}
            startTime={problem.startTime}
            message1={messages.message1}
            message2={messages.message2}
            countdown={messages.countdown}
            checkAnswer={checkAnswer}
            setUserAnswer={(updatedAnswer) =>
              setProblem({ ...problem, userAnswer: updatedAnswer })}
          />
        )
      ) : (
        <CompletionMessage /> //you're done for the day
      )}
    </div>
  );
};

const Introduction = ({ onReadyClick }) => { //introduction page with start button
  return (
    <div className="container intro">
      <h1>Welcome to Pulse: Addition</h1>
      <p>Solve each problem, then press Enter</p>
      <button className="ready-btn" onClick={onReadyClick}>Ready?</button>
    </div>
  );
};

const ProblemDisplay = ({//component that displays the meat of the app
    operation,
    num1,
    num2,
    userAnswer,
    setUserAnswer,
    checkAnswer,
    message1,
    message2,
    countdown
  }) => {
  const ans = num1 + num2;

  let displayEquation, result; //conditionals for displaying operation
  if (operation === 0 || operation === 4) {
    displayEquation = `${num1} + ${num2} = `;
    result = '';
  } else if (operation === 1) {
    displayEquation = `${ans} \u2013 ${num1} = `;
    result = '';
  } else if (operation === 2) {
    displayEquation = `${num1}  + `;
    result = `= ${ans}`;
  } else {
    displayEquation = `${ans}  \u2013  `;
    result = ` = ${num1}`;
  }

  return (//display problem in three parts, then messages
    <div className="practice">
      <p className="message-display">{message1}</p>
      <div className="problem-display">{displayEquation} <Input userAnswer={userAnswer} setUserAnswer={setUserAnswer} checkAnswer={checkAnswer} /> {result}
      </div>
      <br></br><br></br>
      <p className="message-display">{message2}</p>
      <p className="message-display">{countdown}</p>
    </div>
  );
};



const Input = ({ userAnswer, setUserAnswer, checkAnswer }) => {
  const inputRef = React.useRef(null); // Create a ref for the input element
  
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus on the input when the component mounts
    }
  }, []); // Empty dependency array ensures the effect runs only once after initial render
  
  const handleInputChange = (e) => {
    setUserAnswer(e.target.value); // Call the setUserAnswer function passed from ProblemDisplay
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === '=') {
      checkAnswer();
    }
  };
  
  return (
    <div>
      <input
        type="number"
        value={userAnswer}
        onChange={handleInputChange} // Handle the onChange event
        onKeyPress={handleKeyPress} // Trigger handleKeyPress on key press
        ref={inputRef} // Assign the ref to the input element
      />
    </div>
  );
};

const CompletionMessage = () => {
  return (
    <div>
      <h1>Nice! You're done for today.</h1>
    </div>
  );
};

export default Add;
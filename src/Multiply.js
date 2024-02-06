import React from 'react';
import _throttle from 'lodash/debounce';
import './App.css';


const Multiply = () => {
  //state variables
  //logic - sequence, step
  const [logic, setLogic] = React.useState({
    sequence: [//first number is the problem, second is the operation
      [2,0], [10,0], [5,0], [1,0], [0,0], [11,0], [4,0], [3,0], [6,0], [9,0], [8,0], [7,0], //multiplication, includes 0
      [2,1], [10,1], [5,1], [1,1], [11,1], [4,1], [3,1], [6,1], [9,1], [8,1], [7,1], //division
      [2,2], [10,2], [5,2], [1,2], [11,2], [4,2], [3,2], [6,2], [9,2], [8,2], [7,2], //fill-in-the-blank multiplication
      [2,3], [10,3], [5,3], [1,3], [11,3], [4,3], [3,3], [6,3], [9,3], [8,3], [7,3], //division
      [12,0], [15,0], [16,0], [18,0], [21,0] //extra multiplication just in case
    ],
    step: -1 //default step
  });
  
  //problem - numbers, answer, startTime, operation
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
  
  const [isLevelUpVisible, setIsLevelUpVisible] = React.useState(false); //whether to dispaly level up message

  const [timeToTarget, setTimeToTarget] = React.useState(4000); //default time for an answer to count as "fast"

  React.useEffect(() => { //function for level up and timeToTarget adjustments
    if (logic.step % 11 === 1 && logic.step > 2 && !displaySettings.switched) { //level up logic
      setIsLevelUpVisible(true); // Make the message visible
    } else {
      setIsLevelUpVisible(false); // Turn off
    }

    if (logic.step % 11 === 1 && !displaySettings.switched) { //logic for reducing timeToTarget
      setTimeToTarget((prevTimeToTarget) => prevTimeToTarget - 500);
    }
  }, [logic.step, displaySettings.switched]);

  // Inside useEffect, add handleOperationChange to the dependency array:
  React.useEffect(() => {
    if (logic.step === -1) { //don't try to do anything before stepping to 0
      return;
    }
    
    // pull first number and operation from sequence
    let newNum1 = logic.sequence[logic.step][0];
    let op = logic.sequence[logic.step][1];
    
    // generate second number randomly with some logic based on size
    let newNum2;
    if (newNum1 === 0) {
      newNum2 = Math.floor(Math.random() * 12);
    } else if (newNum1 <= 2) {
      newNum2 = Math.floor(Math.random() * 9 + 1);
    } else if (newNum1 <= 11) {
      newNum2 = Math.floor(Math.random() * 7 + 3);
    } else {
      newNum2 = Math.floor(Math.random() * 10 + 3);
    }
    
    // if there is a held problem, set the problem to the held problem
    if (holdData.hold && logic.step % 2 === 0) { 
      setProblem((prevProblem) => ({
        ...prevProblem,
        num1: holdData.held[0],
        num2: holdData.held[1],
        operation: holdData.held[2],
        userAnswer: '', // Reset userAnswer when generating a new problem
        startTime: Date.now() // Update startTime with the current timestamp
      }));
      setHoldData((prevHold) => ({ //clear hold data
        ...prevHold,
        hold: false
      }));
    } else if (Math.random() < 0.5) { // randomize order of num1 and num2
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
  
  const generateProblem = () => { //logic to trigger useEffect and generate a problem
    setLogic((prevLogic) => ({ //bump step forward
      ...prevLogic,
      step: prevLogic.step + 1
    }));
    
    let numLeft = displaySettings.totalProblems - logic.step; //countdown
    let problem; //plural logic for problem/problems
    if (numLeft > 1) {
      problem = " problems";
    } else {
      problem = " problem"
    }
    setMessages((prevMessages) => ({ //set messages for new problem
      ...prevMessages,
      message1: 'Solve it!',
      countdown: numLeft.toString() + problem + " left"
    }));
  }; 

  const targetedPractice = () => { //function to switch from analyzing mode to practice mode
    // set logic signaling that practice mode has begun
    setDisplaySettings((prevSettings) => ({
      ...prevSettings,
      switch: false,
      switched: true
    }));
    
    // grab fact family to focus on
    const target = logic.sequence[logic.step];
    
    // set messages highlighting fact family and setting countdown, duplicated from above
    let numLeft = displaySettings.totalProblems - logic.step;
    let problem;
    if (numLeft > 1) {
      problem = " problems";
    } else {
      problem = " problem"
    }
    setMessages((prevMessages) => ({
      ...prevMessages,
      message1: 'Solve it!',
      message2: "You are working on " + target[0].toString() + "s today",
      countdown: numLeft.toString() + problem + " left"
    }));
    
    // build array alternating target family with mixed practice
    let newArray = [];
    for (let i = 0; i < 47; i++) {
      if (i % 2 === 0) {
        newArray.push(target);
      } else {
        const randomIndex = Math.floor(Math.random() * Math.max(4,logic.step));
        newArray.push(logic.sequence[randomIndex]);
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
    setHoldData((prevHold) => ({ // set a boolean and problem so useEffect uses this problem
      hold: true,
      held: [problem.num1, problem.num2, problem.operation]
    }));
  };

  const checkAnswer = () => {
    //variable for speed
    // Calculate time difference in milliseconds
    const currentTime = Date.now();
    const timeTaken = currentTime - problem.startTime;
    // Determine if time taken is more than 3 seconds
    const tookMoreThanThreeSeconds = timeTaken > timeToTarget;
    //variable for answer
    const ans = problem.num1 * problem.num2;
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
        } else if (tookMoreThanThreeSeconds && displaySettings.switched && logic.step % 2 === 0) { //hold if slow during practice mode
          hold();
          generateProblem();
        } else { //regular correct answer
          generateProblem();
        }
        }, 500);
    } else { //conditionals if answer is wrong
      //incorrect answer message
      setMessages((prevMessages) => ({
        ...prevMessages,
        message1: 'Nope, ' + problem.num1.toString() + " × " + problem.num2.toString() + " = " + ans.toString()
      }));
      setProblem((prevProblem) => ({ //clear input
        ...prevProblem,
        userAnswer: ''
      }));
      if (!displaySettings.switched) { //switch on next correct answer
        setDisplaySettings((prevSettings) => ({
        ...prevSettings,
        switch: true
      }));
      } else if (displaySettings.switched && logic.step % 2 === 0) { //hold if in practice mode and even
        hold();
      }
    }
  };

  const handleReadyClick = () => { //function for ready button to start
    generateProblem(); // Call the generateProblem function
    setDisplaySettings({
      ...displaySettings,
      showContent: true
    });
  };

  return (
    <div className="app" id="app">
      {isLevelUpVisible && (
        <div className="level-up-message">
          Level Up!
        </div>
      )}
      {logic.step <= displaySettings.totalProblems ? (
        !displaySettings.showContent ? (
          <Introduction onReadyClick={handleReadyClick} /> //display intro text and button
        ) : (
          <ProblemDisplay //display problem and messages
            operation={problem.operation} 
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

const Introduction = ({ onReadyClick }) => {
  return (
    <div className="container">
      <h1>Welcome to Pulse: Multiplication</h1>
      <p>Solve each problem, then press Enter</p>
      <button className="ready-btn" onClick={onReadyClick}>Ready?</button>
    </div>
  );
};

const ProblemDisplay = ({
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
  const ans = num1 * num2;

  let displayEquation, result;
  if (operation === 0) {
    displayEquation = `${num1} × ${num2} = `;
    result = '';
  } else if (operation === 1) {
    displayEquation = `${ans} ÷ ${num1} = `;
    result = '';
  } else if (operation === 2) {
    displayEquation = `${num1} × `;
    result = `= ${ans}`;
  } else {
    displayEquation = `${ans} ÷ `;
    result = ` = ${num1}`;
  }

  return (
    <div className="practice">
      <div className="problem-display">{displayEquation} <Input userAnswer={userAnswer} setUserAnswer={setUserAnswer} checkAnswer={checkAnswer} /> {result}
      </div>
      <p className="message-display">{message1}</p>
      <p className="message-display">{message2}</p>
      <p className="message-display">{countdown}</p>
    </div>
  );
};



const Input = ({ userAnswer, setUserAnswer, checkAnswer }) => {
  const inputRef = React.useRef(null); // Create a ref for the input element
  
  // Throttle the checkAnswer function with a delay
  const throttledCheckAnswer = _throttle(checkAnswer, 300);

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
      throttledCheckAnswer(); // Call checkAnswer when the Enter key is pressed
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

export default Multiply;
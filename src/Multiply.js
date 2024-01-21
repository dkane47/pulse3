import React from 'react';
import './App.css';

const Multiply = () => {
  //state variables
  //logic - sequence, step, operation
  const [logic, setLogic] = React.useState({
    sequence: [
      2, 10, 5, 1, 0, 11, 4, 3, 6, 9, 8, 7 //default sequence of fact families
    ],
    step: -1, //default step, will step forward to 0 to generate first problem
    operation: 0 //begins with multiplication
  });
  
  //problem - numbers, answer, startTime
  const [problem, setProblem] = React.useState({
    num1: 0, // First number in the problem
    num2: 0, // Second number in the problem
    userAnswer: '', // User's answer to the problem
    startTime: 0 // Timestamp when the problem started
    // Other problem-related settings can be added as needed
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
    totalProblems: 29, // Total number of problems the user will encounter
    switch: false, // boolean signaling that a user got a question wrong, and should switch modes once corrected
    switched: false // boolean signaling that practice mode has begun
  });
  
  const [holdData, setHoldData] = React.useState({
    hold: false, //hold a problem to repeat because the user got it wrong or answered slowly
    held: [] //problem to repeat
  });
  
  const [isLevelUpVisible, setIsLevelUpVisible] = React.useState(false);

  const [timeToTarget, setTimeToTarget] = React.useState(3500);


  // Inside useEffect, add handleOperationChange to the dependency array:
  React.useEffect(() => {
    if (logic.operation > 0) {
      setIsLevelUpVisible(true); // Make the message visible
    }
  }, [logic.operation]);

  // Inside useEffect, add handleOperationChange to the dependency array:
  React.useEffect(() => {
    if (logic.step === 1) {
      setIsLevelUpVisible(false); // Make the message visible
    }
  }, [logic.step]);
  
  const generateProblem = () => {
    //if practice mode, only step forward by 1
    if (displaySettings.switched) {
      setLogic((prevLogic) => ({
        ...prevLogic,
        step: prevLogic.step + 1
      }));
    } else if (logic.step >= 11 && logic.operation === 3) { //if finished first four rounds do harder mutliplication
      setLogic((prevLogic) => ({
        ...prevLogic,
        step: 0,
        operation: prevLogic.operation + 1,
        sequence: [
      9, 8, 7, 12, 25, 15, 20, 16, 24, 18, 13, 14, 17, 19
    ]
      }));
      setTimeToTarget(prevTimeToTarget => prevTimeToTarget - 500);
    } else if (logic.step >= 11) { //if operation is finished reset step and increment operation
      setLogic((prevLogic) => ({
        ...prevLogic,
        step: 0,
        operation: prevLogic.operation + 1,
        sequence: [
      2, 10, 5, 1, 11, 4, 3, 6, 9, 8, 7, 12 // cut 0s to avoid logic errors
    ]
      }));
      setTimeToTarget(prevTimeToTarget => prevTimeToTarget - 500);
    } else {
      setLogic((prevLogic) => ({ //otherwise increment step
        ...prevLogic,
        step: prevLogic.step + 1
      }));
    }
    
    if (displaySettings.switched) { //reset messages if counting down in practice mode
      let problems;
      if (displaySettings.totalProblems - logic.step === 1) {
        problems = " problem";
      } else {
        problems = " problems";
      }
      
      setMessages((prevMessages) => ({
        ...prevMessages,
        message1: 'Solve it!',
        countdown: (displaySettings.totalProblems - logic.step).toString() + problems + " left"
          }));
    } else {
        setMessages((prevMessages) => ({ //reset messages if not in practice mode
          ...prevMessages,
          message1: 'Solve it!'
          }));
      };
    }
  
  const targetedPractice = () => {
    // set logic signaling that practice mode has begun
    setDisplaySettings((prevSettings) => ({
      ...prevSettings,
      switch: false,
      switched: true
    }));
    
    // grab fact family to focus on
    const target = logic.sequence[logic.step];
    
    // set messages highlighting fact family and setting countdown
    setMessages((prevMessages) => ({
      ...prevMessages,
      message2: "You are working on " + target.toString() + "s today",
      countdown: (displaySettings.totalProblems + 1).toString() + " problems left"
    }));
    
    // build array alternating target family with mixed practice
    let newArray = [];
    for (let i = 0; i < 30; i++) {
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
      step: 0,
      sequence: newArray
    }));
  };
  
  React.useEffect(() => {
    // pull first number from sequence
    let newNum1 = logic.sequence[logic.step];
    
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
    if (holdData.hold && logic.step % 2 === 0) { // eslint-disable-next-line react-hooks/exhaustive-deps
      setProblem((prevProblem) => ({
        ...prevProblem,
        num1: holdData.held[0],
        num2: holdData.held[1],
        userAnswer: '', // Reset userAnswer when generating a new problem
        startTime: Date.now() // Update startTime with the current timestamp
      }));
      setHoldData((prevHold) => ({
        ...prevHold,
        hold: false
      }));
    } else if (Math.random() < 0.5) { // randomize order of num1 and num2
      setProblem((prevProblem) => ({ // eslint-disable-next-line react-hooks/exhaustive-deps
        ...prevProblem,
        num1: newNum1,
        num2: newNum2,
        userAnswer: '', // Reset userAnswer when generating a new problem
        startTime: Date.now() // Update startTime with the current timestamp
      }));
    } else { //alternate random order for num1 and num2
      setProblem((prevProblem) => ({ // eslint-disable-next-line react-hooks/exhaustive-deps
        ...prevProblem,
        num1: newNum2,
        num2: newNum1,
        userAnswer: '', // Reset userAnswer when generating a new problem
        startTime: Date.now() // Update startTime with the current timestamp
      }));
    }
  }, [logic.operation, logic.step, logic.sequence]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const hold = () => { // save a problem to repeat if user gets it wrong or slow in practic emode
    setHoldData((prevHold) => ({ // set a boolean and problem so useEffect uses this problem
      hold: true,
      held: [problem.num1,problem.num2]
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
    if (logic.operation === 0 || logic.operation === 4) {
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
        } else if (tookMoreThanThreeSeconds && displaySettings.switched && logic.step % 2 === 0) {
          hold();
          generateProblem();
        } else {
          generateProblem();
        }
        }, 500);
    } else { //conditionals if answer is wrong
      //incorrect answer message
      setMessages((prevMessages) => ({
        ...prevMessages,
        message1: 'Nope, ' + problem.num1.toString() + " × " + problem.num2.toString() + " = " + ans.toString()
      }));
      setProblem((prevProblem) => ({
        ...prevProblem,
        userAnswer: ''
      }));
      if (!displaySettings.switched) {
        setDisplaySettings((prevSettings) => ({
        ...prevSettings,
        switch: true
      }));
      } else if (displaySettings.switched && logic.step % 2 === 0) {
        hold();
      }
    }
  };

  const handleReadyClick = () => {
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
            operation={logic.operation} 
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
  if (operation === 0 || operation === 4) {
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
  
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus on the input when the component mounts
    }
  }, []); // Empty dependency array ensures the effect runs only once after initial render
  
  const handleInputChange = (e) => {
    setUserAnswer(e.target.value); // Call the setUserAnswer function passed from ProblemDisplay
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer(); // Call checkAnswer when the Enter key is pressed
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
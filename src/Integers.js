import React from 'react';
import './App.css';


/** 
 * Big-picture structure of this app:
 * This is a multiplication fact practice app. It is live at pulsemath.com/multiply, and you can read about how it works at pulsemath.com/about
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
const Integers = () => {
  //state variables
  //logic - sequence, step
  const [logic, setLogic] = React.useState({
    sequence: [], //empty - initialized later via useEffect
    step: -1 //default step, steps to 0 when user clicks Ready
  });
  
  //problem - numbers, answer, startTime, operation
  const [problem, setProblem] = React.useState({
    num1: 0, // First number in the problem
    num2: 0, // Second number in the problem,
    operation: 0, //operation - 0 is mult, 1 is div, 2 is fill-in mult, 3 is fill-in div
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
    totalProblems: 44, // Total number of problems the user will encounter - actually 45 bc 0
    switch: false, // boolean signaling that a user got a question wrong, and should switch modes once corrected
    switched: false // boolean signaling that practice mode has begun
  });
  
  const [isLevelUpVisible, setIsLevelUpVisible] = React.useState(false); //whether to dispaly level up message

  const [timeToTarget, setTimeToTarget] = React.useState(5000); //default time for an answer to count as "fast"

  React.useEffect(() => {
    let numbers = [[5,0],[6,0],[7,0],[5,0],[6,0],[7,0],[16,1],[17,1],[16,1],[17,1],[16,1],[17,1],[24,2],[25,2],[26,2],[27,2]]; //list of fact families for practice. 6 represents 6s, 7s, and 8s, and 0 and 1 are mixed in during practice mode
    let s = numbers.slice().sort(() => Math.random() - 0.5); //randomize list above
    setLogic((prevLogic) => ({ //use random list to generate a random sequence of problems
      ...prevLogic,
      sequence: [s[0],s[1],s[2],s[3],s[4],s[5],s[6],s[7],
      s[8],s[9],s[10],s[11],s[12],s[13],s[14],s[15],
      s[0],s[1],s[2],s[3],s[4],s[5],s[6],s[7],
      s[8],s[9],s[10],s[11],s[12],s[13],s[14],s[15],
      s[0],s[1],s[2],s[3],s[4],s[5],s[6],s[7],
      s[8],s[9],s[10],s[11],s[12],s[13],s[14],s[15]
    ]
    }));
  }, []);
  
  React.useEffect(() => { //function for level up and timeToTarget adjustments
    if (logic.step % 4 === 0 && logic.step > 1 && logic.step < 18 && !displaySettings.switched) { //level up logic
      setIsLevelUpVisible(true); // Make the Level Up message visible
    } else {
      setIsLevelUpVisible(false); // Turn off
    }

    if (logic.step % 4 === 1 && logic.step < 10 && !displaySettings.switched) { //logic for reducing timeToTarget
      setTimeToTarget((prevTimeToTarget) => prevTimeToTarget - 500); //reduce time after first problem and after first three level ups
    }
  }, [logic.step, displaySettings.switched]); //dependency array

  // Core logic, generates a new problem when step is incremented
  React.useEffect(() => {
    if (logic.step === -1) { //don't try to do anything before stepping to 0
      return;
    }
    
    // pull first number and operation from sequence
    let newNum1 = logic.sequence[logic.step][0];
    let op = logic.sequence[logic.step][1]; //pull operation
    
    // generate second number randomly with some logic based on size
    let newNum2;
    if (newNum1 === 1) { //1 +1
      newNum2 = Math.floor(Math.random() * 8 + 2);
    } else if (newNum1 === 2) { //2 +2
      newNum2 = Math.floor(Math.random() * 7 + 3);
    } else if (newNum1 === 3) { //4 +double
      newNum1 = Math.floor(Math.random() * 8 + 2);
      newNum2 = newNum1;
    } else if (newNum1 === 4) { //4 +near doubles
      newNum1 = Math.floor(Math.random() * 7 + 2);
      newNum2 = newNum1 + 1;
    } else if (newNum1 === 5) { //neg + neg
      newNum1 = Math.floor(Math.random() * 5 - 6);
      newNum2 = Math.floor(Math.random() * 5 - 6);
    } else if (newNum1 === 6) { //pos + neg
      newNum1 = Math.floor(Math.random() * 5 - 6);
      newNum2 = Math.floor(Math.random() * 5 + 1);
    } else if (newNum1 === 7) { //zero pair
      newNum1 = Math.floor(Math.random() * 5 + 1);
      newNum2 = newNum1 * -1;
    } else if (newNum1 === 10) { //10 x 2-10
      newNum2 = Math.floor(Math.random() * 9 + 2);
    } else if (newNum1 === 12) { //12 2 x 2-9
      newNum1 = 2;
      newNum2 = Math.floor(Math.random() * 8 + 2);
    } else if (newNum1 === 13) { //13 3 x 3-9
      newNum1 = 3;
      newNum2 = Math.floor(Math.random() * 7 + 3);
    } else if (newNum1 === 14) { //14 4 x 4-9
      newNum1 = 4;
      newNum2 = Math.floor(Math.random() * 6 + 4);
    } else if (newNum1 === 15) { //15 5 x 5-9
      newNum1 = 5;
      newNum2 = Math.floor(Math.random() * 5 + 5);
    } else if (newNum1 === 16) { //16 neg * neg
      newNum1 = Math.floor(Math.random() * 5 - 6);
      newNum2 = Math.floor(Math.random() * 5 - 6);
    } else if (newNum1 === 17) { //17 x pos x neg
      newNum1 = Math.floor(Math.random() * 5 + 1);
      newNum2 = Math.floor(Math.random() * 5 - 6);
    } else if (newNum1 === 21) { //-1
      newNum1 = Math.floor(Math.random() * 9 + 1);
      newNum2 = 1;
    } else if (newNum1 === 22) { //-2
      newNum1 = Math.floor(Math.random() * 8 + 2);
      newNum2 = 2;
    } else if (newNum1 === 23) { //mix sub
      newNum1 = Math.floor(Math.random() * 5 + 5);
      newNum2 = Math.floor(Math.random() * (newNum1 - 2) + 1);
    } else if (newNum1 === 24) { //neg - pos
      newNum1 = Math.floor(Math.random() * 5 - 6);
      newNum2 = Math.floor(Math.random() * 5 + 1);
    } else if (newNum1 === 25) { //pos - pos
      newNum1 = Math.floor(Math.random() * 7 + 1);
      newNum2 = Math.floor(Math.random() * 7 + 1);
    } else if (newNum1 === 26) { //pos - neg
      newNum1 = Math.floor(Math.random() * 5 + 1);
      newNum2 = Math.floor(Math.random() * 5 - 6);
    } else if (newNum1 === 27) { //neg - neg
      newNum1 = Math.floor(Math.random() * 5 - 6);
      newNum2 = Math.floor(Math.random() * 5 - 6);
    } else { //2-9 for all others
      newNum2 = Math.floor(Math.random() * 8 + 2);
    }
    
    // if there is a held problem, set the problem to the held problem
    if (op === 2 || Math.random() < 0.5) { // no held problem - randomize order of num1 and num2
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
    setLogic((prevLogic) => ({ //bump step forward to trigger useEffect
      ...prevLogic,
      step: prevLogic.step + 1
    }));
    
    //logic for messages
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
    
    if (target[1] === 0) { //messages if fact family is not 6 - fact family is straightforward
      setMessages((prevMessages) => ({
        ...prevMessages,
        message1: 'Solve it!',
        message2: "You are working on addition today",
        countdown: numLeft.toString() + problem + " left"
      }));
    } else if (target[1] === 1) { //messages if fact family is not 6 - fact family is straightforward
      setMessages((prevMessages) => ({
        ...prevMessages,
        message1: 'Solve it!',
        message2: "You are working on multiplication today",
        countdown: numLeft.toString() + problem + " left"
      }));
    } else { //logic if fact family is 6 (which is really 6/7/8)
      setMessages((prevMessages) => ({
        ...prevMessages,
        message1: 'Solve it!',
        message2: "You are working on subtraction today",
        countdown: numLeft.toString() + problem + " left"
      }));
    }
    
    // build array mixing target family with mixed practice
    let opArray = [[1,0],[2,0],[10,1],[2,1]];
    if (target[0] === 5) {
      opArray = [[6,0],[16,1],[1,0],[2,0],[3,0],[4,0]]
    } else if (target[0] === 6) {
      opArray = [[5,0],[17,1],[1,0],[2,0],[3,0],[4,0]]
    } else if (target[0] === 7) {
      opArray = [[5,0],[16,1],[1,0],[2,0],[3,0],[4,0]]
    } else if (target[0] === 24) {
      opArray = [[21,2],[22,2],[23,2],[1,0],[2,0],[25,2]]
    } else if (target[0] === 25) {
      opArray = [[21,2],[22,2],[23,2],[1,0],[2,0],[24,2]]
    } else if (target[0] === 26) {
      opArray = [[21,2],[25,2],[23,2],[1,0],[2,0],[25,2]]
    } else if (target[0] === 27) {
      opArray = [[21,2],[25,2],[23,2],[1,0],[2,0],[25,2]]
    } else if (target[0] === 16) {
      opArray = [[17,1],[6,0],[10,1],[12,1],[15,1],[5,0]]
    } else if (target[0] === 17) {
      opArray = [[16,1],[6,0],[10,1],[12,1],[15,1],[6,0]]
    }

    let newArray = [];
    for (let i = 0; i < 47; i++) {
      const solvedProblems = [...logic.sequence].slice(0, logic.step); //pull problems solved so far
      const problems = [...solvedProblems,...opArray,target,target,target,target,target,target] //append 2s, 10s, 1s, 0s
      const randomIndex = Math.floor(Math.random() * problems.length); 
      newArray.push(problems[randomIndex]); //mix those last two groups
    }
    
    //state changes, all at once - sequence, step
    setLogic((prevLogic) => ({
      ...prevLogic,
      step: prevLogic.step + 1,
      sequence: newArray
    }));
  };

  const checkAnswer = () => {
    if (messages.message1 === 'Correct!') { //prevent spamming enter triggering the function during pause
      return;
    }
    
    //variable for speed
    // Calculate time difference in milliseconds
    const currentTime = Date.now();
    const timeTaken = currentTime - problem.startTime;
    // Determine if time taken is more than 3 seconds
    const tookMoreThanThreeSeconds = timeTaken > timeToTarget;
    //variable for answer
    let ans;
    if (problem.operation === 0) {
      ans = problem.num1 + problem.num2;
    } else if (problem.operation === 1) {
      ans = problem.num1 * problem.num2;
    } else {
      ans = problem.num1 - problem.num2;
    }
    //variable for correctness with conditional
    const correct = parseInt(problem.userAnswer) === ans;
    
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
        } else { //regular correct answer
          generateProblem();
        }
        }, 500);
    } else { //conditionals if answer is wrong
      //incorrect answer message
      let sign;
      if (ans < 0) {
        sign = "Hint: the answer is negative";
      } else if (ans > 0) {
        sign = "Hint: the answer is positive";
      } else {
        sign = "Hint: the answer is 0"
      }
      setMessages((prevMessages) => ({
        ...prevMessages,
        message1: 'Nope. ' + sign
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
      {isLevelUpVisible && ( /* logic for level up message*/ 
        <div className="level-up-message">
          Level Up!
        </div>
      )}
      {logic.step <= displaySettings.totalProblems ? ( /*Logic for whether to show introduction or problems*/
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
    <div className="intro">
      <h1>Welcome to Pulse: Integers</h1>
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
  let displayEquation, result; //Logic for which operation to display
  if (operation === 0) {
    displayEquation = `${num1} + ${num2} = `;
    result = '';
  } else if (operation === 1) {
    displayEquation = `${num1} × ${num2} = `;
    result = '';
  } else if (operation === 2 && num2 < 0) {
    displayEquation = `${num1} – (${num2}) = `;
    result = '';
  } else {
    displayEquation = `${num1} – ${num2} = `;
    result = '';
  } 

  return ( //problem display: problem/input and three messages
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
      checkAnswer(); // Call checkAnswer when the Enter key is pressed
    }
  };
  
  return (
    <div>
      <input
        type="number"
        keyboardType="numeric"
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

export default Integers;
import React from 'react';

function About() {
    return (
      <div className="about">
        <h1>What is Pulse?</h1>
        <p>How do you respond when a student doesn't know a math fact? 
          Cognitive science tells us that the best way to secure something in long-term memory is <b>retrieval practice</b>. 
          Retrieval practice means retrieving something from memory, not just deriving it or repeating it to ourselves. 
          Pulse is designed to figure out what a fact family students are having a hard time with. Then, students do some practice 
          focused on that fact family. For any fact they don't know, either because they get it wrong or take time to figure it out, 
          they practice that fact again a few questions later, and then again a few more questions after that. 
          Over time, that retrieval practice will help students remember more and more of their math facts.
        </p>
        <h1>Why is learning math facts important?</h1>
        <p>Humans can only think about a few things at a time. 
          Knowing math facts without having to think about them frees up thinking for more complex math.
        </p>
        <h1>So I can put my students on the app and they'll learn their math facts?</h1>
        <p>I recommend coaching students on how to use the app. They should understand the goal of remembering 
          math facts without having to think about them. I also recommend teachers pay attention to patterns in 
          fact families that students are having a hard time with and provide extra support with those.
        </p>
        <h1>Do you guarantee that every student will master their math facts with Pulse?</h1>
        <p>Nope. There are no shortcuts to fact fluency. 
          Pulse can be a helpful tool, especially with students who feel overwhelmed by other forms of fact practice.
          But there are never any guarantees, and Pulse only works as one component of well-designed classroom instruction. 
        </p>
        <h1>Sometimes students end up working on facts they already know, what's up with that?</h1>
        <p>That will happen. Pulse is probabibilistic. Students will 
          often spend their time on a fact family they aren't as good at, but they might just have
          been chatting with a friend as they got started and Pulse thought they didn't know a fact. That's fine. 
          They will practice that fact family mixed with a few others, and it's still good practice even if it's not perfectly targeted that day.
        </p>
        <h1>Who are you?</h1>
        <p>My name is Dylan Kane. I'm a 7th grade math teacher in Colorado. You can get in touch at dkane47 at gmail</p>
        <h1>How do you use Pulse with your students?</h1>
        <p>I assign either Pulse Addition or Pulse Multiplication twice a week. I do some progress monitoring using paper and pencil to 
          figure out which students should be focusing on addition and which on multiplication and use Google Classroom 
          to assign the right link to students. I do a fair amount of coaching, both when we first start Pulse and as I 
          observe students working, to help them understand how to use Pulse to improve their recall of math facts. 
        </p>
        <h1>What should I do to help my students use Pulse effectively?</h1>
        <p>Help them understand that they should try to answer as fast as they can, but if they can't remember a fact that's fine. 
          They'll get some focused practice on that fact. Also, help students understand that if they get facts in their 
          target fact family wrong or answer slowly, that fact will repeat two problems later. That's a great chance to practice remembering it!
        </p>
        <h1>What should I do to help students who don't make progress?</h1>
        <p>Teach them! Pulse is a good tool for practice once students understand how the operations work. 
          Pulse is not a substitute for learning about how the basic operations work. 
          If students aren't making progress, help them see patterns in the fact families they are most often working on. 
        </p>
        <h1>Why not have students sign in and track their progress?</h1>
        <p>I prefer a tool that is simple to use. I can see what students are working on by walking around and looking at their screen. 
          I also don't like the tools that claim students have "mastered" a skill and then move on. 
          That's not how learning works. Students can always benefit from more practice even on facts they mostly know.
        </p>
        <h1>Why not make it a game?</h1>
        <p>Practice is important. I don't think it's helpful to pretend that practice is a game. 
          Practice is worth doing, and we should be honest with students about that.
        </p>
        <h1>Is there research that supports Pulse?</h1>
        <p>Pulse is informed by lots of research on retrieval practice. 
          Research can't tell us the best way to teach multiplication facts and often leaves teachers with more questions than answers. 
          Pulse is designed using a mix of research and classroom experience. 
        </p>
        <h1>Why not use visuals to show how multiplication works?</h1>
        <p>Visuals are a great tool to help students understand how operations work when they're initiall introduced. 
          That's not what Pulse is designed for. Pulse is designed for students who have been introduced to arithemtic operations, 
          but need more practice to commit those facts to memory. For students in that situation, visuals can be an obstacle 
          because they let the student solve by thinking about the visual, rather than retrieving the fact from memory.
        </p>
        <h1>Can you give a more detailed description of how Pulse works?</h1>
        <p>Sure. Here's the basic sequence.</p>
        <ul>
          <li>Link to either addition or multiplication</li>
          <li>Click ready</li>
          <li>45 problems</li>
          <li>Analyzing mode - start with the operation, fact families, time to solve</li>
          <li>Level up</li>
          <li>Wrong or slow - practice mode, message</li>
          <li>Every other problem</li>
          <li>Held problems</li>
          <li>Mixed problems</li>
          <li>Nice, you're done</li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      
    );
  }

  export default About;
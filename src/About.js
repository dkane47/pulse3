import React from 'react';

function About() {
    return (
      <div className="about">
        <h2>What is Pulse?</h2>
        <p>Pulse is 45 questions of math fact practice to help students improve their fact fluency.
        </p>
        <hr></hr>
        <h2>What makes Pulse different from other math practice apps?</h2>
          <ul>
            <li>Pulse is designed to be a short, focused, and manageable chunk of practice. 
          The app balances repetition of facts in a single fact family with a mix of more familiar practice in each session. 
          The goal is to make progress with one fact family without being overwhelmed by too many new facts at once. </li>
          <li>Pulse doesn't use visuals or other representations of arithmetic. 
          Visuals play an important role when students are first learning about arithmetic but they can lead to inefficient strategies while students should be committing facts to long-term memory. </li>
          <li>Pulse doesn't put time pressure on students. Instead, the app uses speed as a way to figure out which facts students need more practice with. </li>
          <li>If students have trouble remembering facts or need to skip-count or use their fingers to figure out math facts, Pulse is a good tool to help them commit those facts to long-term memory. 
          </li>
        </ul>
        <hr></hr>
        <h2>Why is repetition of a single fact family important?</h2>
        <p>Cognitive science tells us that the best way to secure something in long-term memory is <b>retrieval practice</b>. 
          Retrieval practice means retrieving the thing from memory, not using a strategy to derive the answer. 
          Pulse is designed to help students retrieve facts from memory. First, the app figures out a fact family students could use some practice with. 
          Then, students do some focused practice with that fact family. 
          Focused repetition on one fact family helps students to practice retrieving those facts successfully, and interleaving with other facts is more helpful than pure repetition. 
          The target fact family is mixed with easier facts to avoid overwhelming students. 
          For instance, if a student is working on x4s, the sequence might look like this:
          <ul>
            <li>4×5</li>
            <li>10×3</li>
            <li>8×4</li>
            <li>6×1</li>
            <li>4×8</li>
            <li>8×10</li>
            <li>6×4</li>
            <li>5×2</li>
            <li>4×5</li>
          </ul>
          If students don't know a fact in the target fact family, they practice that fact again two questions later. 
          Students who have stronger fact skills will see a mix of more fact families and more operations. 
        </p>
        <hr></hr>
        <h2>How does Pulse figure out if a student knows a fact?</h2>
        <p>Pulse identifies fact families to focus on when a student either gets a question wrong or takes too long to answer. 
          Speed is a decent proxy for having facts in long-term memory. If a student needs five seconds to remember a fact they could benefit from more retrieval practice. 
          Pulse doesn't pressure students to solve problems quickly. Telling someone to go faster doesn't necessarily help them commit facts to memory. 
          Instead, Pulse uses speed as an indicator of which facts students could use more practice with. No pressure, but lots of chances for retrieval practice with facts students don't know very well yet. 
        </p>
        <hr></hr>
        <h2>Why is learning math facts important?</h2>
        <p>Humans can only think about a few things at a time. 
          Knowing math facts without having to think about them frees up thinking for more complex math.
        </p>
        <hr></hr>
        <h2>Shouldn't students learn math facts with understanding? This seems like rote memorization.</h2>
        <p>Students definitely need to understand arithmetic. That's what teachers are for. Pulse isn't designed to <i>teach</i> facts, it's designed to <i>practice</i> facts. 
        Once students undertand the basics of arithmetic they still have a few hundred specifics facts to remember. 
        That's a lot! You should absolutely teach your students to understand the properties of addition, subtraction, multiplication, and division. 
        If your experience is like mine, even after students understand the operations they need more practice to commit facts to long-term memory. That's what Pulse is designed for.
        </p>
        <hr></hr>
        <h2>Should students who already know most of their math facts use Pulse?</h2>
        <p>I assign Pulse to all of my students. It's much easier to ask everyone to do it than to try to figure out who does and doesn't need it. 
          Students who already know most of their facts will see a mix of operations and facts that gets steadily more difficult. 
          It's pretty hard to get to the end without making a mistake! I'm a math teacher and designed this thing and I usually can't get to the end without triggering practice mode. 
          Pulse has plenty of good challenges for students who already have strong fluency. 
        </p>
        <hr></hr>
        <h2>Is there research that supports Pulse?</h2>
        <p>Pulse is informed by research on retrieval practice, incremental rehearsal, and interleaving. 
          Research hasn't found the perfect way to teach multiplication facts. Reasonable people disagree about the best way to structure fact practice based on research. 
          Pulse is also informed by classroom testing to be practical and easy to use. 
        </p>
        <hr></hr>
        <h2>Do you guarantee that every student will master their math facts with Pulse?</h2>
        <p>Nope. There are no shortcuts to fact fluency. 
          Pulse can be a helpful tool, especially with students who feel overwhelmed by other forms of fact practice.
          But there are never any guarantees, and Pulse only works as one component of well-designed classroom instruction. 
          I recommend coaching students on how to use the app for best results. 
          Students should understand that the goal is to remember math facts without having to derive them. 
          Pulse also works best for students who know a few of the easier facts. If they are just starting out, they probably need some extra support to get going. 
          If students have a grasp of most x2 and x10 multiplication facts and +1 and +2 addition facts they are probably ready to use Pulse.
        </p>
        <hr></hr>
        <h2>Sometimes students end up working on facts they already know, what's up with that?</h2>
        <p>That will happen. Pulse is probabibilistic. Students will 
          often spend their time on a fact family they need practice with, but they might have
          been chatting with a friend as they got started or made a silly mistake and the algorithm thought they needed to practice that fact family. That's fine. 
          They will practice that fact family mixed with a few others. It's still good practice even if it's not perfectly targeted that day. 
          The order of the fact families is random so students will see all facts eventually over time.
        </p>
        <hr></hr>
        <h2>What about subtraction and division?</h2>
        <p>I recommend focusing on the addition and multiplication apps. 
          As students progress and develop automaticity with those facts they will see more subtraction and division mixed in. 
          The best way to get good at subtraction or division is to get good at addition or multiplication first. 
          If you would like to focus specifically on those operations, you can go to <a href="/subtract">pulsemath.com/subtract</a> or <a href="/divide">pulsemath.com/divide</a>. 
          I use these with my students occasionally, but I really recommend the addition and multiplication apps as students' primary focus.
        </p>
        <hr></hr>
        <h2>Who are you?</h2>
        <p>My name is Dylan Kane. I'm a 7th grade math teacher in Colorado. You can get in touch at dkane47 at gmail.</p>
        <hr></hr>
        <h2>How do you use Pulse with your students?</h2>
        <p>Students complete Pulse twice a week, usually at a time when they're on their Chromebooks anyway. I do some progress monitoring using paper and pencil to 
          figure out which operations we should focus on. I do a fair amount of coaching, both when we first start using Pulse and as I 
          observe students working, to help them understand how to improve their recall of math facts. 
        </p>
        <hr></hr>
        <h2>What should I do to help my students use Pulse effectively?</h2>
        <p>Help students understand that they should try to answer as fast as they can, but if they can't remember a fact that's fine. 
          They'll get some focused practice on that fact and similar facts. Help students understand that, if they get facts in their 
          target fact family wrong or answer slowly, that fact will repeat two problems later. That's a great chance to practice remembering it! 
        </p>
        <hr></hr>
        <h2>What if students just hit enter to see the answer and copy it?</h2>
        <p>That happens sometimes. It's often because the student doesn't know the answer. 
          It's ok for students to hit enter to see the answer if they don't know a fact. 
          The repetition in Pulse means that students generally realize it's easier to just answer the questions when they know the answer. 
          That's another piece some students can use coaching with.
        </p>
        <hr></hr>
        <h2>What should I do to help students who don't make progress?</h2>
        <p>Teach them! Pulse is a good tool for practice once students have a decent foundation. 
          Pulse is not a substitute for teaching. 
          If students aren't making progress, help them see patterns in the fact families they are often working on. 
          Figure out the facts they know and build on that foundation. 
        </p>
        <hr></hr>
        <h2>Why not have students sign in and track their progress?</h2>
        <p>I prefer a tool that is simple to use. I can see what students are working on by walking around and looking at their screens. 
          Students don't always make nice linear progress in their fact knowledge and lots of apps that track progress can be misleading or move on too soon. 
          I don't find it helpful to track progress on this type of practice.
        </p>
        <hr></hr>
        <h2>Why not make it a game?</h2>
        <p>Practice is important. I don't think it's helpful to pretend that practice is a game. 
          We should be honest with students that practice is an important part of learning. 
          Pulse is short, tyically 2-4 minutes per day, and I have no issue asking students to do a bit of regular practice to sharpen their math skills.
        </p>
        <hr></hr>
        <h2>Can you give a more detailed description of how Pulse works?</h2>
        <p>Sure.</p>
        <ul>
          <li>Click on the link to the addition or multiplication practice, or give students a direct link to the practice page 
            (<a href="/add">pulsemath.com/add</a> or <a href="/multiply">pulsemath.com/multiply</a>).</li>
          <li>Students will click "Ready?" when they're ready to go. The goal is to solve the problems quickly, so make sure students are ready!</li>
          <li>Students will see a problem and a countdown telling them they have 45 problems left.</li>
          <li>They will start in analyzing mode. Analyzing mode gives students one question each from a series of fact families. 
            The order of the fact families is different every time.</li>
          <li>If students get four questions right in a row they "level up" to the next operation, for instance from multiplication to division, then "fill-in-the-blank" multiplication, then "fill-in-the-blank" division.</li>
          <li>Students have 3.5 seconds to answer each question for the first operation, though there's no visible timer on the screen. This time decreases slowly as they move through more operations</li>
          <li>If students get a question wrong or answer slowly they switch to practice mode for that fact family.</li>
          <li>In practice mode, half the questions are on that fact family and the other half are a mix of questions from fact families they've already seen.</li>
          <li>If students make a mistake on the first fact family they see, then they will practice that fact family mixed with a few fact families they are likely to know. These are x0, x1, x2, and x10 for multiplication and +0, +1, and +2 for addition. </li>
          <li>In practice mode, if students make a mistake or answer slowly on the fact family they are working on they will see that problem again two questions later.</li>
          <li>Problems are random but students will typically see each problem from the target fact family multiple times each in a practice session to encourage successful retrieval practice.</li>
          <li>After 45 problems, students will see a message saying "Nice! You're done for today." That's it!</li>
        </ul>
        <hr></hr>
        <h2>What are the fact families that Pulse uses?</h2>
        <p>For addition the fact families are +0, +1, +2, doubles, near doubles (i.e. 4+5, 6+7), +3s and +4s, and +5s through +8s. 
          Those later fact families seem bigger but most facts with 5s through 8s fall into one of the other families. 
          For multiplication the fact families are x0, x1, x2, x3, x4, x5, x6/7/8, x9, x10, and x11. 
          Same thing - most 6s, 7s, and 8s are covered by one of the other fact families. 
          If students get through all of those they will work on two digit by two digit addition or larger multiplication facts like x12, x25, x15, etc.
          </p>
      </div>
      
    );
  }

  export default About;
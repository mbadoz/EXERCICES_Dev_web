import Review from './Review';
import { useState } from 'react';

function App() {
    const [feedback, setFeedback] = useState('');
    const [student, setStudent] = useState('');
  return (
    <>
      <section id="feedback">
        <h2>Please share some feedback</h2>
        <p>
          <label>Your Feedback</label>
          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)}/>
        </p>
        <p>
          <label>Your Name</label>
          <input type="text" value={student} onChange={(e) => setStudent(e.target.value)}/>
        </p>
      </section>
      <section id="draft">
        <h2>Your feedback</h2>

        <Review  feedback={feedback} student={student}/>

        <p>
          <button>Save</button>
        </p>
      </section>
    </>
  );
}

export default App;
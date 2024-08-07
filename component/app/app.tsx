import styles from './app.module.css'
import { getResult } from "../../services/ApiWrapper";
import {useState } from 'react';

export default function App() {

  const [tone, setToneDropdown] = useState("funny")
  const [style, setStyleDropdown] = useState("summarize")
  const [writing, setWriting] = useState("")
  const [response, setResponse] = useState("")

  const TYPE = {
    TONE: "tone",
    STYLE: "style"
  }

  const handleToneChange = async (event : any) => {
    const toneState = event.target.value
    setToneDropdown(toneState);
  }

  const handleStyleChange = async (event: any) => {
    const styleState = event.target.value
    setStyleDropdown(styleState);
  }

  /**
   * This function is called when the user clicks the "Change Tone" button.
   */
  const getToneValue = async () => {
    getResult({ content: writing, type: TYPE.TONE, context: tone }).then((response) => {
      setResponse(response);
    });
  }

  /**
   * This function is called when the user clicks the "Take Action" button.
   */
  const getStyleValue = async () => {
    getResult({ content: writing, type: TYPE.STYLE, context: style }).then((response) => {
      setResponse(response);
    });
  }

  return (
    <div>
      <select className={styles.tone_change} onChange={handleToneChange}
        name='Change tone' id="change_tone_dropdown" value={tone}>
        <option value="funny">Funny</option>
        <option value="professional">Professional </option>
        <option value="casual">Casual</option>
      </select>
      <button className={styles.submit_button_tone} name='change_tone' id='change_tone_button' onClick={getToneValue}>Change Tone</button>

      <select className={styles.style_change} name='Change Style' id="change_style_dropdown"
        onChange={handleStyleChange} value={style}>
        <option value="summarize">Summarize</option>
        <option value="vocab">Vocab Suggestion</option>
        <option value="improve">Improve</option>
      </select>
      <button className={styles.submit_button_action} id='change_style_button' onClick={getStyleValue}>Take Action</button>

      <div className={styles.writing_area}>
        <textarea placeholder="Write your content here..." id='writing_space' onChange={e => setWriting(e.target.value)} />
      </div>
      <div className={styles.response_area}>
        <textarea placeholder="AI Response" id='response_space' value={response} readOnly={true}/>
      </div>
    </div>
  )
}



export{}
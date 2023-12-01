import React, { useState, useEffect } from 'react'
import '../styles.css'

const CreatePoll = () => {
    const [isMultipleChoice, setIsMultipleChoice] = useState(false)
    const [title, setTitle] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [answers, setAnswers] = useState(["","",""])

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetch("http://localhost:5000/polls/create", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                isMultipleChoice: isMultipleChoice,
                title: title,
                numberOfAnswers: answers.length,
                answers: answers
            })
        })
        .then((response) => {

        })
    }

    const addAnswer = () => {
        setAnswers([...answers, ""]);
    }

    const removeAnswer = (index) => {
        if (answers.length > 3) {
          let copy = [...answers];
          copy.splice(index, 1); // Remove 1 element at the specified index
          setAnswers(copy);
        } else {
          setErrorMessage("You can't have less than 3 answers."); // Set a default error message if none exists
        }
      };

    useEffect(() => {
        setErrorMessage()
    }, [answers])

    return (
        <>
            <h1 className='create-title'>
                Create a Poll
            </h1>
            <form>
                <label className='create-label'>Title</label><br></br>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title your question here'
                    className='create-input-title'    
                >
                </input>
                <div>
                    <label>
                    <input
                        type='radio'
                        name='choice'
                        value='single'
                        checked={!isMultipleChoice}
                        onChange={() => setIsMultipleChoice(false)}
                        className='create-input-radio'
                    />
                    Single choice
                    </label>
                </div>
                <div>
                    <label>
                    <input
                        type='radio'
                        name='choice'
                        value='multiple'
                        checked={isMultipleChoice}
                        onChange={() => setIsMultipleChoice(true)}
                        className='create-input-radio'
                    />
                    Multiple choice
                    </label>
                </div>
                <div style={{ height: '15rem', overflowY: 'scroll', border: 'transparent', padding: '10px' }}>{/*TODO cand faci css, overflowY este ceea ce te intereseaza*/}
                    {answers.map((answer, index) => (
                        <div key={index}>
                        <input
                            type='text'
                            value={answer}
                            onChange={(e) => {
                            let value = e.target.value;
                            const updatedAnswers = [...answers];
                            updatedAnswers[index] = value;
                            setAnswers(updatedAnswers);
                            }}
                            placeholder={"Answer " + (index + 1)}
                            className='create-input-answer'
                        />
                        <button onClick={() => removeAnswer(index)} type='button' className='create-button-delete'>X</button>
                        </div>
                    ))}
                </div>
                <button onClick={addAnswer} type='button' className='crate-button-answer'> {/*TODO Trebuie svhimbat si asta */}
                    Add option
                </button>
                <button type='submit' onClick={handleSubmit} className='create-button-poll'>
                    Create Poll
                </button>
                <div className='popup-message'>
                    {errorMessage}
                </div>
            </form>
        </>
    )
}


export default CreatePoll
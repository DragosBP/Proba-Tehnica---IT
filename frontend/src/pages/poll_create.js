import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import '../styles.css'

const CreatePoll = () => {
    const [blurr, setBlurr] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        blurr ? 
            document.getElementById('main').style.filter = 'blur(5px)'
            : 
            document.getElementById('main').style.filter = 'blur(0px)'
    }, [blurr])
    
    const handleBlurr = () => {
        setBlurr(!blurr)
        setOpen(!open)
    }

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
            //TODO: atauga logica pentru cand expira un token
            if (response.status === 402) {
                setErrorMessage("Title cannot be empty!")
            }
            if (response.status === 200)
                setErrorMessage("Poll created with succes")
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
    }, [answers, title])

    return (
        <>
        <Popup 
            trigger={
                <button>
                    Create Poll
                </button>}
            onOpen={handleBlurr}
            onClose={handleBlurr}
            modal
            nested
            className="create-popup"
        >
            <h1>
                Create a Poll
            </h1>
            <form>
                <div>
                    <label>Title<br></br>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Title your question here'
                            className='create-input-title'    
                        >
                        </input>
                    </label>
                </div>
                <div>
                    <label>
                        Voting type
                        <label>
                            <input
                                type='radio'
                                name='choice'
                                value='single'
                                checked={!isMultipleChoice}
                                onChange={() => setIsMultipleChoice(false)}
                                />
                            <p>Single choice</p>
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='choice'
                                value='multiple'
                                checked={isMultipleChoice}
                                onChange={() => setIsMultipleChoice(true)}
                                />
                            <p>Multiple choice</p>
                        </label>
                    </label>
                </div>
                <p>
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
                                placeholder={"Option " + (index + 1)}
                            />
                            <button onClick={() => removeAnswer(index)} type='button'>X</button>
                        </div>
                    ))}
                    <button onClick={addAnswer} type='button'> {/*TODO Trebuie svhimbat si asta */}
                        +Add option
                    </button>
                </p>
                <h3>
                    {errorMessage}
                </h3>
            </form>
            <button type='submit' onClick={handleSubmit}>
                Create Poll
            </button>
        </Popup>
        </>
    )
}


export default CreatePoll
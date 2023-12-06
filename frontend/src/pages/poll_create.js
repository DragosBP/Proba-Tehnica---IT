import React, { useState, useEffect, useRef } from 'react'
import Popup from 'reactjs-popup'
import '../styles.css'

const CreatePoll = (props) => {
    const [blurr, setBlurr] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        blurr ? 
            document.getElementById('main').style.filter = 'blur(5px)'
            : 
            document.getElementById('main').style.filter = 'blur(0px)'
    }, [blurr])
    
    const mainRef = useRef(null);

    const handleBlurr = () => {
        setBlurr(!blurr)
        setOpen(!open)
    }

    const [isMultipleChoice, setIsMultipleChoice] = useState(false)
    const [title, setTitle] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [answers, setAnswers] = useState(["","",""])

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            if (response.status === 402) {
                setErrorMessage("Title cannot be empty!")
            }
            if (response.status === 200) {
                props.handleGetPolls()
                setErrorMessage("Poll created with success")
            }
            if (response.status === 498) {
                setErrorMessage("Your session has expired. Please relog in before you create a poll.")
            }
        })
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.keyCode === 13) {
                handleSubmit(event);
            }
        };

        const inputField = mainRef.current;
        if (inputField) {
            inputField.addEventListener('keypress', handleKeyPress);
        }

        return () => {
            if (inputField) {
                inputField.addEventListener('keypress', handleKeyPress);
            }
        };
    }, [handleSubmit]);

    const addAnswer = () => {
        setAnswers([...answers, ""]);
    }

    const removeAnswer = (index) => {
        if (answers.length > 3) {
          let copy = [...answers];
          copy.splice(index, 1);
          setAnswers(copy);
        } else {
          setErrorMessage("You can't have less than 3 answers.");
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
            <form ref={mainRef}>
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
                <h4>
                    Answer Options
                </h4>
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
                            <button onClick={() => removeAnswer(index)} type='button'><div>X</div></button>
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
import React, {useState} from 'react'

const PollTheUser = (props) => {
    const [errorMessage, setErrorMessage] = useState() 

    const handleSubmit = async () => {
        await fetch("http://localhost:5000/polls/delete", {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                pollId: props.pollId
            })
        })
        .then((response) => {
            if (response.status === 200) {
                setErrorMessage("Poll deleted with success")
                props.handleGetPolls()
            }
            if (response.status === 498) {
                setErrorMessage("Your session has expired. Please relog in before you delete a poll.")
            }
        })
    }

    return (
        <>
            <div className='poll-title'>{props.title}</div>
            {!props.isMultiple ? (
                <>
                    <h3>Make a choice</h3>
                    <div className='poll-input'>
                        {
                            props.answers.map((answer, index) => (
                                <p key={index}>
                                    <input
                                        type="radio"
                                        value={answer.name}
                                        onClick={()=>{setErrorMessage("You cannot vote on your own poll!")}}
                                    />
                                    <label type='radio'>{answer.name}</label>
                                </p>
                            ))
                        }
                    </div>
                </>
            ) : (
                <>
                    <h3>Make multiple choices</h3>
                    <div className='poll-input'>
                    {
                        props.answers.map((answer, index) => (
                            <p key={index}>
                                <input
                                    type="checkbox"
                                    value={answer.name}
                                    onClick={()=>{setErrorMessage("You cannot vote on your own poll!")}}
                                />
                                <label type="checkbox">{answer.name}</label>
                            </p>
                        ))
                    }
                    </div>
                </>
            )}
            <div className='poll-error'>
                    {errorMessage}
            </div>
            <button onClick={handleSubmit}>
                Delete
            </button>
        </>
    )
}

export default PollTheUser
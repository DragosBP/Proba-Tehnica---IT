import React, {useEffect, useState} from 'react'

const PollVoterUser = (props) => {

    const [errorMessage, setErrorMessage] = useState()
    const [votes, setVotes] = useState([])
    const [hasVoted, setHasVoted] = useState()
    
    
    const handleVoter = async () => {
        const falseVotes = Array.from({ length: props.numberOfAnswers }, () => false)
        setVotes(falseVotes)

        const userVoted = props.usersThatVoted.find(
            (user) => user.userId.toString() === props.userId.toString()
        )

        if (userVoted) {
            const updatedVotes = Array(props.numberOfAnswers).fill(false);
            await userVoted.answers.forEach((index) => {
                updatedVotes[index] = true;
            });

            setVotes(updatedVotes)
            setHasVoted(true)
        } else {
            setHasVoted(false)
        }
    }

   const handleRemove = async (e) => {
        e.preventDefault()
        await fetch("http://localhost:5000/polls/votes", {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                votes: votes,
                pollId: props.pollId
            })
        })
        .then((response) => {
            if (response.status === 200) {
                props.handleGetPolls()
                setErrorMessage("Vote removed with success")
            }
            if (response.status === 498) {
                setErrorMessage("Your session has expired. Please relog in before you create a poll.")
            }
        })
   }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!votes.some((vote) => vote === true)) {
            setErrorMessage("Make at least one decision before you vote")
            return
        }

        await fetch("http://localhost:5000/polls/votes", {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                votes: votes,
                pollId: props.pollId
            })
        })
        .then((response) => {
            if (response.status === 200) {
                props.handleGetPolls()
                setErrorMessage("Vote registered with success")
            }
            if (response.status === 498) {
                setErrorMessage("Your session has expired. Please relog in before you create a poll.")
            }
        })
    }


    useEffect(() => {
        handleVoter()
        // console.log(votes)
    }, [props])

    return (
        <>
         <div className='poll-title'>{props.title}</div>
            {!props.isMultiple ? (
                <>
                    <h3>Make a choice</h3>
                    <div className='poll-input'>
                        {hasVoted ? (
                            <>
                            {props.answers.map((answer, index) => (
                                <p key={index}>
                                    <input
                                        type="radio"
                                        value={answer.name}
                                        checked={votes[index]}
                                        onClick={(e) => {
                                            setErrorMessage("You already voted on this poll")
                                        }}
                                        className='voted'
                                        disabled={true}
                                    />
                                    <label>{answer.name}</label>
                                </p>
                            ))}
                            </>
                        ) : (
                            <>
                            {props.answers.map((answer, index) => (
                                <p key={index}>
                                    <input
                                        type="radio"
                                        value={answer.name}
                                        checked={votes[index]}
                                        onChange={(e) => {
                                            const updatedVotes = Array.from({ length: props.numberOfAnswers }, () => false);
                                            updatedVotes[index] = true;
                                            setVotes(updatedVotes);
                                            // console.log(votes);
                                        }}
                                    />
                                    <label>{answer.name}</label>
                                </p>
                            ))}
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h3>Make multiple choices</h3>
                    <div className='poll-input'>
                    {hasVoted ? (
                        <>
                        {
                            props.answers.map((answer, index) => (
                                <p key={index}>
                                    <input
                                        type="checkbox"
                                        value={answer.name}
                                        checked={votes[index]}
                                        disabled
                                        className='voted'
                                    />
                                    <label type="checkbox">{answer.name}</label>
                                </p>
                            ))
                        }
                        </>
                    ) : (
                        <>
                        {
                            props.answers.map((answer, index) => (
                                <p key={index}>
                                    <input
                                        type="checkbox"
                                        value={answer.name}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const checked = e.target.checked
                                            votes[index] = !votes[index]
                                            setVotes(votes)
                                            // console.log(votes)
                                        }}
                                    />
                                    <label type="checkbox">{answer.name}</label>
                                </p>
                            ))
                        }
                        </>
                    )}
                    </div>
                </>
            )}
            <div className='poll-error'>
                    {errorMessage}
            </div>
            {hasVoted ? (
                <>
                    <button onClick={handleRemove}>
                        Remove Vote
                    </button>
                </>
            ) : (
                <>
                    <button onClick={handleSubmit}>
                        Vote
                    </button>
                </>
            )}
        </>
    )
}

export default PollVoterUser
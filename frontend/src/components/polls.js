import React, {useState, useEffect} from "react";
import PollNoUser from '../pages/poll_noUser'
import PollTheUser from "../pages/poll_theUser";
import "../styles.css"

const Polls = (props) => {

    const [isOwner, setIsOwner] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)

    const handleOwner = async () => {
        if (props.userId === props.ownerId) {
            setIsOwner(true)
        } else {
            setIsOwner(false)
        }
    }

    const handleVoter = async () => {
        if (props.usersThatVoted.some(user => user.userId.toString() === props.userId.toString())) {
            setHasVoted(true);
          } else {
            setHasVoted(false);
          }
    }

    useEffect(() => {
        handleOwner()
        handleVoter()
    }, [])

    return (
        <>
            {props.loaded ? (
                <>
                    {props.logged ? (
                    <>
                        {isOwner ? (
                            <>
                                <PollTheUser
                                    title={props.title}
                                    isMultiple={props.isMultiple}
                                    answers={props.answers}
                                    pollId={props.pollId}
                                    handleGetPolls={props.handleGetPolls}
                                />
                            </>
                        ) : (
                            <>
                                {hasVoted ? (
                                    <>
                                        <h1>Am si votat</h1>
                                    </>
                                ) : (
                                    <>
                                        <h1>Dar nu am votat</h1>
                                    </>
                                )}
                            </>
                        )}
                    </>
                    ) : (
                    <>
                        <PollNoUser 
                            title={props.title}
                            isMultiple={props.isMultiple}
                            answers={props.answers}
                        />
                    </>
                    )}
                </>
                ) : (
                <>
                    <h1>Loading</h1> {/*Felt cute, might delete later*/}
                </>
                )}
        </>
    )
}

export default Polls
import React, {useState, useEffect} from "react";
import PollNoUser from '../pages/poll_noUser'
import PollTheUser from "../pages/poll_theUser";
import PollVoterUser from "../pages/poll_voterUser";
import "../styles.css"

const Polls = (props) => {

    const [isOwner, setIsOwner] = useState(false)
    

    const handleOwner = async () => {
        if (props.userId === props.ownerId) {
            setIsOwner(true)
        } else {
            setIsOwner(false)
        }
    }

    

    useEffect(() => {
        handleOwner()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                <PollVoterUser
                                    title={props.title}
                                    isMultiple={props.isMultiple}
                                    answers={props.answers}
                                    userId={props.userId}
                                    pollId={props.pollId}
                                    handleGetPolls={props.handleGetPolls}
                                    numberOfAnswers={props.numberOfAnswers}
                                    usersThatVoted={props.usersThatVoted}
                                />
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
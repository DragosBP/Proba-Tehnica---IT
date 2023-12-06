import React, {useState} from 'react';

const PollNoUser = (props) => {

    const [errorMessage, setErrorMessage] = useState() 


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
                                        onClick={()=>{setErrorMessage("Please authentificate before you vote!")}}
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
                                    onClick={()=>{setErrorMessage("Please authentificate before you vote!")}}
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
        </>
    )
}


export default PollNoUser
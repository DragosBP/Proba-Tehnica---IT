import React from 'react'

const PollNoUser = (props) => {

    return (
        <form>
            <h1>{props.title}</h1>
            {!props.isMultiple ? (
                <>
                    <h3>Choose an option</h3>
                    {}
                </>
            ) : (
                <>
                    <h3>Choose multiple options</h3>
                </>
            )}
        </form>
    )
}

export default PollNoUser
import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import Polls from './components/polls'
import "./styles.css"

function App() {
  
  const [isLogged, setIsLogged] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const [userId, setUserId] = useState()

  const [pollsIdList, setPollsIdList] = useState([])
  const [ownerIdList, setOwnerIdList] = useState([])
  const [titleList, setTitleList] = useState([])
  const [isMultipleList, setIsMultipleList] = useState([])
  const [numberOfAnswersList, setNumberOfAnswersList] = useState([])
  const [answersList, setAnswersList] = useState([])
  const [usersThatVotedList, setUsersThatVotedList] = useState([])

  const handleGetUser = async () => {
      await fetch("http://localhost:5000/user", {
        method: 'get',
        headers: {
          'Authorization': localStorage.getItem('token')
        },
      })
      .then((response) => {
          if (response.status === 200) {
            setIsLogged(true)
            response.text().then((data) => {
              setUserId(data)
            })
          } else {
            setIsLogged(false)
            setUserId(" ")
          }
      })
  }

  const handleGetPolls = async () => {
    const response = await fetch("http://localhost:5000/polls", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();

    setPollsIdList(data.pollIdList);
    setOwnerIdList(data.ownerIdList);
    setTitleList(data.titleList);
    setIsMultipleList(data.isMultipleList);
    setNumberOfAnswersList(data.numberOfAnswersList);
    setAnswersList(data.answersList);
    setUsersThatVotedList(data.usersThatVotedList);
  }

  useEffect(() => {
    handleGetUser()
    handleGetPolls()
  }, [])


  useEffect(() => {
    setIsLoaded(true)
  }, [userId, pollsIdList, ownerIdList, titleList, isMultipleList, numberOfAnswersList, answersList, usersThatVotedList]);

  return (
    <div className="app" id="main">
      <Navbar 
        loaded={isLoaded} 
        logged={isLogged}
      />
      {pollsIdList.map((_, index) => (
      <div key={index}>
        <Polls
          loaded={isLoaded} 
          logged={isLogged}

          userId={userId} 
          pollId={pollsIdList[index]}
          ownerId={ownerIdList[index]}
          title={titleList[index]}
          isMultple={isMultipleList[index]}
          numberOfAnswers={numberOfAnswersList[index]}
          answers={answersList[index]}
          usersThatVoted={usersThatVotedList[index]}
        />
      </div>
    ))}
    </div>
  )
}

export default App
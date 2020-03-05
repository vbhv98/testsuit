import React from 'react'
import './App.css'
import TimeFormat from 'hh-mm-ss'

const App = () => {
  const [remaningTime, setRemaningTime] = React.useState(10800)
  const [timer, setTimer] = React.useState(null)

  const pdfRef = React.createRef(0)

  const resetTimer = () => {
    clearInterval(timer)
    setTimer(null)
  }

  React.useEffect(() => {
    if (remaningTime <= 0) resetTimer()
  }, [remaningTime])

  const handleStart = () => {
    if (timer === null)
      setTimer(
        setInterval(() => {
          setRemaningTime(rt => rt - 1)
        }, 1000)
      )
    else {
      resetTimer()
    }
  }

  React.useEffect(() => {
    return () => {
      if (timer) {
        resetTimer()
      }
    }
  }, [])

  return remaningTime <= 0 ? (
    <div class='end-test'>
      <h1>Test Over!</h1>
    </div>
  ) : (
    <div className='App'>
      <div
        className='timer'
        style={{ background: remaningTime >= 3600 ? '#56ab2f' : '#ef473a' }}
      >
        <button onClick={handleStart}>
          {timer === null ? 'START' : 'PAUSE'}
        </button>
        <p>
          Time Remaning:{' '}
          <strong>{TimeFormat.fromS(remaningTime, 'hh:mm:ss')}</strong>
        </p>
      </div>
      <object
        ref={pdfRef}
        width='100%'
        height='720'
        data='/source.pdf'
        type='application/pdf'
      >
        Loading
      </object>
    </div>
  )
}

export default App

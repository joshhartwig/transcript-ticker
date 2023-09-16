let startTime
let interval
let pausedDuration = 0 // Track total time paused
let lastPauseTime // Time when last paused
let running = false

function startTimer() {
  startTime = Date.now()
  interval = setInterval(updateDuration, 1000)
  running = true
  document.getElementById('startBtn').disabled = true
  document.getElementById('pauseResumeBtn').disabled = false
  document.getElementById('endBtn').disabled = false
  appendToLog(`Started at ${new Date(startTime).toLocaleTimeString()}`)
}

function togglePauseResume() {
  if (running) {
    clearInterval(interval)
    lastPauseTime = Date.now()
    appendToLog(
      `Paused at ${new Date(
        lastPauseTime
      ).toLocaleTimeString()} - Duration since start: ${getFormattedDuration(
        lastPauseTime - startTime - pausedDuration
      )}`
    )
    document.getElementById('pauseResumeBtn').textContent = 'Resume'
    running = false
  } else {
    const resumeTime = Date.now()
    pausedDuration += resumeTime - lastPauseTime
    interval = setInterval(updateDuration, 1000)
    appendToLog(
      `Resumed at ${new Date(
        resumeTime
      ).toLocaleTimeString()} - Duration since start: ${getFormattedDuration(
        resumeTime - startTime - pausedDuration
      )}`
    )
    document.getElementById('pauseResumeBtn').textContent = 'Pause'
    running = true
  }
}

function endTimer() {
  clearInterval(interval)
  const endTime = Date.now()
  const totalDuration = endTime - startTime - pausedDuration
  appendToLog(
    `Ended at ${new Date(
      endTime
    ).toLocaleTimeString()} - Total duration: ${getFormattedDuration(
      totalDuration
    )}`
  )

  document.getElementById('duration').textContent = 'Duration: 0 seconds'
  document.getElementById('progressBar').style.width = '0%'
  document.getElementById('startBtn').disabled = false
  document.getElementById('pauseResumeBtn').disabled = true
  document.getElementById('endBtn').disabled = true
  document.getElementById('pauseResumeBtn').textContent = 'Pause'

  running = false
  pausedDuration = 0
}

function updateDuration() {
  const currentTime = Date.now()
  const elapsedTime = currentTime - startTime - pausedDuration

  // Calculate progress percentage
  const progressPercentage = (elapsedTime / 1000) % 100 // Reset after reaching 100%

  document.getElementById('duration').textContent =
    'Duration: ' + getFormattedDuration(elapsedTime)
  document.getElementById('progressBar').style.width = progressPercentage + '%'
}

function getFormattedDuration(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours} hours ${minutes} minutes ${seconds} seconds`
  } else if (minutes > 0) {
    return `${minutes} minutes ${seconds} seconds`
  } else {
    return `${seconds} seconds`
  }
}

function appendToLog(message) {
  const logElement = document.getElementById('log')
  const listItem = document.createElement('li')
  listItem.textContent = message
  logElement.appendChild(listItem)
}

function logToCSV() {
  const logElement = document.getElementById('log')
  const items = logElement.getElementsByTagName('li')
  let csv = 'Log\n' // Column header
  for (let item of items) {
    csv += item.textContent + '\n'
  }
  return csv
}

function downloadCSV() {
  const csv = logToCSV()
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('hidden', '')
  a.setAttribute('href', url)
  a.setAttribute('download', 'log.csv')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

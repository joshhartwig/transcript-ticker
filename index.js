let startTime
let interval
let pausedDuration = 0
let lastPauseTime
let running = false

function startTimer() {
  startTime = Date.now()
  document.getElementById('startTime').textContent =
    'Start Time: ' + new Date(startTime).toLocaleTimeString()
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

  document.getElementById('progressBar').style.width = '0%'
  document.getElementById('duration').textContent = ''
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
  const progressPercentage = (elapsedTime / 1000) % 100

  document.getElementById('duration').textContent =
    getFormattedDuration(elapsedTime)
  document.getElementById('progressBar').style.width = progressPercentage + '%'
}

function getFormattedDuration(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

function appendToLog(message) {
  const logElement = document.getElementById('log')
  const listItem = document.createElement('li')
  listItem.textContent = message
  logElement.appendChild(listItem)
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme')
  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'light')
    document.getElementById('themeToggle').textContent = '☀️'
  } else {
    document.body.setAttribute('data-theme', 'dark')
    document.getElementById('themeToggle').textContent = '🌙'
  }
}

let startTime
let interval
let running = false

function toggleTheme() {
  const body = document.body
  const themeButton = document.getElementById('themeToggle')
  if (body.classList.contains('dark')) {
    body.classList.remove('dark')
    body.style.color = '#333'
    body.style.backgroundColor = '#FAFAFA'
    themeButton.textContent = '🌙'
  } else {
    body.classList.add('dark')
    body.style.color = '#FAFAFA'
    body.style.backgroundColor = '#333'
    themeButton.textContent = '☀️'
  }
}

function toggleTimer() {
  if (running) {
    clearInterval(interval)
    document.getElementById('startStopBtn').textContent = 'Start'
    let endTime = new Date()
    let duration = (endTime - startTime) / 1000
    document.getElementById(
      'duration'
    ).textContent = `Duration: ${duration.toFixed(2)} seconds`
    running = false

    // Log the times
    const logDiv = document.getElementById('log')
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    const logText = `${startTime.toDateString()} - ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()} - ${minutes} minutes and ${seconds.toFixed(
      2
    )} seconds<br>`
    logDiv.innerHTML += logText
  } else {
    document.getElementById('progressBar').style.width = '0%'
    document.getElementById('startStopBtn').textContent = 'Stop'
    startTime = new Date()
    running = true
    interval = setInterval(function () {
      let currentTime = new Date()
      let elapsed = (currentTime - startTime) / 1000
      let widthPercentage = ((elapsed % 60) / 60) * 100
      document.getElementById('progressBar').style.width = `${widthPercentage}%`
      document.getElementById(
        'duration'
      ).textContent = `Duration: ${elapsed.toFixed(2)} seconds`
    }, 100)
  }
}

function logTime(start, end) {
  const logElement = document.getElementById('log')
  const elapsedTime = end - start
  const durationMinutes = Math.floor(elapsedTime / 60000)
  const durationSeconds = ((elapsedTime % 60000) / 1000).toFixed(0)

  const startDate = new Date(start)
  const endDate = new Date(end)

  const formattedStart = startDate.toLocaleTimeString()
  const formattedEnd = endDate.toLocaleTimeString()
  const formattedDate = startDate.toLocaleDateString()

  // Create a new list item and set its text content
  const listItem = document.createElement('li')
  listItem.textContent = `${formattedDate} - ${formattedStart} - ${formattedEnd} - ${durationMinutes} minutes and ${durationSeconds} seconds`

  // Append the list item to the log
  logElement.appendChild(listItem)
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button')
  const input = document.querySelector('input')

  button.addEventListener('click', () => {
    const state = input.value.trim()
    if (state) {
      fetchWeatherAlerts(state)
    }
  })
})

async function fetchWeatherAlerts(state) {
  const STATE_ABBR = state.toUpperCase()
  clearError()

  try {
    const response = await fetch(https://api.weather.gov/alerts/active?area=${STATE_ABBR})
    const data = await response.json()
    console.log(data)
    displayAlerts(data)
    clearInput()
  } catch (error) {
    console.error('Error fetching weather alerts:', error)
    displayError(error.message)
  }
}

function displayAlerts(data) {
  const alertsContainer = document.getElementById('alerts-display')

  if (!alertsContainer) return

  alertsContainer.innerHTML = ''

  const features = data.features || []
  const title = data.title || 'Weather Alerts'

  const summary = document.createElement('h2')
  summary.textContent = ${title}: ${features.length}
  alertsContainer.appendChild(summary)

  if (features.length > 0) {
    const alertsList = document.createElement('ul')
    features.forEach(alert => {
      const headline = alert.properties?.headline || 'No headline available'
      const listItem = document.createElement('li')
      listItem.textContent = headline
      alertsList.appendChild(listItem)
    })
    alertsContainer.appendChild(alertsList)
  } else {
    const noAlerts = document.createElement('p')
    noAlerts.textContent = 'No active alerts for this area.'
    alertsContainer.appendChild(noAlerts)
  }
}

function displayError(message) {
  const errorDiv = document.getElementById('error-message')
  if (errorDiv) {
    errorDiv.textContent = message
    errorDiv.classList.remove('hidden')
  }
}

function clearError() {
  const errorDiv = document.getElementById('error-message')
  if (errorDiv) {
    errorDiv.textContent = ''
    errorDiv.classList.add('hidden')
  }
}

function clearInput() {
  const inputField = document.querySelector('input')
  if (inputField) {
    inputField.value = ''
  }
}
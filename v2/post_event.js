const API_KEY = 'AIzaSyCzMfTwlGOJQKrTI4_7LtIJSbzGDboHfwQ'
const SPREADSHEET_ID = '1bO5zY26LA5bx01RApjrik6QOmBU4dOVDlFQHRu5QWaI'
const SHEET_NAME = 'Form Responses 2'
const FORM_BASE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfWOWlZ9IIrP1wfZ9XgzbF2cbdkQdbHqWBzvUHEEOlViA2k2w/formResponse?&submit=Submit?usp=pp_url'

/** Fetch Data from Google Sheet */
async function fetchSheetData () {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.values
  } catch (error) {
    console.error('Error fetching sheet data:', error)
    return []
  }
}

/** Populate School Dropdown */
async function populateSchoolDropdown () {
  const sheetData = await fetchSheetData()
  const schoolDropdown = document.getElementById('schoolName')

  if (!schoolDropdown) return // Prevent error if element is missing

  let schools = new Set()

  sheetData.slice(1).forEach(row => {
    if (row[1]) schools.add(row[1].trim())
  })

  schoolDropdown.innerHTML = "<option value=''>Select School</option>"
  schools.forEach(school => {
    let option = document.createElement('option')
    option.value = school
    option.textContent = school
    schoolDropdown.appendChild(option)
  })

  console.log('Populated Schools:', Array.from(schools)) // Debugging
}

/** Populate Event Dropdown */
async function populateEventDropdown () {
  const schoolName = document.getElementById('schoolName').value
  const sheetData = await fetchSheetData()
  const eventDropdown = document.getElementById('eventName')

  if (!eventDropdown) return // Prevent error if element is missing

  let events = new Set()

  sheetData.slice(1).forEach(row => {
    if (row[1]?.trim() === schoolName && row[2]) {
      events.add(row[2].trim())
    }
  })

  eventDropdown.innerHTML = "<option value=''>Select Event</option>"
  events.forEach(event => {
    let option = document.createElement('option')
    option.value = event
    option.textContent = event
    eventDropdown.appendChild(option)
  })

  console.log('Populated Events:', Array.from(events)) // Debugging
}

/** Fetch Event Details */
async function fetchEventDetails () {
  const schoolName = document.getElementById('schoolName').value
  const eventName = document.getElementById('eventName').value
  const sheetData = await fetchSheetData()

  const eventData = sheetData.find(
    row => row[1]?.trim() === schoolName && row[2]?.trim() === eventName
  )
  if (!eventData) return

  // document.getElementById('contactPersonName').value = eventData[20] || ''
  // document.getElementById('contactPersonMobile').value = eventData[21] || ''
  // document.getElementById('contactPersonEmail').value = eventData[22] || ''
  // document.getElementById('eventDate').value = eventData[3] || ''
  // document.getElementById('eventDuration').value = eventData[4] || ''
  // document.getElementById('participantsCount').value = eventData[5] || ''
}

/** Submit Event Detail */
async function submitEventDetail () {
  try {
    let formData = new URLSearchParams()
    formData.append(
      'entry.493368372',
      document.getElementById('schoolName').value
    )
    formData.append(
      'entry.87921043',
      document.getElementById('eventName').value
    )
    formData.append(
      'entry.646415086',
      document.getElementById('contactPersonName').value
    )
    formData.append(
      'entry.1310405729',
      document.getElementById('contactPersonMobile').value
    )
    formData.append(
      'entry.376730094',
      document.getElementById('contactPersonEmail').value
    )
    formData.append(
      'entry.1814042066',
      document.getElementById('eventDate').value
    )
    formData.append(
      'entry.1221970040',
      document.getElementById('eventDuration').value
    )
    formData.append(
      'entry.1047405020',
      document.getElementById('participantsCount').value
    )
    formData.append('entry.2108547846', 'Post-event')

    formData.append(
      'entry.1047405020',
      document.getElementById('participantsCount').value
    )
    //https://docs.google.com/forms/d/e/1FAIpQLSfWOWlZ9IIrP1wfZ9XgzbF2cbdkQdbHqWBzvUHEEOlViA2k2w/viewform?usp=pp_url&
    // entry.493368372=schoolName&
    // entry.87921043=eventName&
    // entry.646415086=contactPersonName&
    // entry.1310405729=contactPersonMobile&
    // entry.376730094=contactPersonEmail&
    // entry.1814042066=eventDate&
    // entry.1221970040=eventDuration&
    // entry.1047405020=participantsCount&

    formData.append(
      'entry.605181714',
      document.getElementById('electricityTypeUsage').value
    ) // =electricityTypeUsage&
    formData.append(
      'entry.947010150',
      document.getElementById('electricityUnitsUsage').value
    ) // =electricityUnitsUsage&
    formData.append(
      'entry.1100991259',
      document.getElementById('generatorTypeUsage').value
    ) // =generatorTypeUsage&
    formData.append(
      'entry.1046566004',
      document.getElementById('generatorLitersUsage').value
    ) // =generatorLitersUsage&
    formData.append(
      'entry.1289781962',
      document.getElementById('transportDieselUsage').value
    ) // =transportDieselUsage&
    formData.append(
      'entry.73047054',
      document.getElementById('transportPetrolUsage').value
    ) // =transportPetrolUsage&
    formData.append(
      'entry.1313536288',
      '0'
      //document.getElementById('transportEVUsage').value
    ) // =transportEVUsage&
    formData.append(
      'entry.413821880',
      document.getElementById('participantsUsingPublicTransport').value
    ) // =participantsUsingPublicTransport&
    formData.append(
      'entry.79051389',
      document.getElementById('participantsUsingCarpool').value
    ) // =participantsUsingCarpool&
    formData.append(
      'entry.814786714',
      document.getElementById('participantsUsingPrivateVehicle').value
    ) // =participantsUsingPrivateVehicle&
    formData.append(
      'entry.1177172054',
      document.getElementById('participantsUsingCycleWalk').value
    ) // =participantsUsingCyleWalk&
    formData.append(
      'entry.600183046',
      document.getElementById('wasteSegregationPossibility').value
    ) // =wasteSegregationPossibility&
    formData.append(
      'entry.1578498963',
      document.getElementById('wasteCompostingPossibility').value
    ) // =wasteCompostingPossibility&
    formData.append(
      'entry.382187960',
      document.getElementById('wasteLandfillKilogram').value
    ) // =wasteLandfillKilogram

    console.log(formData)
    fetch(FORM_BASE_URL, { method: 'POST', body: formData })

    // alert('Data submitted successfully!')
    alert(
      'Thank you for using the calculator to make your event a carbon conscious event. We will analyse the submitted data and revert back to you.'
    )
    document.getElementById('postEventForm').reset()
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

// Event Listeners
document
  .getElementById('schoolName')
  .addEventListener('change', populateEventDropdown)
document
  .getElementById('eventName')
  .addEventListener('change', fetchEventDetails)
document
  .getElementById('postEventForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    submitEventDetail()
  })

// Initialize dropdown
populateSchoolDropdown()

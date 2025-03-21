const API_KEY = 'AIzaSyCzMfTwlGOJQKrTI4_7LtIJSbzGDboHfwQ'
const SPREADSHEET_ID = '1bO5zY26LA5bx01RApjrik6QOmBU4dOVDlFQHRu5QWaI'
// const SHEET_NAME = "Form Responses 2";
const SHEET_NAME = 'EventDataEntries'

// Fetch Data from Google Sheet
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

// Populate School Name List
async function populateSchoolList () {
  const sheetData = await fetchSheetData()
  const schoolList = document.getElementById('schoolName')
  let schools = new Set()

  sheetData.slice(1).forEach(row => {
    if (row[1]) schools.add(row[1].trim())
  })

  //   schoolList.innerHTML = ''
  schools.forEach(school => {
    let option = document.createElement('option')
    option.value = school
    option.textContent = school
    schoolList.appendChild(option)
  })
  let option = document.createElement('option')
  option.value = 'RegisterSchoolNow'
  option.textContent = 'REGISTER A NEW SCHOOL!'
  schoolList.appendChild(option)
}

// Populate Event Name List based on selected school
async function populateEventList () {
  const schoolName = document.getElementById('schoolName').value
  if (schoolName === 'RegisterSchoolNow') {
    document.getElementById('newSchoolName').style.display = 'block'
    document.getElementById('newEventName').style.display = 'block'
  } else {
    document.getElementById('newSchoolName').style.display = 'none'
    document.getElementById('newEventName').style.display = 'none'
  }
  const sheetData = await fetchSheetData()
  const eventList = document.getElementById('eventName')
  let events = new Set()

  sheetData.slice(1).forEach(row => {
    if (row[1]?.trim() === schoolName && row[2]) {
      events.add(row[2].trim())
    }
  })

  eventList.innerHTML = ''
  events.forEach(event => {
    let option = document.createElement('option')
    option.value = event
    option.textContent = event
    eventList.appendChild(option)
  })
  let option = document.createElement('option')
  option.value = 'RegisterEventNow'
  option.textContent = 'REGISTER A NEW EVENT!'
  eventList.appendChild(option)
}

async function populateNewEvent () {
  const eventName = document.getElementById('eventName').value
  if (eventName === 'RegisterEventNow') {
    document.getElementById('newEventName').style.display = 'block'
  } else {
    document.getElementById('newEventName').style.display = 'none'
  }
}
// Event Listeners
document
  .getElementById('schoolName')
  .addEventListener('input', populateEventList)

document.getElementById('eventName').addEventListener('input', populateNewEvent)

// Initialize dropdowns
populateSchoolList()

//////////////

// function SubmitSchoolDetail () {
//   try {
//     var formData = {
//       schoolName: document.getElementById('schoolName').value,
//       eventName: document.getElementById('eventName').value,
//       contactPersonName: document.getElementById('contactPersonName').value,
//       contactPersonMobile: document.getElementById('contactPersonMobile').value,
//       contactPersonEmail: document.getElementById('contactPersonEmail').value
//     }

//     var formBaseUrl =
//       'https://docs.google.com/forms/d/e/1FAIpQLSc4YJ4TaypFCQW5SmQu0IgOjN9cQ4c0NDXmxV_TwuGMoyDoHw/formResponse?&submit=Submit?usp=pp_url'
//     var formUrlQueryParam = `&entry.1592400501=${formData.schoolName}&entry.1508901532=${formData.eventName}&entry.1908189056=${formData.contactPersonName}&entry.816139128=${formData.contactPersonMobile}&entry.372750268=${formData.contactPersonEmail}`
//     var finalFormURL = `${formBaseUrl}${formUrlQueryParam}`
//     submitDataToGoogleForms(finalFormURL)
//     alert('Data submitted successfully.')
//   } catch (e) {
//     console.error(e)
//     alert('Some error occured! Please try after some time...')
//   }
// }

function SubmitEventDetail () {
  try {
    var formData = {
      schoolName:
        document.getElementById('schoolName').value === 'RegisterSchoolNow'
          ? document.getElementById('newSchoolName').value
          : document.getElementById('schoolName').value,
      eventName:
        document.getElementById('eventName').value === 'RegisterEventNow'
          ? document.getElementById('newEventName').value
          : document.getElementById('eventName').value,
      contactPersonName: document.getElementById('contactPersonName').value,
      contactPersonMobile: document.getElementById('contactPersonMobile').value,
      contactPersonEmail: document.getElementById('contactPersonEmail').value,
      eventDate: document.getElementById('eventDate').value,
      eventDuration: document.getElementById('eventDuration').value,
      participantsCount: document.getElementById('participantsCount').value,
      electricityTypeUsage: document.getElementById('electricityTypeUsage')
        .value,
      electricityUnitsUsage: document.getElementById('electricityUnitsUsage')
        .value,
      generatorTypeUsage: document.getElementById('generatorTypeUsage').value,
      generatorLitersUsage: document.getElementById('generatorLitersUsage')
        .value,
      transportDieselUsage: document.getElementById('transportDieselUsage')
        .value,
      transportPetrolUsage: document.getElementById('transportPetrolUsage')
        .value,
      transportEVUsage: 0, // document.getElementById('transportEvUsage').value,
      participantsUsingPublicTransport: document.getElementById(
        'participantsUsingPublicTransport'
      ).value,
      participantsUsingCarpool: document.getElementById(
        'participantsUsingCarpool'
      ).value,
      participantsUsingPrivateVehicle: document.getElementById(
        'participantsUsingPrivateVehicle'
      ).value,
      participantsUsingCyleWalk: document.getElementById(
        'participantsUsingCycleWalk'
      ).value,
      wasteSegregationPossibility: document.getElementById(
        'wasteSegregationPossibility'
      ).value,
      wasteCompostingPossibility: document.getElementById(
        'wasteCompostingPossibility'
      ).value,
      wasteLandfillKilogram: document.getElementById('wasteLandfillKilogram')
        .value
    }
    const eventStage = 'Pre-Event'
    var formBaseUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSfWOWlZ9IIrP1wfZ9XgzbF2cbdkQdbHqWBzvUHEEOlViA2k2w/formResponse?&submit=Submit?usp=pp_url'
    var formUrlQueryParam = `&entry.493368372=${formData.schoolName}&entry.87921043=${formData.eventName}&entry.646415086=${formData.contactPersonName}
        &entry.1310405729=${formData.contactPersonMobile}&entry.376730094=${formData.contactPersonEmail}&entry.1814042066=${formData.eventDate}
        &entry.1221970040=${formData.eventDuration}&entry.1047405020=${formData.participantsCount}&entry.605181714=${formData.electricityTypeUsage}
        &entry.947010150=${formData.electricityUnitsUsage}&entry.1100991259=${formData.generatorTypeUsage}&entry.1046566004=${formData.generatorLitersUsage}
        &entry.1289781962=${formData.transportDieselUsage}&entry.73047054=${formData.transportPetrolUsage}&entry.1313536288=${formData.transportEVUsage}
        &entry.413821880=${formData.participantsUsingPublicTransport}&entry.79051389=${formData.participantsUsingCarpool}
        &entry.814786714=${formData.participantsUsingPrivateVehicle}&entry.1177172054=${formData.participantsUsingCyleWalk}
        &entry.600183046=${formData.wasteSegregationPossibility}&entry.1578498963=${formData.wasteCompostingPossibility}&entry.382187960=${formData.wasteLandfillKilogram}
        &entry.2108547846=${eventStage}`
    var finalFormURL = `${formBaseUrl}${formUrlQueryParam}`
    submitDataToGoogleForms(finalFormURL)
    alert('Data submitted successfully.')
  } catch (e) {
    console.error(e)
    alert('Some error occured! Please try after some time...')
  }
}

function submitDataToGoogleForms (formUrl) {
  fetch(formUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.text()) // Get response as text
    .then(data => console.log('Response:', data))
    .catch(error => console.error('Error submitting the form', error))
}

const emissionFactors = {
  petrol: 2.27193, // kg CO₂ per liter
  diesel: 2.6444, // kg CO₂ per liter
  electricity: 653, // kg CO₂ per MWh
  landfillWaste: 7.455 // kg CO₂e per kg waste
}

function generatePDF () {
  // Define Emission Factors
  const emissionFactors = {
    petrol: 2.27193, // kg CO₂ per liter
    diesel: 2.6444, // kg CO₂ per liter
    electricity: 0.653, // kg CO₂ per kWh
    landfillWaste: 7.455 // kg CO₂e per kg waste
  }

  let petrolTotal =
    Number(document.getElementById('transportPetrolUsage').value) +
    (document.getElementById('generatorTypeUsage').value === 'petrol'
      ? Number(document.getElementById('generatorLitersUsage').value)
      : 0)

  let dieselTotal =
    Number(document.getElementById('transportDieselUsage').value) +
    (document.getElementById('generatorTypeUsage').value === 'diesel'
      ? Number(document.getElementById('generatorLitersUsage').value)
      : 0)

  console.log(petrolTotal)
  console.log(dieselTotal)

  // Get Input Values from Form
  const emissions = {
    petrol: Number(petrolTotal) * emissionFactors.petrol,
    diesel: Number(dieselTotal) * emissionFactors.diesel,
    electricity:
      Number(document.getElementById('electricityUnitsUsage').value) *
      emissionFactors.electricity,
    landfillWaste:
      Number(document.getElementById('wasteLandfillKilogram').value) *
      emissionFactors.landfillWaste
  }

  // Populate Event Details
  document.getElementById('pdfTableBody').innerHTML = `
        <tr>
            <td>Petrol</td>
            <td>${petrolTotal} L</td>
            <td>2.27 kg CO₂/liter</td>
            <td>${emissions.petrol.toFixed(2)} kg CO₂</td>
        </tr>
        <tr>
            <td>Diesel</td>
            <td>${dieselTotal} L</td>
            <td>2.64 kg CO₂/liter</td>
            <td>${emissions.diesel.toFixed(2)} kg CO₂</td>
        </tr>
        <tr>
            <td>Electricity</td>
            <td>${Number(
              document.getElementById('electricityUnitsUsage').value
            )} kWh</td>
            <td>0.653 kg CO₂/kWh</td>
            <td>${emissions.electricity.toFixed(2)} kg CO₂</td>
        </tr>
        <tr>
            <td>Landfill Waste</td>
            <td>${Number(
              document.getElementById('wasteLandfillKilogram').value
            )} kg</td>
            <td>7.45 kg CO₂e/kg</td>
            <td>${emissions.landfillWaste.toFixed(2)} kg CO₂</td>
        </tr>
    `

  // Calculate Total Emissions
  const totalEmissions =
    emissions.petrol +
    emissions.diesel +
    emissions.electricity +
    emissions.landfillWaste
  document.getElementById(
    'totalEmissions'
  ).innerText = `${totalEmissions.toFixed(2)}`

  // Make Report Visible for PDF Generation
  const pdfContent = document.getElementById('report-content')
  pdfContent.style.display = 'block'

  // Generate PDF
  //   html2pdf()
  //     .from(pdfContent)
  //     .save('Carbon_Footprint_Report.pdf')
  //     .then(() => {
  //       pdfContent.style.display = 'none' // Hide again after conversion
  //     })
}

function handleSubmitAndGenerateReport () {
  // First submit the form data
  SubmitEventDetail()
  //   SubmitSchoolDetail()

  // Wait for form submission to complete, then generate the PDF
  setTimeout(() => {
    generatePDF()
  }, 2000) // Increase delay if needed
}

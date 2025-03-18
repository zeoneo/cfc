


function SubmitSchoolDetail() {
    try {
        var formData = {
            schoolName: document.getElementById('schoolName').value,
            eventName: document.getElementById('eventName').value,
            contactPersonName: document.getElementById('contactPersonName').value,
            contactPersonMobile: document.getElementById('contactPersonMobile').value,
            contactPersonEmail: document.getElementById('contactPersonEmail').value,
        }

        var formBaseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc4YJ4TaypFCQW5SmQu0IgOjN9cQ4c0NDXmxV_TwuGMoyDoHw/formResponse?&submit=Submit?usp=pp_url'
        var formUrlQueryParam = `&entry.1592400501=${formData.schoolName}&entry.1508901532=${formData.eventName}&entry.1908189056=${formData.contactPersonName}&entry.816139128=${formData.contactPersonMobile}&entry.372750268=${formData.contactPersonEmail}`
        var finalFormURL = `${formBaseUrl}${formUrlQueryParam}`
        submitDataToGoogleForms(finalFormURL)
        alert('Data submitted successfully.')
    } catch (e) {
        console.error(e)
        alert('Some error occured! Please try after some time...')
    }
}


function SubmitEventDetail(){
    try {
        var formData = {
            schoolName: document.getElementById('schoolName').value,
            eventName: document.getElementById('eventName').value,
            contactPersonName: document.getElementById('contactPersonName').value,
            contactPersonMobile: document.getElementById('contactPersonMobile').value,
            contactPersonEmail: document.getElementById('contactPersonEmail').value,
            eventDate: document.getElementById('eventDate').value,
            eventDuration: document.getElementById('eventDuration').value,
            participantsCount: document.getElementById('participantsCount').value,
            electricityTypeUsage: document.getElementById('electricityTypeUsage').value,
            electricityUnitsUsage: document.getElementById('electricityUnitsUsage').value,
            generatorTypeUsage: document.getElementById('generatorTypeUsage').value,
            generatorLitersUsage: document.getElementById('generatorLitersUsage').value,
            transportDieselUsage: document.getElementById('transportDieselUsage').value,
            transportPetrolUsage: document.getElementById('transportPetrolUsage').value,
            transportEVUsage: document.getElementById('transportEvUsage').value,
            participantsUsingPublicTransport: document.getElementById('participantsUsingPublicTransport').value,
            participantsUsingCarpool: document.getElementById('participantsUsingCarpool').value,
            participantsUsingPrivateVehicle: document.getElementById('participantsUsingPrivateVehicle').value,
            participantsUsingCyleWalk: document.getElementById('participantsUsingCycleOrWalk').value,
            wasteSegregationPossibility: document.getElementById('wasteSegregationPossibility').value,
            wasteCompostingPossibility: document.getElementById('wasteCompostingPossibility').value,
            wasteLandfillKilogram: document.getElementById('wasteLandfillKilogram').value
        }
        const eventStage = "Pre-Event"; 
        var formBaseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfWOWlZ9IIrP1wfZ9XgzbF2cbdkQdbHqWBzvUHEEOlViA2k2w/formResponse?&submit=Submit?usp=pp_url'
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


function submitDataToGoogleForms(formUrl) {
    fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => response.text())  // Get response as text
      .then(data => console.log("Response:", data))
      .catch(error => console.error('Error submitting the form', error));
}


function generatePdf(){
    var doc = new jsPDF()
    doc.text('Hello world!', 10, 10)
    doc.save('Test.pdf')
}


function handleSubmitAndGenerateReport() {
    SubmitEventDetail();
    SubmitSchoolDetail();  // Submit form data
    setTimeout(() => {
        generatePdf();  // Generate PDF after a short delay
    }, 1000);  // 1-second delay to allow form submission
}

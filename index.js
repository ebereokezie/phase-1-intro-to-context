function createEmployeeRecord(array){
const timeCard = {}
Object.assign(timeCard, {
    firstName: `${array[0]}`, 
    familyName:`${array[1]}`, 
    title: `${array[2]}`,
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [] },
    )
return timeCard
}

function createEmployeeRecords(arrayOfArrays){
const timeCardRecords = []

for(const record of arrayOfArrays){
    timeCardRecords.push(createEmployeeRecord(record))
    }

    return timeCardRecords
}


function createTimeInEvent(emplRecord, dateStamp){
    const emplyTimeIn = {}
    const dateWorked = dateStamp.split(" ")

    Object.assign(emplyTimeIn, {
        type: "TimeIn",
        hour: parseInt(dateWorked[1],10),
        date: `${dateWorked[0]}`,

    })
    emplRecord.timeInEvents.push(emplyTimeIn)
    return emplRecord

}

function createTimeOutEvent(emplRecord, dateStamp){
    const emplyTimeOut = {}
    const dateWorked = dateStamp.split(" ")
    Object.assign(emplyTimeOut, {
        type: "TimeOut",
        hour: parseInt(dateWorked[1],10),
        date: `${dateWorked[0]}`,

    })
    emplRecord.timeOutEvents.push(emplyTimeOut)
    return emplRecord

}

function hoursWorkedOnDate(emplyRecord){
    const timeInHour = emplyRecord.timeInEvents[0].hour
    const timeOutHour = emplyRecord.timeOutEvents[0].hour

    return (timeOutHour - timeInHour)/100
    

}

function wagesEarnedOnDate(emplyRecord){
   let payRate = emplyRecord.payPerHour
    return hoursWorkedOnDate(emplyRecord) * payRate
}

function allWagesFor(emplyRecord){
    let payRate = emplyRecord.payPerHour

    const allHoursIn = emplyRecord.timeInEvents.map((element) => {return element.hour})
    const allHoursOut = emplyRecord.timeOutEvents.map((element) => {return element.hour})

    const totalHoursIn = allHoursIn.reduce((total, amount) => {return total + amount})
    const totalHoursOut = allHoursOut.reduce((total, amount) => {return total + amount})

    const totalHoursWorked = (totalHoursOut - totalHoursIn)/100

    return totalHoursWorked * payRate

}

function calculatePayroll(allEmplRecords){
    // const allEmployeeWages = allEmplRecords.map(record => allWagesFor(record))
    return allEmplRecords.reduce((total, amount) => {return total + allWagesFor(amount)}, 0)
    // return totalEmployeeWages
}
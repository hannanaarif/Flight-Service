function addRowLockOnFlights(flightId){
    return `Select * from flights WHERE Flights.id=${flightId} FOR UPDATE;`
}

module.exports={
    addRowLockOnFlights
}
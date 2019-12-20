/* E3 app.js */
'use strict';

const log = console.log
const yargs = require('yargs').option('addRest', {
    type: 'array' // Allows you to have an array of arguments for particular command
  }).option('addResv', {
    type: 'array' 
  }).option('addDelay', {
    type: 'array' 
  })

const reservations = require('./reservations');

// datetime available if needed
const datetime = require('date-and-time') 

const yargs_argv = yargs.argv
//log(yargs_argv) // uncomment to see what is in the argument array

if ('addRest' in yargs_argv) {
	const args = yargs_argv['addRest']
	const rest = reservations.addRestaurant(args[0], args[1]);	
	if (rest.length > 0) {
		/* complete */ 
		log("Added restaurant "  + args[0] +  ".")
	} else {
		/* complete */ 
		log("Duplicate restaurant not added.")
	}
}
if ('addResv' in yargs_argv) {
	const args = yargs_argv['addResv']
	const resv = reservations.addReservation(args[0], args[1], args[2]);
	const now = new Date(args[1])
	const day = datetime.format(now,"MMM DD YYYY")
	const time = datetime.format(now,"h:mm A")
	const result = "Added Reservation at " +args[0]+ " on " + day + " at " + time +" for " + args[2]  + " people."
	log(result)
}
if ('allRest' in yargs_argv) {
	const restaurants = reservations.getAllRestaurants(); // get the array
	const len = restaurants.length
	let i = 0
	while(i<len){
		const restaurant = restaurants[i]
		log(restaurant.name +": " + restaurant.description + " - " + restaurant.numReservations + " active reservations")
		i++
	}
	// Produce output below
}

if ('restInfo' in yargs_argv) {
	const restaurants = reservations.getRestaurantByName(yargs_argv['restInfo']);
	log(restaurants.name +": " + restaurants.description + " - " + restaurants.numReservations + " active reservations")
	// Produce output below

}

if ('allResv' in yargs_argv) {
	const restaurantName = yargs_argv['allResv']
	const reservationsForRestaurant = reservations.getAllReservationsForRestaurant(restaurantName); // get the arary
	reservationsForRestaurant.sort((a, b) => new Date((a.time)) - new Date((b.time)));
	const len = reservationsForRestaurant.length
	let i = 0
	log("Reservations for "+restaurantName+":")
	while(i<len){
		const curr =reservationsForRestaurant[i]
		const now = new Date(curr.time)
		const day = datetime.format(now,"MMM DD YYYY",true)
		const time = datetime.format(now,"h:mm A",true)
		log("- "+ day + ", "+ time+", table for "+curr.people)
		i++
	}
	// log(reservationsForRestaurant)
	// Produce output below
}

if ('hourResv' in yargs_argv) {
	const time = yargs_argv['hourResv']
	const reservationsForRestaurant = reservations.getReservationsForHour(time); // get the arary
	const len = reservationsForRestaurant.length
	let i = 0
	log("Reservations in the next hour:")
	while(i<len){
		const curr =reservationsForRestaurant[i]
		const now = new Date(curr.time)
		const day = datetime.format(now,"MMM DD YYYY",true)
		const time = datetime.format(now,"h:mm A",true)
		log("- "+curr.restaurant+ ": "+ day + ", "+ time+", table for "+curr.people)
		i++
	}
	// Produce output below
}

if ('checkOff' in yargs_argv) {
	const restaurantName = yargs_argv['checkOff']
	const earliestReservation = reservations.checkOffEarliestReservation(restaurantName); 
	const now = new Date(earliestReservation.time)
	const day = datetime.format(now,"MMM DD YYYY",true)
	const time = datetime.format(now,"h:mm A",true)
	log("Checked off reservation on " +  day + ", "+ time+", table for "+earliestReservation.people)
	// Produce output below
}

if ('addDelay' in yargs_argv) {
	const args = yargs_argv['addDelay']
	const resv = reservations.addDelayToReservations(args[0], args[1]);	
	const len = resv.length
	log("Reservations for "+args[0]+":")
	let i = 0
	while(i<len){
		const curr = resv[i]
		if(curr.restaurant === args[0]){
		const curr =resv[i]
		const now = new Date(curr.time)
		const day = datetime.format(now,"MMM DD YYYY",true)
		const time = datetime.format(now,"h:mm A",true)
		log(day + ", "+ time+", table for "+curr.people)
		}
		i++
	}
	// Produce output below	
}

if ('status' in yargs_argv) {
	const status = reservations.getSystemStatus()
	// Produce output below
	log("Number of restaurants: " + status.numRestaurants) 
	log("Number of total reservations: " + status.totalReservations)
	log("Busiest restaurant: "+ status.currentBusiestRestaurantName)
	const now = new Date(status.systemStartTime)
	const day = datetime.format(now,"MMM DD YYYY",true)
	const time = datetime.format(now,"h:mm A",true)
	log("System started at: " + day+ ", " + time)
}


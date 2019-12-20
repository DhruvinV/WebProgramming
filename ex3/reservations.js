/* Reservations.js */ 
'use strict';

const log = console.log
const fs = require('fs');
const datetime = require('date-and-time')

const startSystem = () => {

	let status = {};

	try {
		status = getSystemStatus();
	} catch(e) {
		status = {
			numRestaurants: 0,
			totalReservations: 0,
			currentBusiestRestaurantName: null,
			systemStartTime: new Date(),
		}

		fs.writeFileSync('status.json', JSON.stringify(status))
	}

	return status;
}

// You may edit getSystemStatus below.  You will need to call updateSystemStatus() here, which will write to the json file
const getSystemStatus = () => {
	const status = fs.readFileSync('status.json')
	updateSystemStatus(status)
	return JSON.parse(status)
}

/* Helper functions to save JSON */
// You can add arguments to updateSystemStatus if you want.
const updateSystemStatus = (status) => {
	const stat = JSON.parse(status)
	const resta = getAllRestaurants()
	stat.numRestaurants = (resta.length)
	stat.totalReservations = (getAllReservations().length)
	const maxRes = resta.reduce((x, y) => x.numReservations > y.numReservations ? x : y);
	stat.currentBusiestRestaurantName = maxRes.name
	/* Add your code below */
	fs.writeFileSync('status.json', JSON.stringify(stat))
}

const saveRestaurantsToJSONFile = (restaurants) => {
	fs.writeFileSync('restaurants.json',JSON.stringify(restaurants))

};

const saveReservationsToJSONFile = (reservations) => {
	fs.writeFileSync('reservations.json',JSON.stringify(reservations))
};


// Should return an array of length 0 or 1.
const addRestaurant = (name, description) => {
	// Check for duplicate names
	const lisf_of_reservation = getAllRestaurants()
	// log(lisf_of_reservation[0].name === lisf_of_reservation[1].name)
	const checkDuplicates = lisf_of_reservation.filter((res) => res.name === name)
	if(checkDuplicates.length > 0){
		// log("323")
		return []

	}else
	{
		const restaurant = {
			"name": name,
			"description":description,
			"numReservations": 0

		}; // remove null and assign it to proper value
		// students.push(student)
		// saveStudentsToJSONFile(students)
		lisf_of_reservation.push(restaurant)
		saveRestaurantsToJSONFile(lisf_of_reservation)
		return [restaurant];
	 }	// if no duplicate names:
}

// should return the added reservation object
const addReservation = (restaurant, time, people) => {
	/* Add your code below */
	const lisf_of_reservation = getAllRestaurants()
	// log(lisf_of_reservation,"#232323")
	const result = lisf_of_reservation.find(o => o.name === restaurant).numReservations+=1;
	// log(result)
	saveRestaurantsToJSONFile(lisf_of_reservation)
	const list_of_reervation = getAllReservations()
	const reservation = {
		"restaurant": restaurant,
		"time": new Date((time + " UTC")),
		"people": people
	}; // remove null and assign it to proper value
	list_of_reervation.push(reservation)
	saveReservationsToJSONFile(list_of_reervation)
	return reservation;

}


/// Getters - use functional array methods when possible! ///

// Should return an array - check to make sure restaurants.json exists
const getAllRestaurants = () => {
	/* Add your code below */
	try{
		const restaurants = fs.readFileSync('restaurants.json')
		// log(JSON.parse(restaurants))
		return JSON.parse(restaurants)
	}catch(e){
			return []
	}

}

// Should return the restaurant object if found, or an empty object if the restaurant is not found.
const getRestaurantByName = (name) => {
	/* Add your code below */
	const lisf_of_reservation = getAllRestaurants()
	const result = lisf_of_reservation.find(o => o.name === name);
	return result

};

// Should return an array - check to make sure reservations.json exists
const getAllReservations = () => {
  /* Add your code below */
  try{
	const AllRestaurants = fs.readFileSync('reservations.json')
	return JSON.parse(AllRestaurants)
	}catch(e){
		return []
}
};

// Should return an array
const getAllReservationsForRestaurant = (name) => {
	/* Add your code below */
	const lisf_of_reservation = getAllReservations()
	const result = lisf_of_reservation.filter((res) => res.restaurant === name)
	return result

};


// Should return an array
const getReservationsForHour = (time) => {
	/* Add your code below */
	const allReso = getAllReservations()
	// log(allReso)
	// log(time)
	const lb  = new Date(time + " UTC");
	const x = (datetime.addMinutes(new Date(time + " UTC"),59))
	const ub  = (datetime.addSeconds(x,59))
	// log(compare)
	const result = allReso.filter((res) => (new Date(res.time).getTime() >= lb.getTime()) && (new Date(res.time).getTime() <= ub.getTime()))
	result.sort((a, b) => new Date((a.time)).getTime() - new Date((b.time)).getTime());
	return result
}

// should return a reservation object
const checkOffEarliestReservation = (restaurantName) => {
	const AllRestaurants = getAllRestaurants()
	const result = AllRestaurants.map((iter) =>{
		if(iter.name === restaurantName){
			iter.numReservations = iter.numReservations-1
		}
		return iter
	})
	saveRestaurantsToJSONFile(result)
	const AllReservations = getAllReservations()
	AllReservations.sort((a, b) => new Date((a.time)).getTime() - new Date((b.time)).getTime());
	// log(AllReservations)
	const s = AllReservations.filter((res) => res.restaurant === restaurantName)
	const c = AllReservations.filter((res) => s[0]!==res)
	const checkedOffReservation = s[0]; // remove null and assign it to proper value
	saveReservationsToJSONFile(c) 
	return checkedOffReservation;
}

const addDelayToReservations = (restaurant, minutes) => {
	// Hint: try to use a functional array method
	const AllReservations = getAllReservations()
	const result = AllReservations.map((iter)=>{
		if(iter.restaurant === restaurant){
			iter.time = datetime.addMinutes(new Date(iter.time),minutes)
		}
		return iter
	})
	saveReservationsToJSONFile(result)
	return result
}
startSystem(); // start the system to create status.json (should not be called in app.js)

// May not need all of these in app.js..but they're here.
module.exports = {
	addRestaurant,
	getSystemStatus,
	getRestaurantByName,
	getAllRestaurants,
	getAllReservations,
	getAllReservationsForRestaurant,
	addReservation,
	checkOffEarliestReservation,
	getReservationsForHour,
	addDelayToReservations
}


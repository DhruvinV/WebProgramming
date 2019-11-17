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

/*********/


// You may edit getSystemStatus below.  You will need to call updateSystemStatus() here, which will write to the json file
const getSystemStatus = () => {
	const status = fs.readFileSync('status.json')

	return JSON.parse(status)
}

/* Helper functions to save JSON */
// You can add arguments to updateSystemStatus if you want.
const updateSystemStatus = () => {
	const status = {}
	
	/* Add your code below */

	fs.writeFileSync('status.json', JSON.stringify(status))
}

const saveRestaurantsToJSONFile = (restaurants) => {
	// try{
	// 	const AllRestaurants = fs.readFileSync('restaurants.json')
	// 	const listofres =  JSON.parse(AllRestaurants)
	// 	listofres.push(restaurants)
	// 	fs.writeFileSync('restaurants.json',JSON.stringify(listofres))
	// }catch(e){
	// 	return []
	// }
	/* Add your code below */
	fs.writeFileSync('restaurants.json',JSON.stringify(restaurants))

};

const saveReservationsToJSONFile = (reservations) => {
	/* Add your code below */
	// try{
	// 	const AllRestaurants = fs.readFileSync('reservations.json')
	// 	const listofres =  JSON.parse(AllRestaurants)
	// 	listofres.push(reservations)
	// 	fs.writeFileSync('reservations.json',JSON.stringify(listofres))
	// }catch(e){
	// 	return []
	// }
	fs.writeFileSync('reservations',JSON.stringify(reservations))
};

/*********/
// const getAllRestaurants = () =>{
// 	try{
// 	const AllRestaurants = fs.readFileSync('restaurants.json')
// 	return JSON.parse(AllRestaurants)
// 	}catch(e){
// 		return []
// 	}
// }

// Should return an array of length 0 or 1.
const addRestaurant = (name, description) => {
	// Check for duplicate names
	const lisf_of_reservation = getAllRestaurants()
	const checkDuplicates = lisf_of_reservation.filter(function(res){
		return res.name === name
	})
	if(checkDuplicates === true){
		return []

	}else{
		const restaurant = {
			"name": name,
			"description":description,
			"numReservations": 0

		}; // remove null and assign it to proper value
		// students.push(student)
		// saveStudentsToJSONFile(students)
		lisf_of_reservation.push(restaurant)
		saveRestaurantsToJSONFile(restaurant)
		return [restaurant];
	}	// if no duplicate names:
}

// should return the added reservation object
const addReservation = (restaurant, time, people) => {
	/* Add your code below */
	const lisf_of_reservation = getAllRestaurants()
	const result = lisf_of_reservation.find(o => o.name === restaurant).numReservations+=1;
	saveRestaurantsToJSONFile(result)
	const reservation = {
		"restaurant": restaurant,
		"time": time,
		"people": people
	}; // remove null and assign it to proper value
	return reservation;

}


/// Getters - use functional array methods when possible! ///

// Should return an array - check to make sure restaurants.json exists
const getAllRestaurants = () => {
	/* Add your code below */
	try{
		const AllRestaurants = fs.readFileSync('restaurants.json')
		return JSON.parse(AllRestaurants)
	}catch(e){
			return []
	}

};

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
	// const list_of_reervation = getAllReservations()

}

// should return a reservation object
const checkOffEarliestReservation = (restaurantName) => {
	const AllRestaurants = getAllRestaurants()
	const result = AllRestaurants.map((iter) =>{
		if(iter.name === restaurantName){
			iter.numReservations = iter.numReservations-1
		}
		return result
	})
	saveRestaurantsToJSONFile(result)
	const AllReservations = getAllReservations()
	AllReservations.sort((a, b) => new Date((a.time)) - new Date((b.time)));
	const s = lisf_of_reservation.filter((res) => res.name === restaurantName)
	const result = AllReservations.filter((res) => s[0]!=res)
	const checkedOffReservation = s[0]; // remove null and assign it to proper value
	saveReservationsToJSONFile(result) 
	return checkedOffReservation;
}


const addDelayToReservations = (restaurant, minutes) => {
	// Hint: try to use a functional array method
	const AllReservations = getAllReservations()
	const result = AllReservations.map((iter)=>{
		if(iter.restaurant === restaurant){
			iter.time = new Date(iterm.time) +  datetime.addMinutes(minutes)
		}
		return iter
	})
	saveReservationsToJSONFile(result)
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


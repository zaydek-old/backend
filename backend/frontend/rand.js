"use strict";

// randfact is a factory that returns a random number generator from [0, n)
function randfact(n) {
	var state = [];
	var gen = function() {
		if (state.length == n) return -1; // error
		var rand = Math.floor(Math.random()*n);
		if (state.includes(rand)) return gen(); // recurse
		state.push(rand);
		return rand;
	}
	return gen;
}

// randtest tests randfact - see randtest.html
function randfacttest() {
	var gen = randfact(3); // [0, 3)
	var a = gen(), b = gen(), c = gen(), d = gen();
	document.write(a >= 0 && a < 3 && a != b, "<br/>"); // want true
	document.write(b >= 0 && a < 3 && b != c, "<br/>"); // want true
	document.write(c >= 0 && a < 3 && c != d, "<br/>"); // want true
	document.write(d == -1,                   "<br/>"); // want true
}

// see https://comicvine.gamespot.com/profile/mjack/lists/100-best-star-wars-film-characters/48192/
var names = ['2-1B', '8D8', 'Admiral Ackbar', 'Admiral Motti', 'Admiral Ozzel', 'Admiral Piett', 'Barriss Offee', 'Beru Lars', 'Bib Fortuna', 'Biggs Darklighter', 'Boba Fett', 'Boga', 'Bossk', 'Breha Organa', 'C-3PO', 'Captain Raymus Antilles', 'Chewbacca', 'Count Dooku', 'Dak Ralter', 'Darth Maul', 'Darth Vader', 'Dengar', 'Dexter Jettster', 'Dr. Evazan', 'EV-9D9', 'Elan Sel\'Sabagno', 'Emperor Palpatine', 'Figrin D\'an', 'Fodesinbeed Annodue', 'Gardulla the Hutt', 'Garindan', 'Garven Dreis', 'General Airen Cracken', 'General Crix Madine', 'General Dodonna', 'General Grievous', 'General Veers', 'Governor Sio Bibble', 'Gragra', 'Grand Moff Tarkin', 'Greedo', 'Han Solo', 'Jabba The Hutt', 'Jango Fett', 'Jek Porkins', 'Kardue\'sai\'Malloc', 'Ki-Adi-Mundi', 'Kit Fisto', 'Kitster Banai', 'Lak Sivrak', 'Lando Calrissian', 'Lobot', 'Luke Skywalker', 'Mace Windu', 'Major Bren Derlin', 'Malakili', 'Mas Amedda', 'Max Rebo', 'Moff Jerjerrod', 'Momaw Nadon', 'Mon Mothma', 'Muftak', 'Nebit', 'Nien Nunb', 'Nute Gunray', 'Obi-Wan Kenobi', 'Oola', 'Orn Free Taa', 'Owen Lars', 'Padmé Amidala', 'Pagetti Rook', 'Plo Koon', 'Ponda Baba', 'Princess Leia', 'Qui-Gon Jinn', 'Quinlan Vos', 'R2-D2', 'R4-P17', 'Ree-Yees', 'Ric Ollie', 'Rune Haako', 'Sabé', 'Saesee Tiin', 'Salacious Crumb', 'Sarlacc', 'Senator Bail Organa', 'Senator Valorum', 'Shmi Skywalker', 'Tarfful', 'The Rancor', 'Tion Medon', 'Watto', 'Wedge Antilles', 'Wes Janson', 'Wuher', 'Yaddle', 'Yarael Poof', 'Yoda', 'Zam Wesell', 'Zett Jukassa'];
var gen = randfact(names.length); // create a random number generator from [0, n)
$("input").each(function() { $(this).attr("placeholder", names[gen()]); }); // set placeholders

'use strict';

var filled = false; // represents state

function fill() {
	$('#af').text('UNDO');
	$('input').each(function() { $(this).val($(this).attr('placeholder')); }); // set the input's value to its placeholder
	filled = true;
}

function unfill() {
	$('#af').text('AUTOFILL');
	$('input').each(function() { $(this).val(''); }); // unset the input's value
	filled = false;
}

$('#af').click(function() { !filled ? fill() : unfill(); });

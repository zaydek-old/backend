'use strict';

// function for post-callbacks (does html-formatting for debugging)
// for example:
//     <div>
//         <element/>
//         <element/>
//     </div>
function handle(resp) {
	if ($('#sched').length) $('#sched').remove(); // if #sched exists remove it
	var sched = '';
	$.each(JSON.parse(resp), function(index, value) {
		sched += '\t\t\t<button class=\'btn-3\'>' + value['emp1'] + '</button>\n' +
		         '\t\t\t<button class=\'btn-3\'>' + value['emp2'] + '</button>\n\t\t\t<br/>\n';
	});
	$('body').append('\t<div id=\'sched\'>\n' + sched + '\t\t</div>\n\t\t');
}

// attach an event-handler for post requests
$('form').submit(function(event) {
	$.ajax({type: 'post', url: '/api', data: $(this).serializeArray(), success: function(resp) { handle(resp); } });
	event.preventDefault(); // do not refresh
});
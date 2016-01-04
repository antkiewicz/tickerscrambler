/*
 * tickerscrambler.js v0.1.2
 *
 * Lukasz Antkiewicz
 * Copyright (c) 2014, MIT License
 */

function TickerScrambler(element, options) {
	
	// We exit if no elment was passed
	if (!element) return;
	// Make sure we are dealing with the right nodeType
	if (element.nodeType != 1) return;
	// Make sure we have word list in options
	if (!options) return;
	if (!options.list || !options.list.length) return;
	
	var index = options.index || 0; // Starting index
	var speed = options.speed || 33; // Scrambling speed
	var pause = options.pause || 1000; // Pause between going to next list item
	var random = options.random || false;// Pick random word
	var list = options.list || []; // List of item to display
	// Character set used for transitions
	var charset = options.charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	var timer = null;
	var char_cursor = null;
	var mask_active = true;

	function init() {
		timer = setTimeout(next, pause);
	}

	function next() {
		if (mask_active) {
			char_cursor = element.textContent.length - 1;
			timer = setInterval(mask_text, speed);
			mask_active = false;
		}
		else {
			char_cursor = 0;
			timer = setInterval(reveal_text, speed);
			mask_active = true;
		}
	}

	function get_next_index() {
		if (random) {
			return Math.floor(list.length * Math.random());
		}
		return (index < list.length - 1) ? index + 1 : 0;
	}

	function reveal_text() {
		var rand_length, rand_text;
		if (char_cursor < list[index].length) {
			var character = list[index].substr(char_cursor, 1);
			rand_length = element.textContent.length - char_cursor - 1;
			rand_text = gen_random_string(rand_length);
		
			element.textContent = element.textContent.substr(0, char_cursor) + character + rand_text;
			char_cursor++;
		}
		else if (char_cursor < element.textContent.length) {
			rand_length = (element.textContent.length - list[index].length - 1);
			rand_text = gen_random_string(rand_length);
		
			element.textContent = element.textContent.substr(0, list[index].length) + rand_text;
		
			if (element.textContent.length == list[index].length) {
				char_cursor++;
			}
		}
	
		if (char_cursor >= list[index].length && char_cursor >= element.textContent.length) {
			char_cursor = 0;
			index = get_next_index();
			clearInterval(timer);
			setTimeout(next, pause);
		}
	}

	function mask_text() {
		var rand_length = element.textContent.length - char_cursor;
		var rand_text = gen_random_string(rand_length);
		element.textContent = element.textContent.substr(0, char_cursor) + rand_text;
	
		char_cursor--;
	
		if (char_cursor === 0) {
			clearInterval(timer);
			next();
		}
	}

	function gen_random_string(length) {
		var string = '';
		for (var i = 0; i < length; i++) {
			string += charset.charAt(Math.floor(Math.random() * charset.length));
		}
	
		return string;
	}
	
	// Initialize
	init();
}

if (window.jQuery) {
	(function($) {
		$.fn.TickerScrambler = function(options) {
			return this.each(function() {
				$(this).data('TickerScrambler', new TickerScrambler($(this)[0], options));
			});
		};
	})(window.jQuery);
}

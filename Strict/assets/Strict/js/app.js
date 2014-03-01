/**
 * Details View Application for CDpedia v5.x
 * Version 1.0
 *
 * Routines associated with responsive layout and tidy-up of the Details View panel.
 *
 * --------------------------------------------------
 *
 * Dependency:     jquery.js
 *                 breakpoint.js
 *
 * jQuery coding
 * © 2014 Royaljerry [Adam Pócs]
 * royaljerry@gmail.com
 * 
*/

/**
 * #############
 * # VARIABLES #
 * #############
*/

/**
 * #############
 * # FUNCTIONS #
 * #############
*/

/**
 * Description:    Display the HTML content of a certain DOM element
 *
 *                 Though it's a browser window, CDpedia Details View panel doesn't support
 *                 HTML code view, so we need a workaround for testing after the tag fields
 *                 have been replaced by the app.
 *
 * Usage:          debug('#myID', 'e');
 *                 debug('Hello World', 'd');
 *
 * ARGUMENT        TYPE                DESCRIPTION
 *
 * cItem           String              Name of the DOM element of which content is to be printed out
 *
 * cMode           String              Debug mode
 *
 *                                     allowed values:
 *
 *                                     VALUE               DESCRIPTION
 *                                     'tag'               Print out a (HTML) tagged content
 *                                     'str'               Print out a string directly
 *                                     'mix'               Print out a (HTML) tagged string
 *
 * Returns:        None
*/
function debug(cItem, cMode)
{
	var target = $('body').find('#debug');
	target.css('display', 'block');
	var orig = $(target).html();
	switch(cMode)
	{
		case 'tag':
			var item = f(cItem);
			var content = '<xmp>' + item.html() + '</xmp>';
			break;
		case 'str':
			var content = cItem;
			break;
		case 'mix':
			var content = '<xmp>' + cItem + '</xmp>';
			break;
	}
	$(target).html(orig + '<p>' + content + '</p>');
}

/**
 * Description:    Element extensions
 *
 * Returns:        Miscellaneous
*/
jQuery.fn.extend
(
	{

		// Tell if a certain infoblock does not contain any relevant content
		isEmpty: function()
		{
			var cID = this.attr('id');
			var content = this.html();
			switch(cID)
			{
				case 'release':
					var result =
						(content.indexOf('<p class="lh-small"></p>') != -1) &&
						(content.indexOf('<p class="lh-large">') == -1) &&
						(content.indexOf('<p class="taglist">') == -1);
					break;
				case 'tracklist':
					var result = (content.indexOf('IF_Tposition') != -1);
					break;
				case 'more_info':
					var result = (content.indexOf('gotoPage="') != -1);
					break;
				default:
					var result =
					(
						(
							(
								(content.indexOf('<p') == -1)
								||
								((content.indexOf('<p>') == -1) && (content.indexOf('IFcustom') != -1) && (content.indexOf('<script') != -1))
							)
						)
						&& (cID != 'my_rating')
					);
					break;
			}
			return(result);
		},

		// Remove (hide) a certain infoblock
		removeIf: function(c)
		{
			if(c) {this.css('display', 'none');}
		},

		// Replace content in a cretain element
		rep: function(from, to)
		{
			var oStr = this.html();
			var nStr = oStr.replace(from, to);
			this.html(nStr);
		},

		// Replace content in a cretain element if a string is found in it
		repIf: function(from, to, test)
		{
			if(this.html().indexOf(test) != -1) {this.rep(from, to);}
		}

	}
);

/**
 * Description:    Find a certain element in the wrapper
 *
 * ARGUMENT        TYPE                DESCRIPTION
 *
 * c               Object              Object to be found
 *
 * Returns:        Object
*/
function f(c)
{
	return($('#wrapper').find(c));
}

/**
 * Description:    Reposition of DOM elements depending on the current size of the viewport
 *
 * ARGUMENT        TYPE                DESCRIPTION
 *
 * cSize           String              Name of the viewport size
 *
 *                                     allowed values:
 *
 *                                     VALUE               DESCRIPTION
 *                                     'normal'            Normal screen width (Up to 1280px)
 *                                     'wide'              Wide screen width (From 1280px)
 *
 * Returns:        None
*/
function resp(cSize)
{
	switch(cSize)
	{
		case 'normal':
			$('#content').before($('#cover'));
			$('#tracklist').before($('#base_info'));
			$('#base_info').before($('#col_main_title'));
			f($('#base_info')).find('section').removeClass('large');
			f($('#base_info')).find('section').addClass('small');
			var base_is_empty =
				f($('#release')).isEmpty() &&
				f($('#original_release')).isEmpty() &&
				f($('#series')).isEmpty() &&
				f($('#genre')).isEmpty();
			f($('#base_info')).css('border-bottom', (base_is_empty ? 'none' : f($('#base_info')).css('border-bottom')));
			break;
		case 'wide':
			$('#col_main_left').append($('#base_info'));
			$('#base_info').before($('#cover'));
			$('#col_main_right').prepend($('#col_main_title'));
			f($('#base_info')).find('section').removeClass('small');
			f($('#base_info')).find('section').addClass('large');
			f($('#base_info')).css('border-bottom', 'none');
			break;
	}
}

/**
 * ##################
 * # EVENT HANDLERS #
 * ##################
*/

/**
 * Description:    Functions to be executed when page width has reached a breakpoint
 *
 * Returns:        -
*/
$.breakpoint
(
	{
		condition: function ()
		{
			return window.matchMedia('only screen and (max-width:1280px)').matches;
		},
		// Code will run the first time condition() is true.
		first_enter: function ()
		{
			resp('normal');
		},
		// Code will run whenever condition() becomes true.
		enter: function ()
		{
			resp('normal');
		},
		// Code will run whenever condition() becomes false (if it was previously true).
		// This is where you revert the things you do in the enter method.
		exit: function ()
		{
			resp('wide');
		}
	}
);

/**
 * Description:    Functions to be executed when page content is loaded
 *
 * Returns:        -
*/
$(document).ready
(
	function()
	{
		// Post-formatting content elements

		// Remove commas from between the taglist elements
		$('p.taglist').each(function(i) {$(this).rep(/, /g, '<span class="space_tag">&nbsp;</span>');});

		// Remove comma from before the release date when label is not provided
		$('#release').rep('<p class="lh-small">, <em>', '<p class="lh-small"><em>');

		// Make track infos (in square brackets) lighter than their main (base) names in the tracklist
		$('#tracklist').find('p').find('.name').each(function() {$(this).rep(/( \[)([^\n]*)(\])/g, '<span class="info">$1$2$3</span>');});

		// Replace default cover with the customized one and remove link if no cover provided
		$('#cover').repIf(/<a href=".*class="lightbox">/, '', 'plainImage.tiff');
		$('#cover').repIf('</a>', '', 'plainImage.tiff');
		$('#cover').repIf(/file:.*plainImage.tiff/g, 'assets/Strict/img/no-cover.png', 'plainImage.tiff');

		// Put default text into "More Info" block's URL if it is empty
		$('#more_info').repIf('></a>', '>More Info</a>', '></a>');

		// Replace line breaks with paragraphs in the "Summary" and "Comment" blocks
		$('#summary').rep(/<br>/g, '</p><p class="noborder">');
		$('#comments').rep(/<br>/g, '</p><p class="noborder">');
		
		// Remove empty infoblocks
		$('.infoblock').each(function() {$(this).removeIf($(this).isEmpty());});

	}
);

/**
 * Description:    Functions to be executed when page is totally loaded
 *
 * Returns:        -
*/
$(window).load
(
	function()
	{
		// Show something relevant after all JavaScripts have run
		var testContent = $('#col_main_title').html();
		var isSelection = (testContent.indexOf('[key:artist]') == -1) && (testContent.indexOf('No Selection') == -1);
		switch(isSelection)
		{
			// Show Details View panel if an item is selected
			case true:
				$('#wrapper').css('display', 'block');
				break;
			// Show "No Selection" info if nothing is selected
			case false:
				$('#no-selection').css('display', 'block');
				break;
		}
	}
);

/**
 * Description:    Functions to be executed when page has resized
 *
 * Returns:        -
*/
$(window).resize
(
	function()
	{
		
	}
);

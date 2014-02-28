Templates for CDpedia 5.x
=========================

*Details View and Export templates for CDpedia for Mac 5.x*

## Strict

I have named it *Strict*, since this one is something special that may not be liked by the average user, but, looking at my really strict habit of organizing my own physical CD collection, it really fits my needs.

For the customized field names and purposes please see the corresponding Markdown file in the template folder.

![](https://dl.dropboxusercontent.com/u/68865/GitHub/Strict/preview-large.jpg)

### Features

- The layout is based on a slightly modified version of the [Responsive Grid System](http://www.responsivegridsystem.com) (see landscape and portrait layouts).
- The fields are grouped into different parts (“infoblocks”). These are parts that contain information belonging together – in my opinion (e.g. *Purchasing Info*, *Album Identifiers*, etc.)
- The cover image is included in the template (yes, you can simply ignore it with a sudden comment-out keystroke :)) and shows the large size in lightbox. (I know, the same thing applies to the hardcoded cover image preview pane, but this one doesn’t need any new windows).
- The content is post-managed by a massive JavaScript parser, which
	- removes commas from between the taglist elements (the CSS turns them into button-like links),
	- makes track infos (in square brackets) lighter than their main (base) names in the tracklist,
	- replaces default cover with a customized one, and removes (lightbox) link if no cover is provided,
	- puts default text into the "More Info" block's URL description, if it is empty (this is the URL field of an entry),
	- replaces line breaks with paragraphs in the *Summary* block, and
	- removes empty infoblocks.

### Known Bugs

- If the track title is too long and it contains Composer, it looks weird.
- Some small typographical corrections.
- The template doesn’t turn into one-culomn mode when the pane is <480px wide (it hardly turns out by regular usage).

### Future plans

- Translation capabilities.
- Instant search for the most fields (*Label*, *Catalog #*, etc.) on Google, Wikipedia, Discogs, AllMusic, etc. (maybe through tooltips).
- Borrowing info. I strictly don’t borrow any CDs (books, instruments and wives) to anyone, sorry. Therefore I left these fields out. (Though you can implement it pretty easily when looking into the code.)
- A simple configuration options block in a separate JavaScript file for the shown infoblocks, and some other parameters (e.g. need/don’t need cover image, font size and colours).
- Possibility of (simple) Markdown syntax usage in the Summary section through a JavaScript Markdown parser.

### Credits

- [Responsive Grid System](http://www.responsivegridsystem.com)
- [jQuery](http://jquery.com)
- [jQuery Breakpoint](https://github.com/martinmartinmartin/breakpoint/)
- [EasyBox lightbox clone for jQuery](http://code.google.com/p/easybox/)
- [Source Sans Pro font](http://www.google.com/fonts/specimen/Source+Sans+Pro)

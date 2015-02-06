function htmlDecode( string ) {
	return string.replace(/&gt;/g, '>').replace(/\&lt;/g, '<').replace(/\&quot;/g, '"').replace(/&amp;/g, '&');
}
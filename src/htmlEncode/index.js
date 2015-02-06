function htmlEncode( string ) {
	return string.replace(/\&/g, '&amp;').replace(/\>/g, '&gt;').replace(/\</g, '&lt;').replace(/\"/g, '&quot;');
}
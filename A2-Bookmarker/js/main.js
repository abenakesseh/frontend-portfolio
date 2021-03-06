document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e)
{
	
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if (!validator(siteName, siteUrl)) 
	{
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	if (localStorage.getItem('bookmarks') === null) {
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	else
	{
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//Clear form
	document.getElementById('myForm').reset();

	//re-fetch bookmarks
	fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();
}

//delete bookmarks
function deleteBookmark(url)
{
	//get from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++)
	{
		if (bookmarks[i].url == url) 
		{
			//remove from array
			bookmarks.splice(i, 1);
		}
	}

	//reset local storage after deletion
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//re-fetch bookmarks
	fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks()
{
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	var bookmarkResults = document.getElementById('bookmarksResults');
	bookmarkResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarkResults.innerHTML += '<div class="well">' + 
									 '<h3>'+name+
									 ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#" style="float:right;">Delete</a>'+
									 ' <a class="btn btn-default" target="_blank" href="'+url+'" style="float:right;">Visit</a>'+
									 '</h3>' + 
									 '</div>';
	}
}

function validator(siteName, siteUrl)
{
	if (!siteName || !siteUrl) 
	{
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)) 
	{
		alert('Please use a valid URL');
		return false;
	}

	return true;
}
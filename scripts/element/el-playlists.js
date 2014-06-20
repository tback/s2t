var s2t = s2t || {}

s2t.main = s2t.main || {}


s2t.main.displayPlaylist = function (playlistId) 
	{
	var element = jQuery('div.artist-albums');
	s2t.currentPlaylistId = playlistId;

	//clean container
	element.children().remove();

	//Tabs
	var tabs = jQuery('' +
		'<ul class="nav nav-tabs tab-navigation" id="album-tab-nav">' +
		'	<li class="searchable"><a href="#star-song-tab" data-toggle="tab"><i class="icon-music"></i>Songs</a></li>' +
		'	<li class="filter">' +
		'		<a id="table-search" href="#"><i class="icon-search"></i></a>' +
		'		<div class="search hidden">' +
		'			<input class="form-control" placeholder="Filter">'+
		'			<i class="icon-remove"></i>'+
		'		</div>'+
		'	</li>' +

		'</ul>'
	);

	//calc bar width
	tabs.width(jQuery('section.view-main').width());

	element.append(tabs);

	//initialize table filter
	s2t.main.initializeTableFilter(tabs.find('#table-search'));

	var tabContent = jQuery('' +
		'<div class="tab-content">' +
		'	<div class="tab-pane fade active" id="star-song-tab"></div>' +
		'</div>'
	);

	element.append(tabContent);

	var tabSongs   = jQuery('#star-song-tab');

	var playlistSongTable = jQuery('' +
		'<div class="col-lg-12">' +
		'	<table class="random-table playlistview-table table table-condensed">' +
		'		<thead>' +
		'			<tr>' +
		'				<td>Title</td>' +
		'				<td>Artist</td>' +
		'				<td>Time</td>' +
		'				<td>Album</td>' +
		'				<td></td>' +
		'			</tr>' +
		'		</thead>' +
		'		<tbody></tbody>' +
		'	</table>' +
		'</div>'
	);

	//get playlist Songs
	s2t.main.addPlaylistSongs(playlistSongTable, playlistId);
	//get random  Album
	
	tabSongs.append(playlistSongTable);

	tabs.find('li:first-of-type a').tab('show');
}


s2t.main.addPlaylistSongs = function(table, playlistId) {
	s2t.api.getPlaylist(playlistId, function(data) {
		var songArray = data.playlist.entry;

		for (var i = 0; i < songArray.length; i++) {
			var artistId = songArray[i].id;
			console.log(songArray[i]);
			if(typeof artistId !== 'undefined') {
				s2t.main.getSingleSongRowPlaylist(artistId, songArray[i], function (row) {
					table.find('tbody').append(row);
					
				});
			}
		}
	});
}


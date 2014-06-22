var s2t = s2t || {}

s2t.main = s2t.main || {}


/* --------------------------------------------------
 :: initialize Settings
 ---------------------------------------------------*/
s2t.main.showAddToPlaylist = function (songId) {

	var playlistsContainer = jQuery('#addtoplaylists');
	var settings
	playlistsContainer.modal('show');
	
	var tableLocation = jQuery('#addtoplaylisttable');
	var playlistTable = jQuery('' +
		'<div id="addtoplaylisttable" class="modal-body">' +
		'	<table class="playlistmodal-table table table-condensed">' +
		'		<thead>' +
		'			<tr>' +
		'				<td>id</td>' +
		'				<td>Playlist Name</td>' +
		'				<td></td>' +
		'			</tr>' +
		'		</thead>' +
		'		<tbody></tbody>' +
		'	</table>' +
		'</div>'
	);
	tableLocation.append(playlistTable);
	s2t.main.addPlaylists(playlistTable, songId);
	
}

/*
s2t.main.addPlaylists = function(table) {
		var playlistsMap = s2t.playlistMap;
		for (var key in playlistsMap) {
			var playlistName = key;
			var playlistId = playlistsMap[key];
			var tablentry = '<tr><td>'+playlistId+'</td><td>'+ playlistName + '</td><td><input type="checkbox"/></td></tr>';
			table.find('tbody').append(tablentry);
		}
}
*/
s2t.main.addPlaylists = function(table, songId) {
		var playlistsContainer = jQuery('#addtoplaylists');
		var playlisttoAddIdArray = []
		s2t.api.getPlaylists(function(data) {
			var playlistsArray = data.playlists.playlist;
			for (var entry in playlistsArray) {
				if (playlistsArray[entry].owner == s2t.data.user){
					console.log(playlistsArray[entry]);
					var playlistName = playlistsArray[entry].name;
					var playlistId = playlistsArray[entry].id;
					var tablentry = '<tr><td>'+playlistId+'</td><td>'+ playlistName + '</td><td><input id="addtoplaylistbox" type="checkbox"/></td></tr>';
					table.find('tbody').append(tablentry);
					
				}
			}
			checkboxes = document.querySelectorAll("input#addtoplaylistbox")
			console.log(checkboxes.length);
			 for (var i = 0; i < checkboxes.length; i++) {
		        var checkbox = checkboxes[i];
		        console.log(checkbox);
		        	checkbox.onclick = function() {
		            var currentRow = this.parentNode.parentNode;
		            var firstColumn = currentRow.getElementsByTagName("td")[0];
						if (playlisttoAddIdArray.indexOf(firstColumn.textContent) == -1){
							playlisttoAddIdArray.push(firstColumn.textContent);
							console.log(playlisttoAddIdArray.indexOf(firstColumn.textContent));
							console.log("clickedbox");
							console.log(playlisttoAddIdArray);
						} else {
							var index = playlisttoAddIdArray.indexOf(firstColumn.textContent);
							console.log(firstColumn.textContent);
							playlisttoAddIdArray.splice(firstColumn, 1);
							console.log("unclickedbox");
							console.log(playlisttoAddIdArray);
						}
					}
			}
		});
		var buttonAdd  = playlistsContainer.find('button.add');
		var buttonCancel  = playlistsContainer.find('button.cancel');
		
		buttonAdd.on('click', function() {
			for (var i = 0; i < playlisttoAddIdArray.length; i++){
				s2t.api.updatePlaylist(playlisttoAddIdArray[i],undefined, undefined, undefined, songId ,undefined, function (data){
				console.log(data);
				});
			}
			$('#addtoplaylisttable div').empty().remove();
			playlisttoAddIdArray = [];
			s2t.main.displayPlaylist(s2t.currentPlaylistId);
			playlistsContainer.modal('hide');
		});
		buttonCancel.on('click', function() {
			$('#addtoplaylisttable div').empty().remove();
			playlisttoAddIdArray = [];
			playlistsContainer.modal('hide');
		});
}
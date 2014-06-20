var s2t = s2t || {}

s2t.main = s2t.main || {}


/* --------------------------------------------------
 :: initialize Settings
 ---------------------------------------------------*/
s2t.main.showAddToPlaylist = function (songId) {

	var playlistsContainer = jQuery('#addtoplaylists');
	var settings
	playlistsContainer.modal('show');
	var playlisttoAddIdArray = []
	
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
	s2t.main.addPlaylists(playlistTable);
	
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
		playlistsContainer.modal('hide');
	});
	buttonCancel.on('click', function() {
		$('#addtoplaylisttable div').empty().remove();
		playlisttoAddIdArray = [];
		playlistsContainer.modal('hide');
	});
	
	checkboxes = document.getElementsByTagName("input"); 

    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        checkbox.onclick = function() {
            var currentRow = this.parentNode.parentNode;
            var firstColumn = currentRow.getElementsByTagName("td")[0];
			if (playlisttoAddIdArray.indexOf(firstColumn.textContent) == -1){
				playlisttoAddIdArray.push(firstColumn.textContent);
				console.log(playlisttoAddIdArray.indexOf(firstColumn.textContent));
			} else {
				var index = playlisttoAddIdArray.indexOf(firstColumn.textContent);
				console.log(index);
				playlisttoAddIdArray.splice(index, 1);
			}
			console.log(playlisttoAddIdArray);
        };
    } 
}

s2t.main.addPlaylists = function(table) {
		var playlistsMap = s2t.playlistMap;
		console.log(playlistsMap);

		for (var key in playlistsMap) {
			var playlistName = key;
			var playlistId = playlistsMap[key];
			console.log(playlistId + playlistName);
			var tablentry = '<tr><td>'+playlistId+'</td><td>'+ playlistName + '</td><td><input type="checkbox"/></td></tr>';
			table.find('tbody').append(tablentry);
		}
}

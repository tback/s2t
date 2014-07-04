var s2t = s2t || {}

s2t.main = s2t.main || {}

/* --------------------------------------------------
 :: initialize Settings
 ---------------------------------------------------*/
s2t.main.initCreatePlaylist = function () {

	var createPlaylistContainer = jQuery('#createplaylist');

	var button = jQuery('#newplaylist');
	var settings
	button.on('click', function(event) {
		event.preventDefault();
		createPlaylistContainer.modal('show');
		console.log('clicked newplaylist');
	});


	var inputPlaylist = createPlaylistContainer.find('input.newplaylist');
	var inputPrivate = createPlaylistContainer.find('input.checkbox');
	var buttonCreate  = createPlaylistContainer.find('button.add');
	var buttonCancel  = createPlaylistContainer.find('button.cancel');


	/*
if(s2t.data.server !== false) {
		inputServer.val(s2t.data.server);
	}
	if(s2t.data.user !== false) {
		inputUser.val(s2t.data.user);
	}
	if(s2t.data.pass !== false) {
		inputPass.val(s2t.data.pass);
	}
*/	
	

	buttonCreate.on('click', function() {
		s2t.api.createPlaylist(undefined, inputPlaylist.val(), undefined, function (data){});
		s2t.main.refreshPlaylistAccordion();
		createPlaylistContainer.modal('hide');
		console.log('Playlist Created');
	});

	buttonCancel.on('click', function() {
		createPlaylistContainer.modal('hide');
	});
}

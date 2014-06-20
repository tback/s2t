var s2t = s2t || {}

s2t.main = s2t.main || {}


/* --------------------------------------------------
 :: Create playlist Accordion
 ---------------------------------------------------*/
s2t.main.createPlaylistAccordion = function () {
	s2t.api.getPlaylists(function(data) {

		console.log(data.playlists.playlist);
		var playlistArray = data.playlists.playlist;
		var playlistMap = [];
		var accordion = jQuery('#playlist-accordion');

		

			var playlistContent = jQuery('<div class="accordion-group"></div>');
			var playlistHeading = jQuery('<div class="accordion-heading"></div>');
			var playlistToggle = jQuery('<a class="accordion-toggle collapsed playlists" data-toggle="collapse" data-parent="#artist-accordion" href="#group-playlist"><i class="icon-reorder"></i><span>Playlists</span></a>');
			var playlistBody = jQuery('<div id="group-playlist" class="accordion-body collapse"></div>');
			var playlistInner = jQuery('<div class="accordion-inner"></div>');

			//assemble accordion
			playlistBody.append(playlistInner);
			playlistHeading.append(playlistToggle);
			playlistContent.append(playlistHeading);
			playlistContent.append(playlistBody);

			var list = jQuery('<ul></ul>');

			if(playlistArray instanceof Array) {
				for (var i = 0; i < playlistArray.length; i++) {
					var playlistId = playlistArray[i].id;
					var playlistName = playlistArray[i].name;
					var listItem = jQuery('<li><a id="" href="#" data-playlistId="' + playlistId + '">' + playlistName + '</a></li>');
					list.append(listItem);
					playlistMap[playlistName.toString()] = playlistId.toString();
					s2t.playlistMap[playlistName.toString()] = playlistId.toString();
				}
			} else {
				var playlistId = playlistArray.id;
				var playlistName = playlistArray.name;
				var listItem = jQuery('<li><a href="#" data-artistId="' + playlistId + '">' + playlistName + '</a></li>');
				list.append(listItem);
				playlistMap[playlistName.toString()] = playlistId.toString();
				s2t.playlistMap[playlistName.toString()] = playlistId.toString();
			}

			playlistToggle.on('click', function() {
				jQuery('#playlist-accordion').mCustomScrollbar("update");
				console.log("updateaccordion");
			});

			playlistInner.append(list);
			accordion.append(playlistContent);

		//calculate dyn height
		$(window).trigger('resize');

		//init custom scrollbar
		s2t.main.createCustomScrollbar(accordion);

		//Behaviour
		jQuery('#playlist-accordion .accordion-inner a').each(function () {
			s2t.behaviour.setPlaylistClickBehaviour(jQuery(this));
		});

		s2t.data.playlists = playlistArray;

		//callback('done');
	});
}


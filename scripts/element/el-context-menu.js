var s2t = s2t || {}

s2t.main = s2t.main || {}

/* --------------------------------------------------
 :: Custom Right Click Behavior
 ---------------------------------------------------*/
s2t.main.initializeCustomContextMenu = function () {

	$(document).bind("contextmenu", function (e) {
		return false;
	});

	$.contextMenu({
		// define which elements trigger this menu
		selector: '.albumItem',
		animation: {
			show: 'fadeIn',
			hide: 'fadeOut'
		},
		delay: '100',
		items: {
			play: {
				name: "Play", callback: function (key, opt) {
					var song = opt.$trigger.find('td.song a').data('signature');
					s2t.main.setCurrentlyPlayingInformation(song);
					s2t.sound.play(song.songId);
					s2t.main.addSongToPlaylist(song, undefined, undefined, undefined, true);
					s2t.sound.setNowPlaying(jQuery('table.playlist-table tr:last-of-type'));
				}
			},
			queue: {
				name: "Queue", callback: function (key, opt) {
					var song = opt.$trigger.find('td.song a').data('signature');
					s2t.main.addSongToPlaylist(song, undefined, undefined, undefined, false);
				}
			},
			playNext: {
				name: "Play Next", callback: function (key, opt) {
					var song = opt.$trigger.find('td.song a').data('signature');
					var playlist = jQuery('table.playlist-table');

					//if nothing's there
					if(playlist.find('tr').length === 0) {
						s2t.main.addSongToPlaylist(song);
						s2t.sound.play(song.songId);
						s2t.main.setCurrentlyPlayingInformation(song);
					}
					//if something's there
					else if(playlist.find('tr').length > 0) {
						var nowPlaying = playlist.find('tr.now-playing');
						if(nowPlaying.length) {
							//append afer now-playing
							s2t.main.addSongToPlaylist(song, undefined, undefined, nowPlaying.index() + 1, false);
						} else {
							//append last + play
							s2t.main.addSongToPlaylist(song, undefined, undefined, undefined, true);
							s2t.sound.play(song.songId);
							s2t.main.setCurrentlyPlayingInformation(song);
						}
					}
				}
			},
			separator1: "-----",
			star: {
				name: "Star", callback: function (key, opt) {
//					var song = opt.$trigger.find('td.song a').data('signature');
//					s2t.main.setCurrentlyPlayingInformation(song);
//					s2t.sound.play(song.songId);
				}
			},
			addToPlaylist: {
				name: "Add To Playlist", callback: function (key, opt) {
					var song = opt.$trigger.find('td.song a').data('signature');
					console.log(song.songId);
					s2t.api.updatePlaylist(1,undefined, undefined, undefined, song.songId, undefined, function (data){
					console.log(data);
					});
				}
			}

		}
	});

	$.contextMenu({
		// define which elements trigger this menu
		selector: 'table.playlist-table tbody tr',
		animation: {
			show: 'fadeIn',
			hide: 'fadeOut'
		},
		delay: '100',
		items: {
			remove: {
				name: "Remove", callback: function (key, opt) {
					s2t.main.removeSongFromPlaylist(opt.$trigger.index());
					s2t.main.updatePlaylistInformation();
				}
			},
			separator1: "-----",
			addToPlaylist: {
				name: "Add To Playlist", callback: function (key, opt) {
					var song = opt.$trigger.find('td.song a').data('signature');
					console.log(song.songId);
					s2t.api.updatePlaylist(1, undefined, undefined, undefined, song.songId, undefined, function (data){
					console.log(data);
					});
				}
			}

		}
	});
		$.contextMenu({
		// define which elements trigger this menu
		selector: '.playlistItem',
		animation: {
			show: 'fadeIn',
			hide: 'fadeOut'
		},
		delay: '100',
		items: {
			play: {
				name: "Play", callback: function (key, opt) {
					var song = opt.$trigger.find('td.song a').data('signature');
					s2t.main.setCurrentlyPlayingInformation(song);
					s2t.sound.play(song.songId);
					s2t.main.addSongToPlaylist(song, undefined, undefined, undefined, true);
					s2t.sound.setNowPlaying(jQuery('table.playlist-table tr:last-of-type'));
				}
			},
			queue: {
				name: "Queue", callback: function (key, opt) {
					var song = opt.$trigger.find('td.song a').data('signature');
					s2t.main.addSongToPlaylist(song, undefined, undefined, undefined, false);
				}
			},
			playNext: {
				name: "Play Next", callback: function (key, opt) {
					var song = opt.$trigger.find('td.song a').data('signature');
					var playlist = jQuery('table.playlist-table');

					//if nothing's there
					if(playlist.find('tr').length === 0) {
						s2t.main.addSongToPlaylist(song);
						s2t.sound.play(song.songId);
						s2t.main.setCurrentlyPlayingInformation(song);
					}
					//if something's there
					else if(playlist.find('tr').length > 0) {
						var nowPlaying = playlist.find('tr.now-playing');
						if(nowPlaying.length) {
							//append afer now-playing
							s2t.main.addSongToPlaylist(song, undefined, undefined, nowPlaying.index() + 1, false);
						} else {
							//append last + play
							s2t.main.addSongToPlaylist(song, undefined, undefined, undefined, true);
							s2t.sound.play(song.songId);
							s2t.main.setCurrentlyPlayingInformation(song);
						}
					}
				}
			},
			separator1: "-----",
			star: {
				name: "Star", callback: function (key, opt) {
//					var song = opt.$trigger.find('td.song a').data('signature');
//					s2t.main.setCurrentlyPlayingInformation(song);
//					s2t.sound.play(song.songId);
				}
			},
			/*
fold1: {
                name: "Add To Playlist test",           
                        items: {
                            "fold1-key1": {name: "alpha"},
                            "fold1-key2": {name: "bravo"},
                            "fold1-key3": {name: "charlie"}
                        }
                }
            },
*/
			addToPlaylist: {
				name: "Add To Playlist", callback: function (key, opt) {
					var song = opt.$trigger.find('td.song a').data('signature');
					console.log(song.songId);
					s2t.api.updatePlaylist(1,undefined, undefined, undefined, song.songId ,undefined, function (data){
					console.log(data);
					});
				}
			},
			removeFromPlaylist: {
				name: "Remove From Playlist", callback: function (key, opt) {
					var song = opt.$trigger.find('td.song a').data('signature');
					console.log(song.songId);
					s2t.api.updatePlaylist(1,undefined, undefined, undefined, undefined, opt.$trigger.index(), function (data){
					console.log(data);
					});
				}
			}

		}
	});
}
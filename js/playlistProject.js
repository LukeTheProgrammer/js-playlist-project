jQuery(_.bind(function(window, $, _) {
	var Application = Backbone.View.extend({
		initialize: function() {
			var songs, playlist, playlistView;

			songs = new SongCollection([
				new SongModel({name: 'Song 1', artist: 'HelloThere', order: 0}),
				new SongModel({name: 'Song 2', artist: 'HelloThere', order: 1}),
				new SongModel({name: 'Song 3', artist: 'HelloThere', order: 2})
			]);
			playlist = new PlaylistModel({
				name: 'HelloThere Chill Ride',
				owner: 'John Doe',
				collection: songs
			});
			playlistView = new PlaylistView({
				el: $('#playlist-container'),
				model: playlist
			});

			playlistView.render();
		}
	});

	var SongModel = Backbone.Model.extend({
		defaults: {
		  name: 'Song Name',
		  artist: 'Artist Name',
		}
	});

	var PlaylistModel = Backbone.Model.extend({
		defaults: {
			name: 'Playlist Name',
			owner: 'Owner Name',
			collection: null
		}
	});

	var SongCollection = Backbone.Collection.extend({
		model: SongModel,
		comparator: function(m){ return m.get("order"); }
	});

	var PlaylistSongView = Backbone.View.extend({
		tagName: 'li',
		className: 'playlist-song',
		template: _.template($('#playlist-song-template').text()),
		events: {},

		render: function() {
			this.$el.html(this.template({
				order: this.model.get('order') + 1,
				name: this.model.get('name'),
				artist: this.model.get('artist')
			}));
			this.listenTo(this.model, 'change:name', this.onNameChange);
			this.listenTo(this.model, 'change:artist', this.onArtistChange);
			this.listenTo(this.model, 'destroy', this.remove);
			return this;
		},

		onNameChange: function(model, value) {
			this.$('.song-name').html(value);
		},

		onArtistChange: function(model, value) {
			this.$('.song-artist').html(value);
		}
	});

	var PlaylistView = Backbone.View.extend({
		tagName: 'div',
		className: 'playlist',
		viewItems: [],
		template: _.template($('#playlist-template').text()),
		events: {},

		initialize: function() {
			this.collection = this.model.get('collection');
		},

		render: function() {
			this.$el.html(this.template({name: this.model.get('name'), owner: this.model.get('owner')}));
			this.renderSongs();
			return this;
		},

		renderSongs: function() {
			var $songContainer 	= this.$('.song-container').empty(),
				that 			= this,
				songView;

			this.collection.each(function(song) {
				songView 		= new PlaylistSongView({model: song});
				$songContainer.append(songView.render().$el);
				that.viewItems.push(songView);
			});

			this.$('.song-container').sortable({
				handle: ".sort-handle",
				opacity: 0.9,
				update: function(e, u){ that.sortSongList(); }
			});

			this.$('.playlist-name').on("blur", function(e){
				var newVal 		= e.target.innerText;
				that.model.set("name", newVal);
				that.render();
			});

		},

		sortSongList: function(){
			 _.each(this.viewItems, function(item){
				item.model.set('order', item.$el.index());
			});
			this.collection.sort({silent: true})
			 _.invoke(this.viewItems, 'remove');
			this.render();
		}
	});

	new Application();
}, window, window, jQuery, _));


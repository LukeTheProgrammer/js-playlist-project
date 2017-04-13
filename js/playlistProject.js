jQuery(_.bind(function(window, $, _) {
    var Application = Backbone.View.extend({
        initialize: function() {
            var songs, playlist, playlistView;

            songs = new SongCollection([
                new SongModel({name: 'Song 1', artist: 'HelloThere'}),
                new SongModel({name: 'Song 2', artist: 'HelloThere'}),
                new SongModel({name: 'Song 3', artist: 'HelloThere'})
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
          artist: 'Artist Name'
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
        model: SongModel
    });

    var PlaylistSongView = Backbone.View.extend({
        tagName: 'li',
        className: 'playlist-song',
        template: _.template($('#playlist-song-template').text()),
        events: {},

        render: function() {
            this.$el.html(this.template({name: this.model.get('name'), artist: this.model.get('artist')}));
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
        template: _.template($('#playlist-template').text()),
        events: {},

        initialize: function() {
            this.collection = this.model.get('collection');
        },

        render: function() {
            this.$el.html(this.template({name: this.model.get('name'), owner: this.model.get('owner')}));
            this.renderSongs();
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.collection, 'add remove reset sort', this.renderSongs);
            return this;
        },

        renderSongs: function() {
            var $songContainer = this.$('.song-container').empty(),
                songView;

            this.collection.each(function(song) {
                songView = new PlaylistSongView({model: song});
                $songContainer.append(songView.render().$el);
            });
        }
    });

    new Application();
}, window, window, jQuery, _));

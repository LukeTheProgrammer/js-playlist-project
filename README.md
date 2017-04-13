Playlist project
================

This is a basic project that has the hopes of displaying a playlist and
allowing a user to edit some information about the playlist.

## Useful links

 - [Backbone](http://backbonejs.org)
 - [Underscore](http://underscorejs.org)
 - [LESS](http://lesscss.org)
 - [Reference JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/es5)

## Goal

Your mission should you choose to accept is to do the following:

 - Display the position of each song in the playlist next to the song name.

    * Tip: The templates for displaying the songs are embedded in the index.html
      file.

 - Add up/down actions that allow a user to rearrange the songs in the
   playlist. It is not required for the data to be persisted in any way.

    * Tip: Don't just change the DOM; instead, modify the collection.

 - Style the playlist container to be a bit less ugly. Use your discretion
   on how to accomplish this but try to use the selectors currently in place.

    * Tip: There is currently a `css/main.css` file that should be extended
      upon.

 - Allow the user to edit the name of the playlist. In doing so, the underlying
   model should be updated. Also ensure that the playlist-container is updated
   without re-rendering the entire playlist view.

    * Tip: Models in Backbone have change events that could be useful.

1Stop

**Deployed App Link** https://1stophere.vercel.app

Application secured by google OAuth2, pulls headlines, bylines, summaries, and links to articles from New York Times, songs from Spotify, movies with ratings, cast, plot and other details from IMDB and videos from YouTube which can be watched within the app. Users can save the articles/song/movies/videos that will always be available when they log back in. They can also remove the saved items from the list.

React-redux & hooks tutorial source: Udemy

Design:
* The App is only accessible when the user logs in using Google authentication.
* Once logged in the user is greeted with their personalized name that their google profile holds.
* The landing page displays an animated navigation links to 4 different resources: Music/News/Movies/Videos.
* Each page is linked to respective api's as detailed below:
    * Music --> Linked to spotify API
    * News --> Linked to NYT API
    * Movies --> Linked to IMDB API
    * Videos --> Linked to Youtube
* Once the user picks the category, each page is setup to fetch the search results based on user input.
* The fetched results have important details available at a glance and links to direct them to respective details page of the source.
* The user has tha ability to bookmark their favorites in each category which are available when they signin at a later time until the user deletes them from their profile.



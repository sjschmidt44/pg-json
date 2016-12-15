# Mapping database records to Google Maps
This is a pair programming exercise. Please work with your partner to complete this assignment.

### Outcome:
Your goal with this assignment is to exercise your sql query skills in working with a large dataset. You will wire up this app to retrieve information from the DB to populate the search filters, and then apply your search parameters to query the DB again and apply the result to a Google Map marker on the page.

#### Setup
1. Create a google maps API key [Click here](https://developers.google.com/maps/documentation/javascript/) and scroll down the page until you see the 'Create API Key' link.
  - Add your API key to the script tag in `index.html`, and ensure that your map is rendering in its basic form.
2. Populate the database:
  - Ensure that your postgres server is running using the `pgstart` alias that we set up in lecture.
  - From your terminal, ensure that you're in the root directory of this repo `./zip-codes/`
  - Run the following command: `.bin/loadzips`
    - This script will connect to your local postgres database, and populate the zip codes as records in the DB.
    - *NOTE* It will take approx. 5-10 seconds for this script to complete all 30,000 records. When complete, you will see `files loaded successfully` in your terminal, and your command prompt will return.
  - You should now be able to start postgres using `psql`, and run `SELECT COUNT(*) from zips;`, which will return the following:

      ```shell
        count
        -------
        29467
        (1 row)
      ```

#### Write your code
3. Populate the select elements for State and City using data from the Postgres DB table.
  - The DB has already been populated from the `zips.json` file in the `/data/` directory. **You did this in the setup instructions**
  - Don't create an object constructor and filter results from a collection of object instances.
  - Instead, query the database to get the list of all states on page load, and then query the database again to get a list of cities once the user selects a state.
  - Log the list of matching cities to the console while you're doing your work, but remember to remove those logs when you finish up.
4. Wire up the zip code search to pull data from the DB and log matching objects to the console (while debugging).
  - You will need to write your SQL queries for a direct search of the db using the zip.
5. Be sure to include error-handling logic to deal with invalid search terms and searches that return no results.
6. Use the results of either search query (zip OR city/state) to reset the central location on the map, and place a google maps marker on the map.
  - The API docs for Google Maps will be your friend [Marker API Docs](https://developers.google.com/maps/documentation/javascript/markers#add)
  - NOTE: The data returned to you will be in the form of `{longitude, latitude}`. Google Maps is expecting `{latitude: val, longitude: val}`. Please handle that appropriately.

### Stretch Goals:
7. Implement additional information in each marker. For example, render all of the data from the DB query into the marker, or add your own unique data from another source?
8. Dig into the marker customization in other ways... Change the color, style, animation.


## Submitting your work

Follow the usual process for submitting your work by creating a PR back to upstream, and then submitting a link to your PR in Canvas.

## Goals:
-	Simplistic, straightforward design
-	Robustness 
-	Performance (e.g. prevent redundant requests, minimize re-renders) 


## Features
-	Filter news by category (entertainment, sports, technology), country, and/or search term
- Read through pages of articles (20 articles per page)
-	Results of filter or search displayed: total results and fetch time
-	Publication date displayed relative to the current time if the article was recently published

Each article contains its headline, author, published date, source, description, and image. Images that cannot be found or are inaccessible (error when loading image) display a placeholder icon. Only metadata that can be found (not null) is displayed. Clicking on either the headline or the image opens the link to the article in a different tab. <br>

## Notes
- If the request was not successful (error status), the error is displayed, along with steps to take.
- Changing countries in the middle of a search will reflect that change upon completion of the search.

<br>

## Development

- Run `npm install` to install the packages.
- Run `npm start` to run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

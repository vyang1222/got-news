## Goals:
-	Simplistic, intuitive design
-	Robustness 
-	Performance (e.g. prevent redundant requests, minimize re-renders) 


## Features
-	Filter news by endpoint (top, all), category (entertainment, sports, technology), country, and/or search term
- Read through pages of articles (20 articles per page) sorted by date
-	See results of filter or search (total results and fetch time)
-	See publication date relative to the current time if the article was recently published

Each article contains its headline, author, published date, source, description, and image. Images that cannot be found or are inaccessible (e.g. error 404 when loading image) display a placeholder icon. Only metadata that can be found (not null) is displayed. Clicking on either the headline or the image opens the link to the article in a different tab. <br>

## Notes
- The "all" endpoint works best with news from the US.
- If the request was not successful (error status from News API), the error is displayed, along with steps to take. Most likely, this would be a rateLimited error. 
- Changing countries or the endpoint in the middle of a search will *not* successfully reflect that change until the search has been completed.

<br>

## Development

- Run `npm install` to install the packages.
- Run `npm start` to run the app in development mode. 
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

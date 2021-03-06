## Image Search Abstraction Layer

Free Code Camp Challenge

https://fcc-imagesearchtool.herokuapp.com/

This service will allow you to search for images, and will return (in JSON format) the URLs, Alt Text, and Page Urls for each image found.

To perform a new search, append the following criteria to the `/api/imagesearch` path:

    - `searchfor=<yourSearchCriteria>`
    
    - `offset=<pageNumberOfResults>` *optional - defaults to first page*
    
** Example Searches **

`https://fcc-imagesearchtool.herokuapp.com/api/imagesearch?searchfor=iceland`

`https://fcc-imagesearchtool.herokuapp.com/api/imagesearch?searchfor=reykjavik&offset=5`

To see the latest image searches, use the following path: `/api/latest/imagesearch`. The response will be a JSON object.

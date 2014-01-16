# Beer Advocate API

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/stursby/beer-advocate-api/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

Unofficial library for working with Beer Advocate data.

## Installation

#### via [NPM](http://npmjs.org)

```bash
$ npm install beer-advocate-api --save-dev
```

## Example

```javascript
var ba = require('beer-advocate-api');

// Search for a beer
// http://beeradvocate.com/search/?q=Anchor+Steam&qt=beer
ba.beerSearch("Anchor Steam", function(beers) {

    console.log(beers);

});

// Get a specific beer page
// http://beeradvocate.com/beer/profile/29223/84343/
ba.beerPage("/beer/profile/29223/84343/", function(beer) {

    console.log(beer);

});
```
## Output

```javascript
// Search for a beer
[ { beer_name: 'Anchor Steam Beer',
    beer_url: '/beer/profile/28/63/',
    brewery_name: 'Anchor Brewing Company',
    brewery_location: 'San Francisco, California',
    brewery_url: '/beer/profile/28/',
    retired: false },
  { beer_name: 'Drop Anchor Steam Beer',
    beer_url: '/beer/profile/952/9899/',
    brewery_name: 'Great Dane Pub & Brewing Company (Downtown)',
    brewery_location: 'Madison, Wisconsin',
    brewery_url: '/beer/profile/952/',
    retired: true } ]

// Get a specific beer page
[ { beer_name: 'Day Tripper',
    beer_style: 'American Pale Ale (APA)',
    beer_abv: '5.40%',
    brewery_name: 'Indeed Brewing Company',
    brewery_state: 'Minnesota',
    brewery_country: 'United States',
    ba_score: '90',
    ba_rating: 'outstanding',
    bros_score: 'N/A',
    bros_rating: '',
    ratings: '264',
    reviews: '65',
    rAvg: '4.04',
    pDev: '10.4%' } ]
```



## License

Beer Advocate API is licensed [MIT](http://opensource.org/licenses/MIT)

* * *

Copyright (c) 2014 Charlie Hield

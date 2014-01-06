var request = require('request'),
    cheerio = require('cheerio');

exports.beerSearch = function(query, callback) {

    var url = "http://beeradvocate.com/search/?q=" + encodeURIComponent(query) + "&qt=beer";

    request(url, function (error, response, html) {

        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html);

            var beers = [];

            $('#baContent ul li').each(function(beer) {

                // One beer listing
                var li = $(this);

                // Beer details
                var beer = li.children('a').eq(0),
                    beer_name = beer.text(),
                    beer_url = beer.attr('href');

                // Brewery details
                var brewery = li.children('a').eq(1),
                    brewery_name = brewery.text(),
                    brewery_url = brewery.attr('href'),
                    brewery_location = brewery.next().text();

                // Retired?
                var retired = false;
                if (beer.prev().text() === "Retired - ") {
                    var retired = true;
                }

                // Data to return
                var data = {
                    beer_name: beer_name,
                    beer_url: beer_url,
                    brewery_name: brewery_name,
                    brewery_location: brewery_location.slice(2),
                    brewery_url: brewery_url,
                    retired: retired
                };
                
                // Add to beer array
                beers.push(data);

            });

            callback(beers);

        }

    });

}

exports.beerPage = function(url, callback) {

    var url = "http://beeradvocate.com" + url;

    request(url, function (error, response, html) {

        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html);

            var beer = [];

            // Beer & brewery name
            var title = $('h1').text().split(/\s-\s/),
                beer_name = title[0],
                brewery_name = title[1];

            // ABV
            var beer_abv_chunk = $('#baContent table').eq(1).find('td').text().split(/%\sABV/)[0],
                beer_abv = beer_abv_chunk.substr(beer_abv_chunk.length - 6).trimLeft() + "%";

            // Brewery details
            var links = $('#baContent table').find('form').parent().find('a'),
                brewery_state = links.eq(2).text(),
                brewery_country = links.eq(3).text(),
                beer_style = links.eq(4).text();

            // Beer Advocate scores
            var ba_info = $('.BAscore_big').eq(0),
                ba_score = ba_info.text(),
                ba_rating = ba_info.next().next().text();

            var bros_info = $('.BAscore_big').eq(1),
                bros_score = bros_info.text(),
                bros_rating = bros_info.next().next().text();

            // More stats
            var stats = $('#baContent table').eq(2).find('td:last-child').text().split(/:\s/),
                ratings = stats[1].replace("Reviews",""),
                reviews = stats[2].replace("rAvg",""),
                rAvg = stats[3].replace("\npDev",""),
                pDev = stats[4].replace("\n\nRatings Help\n","");


            // Data to return
            var data = {
                beer_name: beer_name,
                beer_style: beer_style,
                beer_abv: beer_abv,
                brewery_name: brewery_name,
                brewery_state: brewery_state,
                brewery_country: brewery_country,
                ba_score: ba_score,
                ba_rating: ba_rating,
                bros_score: bros_score,
                bros_rating: bros_rating,
                ratings: ratings,
                reviews: reviews,
                rAvg: rAvg,
                pDev: pDev
            };

            // Add to beer array
            beer.push(data);

            callback(beer);

        }

    });

}
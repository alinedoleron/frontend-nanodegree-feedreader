/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URLs are defined', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            });
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('Names are defined', function() {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            });
        });
    });


    /* This test suite is about the menu */

    describe('The menu', function () {

        /* This test ensures the menu element is hidden by default. */

        it('is closed by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          */

        it('changes visibility when its clicked', function () {
            let menuStatusInitialyHidden = $('body.menu-hidden');

            /** Click menu icon to open the menu sidebar, so that .menu-hidden class disapears*/
            $('.menu-icon-link').click();

            /** Body should not have menu-hidden class */
            expect($('body').hasClass('menu-hidden')).toBe(false);
            
            /** Click menu icon again to close the menu sidebar*/
            $('.menu-icon-link').click();

            /** Body should have menu-hidden class */
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
        

    /* This test suite is about Initial Entries */

    describe('Initial Entries', function () {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        /** This function is called once before the spec */
        beforeEach(function(done) {
            /** Call loadFeed */
            loadFeed(0, done);
        });

        it('have at least a sigle entry within the feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        }); 

    });

    /* This test suite is abount New Feed Selection */

    describe('New Feed Selection', function () {
        
        /* THis test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        
        /** This function is called once before the spec */
        beforeEach(function(done) {
            loadFeed(0, function () {
                /** Get first feed node */
                firstLink = $('.feed > .entry-link');
                initialUrls = [];

                /** This loop stores the feed links on initialUrls array */
                for (let i = 0; i < firstLink.length; i++) {
                    initialUrls.push(firstLink[i].href);
                }

                /** call loadField again passing the second field list id */
                loadFeed(1, done);
            });
        });

        it('changes the content when a new feed is loaded', function () {
             /** Get second feed node */
            secondLink = $('.feed > .entry-link');
            finalUrls = [];

            /** This loop stores the feed links on beforeLink array */
            for (let i = 0; i < secondLink.length; i++) {
                finalUrls.push(secondLink[i].href);
            }

            /** Compare if links after changing content are diferent from the initial content*/
            expect(finalUrls).not.toEqual(initialUrls);
        });
    });
}());

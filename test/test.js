/**
 * Running Tests:
 * Move to project route
 * Enter: mocha test/test.js
 */

/**
 * Sample Test for mochajs
 */
var assert = require('assert');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});

/**
 * Following Tests WILL fail because of referencing problems
 */
var routing = require("../app_client/js/routing.js");

describe("Store Coordinate", function(){
    it("Should return filled array when used", function(){

        assert.equal([0, 0], storeCoordinate(0, 0));
    })
});


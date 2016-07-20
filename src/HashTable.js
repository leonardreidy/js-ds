/** 
 * HashTable.js - JavaScript OO Implementation of Simple HashTable Data Structure
 *
 * There are some problems with this implementation. Come back to this later. 
 * HashTables are common and important data structures. Make sure to come back to
 * this!!!
 */

/**
 * @class 
 * A <em>HashTable</em>, like a dictionary, is a data structure that maps keys to values.
 * Hashtables use a function to compute an index on an array of slots, sometimes called 
 * 'buckets'. Hashtables permit relatively fast insertion, deletion, and retrieval but 
 * perform less than optimally for search operations such as identifying the minimum and 
 * maximum values of a set of data. Hashtables must be designed and implemented to avoid 
 * collisions. A collision occurs when the hashing function generates a non-unique index
 * for two separate inputs. A HashTable ADT includes the following operations:
 *
 * <ul>
 * <li><em>put</em>         - add a data element to the hashtable;</li>
 * <li><em>get</em>         - get a data element from the hashtable;</li>
 * <li><em>getHash</em>     - compute the hashing index;</li>
 * <li><em>toString</em>    - get a string representation of the distribution of hashed data;</li>
 * </ul>
 */
var HashTable = (function() {

    /**
     * @constructor
     * @description  Create and initialise new HashTable
     */
    function HashTable() {
        // To avoid clustering in the underlying data structure the array size is set
        // to a prime number
        this.table = new Array(137);
    }

    HashTable.prototype = {

        getHash: function(str) {
            const H = 37;
            var total = 0; 
            for(var i = 0; i < str.length; i++) {
                total += H * total + str.charCodeAt(i); 
            }
            total = total % this.table.length;
            if(total < 0) {
                total += this.table.length-1;
            }
            return parseInt(total);
        },

        put: function(key, data) {
            var position = this.getHash(key);
            if(this.table[position] === undefined) {
                this.table[position] = key; 
                this.values[position] = data;
            }
            else {
                while (this.table[position] != undefined) {
                    position++;
                }
                this.table[position] = key;
                this.values[position] = data;
            }
        }, 

        get: function(key) {
            var hash = -1; 
            hash = this.getHash(key);
            if(hash > -1) {
                for(var i = hash; this.table[hash] != undefined; i++) {
                    if(this.table[hash] === key) {
                        return this.values[hash];
                    }
                }
            }
            return undefined;
        },  

        toString: function() {
            var n = 0; 
            for (var i = 0; i < this.table.length; ++i) {
                if(this.table[i] != undefined) {
                    print(i + ": " + this.table[i]);
                }
            }
        }

    };

    return HashTable;


}());
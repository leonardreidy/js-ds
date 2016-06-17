/** 
 * Iter.js - A Helper Class to Provide Iterator Support to js-ds.js Data Structures
 */

/**
 * @class 
 * An <em>Iter</em> object is an iterator. Iterators have a reference to a given iterable 
 * collection and the current position of the iterator with respect to the latter. Iterators 
 * permit the traversal of a collection with operations such as first, next, hasNext, reset 
 * and each. 
 * This class is not a general purpose implementation. It will return unexpected results if
 * it is used on a collection or object that nests other collections or objects. It is best
 * suited to Strings, Arrays, and simple collections of key/value pairs where both key and value
 * are 'primitives' like strings and numbers. In the current context, it serves as a helper
 * class for the Dictionary data structure.
 */
var Iter = (function() {

    /**
     * Constructor creates new Iter (iterator)
     * @param {Object} Objects or other collections
     */
    function Iter(collection) {
            this.collection = collection;
            this.index = 0;
            this.current = 0;
            this.currKey;
            this.currVal;
    }

    /**
     * @memberOf  Iter
     * @instance
     * @method 
     * @description  Reset the index and current properties of the iterator
     */
    Iter.prototype.reset = function() {
        this.index = 0;
        this.current = 0;
    };

    /**
     * @memberOf  Iter
     * @instance
     * @method 
     * @description  Get first element of the current Iter
     * @return {*} The first element of the current Iter
     */
    Iter.prototype.first = function() {
        this.reset();
        return this.next();
    };

    /**
     * @memberOf  Iter
     * @instance
     * @method 
     * @description  Get the next element in the collection as an array containing the key and value
     * @return {Array} An array containing the key and value of the next element, or undefined
     */
    Iter.prototype.next = function() {
        var keys;
        // If the current collection is a string or an array, return the current element and increment the index variable
        if(typeof this.collection === 'string' || 
            Object.prototype.toString.call(this.collection) === '[object Array]') {
            return this.collection[this.index++];
        // else, get the keys of the collection, then get the current key, and the current value, and return an array with 
        // the current key and the current value as the 0th and 1st elements of that array
        } else {
            keys = Object.keys(this.collection);
            this.currKey = keys[this.current];
            this.currVal = this.collection[keys[this.current++]];
            return this.current <= keys.length ? [this.currKey, this.currVal] : undefined;
        }
    };

    /**
     * @memberOf  Iter
     * @instance
     * @method 
     * @description  Check whether the Iter has a next element
     * @return {Boolean} True if the Iter has a next element, false otherwise
     */
    Iter.prototype.hasNext = function() {
        // If the current collection is a string or an array, return true or false if the index is less than 
        // the length of the collection
        if(typeof this.collection === 'string' || 
            Object.prototype.toString.call(this.collection) === '[object Array]') {
            return this.index < this.collection.length;
        }
        // else return true or false if the index is less than the length of the array of the collections keys
        else {
            return this.current < Object.keys(this.collection).length;
        }  
    };

    /**
     * @memberOf  Iter
     * @instance
     * @method 
     * @description  Iterate over all elements of the Iterator and execute a callback function for each
     * @param  {Function} callbackFunc A callback function to execute against each element of the Iter
     */
    Iter.prototype.each = function(callbackFunc) {
        var elem;
        for(elem = this.first(); this.hasNext(); elem = this.next()) {
            callbackFunc(elem);
        }
        callbackFunc(elem); // execute the callback function against the last element of the collection
    };

    return Iter;
    
}());

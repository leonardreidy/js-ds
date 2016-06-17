/**
 * Dictionary.js - JavaScript OO Implementation of Dictionary Data Structure
 */

/**
 * @class 
 * A <em>Dictionary</em> stores a collection of data as <em>key:value</em> pairs, 
 * known as <em>entries</em>. Dictionary <em>keys</em> are unique; the association 
 * of keys and values defines a <em>mapping</em>. Dictionaries are also known as 
 * <em>associative arrays</em> or <em>maps</em>. A dictionary <em>ADT</em> includes 
 * the following operations: 
 * 
 * <em>getSize</em> to get the size of the data structure; 
 * <em>isEmpty</em> to check to see if it is empty; 
 * <em>put</em> to put or add new entries to the dictionary; 
 * <em>get</em> to get the value associated with a given key; 
 * <em>remove</em> to remove entries from the dictionary; 
 * <em>getEntries</em> to get all entries in the dictionary
 * (as an iterable or iterator); 
 * <em>getValues</em> to get all values in the dictionary; 
 * <em>getKeys</em> to get all keys in the dictionary; and
 * <em>toString</em> to represent the entries in the dictionary
 * as a String and/or to display the contents of the dictionary.
 *
 * Most modern browsers support Maps (associative arrays/dictionaries), 
 * so this implementation isn't strictly necessary. If you choose to
 * use this implementation, note that it depends on the Iter.js class 
 * to work. You may wish to use requirejs to manage module loading in
 * your application and handle the relationship that way. But the 
 * simplest way to use the Dictionary class is to make sure to include 
 * the Iter.js script in the html before the Dictionary.js script.
 */

var Dictionary = (function() {

    /**
     * Constructor declares and/or initialises Dictionary
    */
    function Dictionary() {
        // Objects have prototypes so there are 'default' keys
        // Since ES5, this problem can be mitigated by using Object.create(null)
        // See MDN on Maps at: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map
        this.table = Object.create(null);    
    }

    /**
     * @memberOf  Dictionary
     * @instance
     * @method
     * @description  Add (put) an entry to the dictionary
     * @param {String, *} [key,val] key as String, val as any data type
     * @return {Number} 1 if successful, -1 if unsuccessful
     */
    Dictionary.prototype.put = function(key, val) {
        // If the key is unique, add the entry to the dictionary and return 1 for success
        if(!(key in this.table))
        {
            this.table[key] = val;
            return 1;
        // else return -1 to signify that the operation was unsuccessful
        } else {
            return -1;
        }
    };

    /**
     * @memberOf  Dictionary
     * @instance
     * @method
     * @description  Get the value associated with the given key in the dictionary
     * @param  {String} key The key to the associated value in the dictionary
     * @return {*}     The value associated with the given key or undefined if the key is not in the dictionary
     */
    Dictionary.prototype.get = function(key) {
        return this.table[key];
    };

    /**
     * @memberOf  Dictionary
     * @instance
     * @method
     * @description  Remove the entry corresponding to the given key
     * @param  {String} key The key that identifies the entry to be removed from the dictionary
     * @return {Number} 1 if the operation was successful, -1 otherwise
     */
    Dictionary.prototype.remove = function(key) {
        if(key in this.table)
        {
            delete this.table[key];
            return 1;
        }
        else {
            return -1;
        }
    };

    /**
     * @memberOf  Dictionary
     * @instance
     * @method 
     * @description  Get an iterable (array) of all keys stored in the dictionary
     * @return {Array} Array of dictionary keys or an empty array object
     */
    Dictionary.prototype.getKeys = function() {
        return Object.keys(this.table) || undefined;
    };

    /**
     * @memberOf  Dictionary
     * @instance
     * @method 
     * @description  Get an iterable (array) of all values stored in the dictionary
     * @return {Array} Array of dictionary values
     */
    Dictionary.prototype.getValues = function() {
        // Object.values' specification is not stablised and may not work in certain versions of Chrome
        // and other browsers see: 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values#Browser_compatibility
        var keys = Object.keys(this.table);
        var outArr = [];
        for(key in this.table) {
            outArr.push(this.table[key]);
        }
        return outArr;
    };

    /**
     * @memberOf  Dictionary
     * @instance
     * @method 
     * @description  Get an iterator of all entries in the dictionary
     * @return {Iter} A new iterator on the current dictionary
     */
    Dictionary.prototype.getEntries = function() {
        return new Iter(this.table) || undefined;
    };

    /**
     * @memberOf  Dictionary
     * @instance
     * @method 
     * @description  Get the dictionary size (number of entries)
     * @return {Number} The number of entries in the dictionary
     */
    Dictionary.prototype.getSize = function() {
        return Object.keys(this.table).length;
    };

    /**
     * @memberOf  Dictionary
     * @instance
     * @method 
     * @description  Check whether dictionary is empty or not
     * @return {Boolean} True if dictionary is empty, false otherwise
     */
    Dictionary.prototype.isEmpty = function() {
        if(Object.keys(this.table).length === 0){
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * @memberOf  Dictionary
     * @instance
     * @method 
     * @description  Get a string representation of the dictionary
     * @return {String} A string representation of the dictionary
     */
    Dictionary.prototype.toString = function() {
        var outStr = "";
        var key;
        for(key in this.table) {
            outStr += key + ": " + this.table[key] + ", ";
        }
        return outStr.slice(0, -2); // trim the last comma and space and return to caller
    };

    return Dictionary;


}());
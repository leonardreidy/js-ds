// Dictionary Class as IIFE
var Dictionary = (function() {

    /**
     * @classdesc A JSDS Dictionary is a pseudoclassical JavaScript OO implementation of the dictionary 
     * data structure.
     * A <em>Dictionary</em> stores an unordered collection of data as <em>key/value</em> pairs, 
     * known as <em>entries</em>. Dictionary <em>keys</em> are unique; the association of keys 
     * and values defines a <em>mapping</em>. Dictionaries are also known as <em>associative arrays</em> 
     * or <em>maps</em>. A Dictionary <em>ADT</em> includes the following operations: 
     * <ul>
     * <li><em>getSize</em>     - to get the size of the data structure;</li>
     * <li><em>isEmpty</em>     - to check to see if it is empty;</li>
     * <li><em>put</em>         - to put or add new entries to the dictionary;</li>
     * <li><em>get</em>         - to get the value associated with a given key;</li> 
     * <li><em>remove</em>      - to remove entries from the dictionary;</li> 
     * <li><em>getEntries</em>  - to get all entries in the dictionary
     * (as an iterable or iterator);</li> 
     * <li><em>getValues</em>   - to get all values in the dictionary;</li> 
     * <li><em>getKeys</em>     - to get all keys in the dictionary;</li> and
     * <li><em>toString</em>    - to represent the entries in the dictionary
     * as a string and/or to display the contents of the dictionary.
     * </ul>
     * Most modern browsers support Maps (associative arrays/dictionaries), 
     * so this implementation isn't strictly necessary. Note that it depends on 
     * the Iter.js class, also included in the module.
     * @constructs Dictionary        
     * @memberof module:JSDS
     */
    function Dictionary() {
        // Objects have prototypes so there are 'default' keys
        // Since ES5, this problem can be mitigated by using Object.create(null)
        // See MDN on Maps at: 
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map
        this.table = Object.create(null);    
    }

    /**
     * @description Clear the dictionary.
     */
    Dictionary.prototype.clear = function() {
        var keys = Object.keys(this.table);
        var key;
        for(key in keys) {
            delete this.table[keys[key]];
        }
    };

    /**
     * @description Get the value associated with the given key in the dictionary.
     * @param {String} key The key to the associated value in the dictionary
     * @return {*} The value associated with the given key or undefined if the key is not in the dictionary
     */
    Dictionary.prototype.get = function(key) {
        return this.table[key];
    };

    /**
     * @description Get an iterator of all entries in the dictionary.
     * @return {Iter} A new iterator on the current dictionary
     */
    Dictionary.prototype.getEntries = function() {
        return new Iter(this.table) || undefined;
    };

    /**
     * @description Get an iterable (array) of all keys stored in the dictionary.
     * @return {array} Array of dictionary keys or an empty array
     */
    Dictionary.prototype.getKeys = function() {
        return Object.keys(this.table);
    };

    /**
     * @description Get the dictionary size (number of entries).
     * @return {number} The number of entries in the dictionary
     */
    Dictionary.prototype.getLength = function() {
        return Object.keys(this.table).length;
    };

    /**
     * @description Get an iterable (array) of all values stored in the dictionary.
     * @return {array} Array of dictionary values
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
     * @description Check whether dictionary is empty or not.
     * @return {boolean} True if dictionary is empty, false otherwise
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
     * @description Add (put) an entry to the dictionary.
     * @param {String} key a string representing the key for the given entry
     * @param {*} val any value representing the value for the given entry
     * @return {number} 1 if successful, -1 if unsuccessful
     */
    Dictionary.prototype.put = function(key, val) {
        // If a key/val pair have been supplied, the key is unique and the key is not a number,
        // add the entry to the dictionary and return 1 for success
        if(!(key in this.table) && (key != undefined, val != undefined) && typeof key != "number")
        {
            this.table[key] = val;
            return 1;
        // else return -1 to signify that the operation was unsuccessful
        } else {
            return -1;
        }
    };
        
    /**
     * @description Remove the entry corresponding to the given key.
     * @param {string} key The key that identifies the entry to be removed from the dictionary
     * @return {number} 1 if the operation was successful, -1 otherwise
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
     * @description Get a key-sorted string representation of the dictionary.
     * @return {string} A key-sorted string representation of the dictionary
     */
    Dictionary.prototype.toString = function() {
        var outStr = "";
        var key;
        var keys = Object.keys(this.table).sort();
        for(key in keys) {
            outStr += keys[key] + ": " + this.table[keys[key]] + ", ";
        }
        return outStr.slice(0, -2); // trim the last comma and space and return to caller
    };

    return Dictionary;

}());
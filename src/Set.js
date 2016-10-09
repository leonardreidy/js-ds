// Set as IIFE
var Set = (function() {

    /**
     * @classdesc A JSDS Set is a pseudoclassical JavaScript OO implementation of the set data structure
     * A <em>Set</em> is an unordered collection of unique elements. A set
     * with no elements is called the empty or null set. The universe is the set of all 
     * elements of interest (otherwise known as the universal set). Any two sets
     * are equal if and only if they contain precisely the same members. A set A 
     * is a subset of some set B if all of the members of A are also members of B. 
     * The basic operations on a set include union, intersection, and difference. 
     * The <em>union</em> of two sets A and B is the set of all elements which belong to A 
     * or B, or both. The <em>intersection</em> of two sets A and B is the set of elements 
     * which belong to both A and B. The <em>difference</em> (symmetric difference) of two 
     * sets A and B includes those elements which belong to A or B but not to both.
     * A set <em>ADT</em> includes the following operations:
     * <ul>
     * <li><em>insert</em>       - insert a new data element;</li>
     * <li><em>remove</em>       - remove an existing data element;</li>
     * <li><em>getLength</em>    - get the number of elements in the set;</li>
     * <li><em>union</em>        - get the union of two sets;</li>
     * <li><em>intersection</em> - get the intersection of two sets;</li>
     * <li><em>subset</em>       - check to see if a given set is a subset of the set;</li>
     * <li><em>difference</em>   - get the difference of two sets;</li>
     * <li><em>symmetric difference</em> - get the symmetric difference of two sets;</li>
     * <li><em>toString</em>     - get a string representation of the set;</li>
     * </ul>
     * <br/>
     * @constructs Set
     * @memberof module:JSDS
     */
    function Set() {
        // underlying data structure
        this.datastore = [];
    }

    /**
     * @description Insert a new element into the set.
     * @param {*} data Any value to be stored as data
     * @return {boolean} True if successful, false if not
     */
    Set.prototype.insert = function(data) {
        // Check to ensure new element is unique
        if(this.datastore.indexOf(data) < 0) {
            this.datastore.push(data);
            return true;
        }
        else {
            return false;
        }
    }; 

    /**
     * @description Remove an element from the set.
     * @param {*} data Element to be removed from the set.
     * @return {Boolean}  True if successful, false if not.
     */
    Set.prototype.remove = function(data) {
        var position = this.datastore.indexOf(data);
        if(position > -1) {
            this.datastore.splice(position, 1);
            return true;
        }
        else {
            return false;
        }
    }; 

    /**
     * @description Checks whether set contains the given element.
     * @param {*} data  Any given data element
     * @return {Boolean}  True if the set contains the element, false otherwise.
     */
    Set.prototype.contains = function(data) {
        if(this.datastore.indexOf(data) > -1) {
            return true;
        }
        else {
            return false;
        }
    }; 

    /**
     * @description Get a string representation of the set.
     * @return {String} A string representation of the set.
     */
    Set.prototype.toString = function() {
        return Array.prototype.toString.call(this.datastore);
    }; 

    /**
     * @description Get the union of the given set and this set.
     * @param {Set} set An object of type Set
     * @return {Set}  An object of type Set or undefined
     */
    Set.prototype.union = function(set) {
        var temp = new Set(); 
        var i;
        if(set instanceof Set) {
            for(i = 0; i < this.datastore.length; i++) {
                temp.insert(this.datastore[i]);
            }
            for(i = 0; i < set.datastore.length; i++) {
                if(!(temp.contains(set.datastore[i]))) {
                    temp.datastore.push(set.datastore[i]);
                }
            }
        } else {
            temp = undefined;
        }
        return temp;
    };

    /**
     * @description Get the intersection of this set and the given set.
     * @param {Set} set Any given object of type Set
     * @return {Set} A new Set object 
     */
    Set.prototype.intersection = function(set) {
        var temp = new Set();
        var i;
        if( set instanceof Set) {
            for(i = 0; i < this.datastore.length; i++) {
                if(set.contains(this.datastore[i])) {
                    temp.insert(this.datastore[i]);
                }
            }
        }
        else {
            temp = undefined;
        }
        return temp;
    };

    /**
     * @description  Get the length of this set.
     * @return {Number} The number of elements in this set.
     */
    Set.prototype.getLength = function() {
        return this.datastore.length;
    };

    /**
     * @description Determine whether the given set is a subset of this set.
     * @param {Set} set A set to be assessed against the subset criterion
     * @return {Boolean}  True if the given set is a subset of this, false otherwise
     */
    Set.prototype.subset = function(set) {
        if(this.getLength() > set.getLength()) {
            return false;
        }
        else {
            for (member in this.datastore) {
                if(!set.contains(member)) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * @description Get the difference of this set and the given set
     * @param {Set} set Any given set
     * @return {Set} The set containing the difference of this set and the given set
     */
    Set.prototype.difference = function(set) {
        var temp = new Set();
        for(var i = 0; i < this.datastore.length; i++) {
            if(!(set.contains(this.datastore[i]))) {
                temp.insert(this.datastore[i]);
            }
        }
        return temp;
    };

    /**
     * @description Get the relative complement with respect to this set and the given set
     * @param {Set} set Any given set
     * @return {Set} The set containing the relative complement of this set and the given set
     */
    Set.prototype.symmetricDifference = function(set) {
        // [TODO] Implement symmetric difference instance method
        return "TODO";
    };

    return Set;
    
}());
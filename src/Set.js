/** 
 * Set.js - JavaScript OO Implementation of Set Data Structure
 */

/**
 * @class 
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
 * Note that the class contains some duplication for conceptual and practical 
 * reasons. On the one hand, it may be argued that set operations belong to the
 * domain of discourse of sets, rather than being operations that belong to any 
 * given set. That is, mathematical sets in and of themselves don't perform operations. 
 * So, it may be argued that it is somewhat unintuitive to invoke operations on set 
 * objects. On the other hand, object-oriented programming consists in a mapping from a
 * problem domain to a solution domain that is not or rather need not be one-to-one.
 * From this point of view, it makes sense to respect conventional object-oriented design 
 * principles and provide an implementation that preserves the object/message conceptual 
 * framework! From an implementation point of view, this means that the Set class offers
 * an api that includes static methods representing common set operations and instance 
 * methods that mirror them, even at the risk of some redundancy.
 */
var Set = (function() {

    /**
     * @constructor
     * @description  Create and initialise new Set object
     */
    function Set() {
        // underlying data structure
        this.datastore = [];
    }

    /** 
     * @memberOf  Set
     * @static
     * @method  union
     * @description  Get the union of any two sets. 
     * @param  {Set} left  Any given set 
     * @param  {Set} right Any other given set
     * @return {Set} A new set containing the union of the two given sets or undefined
     */
    Set.union = function(left, right) {
        var temp = new Set(); 
            switch(arguments.length) {
                case 1: 
                    temp = left; 
                break;
                case 2: 
                    for(var i = 0; i < left.datastore.length; i++) {
                        temp.insert(left.datastore[i]);
                    }
                    for(var i = 0; i < right.datastore.length; i++) {
                        if(!(temp.contains(right.datastore[i]))) {
                            temp.datastore.push(right.datastore[i]);
                        }
                    }
                break;
                default: temp = undefined;
            }
            return temp;
    }
    /**
     * @memberOf  Set
     * @static
     * @method intersection
     * @description  Get the intersection of any two sets.
     * @param  {Set} left Any given set
     * @param  {Set} right Any other given set
     * @return {Set} A new set containing the intersection of the given sets
     */
    Set.intersection = function(left, right) {
        var temp = new Set();
        switch(arguments.length) {
            case 1: 
                if(left instanceof Set) {
                    temp = left;
                }
                break;
            case 2: 
                if(left instanceof Set && right instanceof Set) {
                    for(var i = 0; i < right.datastore.length; i++) {
                        if(left.contains(right.datastore[i])) {
                            temp.insert(right.datastore[i]);
                        }
                    }
                } else {
                    temp = undefined;
                }
            break;
            default: temp = undefined;
        }
        return temp;
    }
    /**
     * @memberOf  Set
     * @static
     * @method  sDifference
     * @description  Get the symmetric difference of any two sets.
     * @param  {Set} left Any given set
     * @param  {Set} right Any other given set
     * @return {Set} A new set containing the symmetric difference of the given sets
     */
    Set.sDifference = function(left, right) {

        var temp = new Set();
        var i;

        switch(arguments.length) {

            case 0: temp = undefined; break;
            case 1: 
            // leave temp as is - the difference of a set and itself is the null set 
            // and our empty set is about as close as we can get to the null set (for now)
            break;
            case 2: 
            if(left instanceof Set && right instanceof Set) {

                for(i = 0; i < left.datastore.length; i++) {
                    if(!(right.contains(left.datastore[i]))) {
                        temp.insert(left.datastore[i]);
                    }
                }

                for(i = 0; i < right.datastore.length; i++) {
                    if(!(left.contains(right.datastore[i])) && 
                        !(temp.contains(right.datastore[i]))) {
                        temp.insert(right.datastore[i]);
                    }
                }
                
            }
            else {
                temp = undefined;
            }
            break;
            default: temp = undefined;
        }
            
        return temp;   
    }

    /**
     * @memberOf  Set
     * @static
     * @method  difference
     * @param  {Set}  left  Any given set
     * @param  {Set}  right Any other given set
     * @return {Set}  A new set containing the relative complement of the given sets
     */
    Set.difference = function(left, right) {
        // [TODO]   Implement relative complement
    }

    // Set prototype
    Set.prototype = {

        /**
         * @memberOf  Set
         * @instance
         * @method  insert
         * @description  Insert a new element into the set.
         * @param  {*} data Any value to be stored as data
         * @return {boolean} True if successful, false if not
         */
        insert: function(data) {
            // Check to ensure new element is unique
            if(this.datastore.indexOf(data) < 0) {
                this.datastore.push(data);
                return true;
            }
            else {
                return false;
            }
        }, 
        /**
         * @memberOf  Set
         * @instance
         * @method  remove
         * @description  Remove an element from the set.
         * @param  {*} data Element to be removed from the set.
         * @return {Boolean}  True if successful, false if not.
         */
        remove: function(data) {
            var position = this.datastore.indexOf(data);
            if(position > -1) {
                this.datastore.splice(position, 1);
                return true;
            }
            else {
                return false;
            }
        }, 

        /**
         * @memberOf  Set 
         * @instance
         * @method  contains
         * @description  Checks whether set contains the given element.
         * @param  {*} data  Any given data element
         * @return {Boolean}  True if the set contains the element, false otherwise.
         */
        contains: function(data) {
            if(this.datastore.indexOf(data) > -1) {
                return true;
            }
            else {
                return false;
            }
        }, 
        /**
         * @memberOf  Set
         * @instance
         * @method  toString
         * @description  Get a string representation of the set.
         * @return {String} A string representation of the set.
         */
        toString: function() {
            return Array.prototype.toString.call(this.datastore);
        }, 

        /**
         * @memberOf  Set
         * @instance
         * @method  union
         * @description  Get the union of the given set and this set.
         * @param  {Set} set An object of type Set
         * @return {Set}  An object of type Set or undefined
         */
        union: function(set) {
            var temp = new Set(); 
            if(set instanceof Set) {
                for(var i = 0; i < this.datastore.length; i++) {
                    temp.insert(this.datastore[i]);
                }
                for(var i = 0; i < set.datastore.length; i++) {
                    if(!(temp.contains(set.datastore[i]))) {
                        temp.datastore.push(set.datastore[i]);
                    }
                }
            } else {
                temp = undefined;
            }
            return temp;
        },
        /**
         * @memberOf  Set
         * @instance
         * @method  intersection
         * @description  Get the intersection of this set and the given set.
         * @param  {Set} set Any given object of type Set
         * @return {Set} A new Set object 
         */
        intersection: function(set) {
            var temp = new Set();
            if( set instanceof Set) {
                for(var i = 0; i < this.datastore.length; i++) {
                    if(set.contains(this.datastore[i])) {
                        temp.insert(this.datastore[i]);
                    }
                }
            }
            else {
                temp = undefined;
            }
            return temp;
        }, 
        /**
         * @memberOf  Set
         * @instance
         * @method getLength
         * @description  Get the length of this set.
         * @return {Number} The number of elements in this set.
         */
        getLength: function() {
            return this.datastore.length;
        }, 
        /**
         * @memberOf  Set
         * @instance
         * @method  subset
         * @description  Determine whether the given set is a subset of this set.
         * @param  {Set} set A set to be assessed against the subset criterion
         * @return {Boolean}  True if the given set is a subset of this, false otherwise
         */
        subset: function(set) {
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
        },
        /**
         * @memberOf  Set
         * @instance
         * @method  difference
         * @description  Get the difference of this set and the given set
         * @param  {Set} set Any given set
         * @return {Set} The set containing the difference of this set and the given set
         */
        difference: function(set) {
            var temp = new Set();
            for(var i = 0; i < this.datastore.length; i++) {
                if(!(set.contains(this.datastore[i]))) {
                    temp.insert(this.datastore[i]);
                }
            }
            return temp;
        }

        /**
         * @memberOf  Set
         * @instance
         * @method  sDifference
         * @description  Get the relative complement with respect to this set and the given set
         * @param {Set} set Any given set
         * @return {Set} The set containing the relative complement of this set and the given set
         */
        sDifference: function(set) {
            // [TODO] Implement symmetric difference instance method
        }

    };

    return Set;
}());

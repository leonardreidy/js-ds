var JSDS = (function() {

	// The following private function is present to support pseudoclassical inheritance 
	// The __extends function is how the MS TypeScript (1.x) compiler transpiles
	// the extends keyword into common or garden variety JavaScript and represents a
	// best practice in pseudoclassical JavaScript inheritance
	// Access to this method is made available on the public API of the JSDS module
	// with the slightly less verbose function name: extends
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) {
	    	if (b.hasOwnProperty(p)) d[p] = b[p];
	    }
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};

	/**
	 * @class 
	 * A JSDS Set is a pseudoclassical JavaScript OO implementation of the set data structure
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
	        },

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
	            return "TODO";
	        }

	    };

	    return Set;
	    
	}());


	 /**
	 * @class
	 * A JSDS Stack is a pseudoclassical JavaScript OO implementation of the stack data structure
	 * A <em>Stack</em> is essentially a list of data elements which may be accessed at only one end. 
	 * Stacks are last-in, first-out (LIFO) data structures. A Stack <em>ADT</em> includes the 
	 * following operations:
	 * <ul>
	 * <li><em>clear</em> 		- to delete the contents of the Stack;</li>
	 * <li><em>getLength</em> 	- to get the number of elements contained in the Stack;</li>
	 * <li><em>peek</em> 		- to peek at the element at the top of the Stack;</li>
	 * <li><em>pop</em> 		- to remove elements from the top of the Stack;</li>
	 * <li><em>push</em> 		- to add elements to the top of Stack;</li>
	 * <li><em>toString</em> 	- to get a string representation of the Stack;</li>
	 * </ul>
	 */
	var Stack = (function() {

		/**
		 * @constructor
		 * @description  Create and initialise new Stack object
		 */
		function Stack() {	
			this.datastore = []; // An array is the underlying data structure
			this.top = 0;// The top of the stack
		}

		// Stack prototype
		Stack.prototype = {

			/**
			 * @memberOf  Stack
			 * @instance 
			 * @method  push
			 * @description  Push new element onto stack. When the caller pushes a new element 
			 * onto the stack it is stored in the top position identified by the top 
			 * variable and the latter is incremented so that the new top is the next
			 * vacant position in the array. 
			 * @param {*} element Element to be added to stack
			 */
			push: function(element) {
				this.datastore[this.top++] = element;
			},

			/**
			 * @memberOf  Stack
			 * @instance
			 * @method  pop
			 * @description  Pop element off the stack. This method is essentially the reverse of the push() function 
			 * returning the element in the top position of the stack and decrementing the top variable.
			 * If a caller attempts to pop elements off an empty stack the stack is cleared (reset). 
			 * @return {*} Return the element at the top of the stack, or -1 if the stack is empty.
			 */
			pop: function() {
				if(this.top <= 0) {
					this.clear(); // reinitialise the underlying datastore and reset the top variable
					return -1;	  // return -1 to indicate to the caller that the operation was unsuccessful
				}
				var popped = this.datastore.pop(); // use Array.prototype.pop to remove last element of datastore
				--this.top;
				return popped;
			},

			/**
			 * @memberOf  Stack
			 * @instance
			 * @method  peek
			 * @description  Return the top element of the stack by accessing the element at the top-1 position of the 
			 * underlying datastore (array).
			 * @return {*} Return the top element of the stack or undefined if the stack is empty
			 */
			peek: function() {
				return this.datastore[this.top-1];
			},

			/**
			 * @memberOf  Stack
			 * @instance
			 * @method  clear
			 * @description  Reset the stack and reinitialise the underlying datastore.
			 */
			clear: function() {
				this.datastore = [];
				this.top = 0;
			},

			/**
			 * @memberOf  Stack
			 * @instance 
			 * @method getLength
			 * @description  Get the number of elements in the stack. 
			 * @return {number} Return the number of elements in the stack.
			 */
			getLength: function() {
				return this.top;
			},

			/**
			 * @memberOf  Stack
			 * @instance
			 * @method  toString
			 * @description  Get a string representation of the stack.
			 * @return {string} Return a string representation of the stack.
			 */
			toString: function() {
				return this.datastore.toString();
			}

		}

		return Stack;
		
	}());

	/**
	 * @class
	 * A JSDS queue is a pseudoclassical JavaScript OO implementation of the queue data structure.
	 * A queue is an ordered list. Queues are first-in first-out (FIFO) data structures. 
	 * Data are inserted into a queue at the back of the list and removed from the front. 
	 * A Queue <em>ADT</em> includes the following operations:
	 * <ul>
	 * <li><em>enqueue</em>     - to add an element to the queue;</li>
	 * <li><em>dequeue</em>     - to remove an element from a queue;</li>
	 * <li><em>back</em>        - to get the element at the back of the queue (analogous to peek);</li>
	 * <li><em>front</em>       - to get the element at the front of the queue (analogous to peek);</li>
	 * <li><em>clear</em>       - to clear or empty the queue;</li>
	 * <li><em>getLength</em>   - to get the number of elements in the queue;</li>
	 * <li><em>isEmpty</em>     - to determine whether or not a given queue is empty (contains no elements); and</li>
	 * <li><em>toString</em>    - to get a string representation of the queue.</li>
	 * </ul>
	 */
	var Queue = (function () {

		/**
	     * @constructor
	     * @description  Create and initialise new Queue object.
	     */
	    function Queue() {
	    	// delare and/or initialise queue and offset
	        this.queue = []; // underlying data structure
	        this.offset = 0;
	    }

	    Queue.prototype = {

	        /**
	         * @memberOf  Queue
	         * @instance
	         * @method  getLength
	         * @description  Get the length of the queue.
	         * @return {number} Return the length/number of elements in the queue
	         */
	        getLength: function () {
	            return (this.queue.length - this.offset);
	        },

	        /**
	         * @memberOf  Queue
	         * @instance
	         * @method  isEmpty
	         * @description  Determine whether the queue is empty or not.
	         * @return {Boolean} Return true if queue is empty, false if not
	         */
	        isEmpty: function () {
	            return (this.queue.length === 0);
	        },

	        /**
	         * @memberOf  Queue
	         * @instance
	         * @method  enqueue
	         * @description  Add an element to the back of the queue.
	         * @param  {*} element Any data type
	         */
	        enqueue:function (element) {
	            this.queue.push(element);
	        },

	        /**
	         * @memberOf  Queue
	         * @instance
	         * @method  dequeue
	         * @description  Remove an element from the front of the queue.
	         * @return {*} Return the dequeued element, or -1 if the queue is empty
	         */
	        dequeue: function () {
	            if (this.queue.length === 0) {
	                return undefined;
	            }
	            var element = this.queue.shift();
	            return element;
	        },

	        // Clear/reinitialise the queue
	        
	        // Exercise some caution with delete - it has limitations and 
	        // constraints. In general, if you try to delete a property that
	        // does not exist, the delete operation will return true, which 
	        // may be unexpected. Moreover, if the delete operator succeeds, it
	        // removes the property from the object entirely but if a property 
	        // with the same name exists on the object's prototype chain, the object
	        // will inherit that property from the prototype, another potentially
	        // unintuitive outcome with real potential for driving buggy behaviour
	        // in an application.
	        
	        // See Mozilla Developer Network (MDN) for more info:
	        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
	        
	        /**
	         * @memberOf  Queue
	         * @instance
	         * @method  clear
	         * @description  Clear the queue.
	         * 
	         */
	        clear: function() {
	            delete this.queue;
	            this.queue = [];
	        },

	        /**
	         * @memberOf  Queue
	         * @instance
	         * @method  front
	         * @description Get the element at the front of the queue without dequeueing it.
	         * @return {*} Return the element at the front of the queue, or undefined if the queue is empty
	         */
	        front: function () {
	            return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
	        },

	        /**
	         * @memberOf  Queue
	         * @instance
	         * @method  back
	         * @description  Get the element at the back of the queue without dequeueing it.
	         * @return {*} Return the element at the back of the queue, or undefined if the queue is empty
	         */
	        back: function() {
	            return(this.queue.length > 0 ? this.queue[this.queue.length-1] : undefined);
	        }, 

	        /**
	         * @memberOf  Queue
	         * @instance
	         * @method  toString
	         * @description  Get a string representation of the queue.
	         * @return {string} Return string representation of the queue (using Object.prototype.toString())
	         */
	        toString: function() {
	            return this.queue.toString();
	        }, 

	    };

	    return Queue;
	    
	}());

	/**
	 * @class 
	 * The JSDS Iter is a helper class to provide iterator support to JSDS data structures.
	 * An <em>Iter</em> object is an iterator. Iterators have a reference to a given iterable 
	 * collection and the current position of the iterator with respect to the latter. Iterators 
	 * provide methods that permit the traversal of a collection. An Iter (iterator) ADT includes
	 * the following operations: 
	 * <ul>
	 * <li><em>first</em>   - to get the first element of the Iter;</li>
	 * <li><em>next</em>    - to get the next element of the Iter;</li>
	 * <li><em>hasNext</em> - to determine whether or not the Iter has a next element;</li>
	 * <li><em>reset</em>   - to reset the references used to traverse the Iter;</li>
	 * <li><em>each</em>    - to iterate over the elements of the Iter and execute a callback function against each;</li>
	 * </ul>
	 * 
	 * This class is not a general purpose implementation. It will return unexpected results if
	 * it is used on any collection or object that nests other collections or objects. It is best
	 * suited to Strings, Arrays, and simple collections of key/value pairs where both key and value
	 * are 'primitives' like strings and numbers. In the current context, it serves as a helper
	 * class for the Dictionary data structure.
	 *
	 * Note that if the next() method is called on a freshly minted Iter object, it will return the first element
	 * in the Iter object. If you wish to proceed on the assumption that the iterations will start from the first 
	 * element, 'initialise' the iter with the first() call. The decision to define the Iter object this way is
	 * consistent with the ES6 implementation of iterators, and it is also true for other languages. 
	 */
	var Iter = (function() {

	    /**
	     * @constructor
	     * @description  Create and initialise new Iter object
	     * @param {object} collection Object/collection that contains 'primitives' - does not nest other objects
	     */
	    function Iter(collection) {
	            this.collection = collection;
	            this.index = 0;
	            this.current = 0;
	            this.currKey;
	            this.currVal;
	    }

	    Iter.prototype = {

	        /**
	         * @memberOf  Iter
	         * @instance
	         * @method  first
	         * @description  Get first element of the current Iter.
	         * @return {*} The first element of the current Iter
	         */
	        first: function() {
	            this.reset();
	            return this.next();
	        },

	        /**
	         * @memberOf  Iter
	         * @instance
	         * @method  next
	         * @description  Get the next element in the collection as an array containing the key and value.
	         * @return {array} An array containing the key and value of the next element, or undefined
	         */
	        next: function() {
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
	        },
	        
	        /**
	         * @memberOf  Iter
	         * @instance
	         * @method  hasNext
	         * @description  Check whether the Iter has a next element.
	         * @return {boolean} True if the Iter has a next element, false otherwise
	         */
	        hasNext: function() {
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
	        },

	        /**
	         * @memberOf  Iter
	         * @instance
	         * @method  reset
	         * @description  Reset the references used to traverse the Iter.
	         */
	        reset: function() {
	            this.index = 0;
	            this.current = 0;
	        }, 

	        /**
	         * @memberOf  Iter
	         * @instance
	         * @method  each
	         * @description  Iterate over all elements of the Iterator and execute a callback function for each.
	         * @param  {function} callbackFunc A callback function to execute against each element of the Iter
	         */
	        each: function(callbackFunc) {
	            var elem;
	            for(elem = this.first(); this.hasNext(); elem = this.next()) {
	                callbackFunc(elem);
	            }
	            callbackFunc(elem); // execute the callback function against the last element of the collection
	        }

	    };

	    return Iter;
	    
	}());

	/**
	 * @class 
	 * A JSDS Dictionary is a pseudoclassical JavaScript OO implementation of the dictionary data structure.
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
	 * so this implementation isn't strictly necessary. If you choose to
	 * use this implementation, note that it depends on the Iter.js class 
	 * to work. You may wish to use requirejs to manage module loading in
	 * your application and handle the relationship that way. But the 
	 * simplest way to use the Dictionary class is to make sure to include 
	 * the Iter.js script in the html before the Dictionary.js script.
	 */
	var Dictionary = (function() {

	    /**
	     * @constructor
	     * @description  Create and initialise new Dictionary object
	     */
	    function Dictionary() {
	        // Objects have prototypes so there are 'default' keys
	        // Since ES5, this problem can be mitigated by using Object.create(null)
	        // See MDN on Maps at: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map
	        this.table = Object.create(null);    
	    }

	    Dictionary.prototype = {

	        /**
	         * @memberOf  Dictionary
	         * @instance
	         * @method  put
	         * @description  Add (put) an entry to the dictionary.
	         * @param {String} key a string representing the key for the given entry
	         * @param {*} val any value representing the value for the given entry
	         * @return {number} 1 if successful, -1 if unsuccessful
	         */
	        put: function(key, val) {
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
	        },

	        /**
	         * @memberOf  Dictionary
	         * @instance
	         * @method  get
	         * @description  Get the value associated with the given key in the dictionary.
	         * @param  {String} key The key to the associated value in the dictionary
	         * @return {*} The value associated with the given key or undefined if the key is not in the dictionary
	         */
	        get: function(key) {
	            return this.table[key];
	        },

	        /**
	         * @memberOf  Dictionary
	         * @instance
	         * @method  remove
	         * @description  Remove the entry corresponding to the given key.
	         * @param  {string} key The key that identifies the entry to be removed from the dictionary
	         * @return {number} 1 if the operation was successful, -1 otherwise
	         */
	        remove: function(key) {
	            if(key in this.table)
	            {
	                delete this.table[key];
	                return 1;
	            }
	            else {
	                return -1;
	            }
	        }, 

	        /**
	         * @memberOf  Dictionary
	         * @instance
	         * @method  getKeys
	         * @description  Get an iterable (array) of all keys stored in the dictionary.
	         * @return {array} Array of dictionary keys or an empty array
	         */
	        getKeys: function() {
	            return Object.keys(this.table);
	        }, 

	        /**
	         * @memberOf  Dictionary
	         * @instance
	         * @method  getValues
	         * @description  Get an iterable (array) of all values stored in the dictionary.
	         * @return {array} Array of dictionary values
	         */
	        getValues: function() {
	            // Object.values' specification is not stablised and may not work in certain versions of Chrome
	            // and other browsers see: 
	            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values#Browser_compatibility
	            var keys = Object.keys(this.table);
	            var outArr = [];
	            for(key in this.table) {
	                outArr.push(this.table[key]);
	            }
	            return outArr;
	        }, 

	        /**
	         * @memberOf  Dictionary
	         * @instance
	         * @method  getEntries
	         * @description  Get an iterator of all entries in the dictionary.
	         * @return {Iter} A new iterator on the current dictionary
	         */
	        getEntries: function() {
	            return new Iter(this.table) || undefined;
	        }, 

	        /**
	         * @memberOf  Dictionary
	         * @instance
	         * @method  getSize
	         * @description  Get the dictionary size (number of entries).
	         * @return {number} The number of entries in the dictionary
	         */
	        getSize: function() {
	            return Object.keys(this.table).length;
	        }, 

	        /**
	         * @memberOf  Dictionary
	         * @instance
	         * @method  isEmpty
	         * @description  Check whether dictionary is empty or not.
	         * @return {boolean} True if dictionary is empty, false otherwise
	         */
	        isEmpty: function() {
	            if(Object.keys(this.table).length === 0){
	                return true;
	            }
	            else {
	                return false;
	            }
	        },

	        /**
	         * @memberOf  Iter
	         * @instance 
	         * @method  clear
	         * @description  Clear or empty the dictionary.
	         */
	        clear: function() {
	            var keys = Object.keys(this.table);
	            var key;
	            for(key in keys) {
	                delete this.table[keys[key]];
	            }
	        },

	        /**
	         * @memberOf  Dictionary
	         * @instance
	         * @method  toString
	         * @description  Get a key-sorted string representation of the dictionary.
	         * @return {string} A key-sorted string representation of the dictionary
	         */
	        toString: function() {
	            var outStr = "";
	            var key;
	            var keys = Object.keys(this.table).sort();
	            for(key in keys) {
	                outStr += keys[key] + ": " + this.table[keys[key]] + ", ";
	            }
	            return outStr.slice(0, -2); // trim the last comma and space and return to caller
	        }

	        /** Auxiliary Functions  */

	    };

	    return Dictionary;

	}());

	/**
	 * @class
	 * A JSDS List is a pseudoclassical JavaScript OO implementation of the list data structure.
	 * A <em>List</em> is an ordered collection of data elements. A List <em>ADT</em> includes 
	 * the following operations: 
	 * <ul>
	 * <li><em>append</em> 		- to add new elements to the end of a list;</li>
	 * <li><em>back</em> 		- to move to the back of the list;</li>
	 * <li><em>clear</em> 		- to remove the list elements en masse;</li>
	 * <li><em>contains</em> 	- to determine whether the list contains a given element;</li>
	 * <li><em>currPos</em> 	- to get the current position in the list;</li>
	 * <li><em>front</em> 		- to move to the front of the list;</li>
	 * <li><em>getCurrent</em> 	- to get the current element in the list;</li>
	 * <li><em>insert</em> 		- to insert elements into the list after an existing element or at the beginning of the list;</li>
	 * <li><em>isEmpty</em> 	- to check whether the list contains any elements;</li>
	 * <li><em>length</em> 		- to get the number of elements in the list;</li>
	 * <li><em>moveTo</em> 		- to move to any arbitrary location in the list;</li>
	 * <li><em>next</em> 		- to traverse the list from left to right;</li>
	 * <li><em>prev</em> 		- to move to the previous element in the list;</li>
	 * <li><em>remove</em> 		- to remove a given element from the list;</li>
	 * <li><em>toString</em> 	- to get a string representation of the list;</li>
	 * </ul>
	 */
	var List = (function () {

		/**
		 * @constructor
		 * @description  Create and initialise new List object
		 */
		function List() {
			this.pos = 0; 				// position
			this.size = 0;				// number of elements in list
			this.datastore = [];		// underlying data structure

		}

		List.prototype = {

			/**
			 * @memberOf  List
			 * @instance
			 * @method  append
			 * @description  Append an element to the list.
			 * @param  {*} element Element to be appended
			 */
			append: function(element) {
				this.datastore[this.size++] = element;
			}, 

			/**
			 * @memberOf  List
			 * @instance
			 * @method  back
			 * @description  Set the position to facilitate traversal from the back of the list.
			 */
			back: function() {
				this.pos = this.size-1;
			}, 

			/**
			 * @memberOf  List
			 * @instance
			 * @method  clear
			 * @description  Remove all elements from the list.
			 */
			clear: function() {
				delete this.datastore;
				this.datastore = [];
				this.size = this.pos = 0;
			}, 

			/**
			 * @memberOf  List
			 * @instance
			 * @method  contains
			 * @description  Determine whether or not a list contains a given element. 
			 * @param  {*} element The given element of interest
			 * @return {boolean}  True if the list contains the element, false otherwise
			 */
			contains: function(element) {
				for(var i = 0; i < this.datastore.length; ++i) {
						if(this.datastore[i] == element) {
							return true;
						}
					}
				return false;
			},

			/**
			 * @memberOf  List
			 * @instance
			 * @method  currPos
			 * @description  Get the current position in the list.
			 * @return {number} The index of the current position in the list
			 */
			currPos: function() {
				return this.pos;
			}, 

			/**
			 * @memberOf  List
			 * @instance
			 * @method  find
			 * @description  Find the given element in the list.
			 * @param  {*} element The element to be found
			 * @return {number}  The index of the given element or -1 if element not found
			 */
			find: function(element) {
				for(var i = 0; i < this.datastore.length; ++i) {
						if(this.datastore[i] == element) {
							return i;
						}
					}
					return -1;
			},

			/**
			 * @memberOf  List
			 * @instance
			 * @method  front
			 * @description  Set the position to facilitate traversal from the front of the list.
			 */
			front: function() {
				this.pos = 0;
			}, 

			/**
			 * @memberOf  List
			 * @instance
			 * @method  getCurrent
			 * @description  Get the current element of the list.
			 * @return {*} The current element of the list
			 */
			getCurrent: function() {
				return this.datastore[this.pos];
			}, 

			/**
			 * @memberOf  List
			 * @instance
			 * @method  insert
			 * @description  Insert an element in the list.
			 * @param  {*} element The element to be inserted
			 * @param  {*} after The element after which the given element will be inserted
			 */
			insert: function(element, after) {
				var inPos = this.find(after);
				if (inPos > -1) {
					this.datastore.splice(inPos+1, 0, element);
					++this.size;
					return true;
				}
				return false;
			}, 

			/**
			 * @memberOf  List
			 * @instance
			 * @method  isEmpty
			 * @description  Determine whether or not the list is empty.
			 * @return {boolean} True if empty, false if not
			 */
			isEmpty: function() {
				return (this.datastore.length === 0);

			},

			/**
			 * @memberOf  List
			 * @instance
			 * @method  length
			 * @description  Get the number of elements in the list.
			 * @return {number} The number (integer) of elements in the list
			 */
			length: function() {
				return this.size;
			},

			/**
			 * @memberOf  List
			 * @instance
			 * @method  moveTo
			 * @description  Move to the given position in the list.
			 * @param  {number} position The index associated with the new position in the list
			 */
			moveTo: function(position) {
				if(typeof(position) === "number" && !(position >= this.datastore.length)) {
						this.pos = position;
						return 1;
					}
					return -1;
			},

			/**
			 * @memberOf  List
			 * @instance
			 * @method  next
			 * @description  Move the current position to the next element.
			 * @return {*} The next element
			 */
			next: function() {
				if(this.pos < this.size-1) {
						return this.datastore[++this.pos];
					}
					return -1;
			},

			/**
			 * @memberOf  List
			 * @instance
			 * @method  prev
			 * @description  Move the current position to the previous element.
			 * @return {*} The previous element or -1 if there is no previous element
			 */
			prev: function() {
				if(this.pos > 0) {
						return this.datastore[--this.pos];
					}
			},

			/**
			 * @memberOf  List
			 * @instance
			 * @method  remove
			 * @description  Remove a given element from the list.
			 * @param  {*} element Element to be removed
			 * @return {boolean} True if the item is found and removed, false otherwise
			 */
			remove: function(element) {
				var foundAt = this.find(element);
					if(foundAt > -1) {
						this.datastore.splice(foundAt, 1);
						--this.size;
						return true;
					}
					return false;
			},

				/**
				 * @memberOf  List
				 * @instance
				 * @method  toString
				 * @description  Get a string representation of the list.
			     * @return {string} Return string representation of the list (using Object.prototype.toString())
				 */
				toString: function() {
					return this.datastore.toString();
				}
		};

		return List;

	}());

	/** Return the JSDS library module's public API **/
	return {
		Dictionary: Dictionary,
		Iter: Iter,
		List: List,
		Queue: Queue,
		Set: Set,
		Stack: Stack, 
		extends: __extends
	}

})();
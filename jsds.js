// 'use strict';
/** 
  * @file Simple JavaScript data structures library implemented in a broadly 
  * pseudoclassical Object-Oriented style.
  * @author Leonard M Reidy
  * @copyright 2016
  * @version 0.1.0
  * @license {@link https://github.com/leonardreidy/js-ds#license-mit|MIT}
  * @see {@link https://github.com/leonardreidy/js-ds}
  * @module JSDS 
  */
var JSDS = (function() {

	/**\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\**/
	/** 									Helper functions 									 **/
	/**\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\**/

	
	// The following private function is present to support pseudoclassical inheritance 
	// The __extends function is how MS TypeScript (1.x) transpiles
	// the Typescript extends keyword into common or garden variety JavaScript 
	// and represents a best practice in pseudoclassical JavaScript inheritance
	// Access to this method is made available on the public API of the JSDS module
	// with the slightly less verbose function name: extends
	
	/** @function __extends
	  * @ignore
	  */
	var __extends = (this && this.__extends) || function (d, b) {

	    for (var p in b) {
	    	if (b.hasOwnProperty(p)) d[p] = b[p];
	    }

	    function __() { 
	    	this.constructor = d; 
	    }

	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};

	/**\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\**/
	/** 									Error Handling										 **/
	/**\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\**/

	// Custom error handling class  
	// Extending JS built-ins is complicated and there seems to be a lack of general consensus
	// about how to handle custom error handling classes. The __extends function doesn't play 
	// well with the Error built-in in all environments, so I have avoided using it for this.
	// This class is very basic and serves to expose the error.stack property to the library, if it is
	// available. 
	var JSDSError = (function(){

		function JSDSError(msg) { 
			this.message = msg;
			this.name = 'JSDSError';
			var err = new Error(msg);
			// If the error stack property is supported, set the corresponding stack property
			// of the JSDSError object
			// For more on the stack property: 
			// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Error/stack
			if(err.stack) {
				this.stack = err.stack;
			}
		}

		JSDSError.prototype = Object.create(Error.prototype);
		JSDSError.prototype.constructor = JSDSError;

		return JSDSError;
	})();

	// Some shared Error types for the library at large
	var NoArgsError = new JSDSError("NoArgsError: no arguments given - this method expects one or more arguments");
	var InsufficientArgsError = new JSDSError("InsufficientArgsError: this method expects two or more arguments");
	var ArgTypeError = new JSDSError("ArgTypeError: ");


	/**\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\**/
	/** 									Library Classes										 **/
	/**\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\**/


	// Dictionary Class as IIFE
	var Dictionary = (function() {

		// Dictionary Specific errors 
		var InvalidKeyError = new JSDSError("InvalidKeyError: key must be a string");
		var EmptyStringError = new JSDSError("EmptyStringError: the key cannot be an empty string");

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
	    	var keys;
	    	var key;
	    	try {
	    		keys = Object.keys(this.table);
	    		for(key in keys) {
	    		    delete this.table[keys[key]];
	    		}
	    	}
	    	catch(e) {
	    		console.error("Possible browser compatibility error: Your browser may not support Object.keys() => " + e);
	    	} 
	    };

	    /**
	     * @description Get the value associated with the given key in the dictionary.
	     * @param {string} key The key to the associated value in the dictionary
	     * @return {*} The value associated with the given key or undefined if the key is not in the dictionary
	     */
	    Dictionary.prototype.get = function(key) {
	    	try {
	    		if(arguments.length === 0) {
	    			throw NoArgsError;
	    		}
	    		else if(typeof key != "string") {
	    			throw InvalidKeyError;
	    		}
	    		else if(key === ""){
	    			throw EmptyStringError;
	    		}
	    		else {
	    			return this.table[key];
	    		}
	    	}
	    	catch(e) {
	    		console.error(e);
	    	}
	        
	    };

	    /**
	     * @description Get an iterator of all entries in the dictionary.
	     * @return {Iter} A new iterator on the current dictionary
	     */
	    Dictionary.prototype.getEntries = function() {
	    	try {
	    		return new Iter(this.table) || undefined;
	    	}
	    	catch(e) {
	    		console.error(e);
	    	}
	    };

	    /**
	     * @description Get an iterable (array) of all keys stored in the dictionary.
	     * @return {array} Array of dictionary keys or an empty array
	     */
	    Dictionary.prototype.getKeys = function() {
	    	try {
	    		return Object.keys(this.table);
	    	}
	    	catch(e) {
	    		console.error("Possible browser compatibility error: Your browser may not support Object.keys() => " + e);
	    	} 
	    };

	    /**
	     * @description Get the dictionary size (number of entries).
	     * @return {number} The number of entries in the dictionary
	     */
	    Dictionary.prototype.getLength = function() {
	    	try {
	    		return Object.keys(this.table).length;
	    	}
	    	catch(e) {
	    		console.error("Possible browser compatibility error: Your browser may not support Object.keys() => " + e);
	    	}  
	    };

	    /**
	     * @description Get an iterable (array) of all values stored in the dictionary.
	     * @return {array} Array of dictionary values
	     */
	    Dictionary.prototype.getValues = function() {
	    	var keys;
	    	var outArr = [];
	        try {
	        	keys = Object.keys(this.table);
	        	for(key in this.table) {
	        	    outArr.push(this.table[key]);
	        	}
	        	return outArr;
	        }
	        catch(e) {
	        	console.error("Possible browser compatibility error: Your browser may not support Object.keys() => " + e);
	        }
	    };

	    /**
	     * @description Check whether dictionary is empty or not.
	     * @return {boolean} True if dictionary is empty, false otherwise
	     */
	    Dictionary.prototype.isEmpty = function() {
	    	try {
	    		if(Object.keys(this.table).length === 0){
	    		    return true;
	    		}
	    		else {
	    		    return false;
	    		}
	    	}
	    	catch(e) {
	    		console.error("Possible browser compatibility error: Your browser may not support Object.keys() => " + e);
	    	}
	    };

	    /**
	     * @description Add (put) an entry to the dictionary.
	     * @param {string} key a string representing the key for the given entry
	     * @param {*} val any value representing the value for the given entry
	     * @return {number} 1 if successful, -1 if unsuccessful
	     */
	    Dictionary.prototype.put = function(key, val) {
	   		try{
   				if(arguments.length === 0) {
   					throw NoArgsError;
   				}
   				else if(arguments.length === 1) {
   					throw InsufficientArgsError;
   				}
   				else if(typeof key != "string") {
   					throw InvalidKeyError;
   				}
   				else if(key === ""){
   					throw EmptyStringError;
   				}
   				else if (typeof val === undefined) {
   					throw UndefinedValError;
   				}
   				// If the key is unique
   			    // add the entry to the dictionary and return 1 for success
   			    if(!(key in this.table)) {
   			        this.table[key] = val;
   			        return 1;
   			    // else return -1 to signify that the operation was unsuccessful
   			    } else {
   			        return -1;
   			    }
	   		}
	   		catch(e) {
	   			console.error(e);
	   		}
	    	
	    };
	    	
	    /**
	     * @description Remove the entry corresponding to the given key.
	     * @param {string} key The key that identifies the entry to be removed from the dictionary
	     * @return {number} 1 if the operation was successful, -1 otherwise
	     */
	    Dictionary.prototype.remove = function(key) {
	    	try {
	    		if(arguments.length === 0) {
	    			throw NoArgsError;
	    		}
	    		else if(typeof key != "string") {
	    			throw InvalidKeyError;
	    		}
	    		else if(key === ""){
	    			throw EmptyStringError;
	    		}
	    		else {
	    			if(key in this.table)
	    			{
	    			    delete this.table[key];
	    			    return 1;
	    			}
	    			else {
	    			    return -1;
	    			}
	    		}

	    	}
	    	catch(e) {
	    		console.error(e);
	    	}
	    };

	    /**
	     * @description Get a key-sorted string representation of the dictionary.
	     * @return {string} A key-sorted string representation of the dictionary
	     */
	    Dictionary.prototype.toString = function() {
	        var outStr = "";
	        var key;
	        var keys;
	        try {
	        	keys = Object.keys(this.table).sort();
	        	for(key in keys) {
	        	    outStr += keys[key] + ": " + this.table[keys[key]] + ", ";
	        	}
	        	return outStr.slice(0, -2); // trim the last comma and space and return to caller
	        }
	        catch(e) {
	        	console.error("Possible browser compatibility error: Your browser may not support Object.keys() => " + e);
	        }
	        
	    };

	    return Dictionary;

	})();

	// Iter class as IIFE
	var Iter = (function() {

	    /**
	     * @classdesc The JSDS Iter is a helper class to provide iterator support to JSDS data structures.
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
	     * @constructs Iter
	     * @param {object} collection Object/collection that contains 'primitives' - does not nest other objects
	     * @memberof module:JSDS
	     */
	    function Iter(collection) {
            this.collection = collection;
            this.index = 0;
            this.current = 0;
            this.currKey;
            this.currVal;
	    }

        /**
         * @description  Get first element of the current Iter.
         * @return {*} The first element of the current Iter
         */
        Iter.prototype.first = function() {
        	try {
        		this.reset();
        		return this.next();
        	}
            catch(e) {
            	console.error(e);
            }
        };

        /**
         * @description Get the next element in the collection as an array containing the key and value.
         * @return {array} An array containing the key and value of the next element, or undefined
         */
        Iter.prototype.next = function() {
            var keys;
            try {
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
            }
            catch(e) {
            	console.error("Possible browser compatibility error: Your browser may not support Object.keys() => " + e);
            }
            
        };
        
        /**
         * @description  Check whether the Iter has a next element.
         * @return {boolean} True if the Iter has a next element, false otherwise
         */
        Iter.prototype.hasNext = function() {
        	try {
        		// If the current collection is a string or an array, return true or false if the index is less than 
        		// the length of the collection
        		if(typeof this.collection === 'string' || 
        		    Object.prototype.toString.call(this.collection) === '[object Array]') {
        		    return this.index < this.collection.length;
        		}
        		// else return true or false if the index is less than the length of the array of the collection's keys
        		else {
        		    return this.current < Object.keys(this.collection).length;
        		} 
        	}
        	catch(e) {
        		console.error("Possible browser compatibility error: Your browser may not support Object.keys() => " + e);
        	}
             
        };

        /**
         * @description Reset the references used to traverse the Iter.
         */
        Iter.prototype.reset = function() {
        	try {
        		this.index = 0;
        		this.current = 0;
        	}
        	catch(e) {
        		console.error(e);
        	}
        };

        /**
         * @description Iterate over all elements of the Iterator and execute a callback function for each.
         * @param  {function} callbackFunc A callback function to execute against each element of the Iter
         */
        Iter.prototype.each = function(callbackFunc) {
        	try {
        		if(arguments.length === 0) {
        			throw NoArgsError;
        		}
        		var elem;
        		for(elem = this.first(); this.hasNext(); elem = this.next()) {
        		    callbackFunc(elem);
        		}
        		callbackFunc(elem); // execute the callback function against the last element of the collection
        	}
        	catch(e) {
        		console.error(e);
        	}
            
	    };

	    return Iter;
	    
	})();

	// List as IIFE
	var List = (function () {

		/**
		 * @classdesc A JSDS List is a pseudoclassical JavaScript OO implementation of the list data structure.
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
		 * @constructs List
		 * @memberof module:JSDS
		 */
		function List() {
			this.pos = 0; 			// position
			this.size = 0;			// number of elements in list
			this.datastore = [];	// underlying data structure

		}

			/**
			 * @description Append an element to the list.
			 * @param {*} element Element to be appended
			 */
			List.prototype.append = function(element) {
				try {
					if(arguments.length === 0) {
						throw NoArgsError;
					}
					this.datastore[this.size++] = element;
				}
				catch(e) {
					console.error(e);
				}
				
			};

			/**
			 * @description Set the position to facilitate traversal from the back of the list.
			 */
			List.prototype.back = function() {
				try {
					this.pos = this.size-1;
				}
				catch(e) {
					console.error(e);
				}
			};

			/**
			 * @description Remove all elements from the list.
			 */
			List.prototype.clear = function() {
				try {
					delete this.datastore;
					this.datastore = [];
					this.size = this.pos = 0;
		
				}
				catch(e) {
					console.error(e);
				}
			};

			/**
			 * @description Determine whether or not a list contains a given element. 
			 * @param {*} element The given element of interest
			 * @return {boolean}  True if the list contains the element, false otherwise
			 */
			List.prototype.contains = function(element) {
				try {
					if(arguments.length === 0) {
						throw NoArgsError;
					}
					for(var i = 0; i < this.datastore.length; ++i) {
							if(this.datastore[i] == element) {
								return true;
							}
						}
					return false;
				}
				catch(e) {
					console.error(e);
				}
				
			};

			/**
			 * @description Get the current position in the list.
			 * @return {number} The index of the current position in the list
			 */
			List.prototype.currPos = function() {
				try {
					return this.pos;
				}
				catch(e) {
					console.error(e);
				}
				
			};

			/**
			 * @description Find the given element in the list.
			 * @param {*} element The element to be found
			 * @return {number}  The index of the given element or -1 if element not found
			 */
			List.prototype.find = function(element) {
				try {
					if(arguments.length === 0) {
						throw NoArgsError;
					}
					for(var i = 0; i < this.datastore.length; ++i) {
							if(this.datastore[i] == element) {
								return i;
							}
						}
					return -1;
				}
				catch(e) {
					console.error(e);
				}
			};

			/**
			 * @description Set the position to facilitate traversal from the front of the list.
			 */
			List.prototype.front = function() {
				try {
					this.pos = 0;
				}
				catch(e) {
					console.error(e);
				}
				
			}; 

			/**
			 * @description Get the current element of the list.
			 * @return {*} The current element of the list
			 */
			List.prototype.getCurrent = function() {
				try {
					return this.datastore[this.pos];
				}
				catch(e) {
					console.error(e);
				}
				
			}; 

			/**
			 * @description Insert an element in the list.
			 * @param {*} element The element to be inserted
			 * @param {*} after The element after which the given element will be inserted
			 */
			List.prototype.insert = function(element, after) {
				try{
					if(arguments.length === 0) {
						throw NoArgsError;
					}
					else if (arguments.length === 1) {
						throw InsufficientArgsError; 
					}
					var inPos = this.find(after);
					if (inPos > -1) {
						this.datastore.splice(inPos+1, 0, element);
						++this.size;
						return true;
					}
					return false;
				}
				catch(e) {
					console.error(e);
				}
			}; 

			/**
			 * @description Determine whether or not the list is empty.
			 * @return {boolean} True if empty, false if not
			 */
			List.prototype.isEmpty = function() {
				try {
					return (this.datastore.length === 0);
				}
				catch(e) {
					console.error(e);
				}
				

			};

			/**
			 * @description Get the number of elements in the list.
			 * @return {number} The number (integer) of elements in the list
			 */
			List.prototype.length = function() {
				try {
					return this.size;	
				}
				catch(e) {
					console.error(e);
				}
				
			};

			/**
			 * @description Move to the given position in the list.
			 * @param {number} position The index associated with the new position in the list
			 */
			List.prototype.moveTo = function(position) {
				try {
					if(arguments.length === 0){
						throw NoArgsError;
					}
					else if (typeof position != "number") {
						throw ArgTypeError;
					}
					if(!(position >= this.datastore.length)) {
							this.pos = position;
							return 1;
						}
					return -1;
				}
				catch(e) {
					console.error(e + " moveTo() expects a single argument of type number");
				}
				
			};

			/**
			 * @description Move the current position to the next element.
			 * @return {*} The next element
			 */
			List.prototype.next = function() {
				try {
					if(this.pos < this.size-1) {
							return this.datastore[++this.pos];
						}
					return -1;
				}
				catch(e) {
					console.error(e);
				}
				
			};

			/**
			 * @description Move the current position to the previous element.
			 * @return {*} The previous element or -1 if there is no previous element
			 */
			List.prototype.prev = function() {
				try {
					if(this.pos > 0) {
						return this.datastore[--this.pos];
					}
				}
				catch(e) {
					console.error(e);
				}
				
			};

			/**
			 * @description Remove a given element from the list.
			 * @param {*} element Element to be removed
			 * @return {boolean} True if the item is found and removed, false otherwise
			 */
			List.prototype.remove = function(element) {
				try {
					if(arguments.length === 0) {
						throw NoArgsError;
					}
					var foundAt = this.find(element);
						if(foundAt > -1) {
							this.datastore.splice(foundAt, 1);
							--this.size;
							return true;
						}
					return false;
				}
				catch(e) {
					console.error(e);
				}
			};

			/**
			 * @description Get a string representation of the list.
		     * @return {string} Return string representation of the list (using Object.prototype.toString())
			 */
			List.prototype.toString = function() {
				try {
					return this.datastore.toString();
				}
				catch(e) {
					console.log(e);
				}
				
			};
		
		return List;

	})();

	// Queue as IIFE
	var Queue = (function () {

		/**
		 * @classdesc A JSDS queue is a pseudoclassical JavaScript OO implementation of the queue data structure.
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
		 * @constructs Queue
		 * @memberof module:JSDS
		 */
	    function Queue() {
	    	// delare and/or initialise queue and offset
	        this.queue = []; // underlying data structure
	        this.offset = 0;
	    }

        /**
         * @description Get the length of the queue.
         * @return {number} Return the length/number of elements in the queue
         */
        Queue.prototype.getLength = function () {
        	try {
        		return (this.queue.length - this.offset);
        	}
        	catch(e) {
        		console.error(e);
        	}
            
        };

        /**
         * @description Determine whether the queue is empty or not.
         * @return {boolean} Return true if queue is empty, false if not
         */
        Queue.prototype.isEmpty = function () {
        	try {
        		return (this.queue.length === 0);
        	}
        	catch(e) {
        		console.error(e);
        	} 
        };

        /**
         * @description Add an element to the back of the queue.
         * @param {*} element Any data type
         */
        Queue.prototype.enqueue = function (element) {
        	try {
        		if(arguments.length === 0) {
        			throw NoArgsError;
        		}
        		this.queue.push(element);
        	}
        	catch(e) {
        		console.error(e);
        	}
            
        };

        /**
         * @description Remove an element from the front of the queue.
         * @return {*} Return the dequeued element, or -1 if the queue is empty
         */
        Queue.prototype.dequeue = function () {
        	try {
        		if (this.queue.length === 0) {
        		    return undefined;
        		}
        		//var element = this.queue.shift();
        		return this.queue.shift;
        	}
        	catch(e) {
        		console.error(e);
        	}
            
        };

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
         * @description Clear the queue. 
         */
        Queue.prototype.clear = function() {
        	try {
        		delete this.queue;
        		this.queue = [];
        	}
        	catch(e) {
        		console.error(e);
        	}
        };

        /**
         * @description Get the element at the front of the queue without dequeueing it.
         * @return {*} Return the element at the front of the queue, or undefined if the queue is empty
         */
        Queue.prototype.front = function () {
        	try {
        		return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
        	}
        	catch(e) {
        		console.error(e);
        	}
        };

        /**
         * @description Get the element at the back of the queue without dequeueing it.
         * @return {*} Return the element at the back of the queue, or undefined if the queue is empty
         */
        Queue.prototype.back = function() {
        	try {
        		return(this.queue.length > 0 ? this.queue[this.queue.length-1] : undefined);
        	}
        	catch(e) {
        		console.error(e);
        	} 
        }; 

        /**
         * @description Get a string representation of the queue.
         * @return {string} Return string representation of the queue (using Object.prototype.toString())
         */
        Queue.prototype.toString = function() {
        	try {
        		return this.queue.toString();
        	}
        	catch(e) {
        		console.error(e);
        	}  
        };

	    return Queue;
	    
	})();

	// Set as IIFE
	// var Set = (function() {

	//     /**
	//      * @classdesc A JSDS Set is a pseudoclassical JavaScript OO implementation of the set data structure
	//      * A <em>Set</em> is an unordered collection of unique elements. A set
	//      * with no elements is called the empty or null set. The universe is the set of all 
	//      * elements of interest (otherwise known as the universal set). Any two sets
	//      * are equal if and only if they contain precisely the same members. A set A 
	//      * is a subset of some set B if all of the members of A are also members of B. 
	//      * The basic operations on a set include union, intersection, and difference. 
	//      * The <em>union</em> of two sets A and B is the set of all elements which belong to A 
	//      * or B, or both. The <em>intersection</em> of two sets A and B is the set of elements 
	//      * which belong to both A and B. The <em>difference</em> (symmetric difference) of two 
	//      * sets A and B includes those elements which belong to A or B but not to both.
	//      * A set <em>ADT</em> includes the following operations:
	//      * <ul>
	//      * <li><em>insert</em>       - insert a new data element;</li>
	//      * <li><em>remove</em>       - remove an existing data element;</li>
	//      * <li><em>getLength</em>    - get the number of elements in the set;</li>
	//      * <li><em>union</em>        - get the union of two sets;</li>
	//      * <li><em>intersection</em> - get the intersection of two sets;</li>
	//      * <li><em>subset</em>       - check to see if a given set is a subset of the set;</li>
	//      * <li><em>difference</em>   - get the difference of two sets;</li>
	//      * <li><em>symmetric difference</em> - get the symmetric difference of two sets;</li>
	//      * <li><em>toString</em>     - get a string representation of the set;</li>
	//      * </ul>
	//      * <br/>
	//      * @constructs Set
	//      * @memberof module:JSDS
	//      */
	//     function Set() {
	//         // underlying data structure
	//         this.datastore = [];
	//     }

 //        /**
 //         * @description Insert a new element into the set.
 //         * @param {*} data Any value to be stored as data
 //         * @return {boolean} True if successful, false if not
 //         */
 //        Set.prototype.insert = function(data) {
 //            // Check to ensure new element is unique
 //            if(this.datastore.indexOf(data) < 0) {
 //                this.datastore.push(data);
 //                return true;
 //            }
 //            else {
 //                return false;
 //            }
 //        }; 

 //        /**
 //         * @description Remove an element from the set.
 //         * @param {*} data Element to be removed from the set.
 //         * @return {Boolean}  True if successful, false if not.
 //         */
 //        Set.prototype.remove = function(data) {
 //            var position = this.datastore.indexOf(data);
 //            if(position > -1) {
 //                this.datastore.splice(position, 1);
 //                return true;
 //            }
 //            else {
 //                return false;
 //            }
 //        }; 

 //        /**
 //         * @description Checks whether set contains the given element.
 //         * @param {*} data  Any given data element
 //         * @return {Boolean}  True if the set contains the element, false otherwise.
 //         */
 //        Set.prototype.contains = function(data) {
 //            if(this.datastore.indexOf(data) > -1) {
 //                return true;
 //            }
 //            else {
 //                return false;
 //            }
 //        }; 

 //        *
 //         * @description Get a string representation of the set.
 //         * @return {string} A string representation of the set.
         
 //        Set.prototype.toString = function() {
 //            return Array.prototype.toString.call(this.datastore);
 //        }; 

 //        /**
 //         * @description Get the union of the given set and this set.
 //         * @param {Set} set An object of type Set
 //         * @return {Set}  An object of type Set or undefined
 //         */
 //        Set.prototype.union = function(set) {
 //            var temp = new Set(); 
 //            var i;
 //            if(set instanceof Set) {
 //                for(i = 0; i < this.datastore.length; i++) {
 //                    temp.insert(this.datastore[i]);
 //                }
 //                for(i = 0; i < set.datastore.length; i++) {
 //                    if(!(temp.contains(set.datastore[i]))) {
 //                        temp.datastore.push(set.datastore[i]);
 //                    }
 //                }
 //            } else {
 //                temp = undefined;
 //            }
 //            return temp;
 //        };

 //        /**
 //         * @description Get the intersection of this set and the given set.
 //         * @param {Set} set Any given object of type Set
 //         * @return {Set} A new Set object 
 //         */
 //        Set.prototype.intersection = function(set) {
 //            var temp = new Set();
 //            var i;
 //            if( set instanceof Set) {
 //                for(i = 0; i < this.datastore.length; i++) {
 //                    if(set.contains(this.datastore[i])) {
 //                        temp.insert(this.datastore[i]);
 //                    }
 //                }
 //            }
 //            else {
 //                temp = undefined;
 //            }
 //            return temp;
 //        };

 //        /**
 //         * @description  Get the length of this set.
 //         * @return {Number} The number of elements in this set.
 //         */
 //        Set.prototype.getLength = function() {
 //            return this.datastore.length;
 //        };

 //        /**
 //         * @description Determine whether the given set is a subset of this set.
 //         * @param {Set} set A set to be assessed against the subset criterion
 //         * @return {Boolean}  True if the given set is a subset of this, false otherwise
 //         */
 //        Set.prototype.subset = function(set) {
 //            if(this.getLength() > set.getLength()) {
 //                return false;
 //            }
 //            else {
 //                for (member in this.datastore) {
 //                    if(!set.contains(member)) {
 //                        return false;
 //                    }
 //                }
 //            }
 //            return true;
 //        };

 //        /**
 //         * @description Get the difference of this set and the given set
 //         * @param {Set} set Any given set
 //         * @return {Set} The set containing the difference of this set and the given set
 //         */
 //        Set.prototype.difference = function(set) {
 //            var temp = new Set();
 //            for(var i = 0; i < this.datastore.length; i++) {
 //                if(!(set.contains(this.datastore[i]))) {
 //                    temp.insert(this.datastore[i]);
 //                }
 //            }
 //            return temp;
 //        };

 //        /**
 //         * @description Get the relative complement with respect to this set and the given set
 //         * @param {Set} set Any given set
 //         * @return {Set} The set containing the relative complement of this set and the given set
 //         */
 //        Set.prototype.symmetricDifference = function(set) {
 //            // [TODO] Implement symmetric difference instance method
 //            return "TODO";
 //        };

 //    	return Set;
	    
	// }());

	// Stack as IIFE
	var Stack = (function() {

		/**
		 * @classdesc A JSDS Stack is a pseudoclassical JavaScript OO implementation of the stack data structure
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
		 * @constructs Stack
		 * @memberof module:JSDS
		 */
		function Stack() {	
			this.datastore = []; 	// The underlying data structure
			this.top = 0;			// The top of the stack
		}

			/**
			 * @description Push new element onto stack. When the caller pushes a new element 
			 * onto the stack it is stored in the top position identified by the top 
			 * variable and the latter is incremented so that the new top is the next
			 * vacant position in the array. 
			 * @param {*} element Element to be added to stack
			 */
			Stack.prototype.push = function(element) {
				try {
					if(arguments.length === 0) {
						throw NoArgsError;
					}
					this.datastore[this.top++] = element;
				}
				catch(e) {
					console.error(e);
				}
			};

			/**
			 * @description Pop element off the stack. This method is essentially the reverse of the push() function 
			 * returning the element in the top position of the stack and decrementing the top variable.
			 * If a caller attempts to pop elements off an empty stack the stack is cleared (reset). 
			 * @return {*} Return the element at the top of the stack, or -1 if the stack is empty.
			 */
			Stack.prototype.pop = function() {
				try {
					if(this.top <= 0) {
						this.clear(); // reinitialise the underlying datastore and reset the top variable
						return -1;	  // return -1 to indicate to the caller that the operation was unsuccessful
					}
					var popped = this.datastore.pop(); // use Array.prototype.pop to remove last element of datastore
					--this.top;
					return popped;
				}
				catch(e) {
					console.error(e);
				}
			};

			/**
			 * @description Return the top element of the stack by accessing the element at the top-1 position of the 
			 * underlying datastore (array).
			 * @return {*} Return the top element of the stack or undefined if the stack is empty
			 */
			Stack.prototype.peek = function() {
				try {
					return this.datastore[this.top-1];
				}
				catch(e) {
					console.error(e);
				}
			};

			/**
			 * @description Reset the stack and reinitialise the underlying datastore.
			 */
			Stack.prototype.clear = function() {
				try {
					this.datastore = [];
					this.top = 0;
				}
				catch(e) {
					console.error(e);
				}
			};

			/**
			 * @description Get the number of elements in the stack. 
			 * @return {number} Return the number of elements in the stack.
			 */
			Stack.prototype.getLength = function() {
				try {
					return this.top;
				}
				catch(e) {
					console.error(e);
				}
				
			};

			/**
			 * @description Get a string representation of the stack.
			 * @return {string} Return a string representation of the stack.
			 */
			Stack.prototype.toString = function() {
				try {
					return this.datastore.toString();
				}
				catch(e) {
					console.error(e);
				}
				
			};

		return Stack;
		
	})();

	/**\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\**/
	/** 									Public API										 	 **/
	/**\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\**/

	return {
		Dictionary: Dictionary,
		Iter: Iter,
		List: List,
		Queue: Queue,
		// Set: Set,
		Stack: Stack, 
		extends: __extends, 
		JSDSError: JSDSError
	};

})();


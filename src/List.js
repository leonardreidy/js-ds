/**
 * List.js - JavaScript OO Implementation of List Data Structure
 */

/**
 * @class
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
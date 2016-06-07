/**
 * List.js - JavaScript OO Implementation of List Data Structure
 */

/**
 * @class
 * A <em>List</em> is an ordered sequence of data elements. New elements are appended
 * to the end of a list with the <em>append</em> operation. Elements can be inserted 
 * into a list after an existing element or at the beginning of the list with 
 * the <em>insert</em> operation. Elements can be removed from a list with the <em>
 * remove</em> operation. The elements in a list can be removed en masse with the <em>
 * clear</em> operation. The <em>toString</em> operation returns a string representation of the 
 * list. The <em>getCurrent</em> operation returns the current element. The <em>next</em> operation 
 * is used to traverse the list from left to right, the <em>prev</em> operation to traverse from 
 * right to left. The <em>moveTo</em> operation allows the caller to move to any arbitrary 
 * location in the list. The <em>contains</em> operation is used to see if a particular element
 * can be found in the list. The <em>front</em> operation moves to the front of the list 
 * and the <em>back</em> operation moves to the back of the list. The <em>isEmpty</em> operation determines 
 * whether or not the list is empty. The <em>currPos</em> operation gets the current position in the list. 
 * The <em>length</em> length operation gets the number of elements in a list.  
 */

var List = (function () {

	/**
	 * Constructor declares and/or initialises list
	 * @constructor
	 */
	function List() {
		this.pos = 0; 				// position
		this.size = 0;				// number of elements in list
		this.datastore = [];		// underlying data structure

	}

	/**
	 * @memberOf  List
	 * @instance
	 * @method
	 * @description  Append an element to the list.
	 * @param  {*} element Element to be appended
	 */
	List.prototype.append = function(element) {
		this.datastore[this.size++] = element;
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method
	 * @description  Insert an element in the list.
	 * @param  {*} element The element to be inserted
	 * @param { *} after The element after which the given element will be inserted
	 */
	List.prototype.insert = function(element, after) {
		var inPos = this.find(after);
		if (inPos > -1) {
			this.datastore.splice(inPos+1, 0, element);
			++this.size;
			return true;
		}
		return false;
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @description  Find the given element in the list.
	 * @param  {*} element The element to be found
	 * @return {number}  The index of the given element or -1 if element not found
	 */
	List.prototype.find = function(element) {
		for(var i = 0; i < this.datastore.length; ++i) {
				if(this.datastore[i] == element) {
					return i;
				}
			}
			return -1;
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method 
	 * @description  Move to the given position in the list.
	 * @param  {Number} position The index of the new position in the list
	 */
	List.prototype.moveTo = function(position) {
		if(typeof(position) === "number" && !(position >= this.datastore.length)) {
				this.pos = position;
				return 1;
			}
			return -1;
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method
	 * @description  Remove a given element from the list.
	 * @param  {*} element Element to be removed
	 * @return {boolean} True if the item is found and removed, false otherwise
	 */
	List.prototype.remove = function(element) {
		var foundAt = this.find(element);
			if(foundAt > -1) {
				this.datastore.splice(foundAt, 1);
				--this.size;
				return true;
			}
			return false;
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method
	 * @description  Remove all elements from the list.
	 */
	List.prototype.clear = function() {
		delete this.datastore;
		this.datastore = [];
		this.size = this.pos = 0;
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method 
	 * @description  Get the number of elements in the list.
	 * @return {Number} The number (integer) of elements in the list
	 */
	List.prototype.length = function() {
		return this.size;
	};


	/**
	 * @memberOf  List
	 * @instance
	 * @method
	 * @description  Get a string representation of the list.
     * @return {String} Return string representation of the list (using Object.prototype.toString())
	 */
	List.prototype.toString = function() {
		return this.datastore.toString();
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method
	 * @description  Get the current element of the list.
	 * @return {*} The current element of the list
	 */
	List.prototype.getCurrent = function() {
		return this.datastore[this.pos];
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method 
	 * @description  Set the position to facilitate traversal from the front of the list.
	 */
	List.prototype.front = function() {
		this.pos = 0;
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method
	 * @description  Set the position to facilitate traversal from the back of the list.
	 */
	List.prototype.back = function() {
		this.pos = this.size-1;
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method
	 * @description  Move the current position to the next element.
	 * @return {*} The next element
	 */
	List.prototype.next = function() {
		if(this.pos < this.size-1) {
				return this.datastore[++this.pos];
			}
			return -1;
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method 
	 * @description  Get the current position in the list.
	 * @return {Number} The index of the current position in the list
	 */
	List.prototype.currPos = function() {
		return this.pos;
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method
	 * @description  Move the current position to the previous element.
	 * @return {*} The previous element or -1 if there is no previous element
	 */
	List.prototype.prev = function() {
		if(this.pos > 0) {
				return this.datastore[--this.pos];
			}
	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method
	 * @description  Determine whether or not the list is empty.
	 * @return {Boolean} True if empty, false if not
	 */
	List.prototype.isEmpty = function() {
		return (this.datastore.length === 0);

	};

	/**
	 * @memberOf  List
	 * @instance
	 * @method 
	 * @description  Determine whether or not a list contains a given element. 
	 * @param  {*} element The given element of interest
	 * @return {boolean}  True if the list contains the element, false otherwise
	 */
	List.prototype.contains = function(element) {
		for(var i = 0; i < this.datastore.length; ++i) {
				if(this.datastore[i] == element) {
					return true;
				}
			}
			return false;
	};

	return List;

}());
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
			this.datastore[this.size++] = element;
		};

		/**
		 * @description Set the position to facilitate traversal from the back of the list.
		 */
		List.prototype.back = function() {
			this.pos = this.size-1;
		};

		/**
		 * @description Remove all elements from the list.
		 */
		List.prototype.clear = function() {
			delete this.datastore;
			this.datastore = [];
			this.size = this.pos = 0;
		};

		/**
		 * @description Determine whether or not a list contains a given element. 
		 * @param {*} element The given element of interest
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

		/**
		 * @description Get the current position in the list.
		 * @return {number} The index of the current position in the list
		 */
		List.prototype.currPos = function() {
			return this.pos;
		};

		/**
		 * @description Find the given element in the list.
		 * @param {*} element The element to be found
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
		 * @description Set the position to facilitate traversal from the front of the list.
		 */
		List.prototype.front = function() {
			this.pos = 0;
		}; 

		/**
		 * @description Get the current element of the list.
		 * @return {*} The current element of the list
		 */
		List.prototype.getCurrent = function() {
			return this.datastore[this.pos];
		}; 

		/**
		 * @description Insert an element in the list.
		 * @param {*} element The element to be inserted
		 * @param {*} after The element after which the given element will be inserted
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
		 * @description Determine whether or not the list is empty.
		 * @return {boolean} True if empty, false if not
		 */
		List.prototype.isEmpty = function() {
			return (this.datastore.length === 0);

		};

		/**
		 * @description Get the number of elements in the list.
		 * @return {number} The number (integer) of elements in the list
		 */
		List.prototype.length = function() {
			return this.size;
		};

		/**
		 * @description Move to the given position in the list.
		 * @param {number} position The index associated with the new position in the list
		 */
		List.prototype.moveTo = function(position) {
			if(typeof(position) === "number" && !(position >= this.datastore.length)) {
					this.pos = position;
					return 1;
				}
				return -1;
		};

		/**
		 * @description Move the current position to the next element.
		 * @return {*} The next element
		 */
		List.prototype.next = function() {
			if(this.pos < this.size-1) {
					return this.datastore[++this.pos];
				}
				return -1;
		};

		/**
		 * @description Move the current position to the previous element.
		 * @return {*} The previous element or -1 if there is no previous element
		 */
		List.prototype.prev = function() {
			if(this.pos > 0) {
					return this.datastore[--this.pos];
				}
		};

		/**
		 * @description Remove a given element from the list.
		 * @param {*} element Element to be removed
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
		 * @description Get a string representation of the list.
	     * @return {string} Return string representation of the list (using Object.prototype.toString())
		 */
		List.prototype.toString = function() {
			return this.datastore.toString();
		};
	
	return List;

}());
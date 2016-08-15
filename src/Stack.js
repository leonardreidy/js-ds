/**
 * Stack.js - JavaScript OO Implementation of Stack Data Structure
 */

 /**
 * @class
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
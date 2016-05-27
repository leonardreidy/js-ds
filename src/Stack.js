/**
 * Stack.js - JavaScript OO Implementation of Stack Data Structure
 */

 /**
 * A stack is essentially a list of data elements which may be accessed at only one end. 
 * Stacks are last-in, first-out (LIFO) data structures. Elements may be added to a stack
 * with the 'push' operation and removed from a stack with the 'pop' operation. The element
 * at the top of the stack may be viewed with the 'peek' operation; this operation returns
 * the element without removing it from the stack. The 'clear' operation 'deletes' the contents
 * of the stack. The 'getLength' operation returns the length (number of elements contained)
 * in the stack. The 'toString' operation returns a string representation of the stack.
 * @class
 * 
 */

var Stack = (function() {

	/**
	 * Constructor function declares and/or intialises stack properties
	 * @constructor
	 */
	function Stack() {	
		this.datastore = []; // An array is the underlying data structure
		this.top = 0;// The top of the stack
	}

	/**
	 * Push new element onto stack. When the caller pushes a new element 
	 * onto the stack it is stored in the top position identified by the top 
	 * variable and the latter is incremented so that the new top is the next
	 * vacant position in the array. 
	 * @param element Element to be added to stack
	 */
	Stack.prototype.push = function(element) {
		this.datastore[this.top++] = element;
	}

	/**
	 * Pop element off the stack. This method is essentially the reverse of the push() function 
	 * returning the element in the top position of the stack and decrementing the top variable.
	 * If a caller attempts to pop elements off an empty stack the stack is cleared (reset). 
	 * @return {*} Return the element at the top of the stack, or -1 if the stack is empty.
	 */
	Stack.prototype.pop = function() {
		if(this.top <= 0) {
			this.clear(); // reinitialise the underlying datastore and reset the top variable
			return -1;	  // return -1 to indicate to the caller that the operation was unsuccessful
		} else {
			this.datastore.pop(); // use Array.prototype.pop to remove last element of datastore
			return this.datastore[--this.top];
		}
	}

	/**
	 * Return the top element of the stack by accessing the element at the top-1 position of the 
	 * underlying datastore (array).
	 * @return {*} Return the top element of the stack or undefined if the stack is empty
	 */
	Stack.prototype.peek = function() {
		return this.datastore[this.top-1];
	}

	/**
	 * Reset the stack and reinitialise the underlying datastore.
	 */
	Stack.prototype.clear = function() {
		this.datastore = [];
		this.top = 0;
	}

	/**
	 * Get the number of elements in the stack. 
	 * @return {number} Return the number of elements in the stack.
	 */
	Stack.prototype.getLength = function() {
		return this.top;
	};

	/**
	 * Get a string representation of the stack.
	 * @return {string} Return a string representation of the stack.
	 */
	Stack.prototype.toString = function() {
		return this.datastore.toString();
	}

	return Stack;
}());
/* ==== Stack.js - JavaScript OO Implementation of Stack Data Structure ==== */

/* A stack is essentially a list of data elements which may be accessed at only one end. 
Stacks are last-in, first-out (LIFO) data structures. Elements may be added to a stack
with the 'push' operation and removed from a stack with the 'pop' operation. The element
at the top of the stack may be viewed with the 'peek' operation; this operation returns
the element without removing it from the stack. The 'clear' operation 'deletes' the contents
of the stack. The 'getLength' operation returns the length (number of elements contained)
in the stack. The 'toString' operation returns a string representation of the stack.

In this implementation, a stack has two properties, a datastore which is the underlying 
data structure (a JavaScript array); and a top property which identifies the top of the
stack. 
*/

var Stack = (function() {

	// Constructor function declares and/or intialises stack properties
	function Stack() {	
		// Stack properties
		this.datastore = []; // An array is the underlying data structure
		this.top = 0;// The top of the stack
	}

	// Push new element onto stack. When the caller pushes a new element 
	// onto the stack it is stored in the top position identified by the top 
	// variable and the latter is incremented so that the new top is the next
	// vacant position in the array. Note the postfix operator! The postfix operator 
	// ensures that the current value of top is used to place the new element at the 
	// top of the stack before top is incremented
	Stack.prototype.push = function(element) {
		this.datastore[this.top++] = element;
	}

	// Pop element off stack. This method is essentially the reverse of the push() \function 
	// returning the element in the top position of the stack and decrementing the top variable
	Stack.prototype.pop = function() {
		this.datastore.pop(); // use Array.prototype.pop to remove last element of datastore
		return this.datastore[--this.top];
	}

	// Return the top element of the stack by accessing the element at
	// the top-1 position of the underlying array (datastore)
	// Returns undefined on an empty stack
	Stack.prototype.peek = function() {
		return this.datastore[this.top-1];
	}

	// Reset the top variable to 0 and reinitialise the datastore
	Stack.prototype.clear = function() {
		this.datastore = [];
		this.top = 0;
	}

	// Returns the length of the stack
	Stack.prototype.getLength = function() {
		return this.listSize;
	};

	// Return string representation of stack data
	Stack.prototype.toString = function() {
		return this.datastore.toString();
	}

	// Return Stack
	return Stack;
}());
/** ChattyStack, child of Stack class **/
var ChattyStack = (function(parent) {

	/** Inherit from super class (Stack) **/
	JSDS.extends(ChattyStack, parent);


	/** Create and initialise new ChattyStack instance using inherited constructor - specialise
		the constructor by logging a message about it! **/
	function ChattyStack() {	
		parent.call(this);
		console.log("ChattyStack initialised!"); // 
	}

	// ChattyStack prototype
	ChattyStack.prototype = {

		/** Push an element onto the ChattyStack and log a message **/
		push: function(element) {
			parent.prototype.push.call(this, element)
			console.log("Element pushed!");
		},

		/**Pop element off the ChattyStack and log a message **/
		pop: function() {
			var popped = parent.prototype.pop.call(this);
			console.log("Pop!")
			return popped;
		},

		/** Return the top element of the stack by accessing the element at the top-1 position of the 
		 * underlying datastore (array) and log a message about it
		 */
		peek: function() {
			console.log("Peeking...");
			return parent.prototype.peek.call(this);
		},

		/** Reset the stack, reinitialise the underlying datastore and log a message about it. **/
		clear: function() {
			parent.prototype.clear.call(this);
			console.log("Clearing ChattyStack!");
		},

		/** Return the number of elements in the stack and log a message about it. **/
		getLength: function() {
			console.log("Getting length...enjoy!");
			return parent.prototype.getLength.call(this);
		},

		/** Return a string representation of the stack and log a message about it. **/
		toString: function() {
			console.log("toStringing() all day long...");
			return parent.prototype.toString.call(this);
		}

	}

	return ChattyStack;
	
})(JSDS.Stack);
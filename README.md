# JSDS

A simple Object-Oriented JavaScript data structures library in a broadly pseudoclassical style. 

## Installation

To use js-ds data structures in a project, include the module source
file in your project html files.

## Basic Usage

Usage follows fairly common object-oriented JavaScript patterns. To create and 
use a stack object, for example:
    `var s = new Stack(); 	// create a new stack
    s.push("anElement"); 	// push a string onto the stack
    s.push(4);			 	// push a number onto the stack
    s.pop();			 	// pop an element off the stack
    s.peek();			 	// peek at the top element
    s.clear();			 	// clear the stack
    s.toString();		 	// get a string representation of the stack`

## Extending js-ds classes
To facilitate pseudoclassical inheritance, the js-ds module includes a
utility function, called extends() based on the same pattern used by the
MS TypeScript transpiler. Here is an example of how to extend a js-ds 
class: 

`/** ChattyStack, child of Stack class **/
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
	
})(JSDS.Stack);`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO: Write history

## Credits

TODO: Write credits

## License (MIT)

Copyright (c) 2016, Leonard M Reidy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

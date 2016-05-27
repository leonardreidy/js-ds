# js-ds

A simple Object-Oriented JavaScript data structures library. 

## Installation

To use js-ds data structures in a project, include the corresponding source
files in the head of the html files of your project as needed. Currently, this 
project is a work-in-progress and data structure implementations will be added 
to the project as they are completed. Ultimately, the entire library will be
available to include in your project as a single source file ('js-ds.js').

## Usage

Usage follows fairly common object-oriented JavaScript patterns. To create and 
use a stack object, for example:

    var s = new Stack(); 	// create a new stack
    s.push("anElement"); 	// push a string onto the stack
    s.push(4);			 	// push a number onto the stack
    s.pop();			 	// pop an element off the stack
    s.peek();			 	// peek at the top element
    s.clear();			 	// clear the stack
    s.toString();		 	// get a string representation of the stack

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

## License

GNU GPLv3
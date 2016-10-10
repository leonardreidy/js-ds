# JSDS

A simple Object-Oriented JavaScript data structures library in a broadly pseudoclassical style. 

## Installation

To use JSDS data structures in a project, include the module source
file in your project html files.

## Basic Usage

Usage follows fairly common object-oriented JavaScript patterns. To create and 
use a stack object, for example:

    var s = new JSDS.Stack(); 		// create a new stack
    s.push("anElement"); 		    // push a string onto the stack
    s.push(4);			 	        // push a number onto the stack
    s.pop();			 	        // pop an element off the stack
    s.peek();			 	        // peek at the top element
    s.clear();			 	        // clear the stack
    s.toString();		 	        // get a string representation of the stack

## Extending JSDS classes
To facilitate pseudoclassical inheritance, the JSDS module includes a
utility function, called `extends()` based on the same pattern used by the
MS TypeScript transpiler. Here is an example of how to extend a JSDS 
class: 

    var ChattyStack = (function(parent) {

      JSDS.extends(ChattyStack, parent);

      function ChattyStack() {
        parent.call(this);
        console.log("ChattyStack initialised!");
      }

        ChattyStack.prototype.push = function(element) {
          parent.prototype.push.call(this, element)
          console.log("Element pushed!");
        };

        ChattyStack.prototype.pop = function() {
          var popped = parent.prototype.pop.call(this);
          console.log("Pop!")
          return popped;
        };

        ChattyStack.prototype.peek = function() {
          console.log("Peeking...");
          return parent.prototype.peek.call(this);
        };

        ChattyStack.prototype.clear = function() {
          parent.prototype.clear.call(this);
          console.log("Clearing ChattyStack!");
        };

        ChattyStack.prototype.getLength = function() {
          console.log("Getting length...enjoy!");
          return parent.prototype.getLength.call(this);
        };

        ChattyStack.prototype.toString = function() {
          console.log("toStringing() all day long...");
          return parent.prototype.toString.call(this);
        };

      return ChattyStack;

    })(JSDS.Stack);

## Compatibility
<div>
<div> 
    <a name="AutoCompatibilityTable" id="AutoCompatibilityTable"></a> 
<div id="compat-desktop" style="display: block;">
<table>
 <tbody>
  <tr>
   <th>Feature</th>
   <th>Chrome</th>
   <th>Firefox (Gecko)</th>
   <th>Internet Explorer</th>
   <th>Opera</th>
   <th>Safari</th>
  </tr>
  <tr>
   <td>Basic support</td>
   <td>5</td>
   <td><a title="Released on 2011-03-22." href="https://developer.mozilla.org/en-US/Firefox/Releases/4">4.0</a> (2)</td>
   <td>9</td>
   <td>11.60</td>
   <td>5</td>
  </tr>
 </tbody>
</table>
</div><div id="compat-mobile" style="display: none;">
<table>
 <tbody>
  <tr>
   <th>Feature</th>
   <th>Android</th>
   <th>Chrome for Android</th>
   <th>Firefox Mobile (Gecko)</th>
   <th>IE Mobile</th>
   <th>Opera Mobile</th>
   <th>Safari Mobile</th>
  </tr>
  <tr>
   <td>Basic support</td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
   <td><a title="Released on 2011-03-22." href="https://developer.mozilla.org/en-US/Firefox/Releases/4en-US/Firefox/Releases/4">4.0</a> (2)</td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
   <td>11.5</td>
   <td><span title="Please update this with the earliest version of support." style="color: #888;">(Yes)</span></td>
  </tr>
 </tbody>
</table>
</div>
</div>
</div>

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

## The MIT License (MIT)

Copyright (c) 2016, Leonard M Reidy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

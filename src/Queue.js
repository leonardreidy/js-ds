/**
 * Queue.js - JavaScript OO Implementation of Queue Data Structure
 */

/**
 * @class
 * A queue is an ordered list. Queues are first-in first-out (FIFO) data structures. 
 * Data are inserted into a queue at the back of the list and removed from the front. 
 * A Queue <em>ADT</em> includes the following operations:
 * <ul>
 * <li><em>enqueue</em>     - to add an element to the queue;</li>
 * <li><em>dequeue</em>     - to remove an element from a queue;</li>
 * <li><em>back</em>        - to get the element at the back of the queue (analogous to peek);</li>
 * <li><em>front</em>       - to get the element at the front of the queue (analogous to peek);</li>
 * <li><em>clear</em>       - to clear or empty the queue;</li>
 * <li><em>getLength</em>   - to get the number of elements in the queue;</li>
 * <li><em>isEmpty</em>     - to determine whether or not a given queue is empty (contains no elements); and</li>
 * <li><em>toString</em>    - to get a string representation of the queue.</li>
 * </ul>
 */
var Queue = (function () {

	/**
     * @constructor
     * @description  Create and initialise new Queue object.
     */
    function Queue() {
    	// delare and/or initialise queue and offset
        this.queue = []; // underlying data structure
        this.offset = 0;
    }

    Queue.prototype = {

        /**
         * @memberOf  Queue
         * @instance
         * @method  getLength
         * @description  Get the length of the queue.
         * @return {number} Return the length/number of elements in the queue
         */
        getLength: function () {
            return (this.queue.length - this.offset);
        },

        /**
         * @memberOf  Queue
         * @instance
         * @method  isEmpty
         * @description  Determine whether the queue is empty or not.
         * @return {Boolean} Return true if queue is empty, false if not
         */
        isEmpty: function () {
            return (this.queue.length === 0);
        },

        /**
         * @memberOf  Queue
         * @instance
         * @method  enqueue
         * @description  Add an element to the back of the queue.
         * @param  {*} element Any data type
         */
        enqueue:function (element) {
            this.queue.push(element);
        },

        /**
         * @memberOf  Queue
         * @instance
         * @method  dequeue
         * @description  Remove an element from the front of the queue.
         * @return {*} Return the dequeued element, or -1 if the queue is empty
         */
        dequeue: function () {
            if (this.queue.length === 0) {
                return undefined;
            }
            var element = this.queue.shift();
            return element;
        },

        // Clear/reinitialise the queue
        
        // Exercise some caution with delete - it has limitations and 
        // constraints. In general, if you try to delete a property that
        // does not exist, the delete operation will return true, which 
        // may be unexpected. Moreover, if the delete operator succeeds, it
        // removes the property from the object entirely but if a property 
        // with the same name exists on the object's prototype chain, the object
        // will inherit that property from the prototype, another potentially
        // unintuitive outcome with real potential for driving buggy behaviour
        // in an application.
        
        // See Mozilla Developer Network (MDN) for more info:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
        
        /**
         * @memberOf  Queue
         * @instance
         * @method  clear
         * @description  Clear the queue.
         * 
         */
        clear: function() {
            delete this.queue;
            this.queue = [];
        },

        /**
         * @memberOf  Queue
         * @instance
         * @method  front
         * @description Get the element at the front of the queue without dequeueing it.
         * @return {*} Return the element at the front of the queue, or undefined if the queue is empty
         */
        front: function () {
            return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
        },

        /**
         * @memberOf  Queue
         * @instance
         * @method  back
         * @description  Get the element at the back of the queue without dequeueing it.
         * @return {*} Return the element at the back of the queue, or undefined if the queue is empty
         */
        back: function() {
            return(this.queue.length > 0 ? this.queue[this.queue.length-1] : undefined);
        }, 

        /**
         * @memberOf  Queue
         * @instance
         * @method  toString
         * @description  Get a string representation of the queue.
         * @return {string} Return string representation of the queue (using Object.prototype.toString())
         */
        toString: function() {
            return this.queue.toString();
        }, 

    };

    return Queue;
}());

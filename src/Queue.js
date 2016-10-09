// Queue as IIFE
var Queue = (function () {

    /**
     * @classdesc A JSDS queue is a pseudoclassical JavaScript OO implementation of the queue data structure.
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
     * @constructs Queue
     * @memberof module:JSDS
     */
    function Queue() {
        // delare and/or initialise queue and offset
        this.queue = []; // underlying data structure
        this.offset = 0;
    }

    /**
     * @description Get the length of the queue.
     * @return {number} Return the length/number of elements in the queue
     */
    Queue.prototype.getLength = function () {
        return (this.queue.length - this.offset);
    };

    /**
     * @description Determine whether the queue is empty or not.
     * @return {boolean} Return true if queue is empty, false if not
     */
    Queue.prototype.isEmpty = function () {
        return (this.queue.length === 0);
    };

    /**
     * @description Add an element to the back of the queue.
     * @param {*} element Any data type
     */
    Queue.prototype.enqueue = function (element) {
        this.queue.push(element);
    };

    /**
     * @description Remove an element from the front of the queue.
     * @return {*} Return the dequeued element, or -1 if the queue is empty
     */
    Queue.prototype.dequeue = function () {
        if (this.queue.length === 0) {
            return undefined;
        }
        var element = this.queue.shift();
        return element;
    };

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
     * @description Clear the queue. 
     */
    Queue.prototype.clear = function() {
        delete this.queue;
        this.queue = [];
    };

    /**
     * @description Get the element at the front of the queue without dequeueing it.
     * @return {*} Return the element at the front of the queue, or undefined if the queue is empty
     */
    Queue.prototype.front = function () {
        return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
    };

    /**
     * @description Get the element at the back of the queue without dequeueing it.
     * @return {*} Return the element at the back of the queue, or undefined if the queue is empty
     */
    Queue.prototype.back = function() {
        return(this.queue.length > 0 ? this.queue[this.queue.length-1] : undefined);
    }; 

    /**
     * @description Get a string representation of the queue.
     * @return {string} Return string representation of the queue (using Object.prototype.toString())
     */
    Queue.prototype.toString = function() {
        return this.queue.toString();
    };

    return Queue;
    
}());
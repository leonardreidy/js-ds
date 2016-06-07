describe("Queue", function(){

	var queue;

	beforeEach(function() {
		queue = new Queue();
		queue.enqueue('a');
		queue.enqueue('b');
		queue.enqueue('c');
	});

	// Test isEmpty
	it('determines whether or not the queue is empty', function() {
		expect(queue.isEmpty()).not.toEqual(true);
		for(var i = 0; i < 3; i++)
		{
			queue.dequeue();
		}
		expect(queue.isEmpty()).not.toEqual(false);
	});

	// Test getLength
	it('gets the length/number of elements in the queue', function() {

		while(!queue.isEmpty())
		{
			queue.dequeue();
		}
		expect(queue.getLength()).toEqual(0);
	});

	// Test enqueue
	it('adds an element to the queue', function() {
		var back = queue.back();
		expect(back).toEqual('c');
		queue.enqueue('d');
		expect(back).not.toEqual(queue.back());
	});

	// Test dequeue
	it('removes an element from the queue', function() {
		var lengthBeforeDequeue = queue.getLength();
		queue.dequeue();
		var lengthAfterDequeue = queue.getLength();
		expect(lengthBeforeDequeue).toBeGreaterThan(lengthAfterDequeue);
		for(var i = 0; i < 3; i++)
		{
			queue.dequeue();
		}
		expect(queue.toString()).toEqual("");
	});

	// Test delete
	it('clears the queue', function() {
		expect(queue.getLength()).toEqual(3);
		queue.clear();
		expect(queue.getLength()).toEqual(0);
	});

	// Test front
	it('gets the element at the front of the queue without dequeueing it', function() {
		expect(queue.front()).toEqual('a');
		expect(queue.front()).toEqual('a');
	});

	// Test back
	it('gets the element at the back of the queue without dequeueing it', function() {
		expect(queue.back()).toEqual('c');
		expect(queue.back()).toEqual('c');
	});

	// Test toString
	it('gets a string representation of the queue', function() {
		expect(queue.toString()).toEqual('a,b,c');
		queue.dequeue();
		expect(queue.toString()).toEqual('b,c');
		queue.dequeue();
		expect(queue.toString()).toEqual('c');
		queue.dequeue();
		expect(queue.toString()).toEqual("");
		
	});
});
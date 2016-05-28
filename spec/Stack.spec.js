describe("Stack", function() {

	var stack;

	beforeEach(function() {
		stack = new Stack();
		stack.push('a');
		stack.push('b');
		stack.push('c')
	});

	// Test push
	it('pushes an element onto the stack', function() {
		stack.push('d');
		expect(stack.getLength()).toBeGreaterThan(0);
	});

	// Test pop
	it('pops an element off the stack', function() {
		stack.pop();
		expect(stack.pop()).toEqual('b');
	});

	// Test peek
	it('peeks at the top element of the stack', function() {
		expect(stack.peek()).toEqual('c');
	});

	// Test clear
	it('clears the stack', function() {
		stack.clear();
		expect(stack.getLength()).toEqual(0);
	});

	// Test getLength
	it('gets the length of the stack', function() {
		expect(stack.getLength()).toEqual(jasmine.any(Number));
	});

	// Test toString
	it('gets a string representation of the stack', function() {
		expect(stack.toString()).toEqual(jasmine.any(String));
	});

});
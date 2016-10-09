describe("List", function(){

	var list; 
	var alphabet;

	beforeEach(function() {
		list = new JSDS.List();
		alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
		for(var i = 0; i < alphabet.length; i++) {
			list.append(alphabet[i]);
		}
	});

	it('appends new elements to the list', function() {
		expect(list.datastore.length).toEqual(26);
		delete list.datastore;
		list.datastore = [];
		list.size = 0;
		expect(list.datastore.length).toEqual(0);
		list.append('a');
		list.append('b');
		list.append('c');
		list.append('d');
		expect(list.datastore.length).toEqual(4);
		expect(list.datastore[0]).toEqual('a');
		expect(list.datastore[1]).toEqual('b');
		expect(list.datastore[2]).toEqual('c');
		expect(list.datastore[3]).toEqual('d');

	});

	it('gets the current element in the list', function() {
		var current = list.getCurrent();
		expect(current).toEqual('a');
		list.pos = 1;
		current = list.getCurrent();
		expect(current).toEqual('b');
	});

	it('removes elements from the list', function() {
		for(var i = 0; i < alphabet.length; i++) {
			list.remove(alphabet[i]);
		}
		expect(list.datastore.length).toEqual(0);
	});

	it('clears the list', function() {
		list.clear();
		expect(list.datastore.length).toEqual(0);
	});

	it('moves to the given element in the list', function() {
		list.moveTo(12);
		expect(list.getCurrent()).toEqual('m');
		expect(list.datastore.indexOf('m')).toEqual(12);
		expect(list.pos).toEqual(12);

	});

	it('finds the given element and returns its index', function() {
		var foundAt = list.find('m');
		expect(foundAt).toEqual(12);

	});

	it('inserts a given element (arg 1) after the given element (arg 2)', function() {
		list.insert('A', 'm');
		expect(list.find('A')).toEqual(13);
		expect(list.datastore[13]).toEqual('A');
		expect(list.datastore[14]).toEqual('n');
		expect(list.datastore.length).toEqual(27);
	});

	it('returns the length of the list', function() {
		expect(list.length()).toEqual(list.datastore.length);
	});

	it('checks to see if the list is empty', function() {
		expect(list.isEmpty()).toEqual(false);
		list.clear();
		expect(list.isEmpty()).toEqual(true);
	});

	it('checks to see if the list contains the given element', function() {
		expect(list.contains('m')).toEqual(true);
		expect(list.datastore[12]).toEqual('m');
		list.remove('m');
		expect(list.datastore[12]).not.toEqual('m');
		expect(list.contains('m')).toEqual(false);
	});

	it('moves to the previous element in the list', function() {
		expect(list.pos).toEqual(0);
		list.moveTo(4);
		expect(list.prev()).toEqual('d');
	});

	it('moves to the next element in the list', function() {
		expect(list.pos).toEqual(0);
		list.next();
		expect(list.datastore[1]).toEqual('b');
		list.next();
		expect(list.datastore[2]).toEqual('c');
	});

	it('gets the current position in the list', function() {
		expect(list.currPos()).toEqual(0);
		list.next();
		expect(list.currPos()).toEqual(1);
		list.prev();
		expect(list.currPos()).toEqual(0);

	});

	it('moves to the back of the list', function() {
		expect(list.getCurrent()).toEqual('a');
		list.back();
		expect(list.getCurrent()).toEqual('z');
	});

	it('moves to the front of the list', function() {
		expect(list.getCurrent()).toEqual('a');
		list.back();
		expect(list.getCurrent()).toEqual('z');
		list.front();
		expect(list.getCurrent()).toEqual('a');
	});

});
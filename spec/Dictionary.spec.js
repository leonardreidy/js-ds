describe("Dictionary", function() {

    var dict;

    function initialiseDictionary(numberOfEntries) {
        var status;
        var returnVal;
        for(i = 0; i < numberOfEntries; i++) {
            status = dict.put("key"+i, "value"+i);
            expect(status).toEqual(1);
        };
    };

    beforeEach(function() {
        dict = new Dictionary();
        initialiseDictionary(100);
    });

    it("adds a new entry to the dictionary", function() {

        var i;
        var status;
        var returnVal;
        dict = new Dictionary();

        status = dict.put();        // no arguments
        expect(status).toEqual(-1);
        expect(Object.keys(dict.table).length).toEqual(0);
        status = dict.put("");      // one argument given, one missing
        expect(status).toEqual(-1);
        expect(Object.keys(dict.table).length).toEqual(0);
        status = dict.put("", "");  // two empty strings as arguments
        expect(status).toEqual(1);
        expect(Object.keys(dict.table).length).toEqual(1);
        status = dict.put(8, "Junk text"); // a number for key and a string for value
        expect(status).toEqual(-1);
        expect(Object.keys(dict.table).length).toEqual(1);

        //create and initialise the dictionary anew
        dict = new Dictionary();
        initialiseDictionary(100);

        expect(Object.keys(dict.table).length).toEqual(100);

        // Note that you cannot call hasOwnProperty on the dictionary and hope to confirm
        // the existence of a given property - it is tempting to assume you can 
        // check a dictionary for properties by exploiting the hasOwnProperty inherited from
        // the Object 'class'; but it won't work as is because the underlying datastore is 
        // a nested object and the only properties available to that method are at the next 
        // level up, so to speak. A dictionary has the property 'table', which refers to the underlying
        // datastore, but only 'table' has the properties associated with the key/value pairs that
        // constitute a dictionary's entries; this is why I did not use that method here!
        for(i = 0; i < 100; i++) {
            expect("key"+i in dict.table).toBe(true);
            expect(dict.table["key"+i]).toEqual("value"+i);
        };
    });

    it('gets the value corresponding to a given key', function() {

        for(i = 0; i < 100; i++) {
            returnVal = dict.get("key"+i);
            expect(returnVal).toEqual("value"+i);
        };

    });

    it('removes the entry associated with a given key', function() {
        
        for(i = 0; i < 100; i++) {
            returnVal = dict.remove("key"+i);
            expect(returnVal).toEqual(1);
            expect(dict.get("key"+i)).toEqual(undefined);
            expect(dict.hasOwnProperty("key"+i)).toEqual(false);
        };

    });

    it('gets an array of all keys stored in the dictionary', function() {

        var i;
        var key;
        var keys = dict.getKeys();

        for(i = 0; i < keys.length; i++) {
            expect(keys[i]).toEqual("key"+i);
        };

        expect(keys.length).toEqual(100);
    });

    it('gets an array of all values stored in the dictionary', function() {

        var i;
        var values = dict.getValues();

        for(i = 0; i < 100; i++) {
            expect(values[i]).toEqual("value"+i);
        };

        expect(values.length).toEqual(100);

    });

    it('gets an iterator of all the entries in the dictionary', function() {
       
        var i; 
        var iterator = dict.getEntries();

        expect(iterator).toEqual(jasmine.any(Iter)); // check that getEntries() returns an object of type Iter

        for(i = 0; i < 100; i++) {
            var entry = iterator.next();
            expect(entry.length).toEqual(2);
            expect(entry[0]).toEqual("key"+i);
            expect(entry[1]).toEqual("value"+i);
        }
    });

    it('gets the size of, or number of entries in, the dictionary', function() {

        var count = 0;

        for(key in dict.table) {
            count++;
        };

        expect(dict.getSize()).toEqual(count);

    });

    it('checks if the dictionary is empty (has no entries)', function() {
        
        expect(dict.isEmpty()).toEqual(false);
        dict = new Dictionary();
        expect(dict.isEmpty()).toEqual(true);
    });

    it('clears the dictionary', function() {

        var count = 0;
        dict.clear();

        expect(dict.isEmpty()).toBe(true);

        for(key in dict.table) {
            count++;
        };

        expect(count).toEqual(0);
    });

    it('returns a string representation of the dictionary', function() {
        dict = new Dictionary();
        var stringRep = "";
        dict.put("name", "Crouglas Dockford");
        dict.put("age", "unknown");
        dict.put("occupation", "developer");
        stringRep = dict.toString();
        expect(stringRep).toEqual("age: unknown, name: Crouglas Dockford, occupation: developer");
    });

});



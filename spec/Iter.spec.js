describe("Iter", function() {

    var iter;

    beforeEach(function() {
        var simpleObj = {name: "Leonard M Reidy", age: 37, occupation: "Web application developer", location: "Galway/Ireland"};
        iter = new JSDS.Iter(simpleObj);
    });

    it('gets the first element of the current Iter object', function() {
        var first = iter.first(); 
        expect(first[0]).toEqual("name");
        expect(first[1]).toEqual("Leonard M Reidy");
        expect(first.length).toEqual(2);
    }); 

    it('gets the next element of the current Iter object', function() {
        var next = iter.next();
        expect(next.length).toEqual(2);
        expect(next[0]).toEqual("name");
        expect(next[1]).toEqual("Leonard M Reidy");
        next = iter.next();
        expect(next[0]).toEqual("age");
        expect(next[1]).toEqual(37);
        next = iter.next();
        expect(next[0]).toEqual("occupation");
        expect(next[1]).toEqual("Web application developer");
        next = iter.next();
        expect(next[0]).toEqual("location");
        expect(next[1]).toEqual("Galway/Ireland");
        
    });

    it('checks whether the iter has a next element', function() {
        var hasNext, next;
        hasNext = iter.hasNext();       // refers to first element
        expect(hasNext).toBe(true);     // is true for next which is first
        next = iter.next();             // move to first
        hasNext = iter.hasNext();       // refers to second
        expect(hasNext).toBe(true);     // is true for next which is second
        next = iter.next();             // moves to second
        hasNext = iter.hasNext();       // is true for next which is third
        expect(hasNext).toBe(true);     // refers to third 
        next = iter.next();             // moves to third
        hasNext = iter.hasNext();       // is true for next which is fourth
        expect(hasNext).toBe(true);     // refers to fourth
        next = iter.next();             // moves to fourth
        hasNext = iter.hasNext();       // is false for next which is fifth (no fifth element)
        expect(hasNext).toBe(false);    // refers to fifth element (no fifth element)
        next = iter.next();             // no next element - method returns undefined
        expect(next).toEqual(undefined);// next is undefined

    });
    
    it('resets the iter object', function() {
        expect(iter.index).toEqual(0);
        expect(iter.current).toEqual(0);
        iter.next();
        expect(iter.index).toEqual(0);
        expect(iter.current).toEqual(1);
        iter.next();
        expect(iter.index).toEqual(0);
        expect(iter.current).toEqual(2);
        iter.reset();
        expect(iter.index).toEqual(0);
        expect(iter.current).toEqual(0);

    });

    it('executes a callback function on each element of the iter', function() {
        var test = [1,2,3,4,5];
        iter = new JSDS.Iter(test);
        var r = []; 
        function concatStuff(target) {
            r.push(target);
        }
        iter.each(concatStuff);
        for(var i = 0; i < r.length; i++) {
            expect(r[i]).toEqual(test[i]);
        }

    });

});
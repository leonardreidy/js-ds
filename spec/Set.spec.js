describe("Set", function() {
    var temp;
    var left;
    var right;

    beforeEach(function() {
        temp = new Set();
        left = new Set();
        right = new Set();
        for(var i = 0; i < 10; i++) {
            left.insert(i);
        }
        for(var j = 5; j < 15; j++) {
            right.insert(j);
        }
    });

    // Test static methods
    it('gets the union of the given sets [static method]', function() {
        var a = Set.union();
        var i;        
        expect(a).toBe(undefined);
        a = Set.union(left, right);
        expect(a.datastore.length).toBe(15);
        for(i = 0; i < a.datastore.length; i++) {
            expect(a.datastore[i]).toEqual(i);
        }
        a = Set.union(left);
        expect(a).toEqual(left);
        expect(a.datastore.length).toEqual(left.datastore.length);
        for(i = 0; i < a.datastore.length; i++) {
            expect(a[i]).toEqual(left[i]);
        }
        
    });

    it('gets the intersection of the given sets [static method]', function() {
        var a = Set.intersection();
        var i;
        expect(a).toBe(undefined);
        a = Set.intersection(left, right);
        expect(a.datastore.length).toBe(5);
        for(i = 0; i < a.datastore.length; i++) {
            expect(a.datastore[i]).toEqual(i+5);
        }
        a = Set.intersection(left);
        expect(a).toEqual(left);
        expect(a.datastore.length).toEqual(left.datastore.length);
        for(i = 0; i < a.datastore.length; i++) {
            expect(a[i]).toEqual(left[i]);
        }

    });

    it('gets the difference (symmetric) of two sets [static method]', function() {
        var a = Set.difference();
        var i;
        expect(a).toBe(undefined);
        a = Set.difference(left);
        expect(a.datastore.length).toBe(0);
        a = Set.difference(left, right);
        

    });


});
/** Note that, for now, the Set spec is as provisional as it can be. A
truly effective spec for the Set data structure would be faithful
to the mathematical definition of a set, and to the various laws, 
theorems and corrollaries that pertain to sets. This data structure
may prove to be the most challenging to fully implement. It is 
certainly the best of the data structures from the point of view
of thinking intelligently and strategically about how to write 
effective, and thorough tests for a unit.*/
describe("Set", function() {
    var temp;
    var left;
    var right;

    beforeEach(function() {
        temp = new JSDS.Set();
        left = new JSDS.Set();
        right = new JSDS.Set();
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

    it('gets the symmetric difference of two sets [static method]', function() {
        var a = Set.difference();
        var i;
        var data = [0, 1, 2, 3, 4, 10, 11, 12, 13, 14];
        function checkData() {
            expect(a.datastore.length).toBe(10);
            expect(a.datastore[0]).toEqual(0);
            expect(a.datastore[1]).toEqual(1);
            expect(a.datastore[2]).toEqual(2);
            expect(a.datastore[3]).toEqual(3);
            expect(a.datastore[4]).toEqual(4);
            expect(a.datastore[5]).toEqual(10);
            expect(a.datastore[6]).toEqual(11);
            expect(a.datastore[7]).toEqual(12);
            expect(a.datastore[8]).toEqual(13);
            expect(a.datastore[9]).toEqual(14);
        }

        function reCheckData() {
            for(dataElem in a) {

            }
        }
        expect(a).toBe(undefined);
        a = Set.difference(left);
        expect(a.datastore.length).toBe(0);

        a = Set.difference(left, right);
        checkData();

        a = Set.difference(right, left);
        checkData();
        


    });


});
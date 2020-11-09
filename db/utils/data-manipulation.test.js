const { formatTimeStamp } = require("./data-manipulation");

describe('formatTimeStamp', () => {
    it('returns array of objects when passed array of objects', () => {
        const input = [{
            created_at: 1542284514171,
        }];
        expect(Array.isArray(formatTimeStamp(input))).toBe(true);
        expect(typeof formatTimeStamp(input)[0]).toBe('object');
    });
    it('should not mutate objects in array', () => {
        const input = [
            {
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: 1542284514171,
                votes: 100,
            },
        ];
        formatTimeStamp(input)
        expect(input).toEqual([{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence chall 1enging',
            created_at: 1542284514171,
            votes: 100,
        }])
    });
    it('give an object with create_at key with value of unixtimestamp will return object with custom timestamp', () => {
        const input = [{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100,
        }];
        expect(formatTimeStamp(input)).toEqual([{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: '11/15/2018 12:21:54 PM',
            votes: 100,
        }])
    });
});


//title: 'Living in the shadow of a great man',
// topic: 'mitch',
// author: 'butter_bridge',
// body: 'I find this existence challenging',
// created_at: 1542284514171,
// votes: 100,
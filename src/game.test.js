const game = require('./components/game');

test('adds 1 + 2 to equal 3', () => {
	expect(game(1, 2)).toBe(3);
});
function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('Some additions who works', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(2, 2)).toBe(4);
    expect(sum(10, 2)).toBe(12);
    expect(sum(2, 1)).toBe(3);
});

test('Some additions who fails', () => {
    expect(sum(2, 2)).not.toBe(3);
    expect(sum(22, 2)).not.toBe(4);
    expect(sum(10, 22)).not.toBe(12);
    expect(sum(22, 12)).not.toBe(3);
});
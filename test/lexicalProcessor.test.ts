import { LexicalProcessor } from "../src/lexicalProcessor";

const json: string = require('./generalMedicalPerspective');

describe("test add function", () => {
    it("should return 15 for add(10,5)", () => {
        expect(1).toBe(1);
    })
});

test('should find startView', () => {
    const proc = new LexicalProcessor(json);
    var counter: number = 0;
    proc.forEach(() => { counter++; }, (prop) => prop === 'startView');
    expect(counter).toEqual(1);
});
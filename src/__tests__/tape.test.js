import Validate from "../js/validate";
/**
 * @jest-environment jsdom
 */

test.each([
  ['51.507351, -0.127758', true],
  ['[55.755826, 37.6173]', true],
  ['[35.689487,139.691706]', true]
])// eslint-disable-next-line
('testing function validate with %s coords', (coords, expected) => {
  const validate = new Validate(this);

  const result = validate.validate(coords)
  
  expect(result).toEqual(expected);
});

test.each([
  ['51,507351, -0,127758', new Error('Координаты введены не корректно')],
  ['qwert, poiuy', new Error('Координаты введены не корректно')],
  ['', new Error('Координаты введены не корректно')]
])// eslint-disable-next-line
('testing function validate with %s coords', (coords, expected) => {
  function result() {
    const validate = new Validate(this);

    validate.validate(coords);
  }
  expect(result).toThrow(expected);
});

import { StrvParse } from "./main";

test("simple string value to json value", () => {
  expect(StrvParse("true")).toBe(true);
  expect(StrvParse("false")).toBe(false);
  expect(StrvParse("1")).toBe(1);
  expect(StrvParse("null")).toBe(null);
  expect(StrvParse("undefined")).toBe(undefined);
  expect(StrvParse("1", "string")).toBe("1");
  expect(StrvParse(1, "string")).toBe("1");

  expect(StrvParse("True")).toBe(true);
  expect(StrvParse("True", "string")).toBe("True");
});

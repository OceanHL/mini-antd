/*
 * @Author: jhl
 * @Date: 2021-11-16 15:44:49
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-16 15:53:22
 * @Description:
 */
test("test common matcher", () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5); // 不等于 5
});

test("test to be true or false", () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("test number", () => {
  expect(4).toBeGreaterThan(3); // 比 3 大
  expect(2).toBeLessThan(3); // 比 3 小
});

test("test object", () => {
  // toBe 判断是否【完全相同】，toEqual 判断值是否相同
  expect({ name: "viking" }).toEqual({ name: "viking" });
});

import { expect } from "chai";
import Mtrx from "mtrx";

function toArray(m) {
  return Array.from(m, (row) => Array.from(row));
}

describe("Тести бібліотеки Mtrx", function () {
  let matrix;

  beforeEach(function () {
    matrix = new Mtrx([
      [1, 2],
      [3, 4],
    ]);
  });

  describe("Створення матриць", function () {
    it("створення матриці 2x2", function () {
      expect(matrix.rows).to.equal(2);
      expect(matrix.cols).to.equal(2);
      expect(matrix.get(0, 1)).to.equal(2);
    });

    it("нульова матриця", function () {
      let m = Mtrx.zeros(2, 2);
      expect(toArray(m)).to.deep.equal([
        [0, 0],
        [0, 0],
      ]);
    });

    it("матриця з одиниць", function () {
      let m = Mtrx.ones(2, 3);
      expect(toArray(m)).to.deep.equal([
        [1, 1, 1],
        [1, 1, 1],
      ]);
    });

    it("одинична матриця", function () {
      let m = Mtrx.eye(3);
      expect(toArray(m)).to.deep.equal([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]);
    });

    it("діагональна матриця", function () {
      let m = Mtrx.diag([2, 4, 6]);
      expect(toArray(m)).to.deep.equal([
        [2, 0, 0],
        [0, 4, 0],
        [0, 0, 6],
      ]);
    });

    it("зміна елемента матриці", function () {
      matrix.set(0, 1, 10);
      expect(matrix.get(0, 1)).to.equal(10);
    });
  });

  describe("Операції з матрицями", function () {
    it("додавання", function () {
      let b = new Mtrx([
        [5, 6],
        [7, 8],
      ]);
      let result = Mtrx.add(matrix, b);
      expect(toArray(result)).to.deep.equal([
        [6, 8],
        [10, 12],
      ]);
    });

    it("віднімання", function () {
      let b = new Mtrx([
        [5, 6],
        [7, 8],
      ]);
      let result = Mtrx.sub(matrix, b);
      expect(toArray(result)).to.deep.equal([
        [-4, -4],
        [-4, -4],
      ]);
    });

    it("множення на число", function () {
      let result = Mtrx.mul(matrix, 2);
      expect(toArray(result)).to.deep.equal([
        [2, 4],
        [6, 8],
      ]);
    });

    it("множення матриць", function () {
      let b = new Mtrx([
        [5, 6],
        [7, 8],
      ]);
      let result = Mtrx.mul(matrix, b);
      expect(toArray(result)).to.deep.equal([
        [19, 22],
        [43, 50],
      ]);
    });

    it("транспонування", function () {
      let result = matrix.T();
      expect(toArray(result)).to.deep.equal([
        [1, 3],
        [2, 4],
      ]);
    });

    it("визначник", function () {
      expect(matrix.det).to.equal(-2);
    });

    it("ранг матриці", function () {
      let m = new Mtrx([
        [1, 2],
        [2, 4],
      ]);
      expect(m.rank).to.equal(1);
    });

    it("обернена матриця", function () {
      let m = Mtrx.diag([2, 4]);
      let result = m.inv();
      expect(toArray(result)).to.deep.equal([
        [0.5, 0],
        [0, 0.25],
      ]);
    });

    it("початкова матриця не змінюється після додавання", function () {
      Mtrx.add(matrix, Mtrx.ones(2, 2));
      expect(toArray(matrix)).to.deep.equal([
        [1, 2],
        [3, 4],
      ]);
    });
  });

  describe("Перевірка помилок", function () {
    it("додавання матриць різних розмірів", function () {
      let b = Mtrx.ones(3, 3);
      expect(() => Mtrx.add(matrix, b)).to.throw(TypeError);
    });

    it("множення несумісних матриць", function () {
      let b = Mtrx.ones(3, 2);
      expect(() => Mtrx.mul(matrix, b)).to.throw(TypeError);
    });

    it("неправильні дані при створенні", function () {
      expect(() => new Mtrx("invalid")).to.throw(TypeError);
    });

    it("обернення неквадратної матриці", function () {
      let m = Mtrx.ones(2, 3);
      expect(() => m.inv()).to.throw(Error);
    });
  });
});

import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { jest, describe, beforeEach } from "@jest/globals";

export const prismaMock = mockDeep<PrismaClient>();

jest.mock("@/lib/db", () => ({
  db: prismaMock,
}));

describe("Database Mock Setup", () => {
  beforeEach(() => {
    mockReset(prismaMock);
  });
});

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: prismaMock,
  };
};

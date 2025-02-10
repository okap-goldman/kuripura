import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

export const prismaMock = mockDeep<PrismaClient>();

jest.mock("@/lib/db", () => ({
  db: prismaMock,
}));

beforeEach(() => {
  mockReset(prismaMock);
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

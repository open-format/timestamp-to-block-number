// tests/blockHandler.test.ts
import { test, assert, beforeEach, clearStore, describe } from "matchstick-as/assembly/index";
import { handleBlock } from "../src/blockHandler";
import { createBlock } from "./utils";
import {
  START_TIMESTAMP,
  UNDER_HOUR_TIMESTAMP,
  UNDER_DAY_TIMESTAMP,
  UNDER_WEEK_TIMESTAMP,
  OVER_HOUR_TIMESTAMP,
  OVER_DAY_TIMESTAMP,
  OVER_WEEK_TIMESTAMP,
  ON_HOUR_TIMESTAMP,
  ON_DAY_TIMESTAMP,
  ON_WEEK_TIMESTAMP,
  HOUR_TIMESTAMP_ENTITY_TYPE,
  DAY_TIMESTAMP_ENTITY_TYPE,
  WEEK_TIMESTAMP_ENTITY_TYPE,
  UNDER_TWO_WEEKS_TIMESTAMP,
} from "./fixtures";

beforeEach(() => {
  clearStore();

  let block = createBlock(START_TIMESTAMP, "0");
  handleBlock(block);
});

describe("setup", () => {
  test("should have indexed the base timestamp", () => {
    assert.fieldEquals(HOUR_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "id", START_TIMESTAMP);
    assert.fieldEquals(HOUR_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "timestamp", START_TIMESTAMP);
    assert.fieldEquals(HOUR_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "blockTimestamp", START_TIMESTAMP);
    assert.fieldEquals(HOUR_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "blockNumber", "0");
    assert.entityCount(HOUR_TIMESTAMP_ENTITY_TYPE, 1);

    assert.fieldEquals(DAY_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "id", START_TIMESTAMP);
    assert.fieldEquals(DAY_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "timestamp", START_TIMESTAMP);
    assert.fieldEquals(DAY_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "blockTimestamp", START_TIMESTAMP);
    assert.fieldEquals(DAY_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "blockNumber", "0");
    assert.entityCount(DAY_TIMESTAMP_ENTITY_TYPE, 1);

    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "id", START_TIMESTAMP);
    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "timestamp", START_TIMESTAMP);
    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "blockTimestamp", START_TIMESTAMP);
    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, START_TIMESTAMP, "blockNumber", "0");
    assert.entityCount(WEEK_TIMESTAMP_ENTITY_TYPE, 1);
  });
});


describe("HourTimestamp", () => {
  test("should index next hour", () => {
    let block = createBlock(OVER_HOUR_TIMESTAMP, "1");
    handleBlock(block);

    assert.fieldEquals(HOUR_TIMESTAMP_ENTITY_TYPE, ON_HOUR_TIMESTAMP, "id", ON_HOUR_TIMESTAMP);
    assert.fieldEquals(HOUR_TIMESTAMP_ENTITY_TYPE, ON_HOUR_TIMESTAMP, "timestamp", ON_HOUR_TIMESTAMP);
    assert.fieldEquals(HOUR_TIMESTAMP_ENTITY_TYPE, ON_HOUR_TIMESTAMP, "blockTimestamp", OVER_HOUR_TIMESTAMP);
    assert.fieldEquals(HOUR_TIMESTAMP_ENTITY_TYPE, ON_HOUR_TIMESTAMP, "blockNumber", "1");
    assert.entityCount(HOUR_TIMESTAMP_ENTITY_TYPE, 2);

  });

  test("should not index the same hour twice", () => {
    let block = createBlock(UNDER_HOUR_TIMESTAMP, "1");
    handleBlock(block);

    assert.entityCount("HourTimestamp", 1);
  });
});

describe("DayTimestamp", () => {
  test("should index next day", () => {
    let block = createBlock(OVER_DAY_TIMESTAMP, "1");
    handleBlock(block);

    assert.fieldEquals(DAY_TIMESTAMP_ENTITY_TYPE, ON_DAY_TIMESTAMP, "id", ON_DAY_TIMESTAMP);
    assert.fieldEquals(DAY_TIMESTAMP_ENTITY_TYPE, ON_DAY_TIMESTAMP, "timestamp", ON_DAY_TIMESTAMP);
    assert.fieldEquals(DAY_TIMESTAMP_ENTITY_TYPE, ON_DAY_TIMESTAMP, "blockTimestamp", OVER_DAY_TIMESTAMP);
    assert.fieldEquals(DAY_TIMESTAMP_ENTITY_TYPE, ON_DAY_TIMESTAMP, "blockNumber", "1");
    assert.entityCount(DAY_TIMESTAMP_ENTITY_TYPE, 2);

  });

  test("should not index the same day twice", () => {
    let block = createBlock(UNDER_DAY_TIMESTAMP, "1");
    handleBlock(block);

    assert.entityCount(DAY_TIMESTAMP_ENTITY_TYPE, 1);
  });
});

describe("WeekTimestamp", () => {
  test("should index next week", () => {
    let block = createBlock(OVER_WEEK_TIMESTAMP, "1");
    handleBlock(block);

    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, ON_WEEK_TIMESTAMP, "id", ON_WEEK_TIMESTAMP);
    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, ON_WEEK_TIMESTAMP, "timestamp", ON_WEEK_TIMESTAMP);
    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, ON_WEEK_TIMESTAMP, "blockTimestamp", OVER_WEEK_TIMESTAMP);
    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, ON_WEEK_TIMESTAMP, "blockNumber", "1");
    assert.entityCount(WEEK_TIMESTAMP_ENTITY_TYPE, 2);

  });

  test("should index on Monday 00:00:00", () => {
    // create a block with a timestamp that is 14 days - 1 second (Sunday 23:59:59)
    let block = createBlock(UNDER_TWO_WEEKS_TIMESTAMP, "1");
    handleBlock(block);

    // assert that the week timestamp entity id and timestamp are correct for Monday 00:00:00
    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, ON_WEEK_TIMESTAMP, "id", ON_WEEK_TIMESTAMP);
    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, ON_WEEK_TIMESTAMP, "timestamp", ON_WEEK_TIMESTAMP);
    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, ON_WEEK_TIMESTAMP, "blockTimestamp", UNDER_TWO_WEEKS_TIMESTAMP);
    assert.fieldEquals(WEEK_TIMESTAMP_ENTITY_TYPE, ON_WEEK_TIMESTAMP, "blockNumber", "1");
    assert.entityCount(WEEK_TIMESTAMP_ENTITY_TYPE, 2);
  });

  test("should not index the same week twice", () => {
    let block = createBlock(UNDER_WEEK_TIMESTAMP, "1");
    handleBlock(block);

    assert.entityCount(WEEK_TIMESTAMP_ENTITY_TYPE, 1);
  });
});
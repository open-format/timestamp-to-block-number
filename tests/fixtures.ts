import { BigInt } from "@graphprotocol/graph-ts";
import { secondsInHour, secondsInDay, secondsInWeek } from "../src/constants";

export const startTimestamp = BigInt.fromI32(1704067200);

// Base timestamp: 2024-01-01 00:00:00 UTC (Monday)
export const START_TIMESTAMP = startTimestamp.toString();

// Hour timestamps
export const UNDER_HOUR_TIMESTAMP = (startTimestamp.plus(secondsInHour.minus(BigInt.fromI32(1)))).toString(); // 2024-01-01 00:59:59
export const ON_HOUR_TIMESTAMP = (startTimestamp.plus(secondsInHour)).toString(); // 2024-01-01 01:00:00
export const OVER_HOUR_TIMESTAMP = (startTimestamp.plus(secondsInHour.plus(BigInt.fromI32(1)))).toString(); // 2024-01-01 01:00:01

// Day timestamps
export const UNDER_DAY_TIMESTAMP = (startTimestamp.plus(secondsInDay.minus(BigInt.fromI32(1)))).toString(); // 2024-01-01 23:59:59
export const ON_DAY_TIMESTAMP = (startTimestamp.plus(secondsInDay)).toString(); // 2024-01-02 00:00:00
export const OVER_DAY_TIMESTAMP = (startTimestamp.plus(secondsInDay.plus(BigInt.fromI32(1)))).toString(); // 2024-01-02 00:00:01

// Week timestamps
export const UNDER_WEEK_TIMESTAMP = (startTimestamp.plus(secondsInWeek.minus(BigInt.fromI32(1)))).toString(); // 2024-01-07 23:59:59
export const ON_WEEK_TIMESTAMP = (startTimestamp.plus(secondsInWeek)).toString(); // 2024-01-08 00:00:00
export const OVER_WEEK_TIMESTAMP = (startTimestamp.plus(secondsInWeek.plus(BigInt.fromI32(1)))).toString(); // 2024-01-08 00:00:01

// 2024-01-13 23:59:59 (Sunday)
export const UNDER_TWO_WEEKS_TIMESTAMP = (startTimestamp.plus(secondsInWeek.times(BigInt.fromI32(2))).minus(BigInt.fromI32(1))).toString();

export const HOUR_TIMESTAMP_ENTITY_TYPE = "HourTimestamp";
export const DAY_TIMESTAMP_ENTITY_TYPE = "DayTimestamp";
export const WEEK_TIMESTAMP_ENTITY_TYPE = "WeekTimestamp";
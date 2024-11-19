import { ethereum, BigInt } from '@graphprotocol/graph-ts';
import { HourTimestamp, DayTimestamp, WeekTimestamp} from "../generated/schema";
import { secondsInHour, secondsInDay, secondsInWeek } from "./constants";
export function handleBlock(block: ethereum.Block): void {
  let hourTimestamp = floorToPreviousHour(block.timestamp);
  let isHourIndexed = isHourTimestampIndexed(hourTimestamp.toString())
  if(isHourIndexed){
    return;
  }

  createHourTimestamp(block, hourTimestamp);

  let dayTimestamp = floorToPreviousDay(block.timestamp);
  let isDayIndexed = isDayTimestampIndexed(dayTimestamp.toString())
  if(isDayIndexed){
    return;
  }

  createDayTimestamp(block, dayTimestamp);

  let weekTimestamp = floorToPreviousWeek(block.timestamp);
  let isWeekIndexed = isWeekTimestampIndexed(weekTimestamp.toString())
  if(isWeekIndexed){
    return;
  }

  createWeekTimestamp(block, weekTimestamp);
}

function createHourTimestamp(block: ethereum.Block, timestamp: BigInt): void {
  let entity = new HourTimestamp(timestamp.toString());

  entity.timestamp = timestamp;
  entity.blockTimestamp = block.timestamp;
  entity.blockNumber = block.number;

  entity.save();
}

function createDayTimestamp(block: ethereum.Block, timestamp: BigInt): void {
  let entity = new DayTimestamp(timestamp.toString());

  entity.timestamp = timestamp;
  entity.blockTimestamp = block.timestamp;
  entity.blockNumber = block.number;

  entity.save();
}

function createWeekTimestamp(block: ethereum.Block, timestamp: BigInt): void {
  let entity = new WeekTimestamp(timestamp.toString());

  entity.timestamp = timestamp;
  entity.blockTimestamp = block.timestamp;
  entity.blockNumber = block.number;

  entity.save();
}

function floorToPreviousHour(timestamp: BigInt): BigInt {
  return timestamp.div(secondsInHour).times(secondsInHour)
}

function floorToPreviousDay(timestamp: BigInt): BigInt {
  return timestamp.div(secondsInDay).times(secondsInDay)
}

function floorToPreviousWeek(timestamp: BigInt): BigInt {
  // Adjust to start week on Monday 00:00:00 with UTC epoch (which starts on Thursday)
  let threeDays = secondsInDay.times(BigInt.fromI32(3));
  return timestamp.plus(threeDays).div(secondsInWeek).times(secondsInWeek).minus(threeDays)
}

function isHourTimestampIndexed (id: string): boolean {
  return HourTimestamp.load(id) !== null;
}

function isDayTimestampIndexed (id: string): boolean {
  return DayTimestamp.load(id) !== null;
}

function isWeekTimestampIndexed (id: string): boolean {
  return WeekTimestamp.load(id) !== null;
}
import { ethereum, BigInt } from '@graphprotocol/graph-ts';
import { HourTimestamp } from "../generated/schema";

export const secondsInHour = BigInt.fromI32(3600);

export function handleBlock(block: ethereum.Block): void {
  let hourTimestamp = floorToPreviousHour(block.timestamp);

  let isIndexed = isHourTimestampIndexed(hourTimestamp.toString())

  if(!isIndexed){
    createHourTimestamp(block, hourTimestamp);
  }
}

function createHourTimestamp(block: ethereum.Block, timestamp: BigInt): void {
  let entity = new HourTimestamp(timestamp.toString());

  entity.timestamp = timestamp;
  entity.blockTimestamp = block.timestamp;
  entity.blockNumber = block.number;

  entity.save();
}

function floorToPreviousHour(timestamp: BigInt): BigInt {
  return timestamp.div(secondsInHour).times(secondsInHour)
}

function isHourTimestampIndexed (id: string): boolean {
  return HourTimestamp.load(id) !== null;
}
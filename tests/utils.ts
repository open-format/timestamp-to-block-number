import { ethereum, BigInt } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as/assembly/index";

export function createBlock(timestamp: string, blockNumber: string): ethereum.Block {
  let block = changetype<ethereum.Block>(newMockEvent());
  block.timestamp = BigInt.fromString(timestamp);
  block.number = BigInt.fromString(blockNumber);
  return block;
}
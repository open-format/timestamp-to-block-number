import { BigInt } from "@graphprotocol/graph-ts";

export const secondsInHour = BigInt.fromI32(3600);
export const secondsInDay = secondsInHour.times(BigInt.fromI32(24));
export const secondsInWeek = secondsInDay.times(BigInt.fromI32(7));
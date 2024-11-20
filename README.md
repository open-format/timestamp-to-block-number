# Timestamp to Block number

A graphql API to get hourly, daily or weekly block numbers between two timestamps.

## Endpoints
| chain                      | endpoint                                                                                            |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| arbitrum sepolia (testnet) | https://api.studio.thegraph.com/query/82634/timestamp-to-block-number/version/latest                |
| aurora testnet             | https://api.studio.thegraph.com/query/82634/timestamp-to-block-number-aurora-testnet/version/latest |
| aurora                     | https://api.studio.thegraph.com/query/82634/timestamp-to-block-number-aurora/version/latest         |


## Timestamps
Timestamps are returned in the format of unix time floored to the nearest time interval based on UTC time.

For example:
`1698050400` corresponds to `2024-10-23 11:00:00 UTC` which would be an `hour` time interval

day intervals start at `00:00:00 UTC`
week intervals start at `Monday 00:00:00 UTC`


## Block Numbers
The block numbers returned are the first of the given time interval.

So in our example for the timestamp `1698050400` the blocknumber returned will be from the first block mined after that timestamp.

Block numbers before `32647240` on `arbitrum sepolia` are not indexed as open format contracts where not deployed before then.

## Schema
```graphql
<time interval>Timestamps {
  id: ID!

  # Unix timestamp floored to the time interval
  timestamp: BigInt!

  # The first block mined of the given time interval
  blockNumber: BigInt!

  # The actual timestamp of the first block of a given time interval
  blockTimestamp: BigInt!
}
```

## Examples

### Latest
The latest 100 block numbers "on the hour"

query:
```graphql
{
  hourTimestamps(
    first: 100
    orderDirection: desc
    orderBy: timestamp
  ){
    timestamp
    blockNumber
  }
}
```
result:
```graphql
{
  "data": {
    "hourTimestamps": [
      {
        "timestamp": "1731384000",
        "blockNumber": "9337"
      },

      # ... omitted for brevity

      {
        "timestamp": "1729854000",
        "blockNumber": "0"
      }
    ]
  }
}
```

### Between two timestamps
The block numbers "on the hour" between two timestamps

query:
```
{
  hourTimestamps(
    where : {
      timestamp_gte: "1729983600"
      timestamp_lte: "1730073600"
    }
    orderDirection: desc
    orderBy: timestamp
  ){
    timestamp
    blockNumber
  }
}
```
result:
```graphql
{
  "data": {
    "hourTimestamps": [
      {
        "timestamp": "1730073600",
        "blockNumber": "4270"
      },
      {
        "timestamp": "1730070000",
        "blockNumber": "4268"
      },
      {
        "timestamp": "1729983600",
        "blockNumber": "4266"
      }
    ]
  }
}
```
### Daily or weekly

The previous examples used the time interval of an `hour`

For day time interval swap `hourTimestamps` for `dayTimestamps`
For week time interval swap `hourTimestamps` for `weekTimestamps`

## Run locally

Use forge anvil to run a local blockchain that mines every second.
```
anvil --host 0.0.0.0 --block-time 1
```

### Deploy locally

Deploy to a local [graph-node](https://github.com/graphprotocol/graph-node) running. We recommend using [Docker Compose](https://github.com/graphprotocol/graph-node/tree/master/docker#docker-compose).

Prepare a `subgraph.local.yml` file
```
yarn prepare:local
```
Generate schema from the `subgraph.local.yml` file
```
yarn gen:local
```
Create a subgraph on the local running graph-node
```
yarn create:local
```
Deploy to the locally running graph-node
```
yarn deploy:local
```

### Modify block timestamp on anvil

The rpc method `evm_increaseTime` can be used to increase the time in the anvil instance.

Increase time by one hour
```
curl -X POST http://localhost:8545 \
-H "Content-Type: application/json" \
-d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "evm_increaseTime",
    "params": [3600]
}'
```

Increase time by one day
```
curl -X POST http://localhost:8545 \
-H "Content-Type: application/json" \
-d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "evm_increaseTime",
    "params": [86400]
}'
```

Increase time by one week
```
curl -X POST http://localhost:8545 \
-H "Content-Type: application/json" \
-d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "evm_increaseTime",
    "params": [604800]
}'
```
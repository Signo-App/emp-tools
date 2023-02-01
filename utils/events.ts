import { Contract } from "ethers";
import { contractToBlockCreated } from "./Contracts";

export const getEventData = async (
  contract: Contract,
  eventName: string,
  filter: Array<string | null> | [],
  startBlock?: number,
  endBlock?: number
) => {
  if (!startBlock || !endBlock)
    return contract.queryFilter(contract.filters[eventName](...filter));

  let allEvents: any[] = [];
  let from = startBlock;
  let to = endBlock;
  // Since query filter sometime fails and only works for up untill 5000 blocks, this works if block diff > 5000 b/w startBlock and endBlock.
  for (let i = from; i < to; i += 5000) {
    const _startBlock = i;
    const _endBlock = Math.min(to, i + 4999);
    const events = await contract.queryFilter(
      contract.filters[eventName](...filter),
      _startBlock,
      _endBlock
    );
    allEvents = [...allEvents, ...events];
  }
  return allEvents;
};

export const getPositionCreatedEventData = async (
  contract: Contract,
  filter: Array<string | null> = []
) => {
  const start: number = contractToBlockCreated[contract.address.toLowerCase()];
  const end = await contract.provider.getBlockNumber();

  return getEventData(contract, "PositionCreated", filter, start, end);
};

export const getEndedSponsorPositionEventData = async (
  contract: Contract,
  filter: Array<string | null> = []
) => {
  const start: number = contractToBlockCreated[contract.address.toLowerCase()];
  const end = await contract.provider.getBlockNumber();

  return getEventData(contract, "EndedSponsorPosition", filter, start, end);
};

export const getLiquidationCreatedEventData = async (
  contract: Contract,
  filter: Array<string | null> = []
) => {
  const start: number = contractToBlockCreated[contract.address.toLowerCase()];
  const end = await contract.provider.getBlockNumber();

  return getEventData(contract, "LiquidationCreated", filter, start, end);
};

export const getLiquidationDisputedEventData = async (
  contract: Contract,
  filter: Array<string | null> = []
) => {
  const start = contractToBlockCreated[contract.address.toLowerCase()];
  const end = await contract.provider.getBlockNumber();

  return getEventData(contract, "LiquidationDisputed", filter, start, end);
};

export const getDisputeSettledEventData = async (
  contract: Contract,
  filter: Array<string | null> = []
) => {
  const start = contractToBlockCreated[contract.address.toLowerCase()];
  const end = await contract.provider.getBlockNumber();

  return getEventData(contract, "DisputeSettled", filter, start, end);
};

export const getLiquidationWithdrawnEventData = async (
  contract: Contract,
  filter: Array<string | null> = []
) => {
  const start = contractToBlockCreated[contract.address.toLowerCase()];
  const end = await contract.provider.getBlockNumber();

  return getEventData(contract, "LiquidationWithdrawn", filter, start, end);
};

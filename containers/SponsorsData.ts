import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import EmpContract from "./EmpContract";
import {
  getEndedSponsorPositionEventData,
  getPositionCreatedEventData,
} from "../utils/events";

type SponsorData = {
  __typename: string; // SponsorPosition
  collateral: string;
  isEnded: boolean;
  tokensOutstanding: string;
  withdrawalRequestPassTimestamp: string;
  withdrawalRequestAmount: string;
  transferPositionRequestPassTimestamp: string;
  sponsor: {
    __typename: string; // Sponsor
    id: string;
  };
};

function useSponsorsDataGetter() {
  const { contract: emp } = EmpContract.useContainer();

  const [positionsData, setPositionsData] = useState<SponsorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const querySponsorsData = async () => {
    if (!(emp && emp !== null)) return;
    const rawPositionEventData = await getPositionCreatedEventData(emp);
    const allPositionsData = await Promise.all(
      rawPositionEventData.map(async (item: any) => {
        const filter = [item.args.sponsor];
        const result = {
          pos: await emp.positions(item.args.sponsor),
          isEnded: Boolean(
            (await getEndedSponsorPositionEventData(emp, filter))[0]
          ),
        };
        return result;
      })
    );

    console.log({
      allPositionsData,
    });

    rawPositionEventData.map((item: any, index: number) => {
      const newPos = {
        __typename: "SponsorPosition",
        collateral: allPositionsData[index].pos.collateral.toString(),
        isEnded: allPositionsData[index].isEnded,
        tokensOutstanding: item.args.tokenAmount.toString(),
        withdrawalRequestPassTimestamp: allPositionsData[
          index
        ].pos.withdrawalRequestPassTimestamp.toString(),
        withdrawalRequestAmount: allPositionsData[
          index
        ].pos.withdrawalRequestAmount.toString(),
        transferPositionRequestPassTimestamp: allPositionsData[
          index
        ].pos.transferPositionRequestPassTimestamp.toString(),
        sponsor: {
          __typename: "Sponsor",
          id: item.args.sponsor,
        },
      };
      setPositionsData((prevState: SponsorData[]) => {
        return [...prevState, newPos];
      });
    });

    setLoading(false);
  };

  // update positions data depends on emp
  useEffect(() => {
    querySponsorsData();
  }, [emp]);

  return {
    positionsData,
    loading,
  };
}

const SponsorsData = createContainer(useSponsorsDataGetter);

export default SponsorsData;

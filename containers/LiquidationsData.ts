import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import EmpContract from "./EmpContract";
import { getDisputeSettledEventData, getLiquidationCreatedEventData, getLiquidationDisputedEventData } from "../utils/events";

enum LiquidationStatus {
    PreDispute = "PreDispute",
    PendingDispute = "PendingDispute",
    DisputeSucceeded = "DisputeSucceeded",
    DisputeFailed = "DisputeFailed"
}

type event = {
    __typename: string;
    timestamp: string;
    tx_hash: string;
};

type LiquidationData = {
    __typename: string;
    id: string;
    sponsor: {
        __typename: string;
        id: string;
    };
    liquidationId: string;
    liquidator: string;
    disputer: string | null;
    tokensLiquidated: string;
    lockedCollateral: string;
    liquidatedCollateral: string;
    status: LiquidationStatus;
    events: event[]
}

function useLiquidationsDataGetter() {
    const { contract: emp } = EmpContract.useContainer();


    const [liquidations, setLiquidations] = useState<LiquidationData[]>([]);

    const queryLiquidations = async () => {
        if (!(emp && emp !== null)) return;
        setLiquidations([]);
        const rawLiquidationsData = await getLiquidationCreatedEventData(emp);
        rawLiquidationsData.map(async (item: any) => {

            const filter = [item.args.sponsor, item.args.liquidator]

            const disputeData = await getLiquidationDisputedEventData(emp, filter)

            const events: event[] = [];
            let status: LiquidationStatus = LiquidationStatus.PreDispute;
            if (disputeData.length) {
                status = LiquidationStatus.PendingDispute;
                events.push({
                    __typename: disputeData[0].event + "Event",
                    timestamp: (await disputeData[0].getBlock()).timestamp,
                    tx_hash: disputeData[0].transactionHash,
                })

                const disputeSettlementData = await getDisputeSettledEventData(emp, [null, ...filter])
                if (disputeSettlementData.length) {
                    events.push({
                        __typename: disputeSettlementData[0].event + "Event",
                        timestamp: (await disputeSettlementData[0].getBlock()).timestamp,
                        tx_hash: disputeSettlementData[0].transactionHash,
                    })
                    status = disputeSettlementData[0].args.disputeSucceeded ? LiquidationStatus.DisputeSucceeded : LiquidationStatus.DisputeFailed;
                }
            }

            setLiquidations((prevState: LiquidationData[]) => {
                return [...prevState, {
                    __typename: "Liquidation",
                    id: item.args.sponsor + '-' + emp.address + '-' + item.args.liquidationId.toString(),
                    sponsor: {
                        __typename: "Sponsor",
                        id: item.args.sponsor
                    },
                    liquidationId: item.args.liquidationId.toString(),
                    liquidator: item.args.liquidator,
                    disputer: null,
                    tokensLiquidated: item.args.tokensOutstanding.toString(),
                    lockedCollateral: item.args.lockedCollateral.toString(),
                    // Need to test this value
                    liquidatedCollateral: item.args.tokensOutstanding.toString(),
                    status: status,
                    events: [
                        {
                            __typename: item.event + "Event",
                            timestamp: item.args.liquidationTime.toString(),
                            tx_hash: item.transactionHash,
                        },
                        ...events
                    ]
                }]
            })
        })
    };

    // update liquidations data depends on emp
    useEffect(() => {
        queryLiquidations()
    }, [emp]);

    return {
        liquidations,
    };
}

const LiquidationsData = createContainer(useLiquidationsDataGetter);

export default LiquidationsData;

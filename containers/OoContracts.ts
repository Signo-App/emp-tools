import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import oo from "@uma/core-1-2/build/contracts/OptimisticOracle.json";
import Connection from "./Connection";

const { formatBytes32String: utf8ToHex } = ethers.utils;

function useContracts() {
  const { provider } = Connection.useContainer();
  const [
    optimisticOracleContract,
    setOptimisticOracleContract,
  ] = useState<ethers.Contract | null>(null);
  const setOoContracts = async () => {
    /*
      Sumero Fix: optimistic oracle implemented and unused contracts(voting and store) removed.
    */
    if (provider != null) {
      const optimisticOracle = new ethers.Contract(
        "0xA5B9d8a0B0Fa04Ba71BDD68069661ED5C0848884",
        oo.abi,
        provider
      );
      setOptimisticOracleContract(optimisticOracle);
    }
  };
  useEffect(() => {
    setOptimisticOracleContract(null);
    setOoContracts();
  }, [provider]);

  return { optimisticOracleContract };
}

const Contracts = createContainer(useContracts);

export default Contracts;

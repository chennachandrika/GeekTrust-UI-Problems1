import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../Header";
import Planets from "../Planets";

import { loadPlanets, loadVehicals } from "../../store/findFalcone";
import {
  MainContainer,
  ChoosePlanetsContainer,
  Footer,
  ReferenceLink,
  Heading,
  Para,
  PlanetsHolder,
  Button
} from "./styledComponents";

const FindFalcone = () => {
  const [isVehicalsSelected, setStatus] = useState(false);
  const selectedData = useSelector(
    (store) => store.entities.findFalcone.selectedData
  );
  const totalTimeTaken = useSelector(
    (store) => store.entities.findFalcone.totalTimeTaken
  );
  const isPlanetsDataLoading = useSelector(
    (store) => store.entities.findFalcone.isPlanetsDataLoading
  );

  const dispatch = useDispatch();
  const checkVehicals = () => {
    const vehicals = selectedData.map((data) => data.selectedVehical);
    const value = vehicals.filter((vehical) => vehical === "");
    if (value.length === 0) {
      setStatus({ isVehicalsSelected: true });
    }
    console.log(value);
  };

  useEffect(() => {
    dispatch(loadPlanets());
    dispatch(loadVehicals());
  }, []);
  return (
    <>
      <Header />
      <MainContainer>
        <Heading>Select planets you wants to search in:</Heading>
        <Heading>Time Taken: {totalTimeTaken}</Heading>
        <ChoosePlanetsContainer>
          {isPlanetsDataLoading ? (
            <Para>Loading...</Para>
          ) : (
            selectedData.map((planetsInfo, index) => (
              <PlanetsHolder key={index}>
                <Para>Direction {index + 1}</Para>
                <Planets
                  key={index}
                  id={planetsInfo.id}
                  planetsInfo={planetsInfo.availablePlanets}
                  vehicalsInfo={planetsInfo.availableVehicals}
                />
              </PlanetsHolder>
            ))
          )}
        </ChoosePlanetsContainer>
      </MainContainer>

      <Footer>
        <Button disabled={!isVehicalsSelected} type="button">
          Find Falcone
        </Button>
        <ReferenceLink href="https://www.geektrust.in/coding-problem/frontend/space">
          Coding Problem :
          https://www.geektrust.in/coding-problem/frontend/space
        </ReferenceLink>
      </Footer>
    </>
  );
};

export default FindFalcone;

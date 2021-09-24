import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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
  PlanetsHolder
} from "./styledComponents";

const FindFalcone = () => {
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
          {!isPlanetsDataLoading &&
            selectedData.map((planetsInfo, index) => (
              <PlanetsHolder>
                <Para>Direction {index + 1}</Para>
                <Planets
                  key={index}
                  id={planetsInfo.id}
                  planetsInfo={planetsInfo.availablePlanets}
                  vehicalsInfo={planetsInfo.availableVehicals}
                />
              </PlanetsHolder>
            ))}
        </ChoosePlanetsContainer>
      </MainContainer>
      <Footer>
        <ReferenceLink href="https://www.geektrust.in/coding-problem/frontend/space">
          Coding Problem :
          https://www.geektrust.in/coding-problem/frontend/space
        </ReferenceLink>
      </Footer>
    </>
  );
};

export default FindFalcone;

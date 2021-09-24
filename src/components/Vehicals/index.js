import { useDispatch } from "react-redux";
import { vehicalSelected } from "../../store/findFalcone";
import { RadioWrapper, RadioButton, Label } from "./styledComponents";

const Vehicals = (props) => {
  const { vehicalsData, id, planetName } = props;
  const dispatch = useDispatch();
  const onChangeVehical = (event) => {
    dispatch(vehicalSelected({ id: id, selectedVehical: event.target.value }));
  };

  return (
    <>
      {vehicalsData &&
        vehicalsData.map((vehical, index) => (
          <RadioWrapper
            key={`vehical ${planetName} ${index}`}
            onChange={onChangeVehical}
          >
            <RadioButton
              type="radio"
              id={`vehical ${planetName} ${index}`}
              name={planetName}
              value={vehical.name}
            />
            <Label htmlFor={`vehical ${planetName} ${index}`}>
              {vehical.name} ({vehical.total_no})
            </Label>
          </RadioWrapper>
        ))}
    </>
  );
};

export default Vehicals;

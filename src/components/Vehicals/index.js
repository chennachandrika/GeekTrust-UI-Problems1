import { useDispatch } from "react-redux";
import { vehicalSelected } from "../../store/findFalcone";
import { RadioWrapper, RadioButton, Label } from "./styledComponents";

const Vehicals = (props) => {
  const { vehicalsData, id, planetName } = props;
  const dispatch = useDispatch();
  const getVehicalSpeed = (vehicalName) => {
    const vehicalSpeed = vehicalsData.filter(
      (vehical) => vehical.name === vehicalName
    );
    console.log(vehicalSpeed, vehicalSpeed[0].speed);

    return vehicalSpeed[0].speed;
  };
  const onChangeVehical = (event) => {
    dispatch(
      vehicalSelected({
        id: id,
        selectedVehical: event.target.value,
        vehicalspeed: getVehicalSpeed(event.target.value)
      })
    );
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
              disabled={vehical.total_no === 0}
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

import { useState, useEffect } from "react";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { State } from "../../App";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

type Props = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
} & RouteComponentProps;

const schema = yup.object().shape({
  inventory: yup
    .number()
    .min(1000, "You need to have more stuff to run your business, stupid")
    .max(10000000, "Whoah, calm down Scrooge McDuck")
});

const maxECommerceInventory = 2000000;
const maxITInventory = 500000;

export default function Inventory({ state, setState }: Props): JSX.Element {
  const [isHighCare, setIsHighCare] = useState<boolean>(false);
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const inventoryValue = watch("inventory");

  const onSubmit = (formData: { inventory: string }): void => {
    setState({ ...state, inventory: formData.inventory });
    if (isHighCare) {
      navigate("/highcare");
    } else {
      navigate("/checkout");
    }
  };

  const goBack = (): void => {
    navigate("/activity");
  };

  useEffect(() => {
    const moreThan4Activities = state.activities.length > 4;
    const isECommerceSector = state.activities.find(
      ({ sectorName }) => sectorName === "e-commerce"
    );
    const isITSector = state.activities.find(
      ({ sectorName }) => sectorName === "IT"
    );

    let maxInventory = maxECommerceInventory;

    if (isITSector) {
      maxInventory = maxITInventory;
    }
    if (isECommerceSector && isITSector) {
      maxInventory = maxECommerceInventory + maxITInventory;
    }
    setIsHighCare(moreThan4Activities || Number(inventoryValue) > maxInventory);
  }, [state, inventoryValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Inventory and goods</h1>
        <h2>Enter estimated value of your inventory</h2>
        <div className="wrapper">
          <div className="input-wrapper">
            <label>Total value of goods</label>
            <input
              id="inventory"
              type="number"
              name="inventory"
              ref={register}
              defaultValue={state.inventory}
              placeholder="0"
            />
          </div>
          {errors?.inventory && (
            <div className="error-message">{errors?.inventory?.message}</div>
          )}
          <button type="button" onClick={goBack}>
            Go back
          </button>
          <button id="inventory-next-page-btn" type="submit">Next page</button>
        </div>
      </form>
    </>
  );
}

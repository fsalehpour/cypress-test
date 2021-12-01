import { RouteComponentProps, useNavigate } from "@reach/router";
import { State } from "../../App";
import { useActivities } from "../../hooks/useMockData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

type Props = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
} & RouteComponentProps;

const schema = yup.object().shape({
  activities: yup.array().min(1, "No activity can lead to health problems")
});

export default function Activity({ state, setState }: Props): JSX.Element {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const data = useActivities();
  const navigate = useNavigate();
  const sectors = [...new Set(data.map(({ sectorName }) => sectorName))];

  const isChecked = (id: string): boolean => {
    return !!state.activities.find((activity) => activity.id === id);
  };

  const onSubmit = (formData: { activities: string[] }): void => {
    const checked = data.filter(({ id }) => {
      return formData.activities.includes(id);
    });
    setState({ ...state, activities: checked });
    navigate("/inventory");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Which activities do you want to insure?</h1>
      <h2>Select the activities of your company.</h2>
      <div className="wrapper">
        {sectors.map((sectorName) => (
          <div className="sectorWrapper" key={sectorName}>
            <h3>{sectorName}</h3>
            {data
              .filter((activity) => activity.sectorName === sectorName)
              .map(({ id, title }) => (
                <label className="checkbox" key={id}>
                  <input
                    id={`activity-${id}`}
                    type="checkbox"
                    name="activities"
                    value={id}
                    ref={register}
                    defaultChecked={isChecked(id)}
                  />
                  {title}
                </label>
              ))}
          </div>
        ))}
        {errors?.activities && (
          <div className="error-message">{errors?.activities?.message}</div>
        )}
        <button id="next-page-button" type="submit">Next page</button>
      </div>
    </form>
  );
}

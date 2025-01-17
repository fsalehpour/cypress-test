import { RouteComponentProps, useNavigate } from "@reach/router";

export default function HighCare(_: RouteComponentProps): JSX.Element {
  const navigate = useNavigate();

  const goBack = (): void => {
    navigate("/inventory");
  };

  return (
    <>
      <h1>Something went wrong! :(</h1>
      <h2>We will need more information of your company.</h2>
      <div className="wrapper">
        <iframe
          title="highCare kitty"
          src="https://giphy.com/embed/VbnUQpnihPSIgIXuZv"
          width="384"
          height="480"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
        <button type="button" onClick={goBack}>
          Go back
        </button>
      </div>
    </>
  );
}

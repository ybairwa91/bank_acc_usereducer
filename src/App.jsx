import { useReducer } from "react";

const initialState = { balance: 0, loan: 0, status: "closed", disabled: true };

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return { ...state, status: "start", balance: 500, disabled: false };
    case "deposit":
      return {
        ...state,
        status: "deposit",
        balance: state.balance + 150,
      };

    case "withdraw":
      return {
        ...state,
        status: "withdraw",
        balance: state.balance - 50,
      };

    case "loan":
      if (state.loan > 0) return null;
      return {
        ...state,
        balance: state.balance + 5000,
        loan: state.loan + 5000,
      };
    case "pay":
      return {
        ...state,
        balance: state.balance - 5000,
        loan: state.loan - 5000,
      };
    case "close":
      return { ...initialState };
  }
}

function App() {
  const [{ balance, loan, disabled }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div>
      <h1>useReducer Bank Account</h1>

      <h2>Balance:{balance < 0 ? 0 : balance}</h2>
      <h2>Loan:{loan}</h2>
      <button
        disabled={!disabled}
        onClick={() => {
          dispatch({ type: "open" });
        }}
      >
        Open Account
      </button>
      <br />
      <br />
      <br />
      <button disabled={disabled} onClick={() => dispatch({ type: "deposit" })}>
        Deposit(150)
      </button>
      <br />
      <br />
      <br />
      <button
        disabled={disabled}
        onClick={() => dispatch({ type: "withdraw" })}
      >
        Withdraw(50)
      </button>
      <br />
      <br />
      <br />

      <button disabled={disabled} onClick={() => dispatch({ type: "loan" })}>
        Request a loan of 5000
      </button>
      <br />
      <br />
      <br />
      <button disabled={disabled} onClick={() => dispatch({ type: "pay" })}>
        Pay Loan
      </button>
      <br />
      <br />
      <br />
      <button disabled={disabled} onClick={() => dispatch({ type: "close" })}>
        Close the account
      </button>
    </div>
  );
}

export default App;

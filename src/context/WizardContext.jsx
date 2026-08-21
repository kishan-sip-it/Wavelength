import { createContext, useContext, useReducer, useCallback } from "react";

const WizardContext = createContext(null);

const initialState = {
  history: ["landing"],
  data: {
    email: "",
    newsletter: false,
    otp: "",
    username: "",
    name: "",
    dob: "",
    pronouns: [],
    inviteCode: "",
  },
  isSubmitting: false,
  toast: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "GO_TO": {
      if (state.history[state.history.length - 1] === action.screen) return state;
      return { ...state, history: [...state.history, action.screen], toast: null };
    }
    case "GO_BACK": {
      if (state.history.length <= 1) return state;
      return { ...state, history: state.history.slice(0, -1), toast: null };
    }
    case "SET_FIELD":
      return { ...state, data: { ...state.data, [action.field]: action.value } };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
    case "SHOW_TOAST":
      return { ...state, toast: { type: action.toastType, message: action.message } };
    case "CLEAR_TOAST":
      return { ...state, toast: null };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function WizardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const goTo = useCallback((screen) => dispatch({ type: "GO_TO", screen }), []);
  const goBack = useCallback(() => dispatch({ type: "GO_BACK" }), []);
  const setField = useCallback((field, value) => dispatch({ type: "SET_FIELD", field, value }), []);
  const setSubmitting = useCallback((value) => dispatch({ type: "SET_SUBMITTING", value }), []);
  const showToast = useCallback((toastType, message) => dispatch({ type: "SHOW_TOAST", toastType, message }), []);
  const clearToast = useCallback(() => dispatch({ type: "CLEAR_TOAST" }), []);
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const screen = state.history[state.history.length - 1];

  const value = {
    screen,
    data: state.data,
    isSubmitting: state.isSubmitting,
    toast: state.toast,
    goTo,
    goBack,
    setField,
    setSubmitting,
    showToast,
    clearToast,
    reset,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside a WizardProvider");
  return ctx;
}

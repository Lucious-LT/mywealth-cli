export const customSelectStyles = {
  control: (base: any, state: { isFocused: boolean }) => ({
    ...base,
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: "0.9rem",
    // lineHeight: "1.5rem",
    borderRadius: "0",
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: "pointer",
    padding: 0,
    borderBottom: "rgba(69, 90, 100, 0.4) solid 1.4px",
    backgroundColor: "none",
  }),

  option: (
    styles: any,
    {
      isFocused,
      isSelected,
    }: {
      isFocused: boolean;
      isSelected: boolean;
    }
  ) => {
    return {
      ...styles,
      cursor: "pointer",
      fontSize: "12px",
      backgroundColor: isSelected
        ? "rgba(236, 239, 241, 0.8)"
        : "white",
      borderRadius: isSelected ? "0.5em" : "0",
      color: isSelected ? "rgb(0, 0, 0)" : "rgb(38, 50, 56)",
      fontFamily: isFocused ? "'Nunito Sans', sans-serif" : "",
    };
  },

  input: (styles: any) => ({
    ...styles,
    color: "rgb(30, 41, 59)",
    fontFamily: "'Nunito Sans', sans-serif",
    marginBottom: 0,
    marginLeft: 0,
    fontSize: "12px",
    backgroundColor: "none",
    // outline: isFocused ? "2px solid transparent" : "",
    // outlineOffset: isFocused ? " 2px" : "",
    // border: "none"
  }),

  menu: (styles: any) => ({
    ...styles,
    marginTop: "6px",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    borderRadius: "0.375rem",
    // border: "1px solid rgb(226, 232, 240)",
    fontSize: "12px",
    fontWeight: "200",
    padding: "0.5rem",
    maxHeight: "200px",
    overflow: "auto",
  }),

  // singleValue: (styles: any) => ({
  //   ...styles,
  //   // color: classNames("text-primary"),
  // }),
};


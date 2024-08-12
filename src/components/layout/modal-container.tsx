const ModalContainer = (props: any) => {
  const { id, title, children, ...restProps} = props;
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal h-auto min-h-screen">
        <div className="bg-slate-50 modal-box relative w-11/12 max-w-3xl p-10">
          <label
            htmlFor={id}
            className="btn-sm btn-circle btn absolute right-5 top-5 border-0 bg-gray-800 text-xs font-semibold shadow-none hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg hover:shadow-gray-300"
          >
            ✕
          </label>
          <div className="mb-10 font-inter text-lg font-bold">{title}</div>
          {children}
        </div>
      </div>
    </>
  );
};
export default ModalContainer;

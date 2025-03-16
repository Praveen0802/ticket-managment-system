const AccountView = ({ account, className }) => {
  const { root = "" } = className;

  return (
    <div className={`flex flex-col gap-4 ${root}`}>
      <p className="text-[14px] font-medium">{account.type}</p>
      <div className="flex flex-col border border-gray-200 rounded-md">
        {account.fields.map((field, index) => (
          <div
            key={index}
            className="flex p-3 items-center justify-between border-b border-gray-200 last:border-none"
          >
            {field.title && <p className="text-[16px] font-medium">{field.title}</p>}
            {(field.label || field.value) && (
              <div className="flex flex-col gap-1">
                <p className="text-[12px] text-gray-600">{field.label}</p>
                <p className="text-[12px] font-medium">{field.value}</p>
              </div>
            )}
            {field.icon && field.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountView;

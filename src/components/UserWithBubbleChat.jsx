export function UserWithBubbleChat({ fullname, messageValue }) {
  return (
    <>
      <div>{fullname}</div>
      <div className="bg-slate-100 p-4 rounded-md">{messageValue}</div>
    </>
  );
}

export function BubbleChat({ fullname, message }) {
  return (
    <>
      <div>{fullname}</div>
      <div className="bg-slate-100 p-4 rounded-md">
        <p>{message}</p>
      </div>
    </>
  );
}

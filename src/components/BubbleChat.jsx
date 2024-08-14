export function BubbleChat({ fullname, message, bgColor }) {
  return (
    <>
      <div>{fullname}</div>
      <div className={`${bgColor} p-4 rounded-md`}>
        <p>{message}</p>
      </div>
    </>
  );
}

/*
  PROPS

  1. children: component bubble chat
*/

export function UserWithBubbleChat({ children }) {
  return (
    <>
      <div className="flex-col items-end justify-end text-end mb-4">
        {children}
      </div>
    </>
  );
}

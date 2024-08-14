/*
  PROPS

  1. children: component bubble chat
*/

export function AssistantWithBubbleChat({ children }) {
  return (
    <>
      <div className="flex-col items-start justify-start text-start mb-4">
        {children}
      </div>
    </>
  );
}

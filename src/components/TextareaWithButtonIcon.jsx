import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function TextareaWithButtonIcon({ placeholder, children }) {
  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Textarea placeholder={placeholder} />
        <Button type="submit">{children}</Button>
      </div>
    </>
  );
}

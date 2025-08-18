import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : name}
    </Button>
  );
}

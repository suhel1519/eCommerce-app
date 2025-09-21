import { useToast } from "@/hooks/use-toast";
import { Toast, ToastProvider } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} title={title} description={description} {...props}>
          {action}
        </Toast>
      ))}
    </ToastProvider>
  );
}
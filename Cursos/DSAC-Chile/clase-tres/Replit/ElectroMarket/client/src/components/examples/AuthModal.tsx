import AuthModal from '../AuthModal';
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AuthModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Abrir Modal de Autenticación
      </Button>
      
      <AuthModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onLogin={(email, password) => console.log('Login:', email, password)}
        onRegister={(name, email, password) => console.log('Register:', name, email, password)}
      />
    </div>
  );
}
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (email: string, password: string) => void;
  onRegister?: (name: string, email: string, password: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(loginData.email, loginData.password);
    console.log('Login attempt:', loginData.email);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    onRegister?.(registerData.name, registerData.email, registerData.password);
    console.log('Register attempt:', registerData.email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle data-testid="text-auth-title">Acceso a ElectroMarket</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" data-testid="tab-login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register" data-testid="tab-register">Registrarse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="tu@email.com"
                  required
                  data-testid="input-login-email"
                />
              </div>
              <div>
                <Label htmlFor="login-password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                    data-testid="input-login-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" data-testid="button-login">
                Iniciar Sesión
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="register-name">Nombre completo</Label>
                <Input
                  id="register-name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Juan Pérez"
                  required
                  data-testid="input-register-name"
                />
              </div>
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="tu@email.com"
                  required
                  data-testid="input-register-email"
                />
              </div>
              <div>
                <Label htmlFor="register-password">Contraseña</Label>
                <Input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={registerData.password}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  data-testid="input-register-password"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="••••••••"
                  required
                  data-testid="input-confirm-password"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={registerData.password !== registerData.confirmPassword}
                data-testid="button-register"
              >
                Crear Cuenta
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
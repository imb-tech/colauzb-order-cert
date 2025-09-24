import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Xatolik",
        description: "Iltimos, login va parolni kiriting.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simple demo credentials - in real app this would be handled by backend
    if (username === "admin" && password === "zavod123") {
      toast({
        title: "Muvaffaqiyat",
        description: "Admin paneliga xush kelibsiz!"
      });
      onLogin();
    } else {
      toast({
        title: "Xatolik", 
        description: "Login yoki parol noto'g'ri.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Admin Panel
          </CardTitle>
          <p className="text-muted-foreground">
            Xavfsizlik instruktaji tizimiga kirish
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Login</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Foydalanuvchi nomi"
                className="text-lg"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parol"
                  className="text-lg pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-3 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Kirish...
                </>
              ) : (
                "Kirish"
              )}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Demo uchun:</p>
            <p className="text-xs text-muted-foreground">Login: <code>admin</code></p>
            <p className="text-xs text-muted-foreground">Parol: <code>zavod123</code></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
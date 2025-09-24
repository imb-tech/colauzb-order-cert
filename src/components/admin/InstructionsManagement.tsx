import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Image,
  Save,
  X,
  AlertTriangle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { RulesContext } from "@/context/rules-context";

const InstructionsManagement = () => {
  const { rules } = useContext(RulesContext)
  const [editingRule, setEditingRule] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newRule, setNewRule] = useState({
    title: "",
    description: "",
    hasImage: false
  });

  const startEditing = (ruleId: number) => {
    setEditingRule(ruleId);
    setIsAddingNew(false);
  };

  const startAdding = () => {
    setIsAddingNew(true);
    setEditingRule(null);
    setNewRule({ title: "", description: "", hasImage: false });
  };

  const cancelEditing = () => {
    setEditingRule(null);
    setIsAddingNew(false);
  };

  const saveRule = (ruleId: number, updatedData: any) => {
    // This would normally save to backend
    // setRules(prev => prev.map(rule =>
    //   rule.id === ruleId ? { ...rule, ...updatedData } : rule
    // ));
    setEditingRule(null);
    toast({
      title: "Muvaffaqiyat",
      description: "Qoida muvaffaqiyatli yangilandi"
    });
  };

  const addNewRule = () => {
    if (!newRule.title.trim() || !newRule.description.trim()) {
      toast({
        title: "Xatolik",
        description: "Sarlavha va tavsifni to'ldiring",
        variant: "destructive"
      });
      return;
    }

    const newRuleData = {
      id: Math.max(...rules.map(r => r.id)) + 1,
      title: newRule.title,
      description: newRule.description,
      hasImage: newRule.hasImage,
      order: rules.length + 1
    };

    // setRules(prev => [...prev, newRuleData]);
    setIsAddingNew(false);
    setNewRule({ title: "", description: "", hasImage: false });

    toast({
      title: "Muvaffaqiyat",
      description: "Yangi qoida qo'shildi"
    });
  };

  const deleteRule = (ruleId: number) => {
    // setRules(prev => prev.filter(rule => rule.id !== ruleId));
    toast({
      title: "Muvaffaqiyat",
      description: "Qoida o'chirildi"
    });
  };

  const handleImageUpload = () => {
    toast({
      title: "Ma'lumot",
      description: "Rasmlar yuklash uchun Supabase integratsiyasi kerak",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Yo'riqnomalarni Boshqarish</h2>
          <p className="text-muted-foreground">Xavfsizlik qoidalarini tahrirlang, qo'shing yoki o'chiring</p>
        </div>
        <Button onClick={startAdding} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Yangi Qoida
        </Button>
      </div>

      {/* Warning about backend */}
      <Card className="border-warning bg-warning/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <p className="text-sm">
              <strong>Eslatma:</strong> O'zgarishlarni saqlash uchun Supabase integratsiyasini ulashingiz kerak.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add new rule form */}
      {isAddingNew && (
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle>Yangi Qoida Qo'shish</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="new-title">Sarlavha</Label>
              <Input
                id="new-title"
                value={newRule.title}
                onChange={(e) => setNewRule(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Qoida sarlavhasi"
              />
            </div>
            <div>
              <Label htmlFor="new-description">Tavsif</Label>
              <Textarea
                id="new-description"
                value={newRule.description}
                onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Qoida tavsifi"
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleImageUpload} className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Rasm Qo'shish
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={addNewRule} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Saqlash
              </Button>
              <Button variant="outline" onClick={cancelEditing} className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Bekor qilish
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rules list */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id} className="bg-card border border-border">
            {editingRule === rule.id ? (
              <RuleEditForm
                rule={rule}
                onSave={saveRule}
                onCancel={cancelEditing}
                onImageUpload={handleImageUpload}
              />
            ) : (
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Qoida {rule.id}</Badge>
                      {rule.image && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Image className="w-3 h-3" />
                          Rasm bor
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{rule.title}</h3>
                    <p className="text-muted-foreground">{rule.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(rule.id)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Tahrirlash
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRule(rule.id)}
                      className="flex items-center gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                      O'chirish
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// Rule edit form component
const RuleEditForm = ({ rule, onSave, onCancel, onImageUpload }: any) => {
  const [title, setTitle] = useState(rule.title);
  const [description, setDescription] = useState(rule.description);

  const handleSave = () => {
    onSave(rule.id, { title, description });
  };

  return (
    <CardContent className="p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor={`title-${rule.id}`}>Sarlavha</Label>
          <Input
            id={`title-${rule.id}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`description-${rule.id}`}>Tavsif</Label>
          <Textarea
            id={`description-${rule.id}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onImageUpload} className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Rasm Qo'shish
          </Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Saqlash
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Bekor qilish
          </Button>
        </div>
      </div>
    </CardContent>
  );
};

export default InstructionsManagement;
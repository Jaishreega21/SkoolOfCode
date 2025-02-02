"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Brain, Save } from "lucide-react";

export default function Settings() {
  const [apiKey, setApiKey] = useState("");
  const [aiModel, setAiModel] = useState("gpt-3.5-turbo");

  const handleSave = () => {
    // Here you would save the settings
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-purple-600">AI Settings</h1>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="api-key">AI API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Enter your API key to connect with the AI tutor. You can get one from OpenAI, Google, or other AI providers.
              </p>
            </div>

            <div className="space-y-2">
              <Label>AI Model</Label>
              <Select value={aiModel} onValueChange={setAiModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select AI model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
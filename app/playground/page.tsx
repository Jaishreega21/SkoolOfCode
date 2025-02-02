"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, RefreshCw } from "lucide-react";
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import Link from "next/link";
declare global {
  interface Window {
    loadPyodide: any;
    pyodide: any;
  }
}

export default function Playground() {
  const [code, setCode] = useState("# Write your Python code here\nprint('Hello, World!')");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
    script.async = true;
    script.onload = async () => {
      try {
        window.pyodide = await window.loadPyodide({
          stdout: (text: string) => {
            setOutput(prev => prev + text + "\n");
          },
          stderr: (text: string) => {
            setOutput(prev => prev + "Error: " + text + "\n");
          }
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading Pyodide:", error);
        setOutput("Error loading Python runtime. Please refresh the page.");
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const runCode = async () => {
    if (!window.pyodide || isLoading) {
      setOutput("Python runtime is not ready yet. Please wait...");
      return;
    }

    setIsRunning(true);
    setOutput("");

    try {
      // Run the Python code
      const result = await window.pyodide.runPythonAsync(code);

      // If there's a return value that's not None, display it
      if (result !== undefined && result !== null) {
        setOutput(prev => prev + String(result) + "\n");
      }
    } catch (error: any) {
      setOutput("Error: " + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <>
    <nav className="fixed w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-2xl">SkoolOfCode</div>
          <div className="flex gap-6">
            <Link href="/" className="text-white hover:text-purple-300">Home</Link>
            <Link href="/lessons" className="text-white hover:text-purple-300">Lessons</Link>
            <Link href="/playground" className="text-white hover:text-purple-300">Playground</Link>
            <Button className="bg-purple-500 hover:bg-purple-600">Sign Up</Button>
          </div>
        </div>
      </nav>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-600">Python Playground</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Code Editor</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCode("# Write your Python code here\nprint('Hello, World!')")}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={runCode}
                  disabled={isRunning || isLoading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run Code
                </Button>
              </div>
            </div>
            <CodeMirror
              value={code}
              height="400px"
              theme={vscodeDark}
              extensions={[python()]}
              onChange={(value) => setCode(value)}
              className="border rounded-lg overflow-hidden"
            />
          </Card>

          {/* Output */}
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Output</h2>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono h-[400px] overflow-auto whitespace-pre-wrap">
              {isLoading ? "Loading Python runtime..." : (output || "Your code output will appear here...")}
            </div>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Use <code className="bg-gray-100 px-1 rounded">print()</code> to show text in the output</li>
            <li>Try simple math operations like <code className="bg-gray-100 px-1 rounded">2 + 2</code></li>
            <li>Create variables using <code className="bg-gray-100 px-1 rounded">name = "Your name"</code></li>
            <li>Remember to indent your code properly in loops and conditions</li>
            <li>Try these examples:
              <pre className="bg-gray-100 p-2 mt-2 rounded">
                {`# Print numbers
for i in range(5):
    print(f"Number: {i}")

# Calculate sum
numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(f"Sum: {total}")

# String manipulation
name = "Python"
print(f"Hello, {name}!")`}
              </pre>
            </li>
          </ul>
        </Card>
      </div>
    </div>
    </>
  );
}
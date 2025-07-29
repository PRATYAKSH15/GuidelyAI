import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="text-4xl font-bold mb-6">Welcome to Guidely AI</h1>
    <Button>click me</Button>
    </div>
  );
}
 
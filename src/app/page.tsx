"use client"
import { Typewriter } from "react-simple-typewriter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { useState, useEffect } from "react";

const Erloesen = () => {
  const [showAction, setShowAction] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAction(true)
    }, 20000)

    return () => clearTimeout(timer) 
  }, [])

  return showAction ? <AlertDialogAction>Erlöse mich!</AlertDialogAction> : null
}


export default function Home() {
  return (
    <main className="h-full w-full flex flex-col gap-5 items-center justify-center p-4 z-10">
      <div className="w-4/12 h-6/12 bg-gray-200/5 backdrop-blur-xs rounded-md flex flex-col items-center justify-around p-2">
        <p className="w-full text-center text-red-100 text-2xl animate-ping">**WICHTIG**</p>
        <p className="w-fit text-center text-muted-foreground bg-yellow-100 opacity-80 p-2 rounded-md">
          <Typewriter
            words={["Halol, mie", "Also nochmal. Hallo, mein Name ist Gustav Ganz und ich bin Junior Developer oder so ähnlich.", "Vielleicht ist mein Name auch Hans Hase und ich weiß von nichts.", "Ooooder ich bin gar nicht ich und nur eine Kopie meiner Selbst, da wir uns in einer Simulation befinden..", "Man weiß es nicht.", "Man munkelt.", "Ende der Durchsage!"]}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={20}
            delaySpeed={1000}
          />
        </p>
        <AlertDialog>
          <AlertDialogTrigger className="bg-red-700 text-white border-2 rounded-md p-2 cursor-pointer hover:bg-red-500 transition-all">ANHALTEN!!</AlertDialogTrigger>
          <AlertDialogContent className="bg-red-300 text-white font-semibold">
            <AlertDialogHeader>
              <AlertDialogTitle>So schnell halte ich nicht den Mund!</AlertDialogTitle>
              <AlertDialogDescription>
              <p className="w-full text-center text-muted-foreground">
                <Typewriter
                  words={["Also, wo war ich stehen geblieben? Ach ja!", "Wie heißt du denn eigentlich? Ach kannst ja gar nichts eintippen. -.- Doof oder?"]}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={20}
                  delaySpeed={1000}
                />
              </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {Erloesen()}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
